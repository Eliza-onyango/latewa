-- Initial schema for Latewa CBO Website

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    image TEXT,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    interest VARCHAR(100),
    message TEXT,
    status VARCHAR(50) DEFAULT 'New',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    items JSONB NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    provider VARCHAR(50),
    payment_ref VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Donations Table
CREATE TABLE IF NOT EXISTS donations (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    type VARCHAR(50),
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Volunteers Table
CREATE TABLE IF NOT EXISTS volunteers (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    area VARCHAR(100),
    availability VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    caption TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments (M-Pesa) Table
CREATE TABLE IF NOT EXISTS payments (
    checkout_request_id VARCHAR(100) PRIMARY KEY,
    status VARCHAR(50) DEFAULT 'pending',
    phone VARCHAR(20),
    amount DECIMAL(10, 2),
    order_data JSONB,
    mpesa_receipt_number VARCHAR(100),
    error TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    failed_at TIMESTAMP
);

-- Seed data for Products
INSERT INTO products (id, name, description, price, image, category) VALUES
('art-001', 'Beaded Maasai Bracelet', 'Handcrafted bracelet made with vibrant Maasai beads, representing cultural heritage and community pride.', 1200, '/images/pexels-felix-mittermeier-957024.jpg', 'Jewelry'),
('art-002', 'Banana Leaf Wall Art', 'Eco-friendly wall piece using dried banana leaves, showcasing sustainable artistry and natural beauty.', 3500, '/images/pexels-shvetsa-5217774.jpg', 'Wall Art'),
('art-003', 'Recycled Metal Sculpture', 'Upcycled metal sculpture representing community and unity, crafted from reclaimed materials.', 7800, '/images/pexels-tomfisk-3186574.jpg', 'Sculpture'),
('art-004', 'Kitenge Tote Bag', 'Bold African print tote bag, durable and stylish, perfect for everyday use and making a statement.', 2200, '/images/pexels-loren-biser-1425370-11529940.jpg', 'Accessories'),
('art-005', 'Handwoven Basket Set', 'Traditional handwoven baskets made by local artisans using sustainable materials and techniques.', 2800, '/images/pexels-bulat-5686967.jpg', 'Home Decor'),
('art-006', 'Cultural Print Scarf', 'Elegant scarf featuring traditional patterns, combining fashion with cultural expression.', 1800, '/images/pexels-felix-mittermeier-957024.jpg', 'Fashion')
ON CONFLICT (id) DO NOTHING;
