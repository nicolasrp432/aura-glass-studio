import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load .env
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY; // Using anon key for now, might need service role for some operations if RLS is tight

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
    const dataPath = path.join(process.cwd(), 'src', 'data', 'services.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const { services, team, testimonials } = JSON.parse(rawData);

    console.log('Seeding services...');
    const { error: sError } = await supabase.from('services').upsert(services);
    if (sError) console.error('Error seeding services:', sError);

    console.log('Seeding team...');
    const { error: tError } = await supabase.from('team').upsert(team.map(m => ({
        name: m.name,
        role: m.role,
        specialty: m.specialty,
        rating: m.rating,
        reviews: m.reviews,
        bio: m.bio,
        image_url: m.image_url
    })));
    if (tError) console.error('Error seeding team:', tError);

    console.log('Seeding testimonials...');
    const { error: testError } = await supabase.from('testimonials').upsert(testimonials.map(t => ({
        name: t.name,
        date: t.date,
        content: t.content,
        service: t.service,
        professional: t.professional,
        rating: t.rating
    })));
    if (testError) console.error('Error seeding testimonials:', testError);

    console.log('Seed finished!');
}

seed();
