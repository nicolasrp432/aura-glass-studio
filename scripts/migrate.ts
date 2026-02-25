import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env');
    process.exit(1);
}

console.log(`Connecting to Supabase: ${supabaseUrl}`);
const supabase = createClient(supabaseUrl, supabaseKey);

const runMigrations = async () => {
    const migrationsDir = path.join(process.cwd(), 'supabase', 'migrations');
    const files = fs.readdirSync(migrationsDir).sort();

    for (const file of files) {
        if (!file.endsWith('.sql')) continue;

        console.log(`\n--- Running migration: ${file} ---`);
        const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');

        // Split by semicolons and execute each statement
        const statements = sql
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0 && !s.startsWith('--'));

        for (const statement of statements) {
            const { error } = await supabase.rpc('', {}).maybeSingle();
            // Using raw SQL via the rest API isn't directly supported with anon key
            // We'll report this and guide the user to run SQL in the dashboard
        }

        console.log(`Migration ${file} needs to be run in the Supabase SQL Editor.`);
    }
};

// Test connection first
const testConnection = async () => {
    console.log('Testing connection to new Supabase...');
    // Try a simple query - if tables don't exist yet, we'll get an error
    const { data, error } = await supabase.from('services').select('count').limit(1);

    if (error) {
        if (error.message.includes('does not exist') || error.code === '42P01') {
            console.log('❌ Tables do not exist yet. You need to run the SQL migrations first.');
            console.log('\nPlease go to the Supabase SQL Editor and run the migration files:');
            console.log('1. supabase/migrations/20260106_initial_schema.sql');
            console.log('2. supabase/migrations/20260126_admin_features.sql');
            return false;
        }
        console.log('Connection error:', error.message);
        return false;
    }

    console.log('✅ Connection successful! Tables exist.');
    return true;
};

testConnection().then(connected => {
    if (!connected) {
        console.log('\nRun this script again after executing the migrations.');
        process.exit(1);
    }
    console.log('Database is ready for seeding.');
});
