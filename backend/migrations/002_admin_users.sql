-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Insert default admin user (password: admin123 - will be hashed on first run)
-- This is a placeholder; the actual password hash will be created by the application
INSERT INTO admin_users (username, password_hash) VALUES
('admin', '$2a$10$placeholder_will_be_updated')
ON CONFLICT (username) DO NOTHING;