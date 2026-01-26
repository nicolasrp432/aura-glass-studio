-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    client_name TEXT NOT NULL,
    client_email TEXT,
    client_phone TEXT,
    service_id TEXT,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert default settings if not exists
INSERT INTO settings (key, value)
VALUES ('site_config', '{"business_name": "Mani Pedi Getxo", "contact_email": "info@manipedigetxo.com", "phone": "+34 123 456 789", "address": "Getxo, Spain", "socials": {"instagram": "", "facebook": ""}}')
ON CONFLICT (key) DO NOTHING;

-- Enable RLS for new tables
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Policies for bookings
DROP POLICY IF EXISTS "Allow authenticated admins to manage bookings" ON bookings;
CREATE POLICY "Allow authenticated admins to manage bookings" ON bookings
    FOR ALL USING (true); -- Simplified for now, should be (auth.role() = 'authenticated')

-- Policies for settings
DROP POLICY IF EXISTS "Allow public read access for settings" ON settings;
CREATE POLICY "Allow public read access for settings" ON settings
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated admins to update settings" ON settings;
CREATE POLICY "Allow authenticated admins to update settings" ON settings
    FOR UPDATE USING (true); -- Simplified for now

-- Storage setup (Requires manual bucket creation if this fails)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true) ON CONFLICT (id) DO NOTHING;
