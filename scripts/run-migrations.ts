import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing env vars');
    process.exit(1);
}

const runSQL = async (sql: string, label: string) => {
    console.log(`\n🔄 Running: ${label}`);

    // Try using the PostgREST rpc endpoint (requires a function)
    // Since we can't create functions with anon key, we use the SQL endpoint
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({ query: sql }),
    });

    if (!response.ok) {
        const text = await response.text();
        // If exec_sql doesn't exist, we need the service role key
        if (text.includes('Could not find the function') || text.includes('404')) {
            return { success: false, needsManual: true };
        }
        console.error(`❌ Error: ${text}`);
        return { success: false, needsManual: false };
    }

    console.log(`✅ ${label} executed successfully`);
    return { success: true, needsManual: false };
};

const main = async () => {
    console.log(`Connecting to: ${supabaseUrl}`);

    const migrationsDir = path.join(process.cwd(), 'supabase', 'migrations');
    const files = fs.readdirSync(migrationsDir).sort().filter(f => f.endsWith('.sql'));

    const allSQL = files.map(file => {
        return fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    }).join('\n\n');

    const result = await runSQL(allSQL, 'All migrations');

    if (result.needsManual) {
        console.log('\n⚠️  Cannot run SQL directly with anon key.');
        console.log('📋 The combined migration SQL has been saved to: scripts/combined_migration.sql');
        console.log('👉 Copy and paste it into the Supabase SQL Editor:');
        console.log(`   ${supabaseUrl.replace('.supabase.co', '')}/project/rentavxwwgfvfupnfrdl/sql/new`);

        // Save combined SQL for the user
        const outputPath = path.join(process.cwd(), 'scripts', 'combined_migration.sql');
        fs.writeFileSync(outputPath, allSQL, 'utf8');
        console.log(`\nSQL saved to: ${outputPath}`);
    }
};

main().catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
});
