-- TERMINAL: Run these in the Supabase SQL Editor

-- 1. Create AUCTIONS table
CREATE TABLE auctions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    location TEXT,
    zip_code TEXT,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    status TEXT DEFAULT 'active', -- active, closed, draft
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create LOTS table
CREATE TABLE lots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auction_id UUID REFERENCES auctions(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    starting_bid NUMERIC DEFAULT 0,
    current_bid NUMERIC DEFAULT 0,
    condition TEXT,
    image_urls TEXT[], -- Array of image links
    lot_number INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create BIDS table
CREATE TABLE bids (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lot_id UUID REFERENCES lots(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id),
    amount NUMERIC NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Realtime for these tables
-- Run this to allow websockets to listen for updates
-- ALTER PUBLICATION supabase_realtime ADD TABLE lots, bids;

-- 5. FUNCTION to update current_bid on lot when a new bid is placed
CREATE OR REPLACE FUNCTION handle_new_bid()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE lots
  SET current_bid = NEW.amount
  WHERE id = NEW.lot_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. TRIGGER to fire the function
CREATE TRIGGER on_bid_placed
AFTER INSERT ON bids
FOR EACH ROW
EXECUTE FUNCTION handle_new_bid();

-- 7. RLS Policy (Simplified for demo)
ALTER TABLE auctions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lots ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Access" ON auctions FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON lots FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON bids FOR SELECT USING (true);
CREATE POLICY "Authenticated users can bid" ON bids FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
