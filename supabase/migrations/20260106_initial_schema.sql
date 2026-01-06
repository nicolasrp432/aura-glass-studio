-- Create services table
CREATE TABLE IF NOT EXISTS services (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    name TEXT NOT NULL,
    short_description TEXT,
    description TEXT,
    price DECIMAL(10, 2),
    duration TEXT,
    image_url TEXT,
    treatwell_link TEXT,
    popular BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create team table
CREATE TABLE IF NOT EXISTS team (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    specialty TEXT,
    rating DECIMAL(2, 1),
    reviews INTEGER DEFAULT 0,
    bio TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    date TEXT,
    content TEXT NOT NULL,
    service TEXT,
    professional TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create messages table (for contact form)
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    short_description TEXT,
    price DECIMAL(10, 2),
    image TEXT,
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    title TEXT,
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security (RLS)
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE team ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
DROP POLICY IF EXISTS "Allow public read access for services" ON services;
CREATE POLICY "Allow public read access for services" ON services FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access for team" ON team;
CREATE POLICY "Allow public read access for team" ON team FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access for testimonials" ON testimonials;
CREATE POLICY "Allow public read access for testimonials" ON testimonials FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access for products" ON products;
CREATE POLICY "Allow public read access for products" ON products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access for gallery" ON gallery;
CREATE POLICY "Allow public read access for gallery" ON gallery FOR SELECT USING (true);

-- Create policy for public insert access for messages
DROP POLICY IF EXISTS "Allow public insert for messages" ON messages;
CREATE POLICY "Allow public insert for messages" ON messages FOR INSERT WITH CHECK (true);

-- Optional: Seed data can be done via script or manual import in Supabase dashboard.
