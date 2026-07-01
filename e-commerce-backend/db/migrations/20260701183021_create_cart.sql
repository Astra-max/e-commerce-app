-- migrate:up

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS cart (
    cart_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    product_name VARCHAR(100) NOT NULL,
    product_description TEXT,
    product_category VARCHAR(50) NOT NULL,
    product_price DECIMAL(10, 2) NOT NULL,
    product_image VARCHAR(255),
    product_status VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- migrate:down

DROP TABLE IF EXISTS cart;