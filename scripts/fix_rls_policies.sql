-- Add INSERT policies for seeding data (using anon key)

-- Services: allow public insert
DROP POLICY IF EXISTS "Allow public insert for services" ON services;
CREATE POLICY "Allow public insert for services" ON services FOR INSERT WITH CHECK (true);

-- Also allow UPDATE for upsert
DROP POLICY IF EXISTS "Allow public update for services" ON services;
CREATE POLICY "Allow public update for services" ON services FOR UPDATE USING (true);

-- Team: allow public insert
DROP POLICY IF EXISTS "Allow public insert for team" ON team;
CREATE POLICY "Allow public insert for team" ON team FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update for team" ON team;
CREATE POLICY "Allow public update for team" ON team FOR UPDATE USING (true);

-- Testimonials: allow public insert
DROP POLICY IF EXISTS "Allow public insert for testimonials" ON testimonials;
CREATE POLICY "Allow public insert for testimonials" ON testimonials FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update for testimonials" ON testimonials;
CREATE POLICY "Allow public update for testimonials" ON testimonials FOR UPDATE USING (true);

-- Products: allow public insert
DROP POLICY IF EXISTS "Allow public insert for products" ON products;
CREATE POLICY "Allow public insert for products" ON products FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update for products" ON products;
CREATE POLICY "Allow public update for products" ON products FOR UPDATE USING (true);

-- Gallery: allow public insert
DROP POLICY IF EXISTS "Allow public insert for gallery" ON gallery;
CREATE POLICY "Allow public insert for gallery" ON gallery FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update for gallery" ON gallery;
CREATE POLICY "Allow public update for gallery" ON gallery FOR UPDATE USING (true);

-- Bookings: allow public insert (for booking form)
DROP POLICY IF EXISTS "Allow public insert for bookings" ON bookings;
CREATE POLICY "Allow public insert for bookings" ON bookings FOR INSERT WITH CHECK (true);

-- Settings: allow insert for initial config
DROP POLICY IF EXISTS "Allow public insert for settings" ON settings;
CREATE POLICY "Allow public insert for settings" ON settings FOR INSERT WITH CHECK (true);
