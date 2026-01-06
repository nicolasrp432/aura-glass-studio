import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = 'https://ikoskvahkmtuoeteqtog.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlrb3NrdmFoa210dW9ldGVxdG9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NTkxNDgsImV4cCI6MjA4MzIzNTE0OH0.OP0UiqJltPQLBmbWBB0jEZtV6rYLZrPcNuapCj34104';

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
    const dataPath = path.join(process.cwd(), 'src', 'data', 'services.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const { services, team, testimonials } = JSON.parse(rawData);

    console.log('--- Seeding Services ---');
    for (const item of services) {
        const { error } = await supabase.from('services').upsert(item);
        if (error) console.error(`Error seeding service ${item.id}:`, error.message);
        else console.log(`Seeded service: ${item.name}`);
    }

    console.log('--- Seeding Team ---');
    for (const item of team) {
        const { error } = await supabase.from('team').upsert({
            name: item.name,
            role: item.role,
            specialty: item.specialty,
            rating: item.rating,
            reviews: item.reviews,
            bio: item.bio,
            image_url: item.image_url
        });
        if (error) console.error(`Error seeding team member ${item.name}:`, error.message);
        else console.log(`Seeded team member: ${item.name}`);
    }

    console.log('--- Seeding Testimonials ---');
    for (const item of testimonials) {
        const { error } = await supabase.from('testimonials').upsert({
            name: item.name,
            date: item.date,
            content: item.content,
            service: item.service,
            professional: item.professional,
            rating: item.rating
        });
        if (error) console.error(`Error seeding testimonial from ${item.name}:`, error.message);
        else console.log(`Seeded testimonial from: ${item.name}`);
    }

    const initialProducts = [
        { id: "p1", name: "Esmalte Gel Premium", description: "Colección exclusiva de colores vibrantes y duraderos con acabado espejo profesional.", price: 14.99, image: "https://images.unsplash.com/photo-1632345031435-07271dc69e5d?w=800&q=80", category: "Esmaltes" },
        { id: "p2", name: "Aceite de Cutículas", description: "Fórmula nutritiva con vitamina E y aceite de almendras dulces para una hidratación profunda.", price: 12.50, image: "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=800&q=80", category: "Cuidado" },
        { id: "p3", name: "Crema de Manos Luxury", description: "Hidratación intensa con manteca de karité orgánica y esencia de jazmín.", price: 18.99, image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80", category: "Cuidado" },
        { id: "p4", name: "Kit Manicura Casa", description: "Todo lo necesario para mantener tus uñas perfectas entre visitas al salón.", price: 45.00, image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=80", category: "Kits" },
        { id: "p5", name: "Base Fortalecedora", description: "Tratamiento intensivo enriquecido con calcio y proteínas.", price: 16.50, image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80", category: "Esmaltes" },
        { id: "p6", name: "Top Coat Brillante", description: "Capa protectora ultra brillante de alta velocidad.", price: 11.99, image: "https://images.unsplash.com/photo-1627052968390-c2d96677987b?w=800&q=80", category: "Esmaltes" }
    ];

    console.log('--- Seeding Products ---');
    for (const item of initialProducts) {
        const { error } = await supabase.from('products').upsert(item);
        if (error) console.error(`Error seeding product ${item.name}:`, error.message);
        else console.log(`Seeded product: ${item.name}`);
    }

    const initialGallery = [
        { url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80", title: "Nail Art Floral", category: "Manicura" },
        { url: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=80", title: "Pedicura Spa Luxe", category: "Pedicura" },
        { url: "https://images.unsplash.com/photo-1636019281327-4c5fba60c0f9?w=800&q=80", title: "Minimalista Blanco", category: "Manicura" },
        { url: "https://images.unsplash.com/photo-1600612253971-422e7f5c5904?w=800&q=80", title: "Fortalecimiento Natural", category: "Tratamientos" },
        { url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80", title: "Rojo Clásico Vibrante", category: "Manicura" },
        { url: "https://images.unsplash.com/photo-1510557880182-3d4d3cba3f21?w=800&q=80", title: "Pestañas Hollywood", category: "Pestañas" }
    ];

    console.log('--- Seeding Gallery ---');
    for (const item of initialGallery) {
        const { error } = await supabase.from('gallery').upsert(item);
        if (error) console.error(`Error seeding gallery item ${item.title}:`, error.message);
        else console.log(`Seeded gallery item: ${item.title}`);
    }

    console.log('--- Seed Process Finished ---');
}

seed().catch(err => {
    console.error('Seed failed:', err);
    process.exit(1);
});
