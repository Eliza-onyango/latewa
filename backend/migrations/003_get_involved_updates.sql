-- Update volunteers table
ALTER TABLE volunteers ADD COLUMN IF NOT EXISTS skills TEXT;
ALTER TABLE volunteers ADD COLUMN IF NOT EXISTS interest TEXT;

-- Create partners table
CREATE TABLE IF NOT EXISTS partners (
    id VARCHAR(50) PRIMARY KEY,
    organization VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    organization_type VARCHAR(50),
    partnership_interest VARCHAR(100),
    message TEXT,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Update donations table
ALTER TABLE donations ADD COLUMN IF NOT EXISTS donor_type VARCHAR(50) DEFAULT 'individual';
