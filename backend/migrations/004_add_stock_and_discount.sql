-- Add stock and discount columns to products table
ALTER TABLE products ADD COLUMN in_stock BOOLEAN DEFAULT true;
ALTER TABLE products ADD COLUMN stock_quantity INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN discount_percentage INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN original_price INTEGER;

-- Update original_price to match price for existing products
UPDATE products SET original_price = price WHERE original_price IS NULL;
