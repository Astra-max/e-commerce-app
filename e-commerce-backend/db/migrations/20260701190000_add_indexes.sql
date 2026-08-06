-- migrate:up

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE INDEX IF NOT EXISTS idx_products_category ON products (product_category);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cart_user_product ON cart (user_id, product_id);

-- migrate:down

DROP INDEX IF EXISTS idx_cart_user_product;
DROP INDEX IF EXISTS idx_products_created_at;
DROP INDEX IF EXISTS idx_products_category;
