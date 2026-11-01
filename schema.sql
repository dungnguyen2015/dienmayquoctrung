CREATE DATABASE IF NOT EXISTS dienmayquoctrung
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE dienmayquoctrung;

CREATE TABLE IF NOT EXISTS admins (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS categories (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  slug VARCHAR(180) NOT NULL UNIQUE,
  description TEXT NULL,
  parent_id BIGINT UNSIGNED NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_categories_parent FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS products (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  category_id BIGINT UNSIGNED NULL,
  name VARCHAR(220) NOT NULL,
  slug VARCHAR(240) NOT NULL UNIQUE,
  sku VARCHAR(100) NULL,
  brand VARCHAR(120) NULL,
  price DECIMAL(13,0) NOT NULL DEFAULT 0,
  old_price DECIMAL(13,0) NULL,
  condition_label VARCHAR(80) NOT NULL DEFAULT 'Đã qua sử dụng',
  capacity VARCHAR(100) NULL,
  warranty VARCHAR(120) NULL,
  stock INT NOT NULL DEFAULT 1,
  image_url TEXT NULL,
  gallery_json JSON NULL,
  short_description VARCHAR(500) NULL,
  description MEDIUMTEXT NULL,
  is_featured TINYINT(1) NOT NULL DEFAULT 0,
  is_published TINYINT(1) NOT NULL DEFAULT 1,
  meta_title VARCHAR(255) NULL,
  meta_description VARCHAR(320) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_products_category (category_id),
  INDEX idx_products_published_featured (is_published, is_featured),
  CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS posts (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(240) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt VARCHAR(600) NULL,
  content MEDIUMTEXT NOT NULL,
  image_url TEXT NULL,
  status ENUM('draft','published') NOT NULL DEFAULT 'draft',
  meta_title VARCHAR(255) NULL,
  meta_description VARCHAR(320) NULL,
  published_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_posts_status_published (status, published_at)
) ENGINE=InnoDB;

ALTER TABLE products
  ADD COLUMN image_alt VARCHAR(500) NULL;

ALTER TABLE posts
  ADD COLUMN image_alt VARCHAR(500) NULL;

CREATE TABLE IF NOT EXISTS media_images (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  public_id VARCHAR(255) NOT NULL UNIQUE,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(500) NOT NULL DEFAULT '',
  width INT NULL,
  height INT NULL,
  format VARCHAR(30) NULL,
  bytes BIGINT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_media_created (created_at)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS contact_orders (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_id BIGINT UNSIGNED NULL,
  customer_name VARCHAR(160) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  message VARCHAR(1000) NULL,
  status ENUM('new','contacted','completed','cancelled') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_orders_status_created (status, created_at),
  CONSTRAINT fk_orders_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
) ENGINE=InnoDB;

INSERT IGNORE INTO categories (name, slug, description, sort_order) VALUES
('Tủ lạnh', 'tu-lanh', 'Tủ lạnh cũ đã kiểm tra', 1),
('Máy giặt', 'may-giat', 'Máy giặt cũ đã kiểm tra', 2),
('Máy lạnh', 'may-lanh', 'Máy lạnh cũ', 3),
('Điện gia dụng', 'dien-gia-dung', 'Thiết bị điện gia dụng', 4);
