CREATE TABLE users (
  id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'customer',
  status VARCHAR(30) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE driver_profiles (
  id VARCHAR(20) PRIMARY KEY,
  user_id VARCHAR(20) UNIQUE NOT NULL REFERENCES users(id),
  vehicle_name VARCHAR(120) NOT NULL,
  vehicle_plate VARCHAR(20) NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  is_online BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3,2) DEFAULT 5.00,
  total_earnings BIGINT DEFAULT 0
);

CREATE TABLE wallets (
  id VARCHAR(20) PRIMARY KEY,
  user_id VARCHAR(20) UNIQUE NOT NULL REFERENCES users(id),
  balance BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wallet_transactions (
  id VARCHAR(20) PRIMARY KEY,
  wallet_id VARCHAR(20) NOT NULL REFERENCES wallets(id),
  order_id VARCHAR(20),
  type VARCHAR(20) NOT NULL,
  amount BIGINT NOT NULL,
  label VARCHAR(255) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'success',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE restaurants (
  id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  slug VARCHAR(120) UNIQUE NOT NULL,
  category VARCHAR(80) NOT NULL,
  rating DECIMAL(2,1) DEFAULT 5.0,
  delivery_fee BIGINT DEFAULT 0,
  eta_minutes INT DEFAULT 20
);

CREATE TABLE menu_items (
  id VARCHAR(20) PRIMARY KEY,
  restaurant_id VARCHAR(20) NOT NULL REFERENCES restaurants(id),
  name VARCHAR(120) NOT NULL,
  price BIGINT NOT NULL,
  stock INT DEFAULT 0
);

CREATE TABLE orders (
  id VARCHAR(20) PRIMARY KEY,
  customer_id VARCHAR(20) NOT NULL REFERENCES users(id),
  driver_id VARCHAR(20) REFERENCES driver_profiles(id),
  service_type VARCHAR(20) NOT NULL,
  status VARCHAR(30) NOT NULL,
  pickup_address TEXT NOT NULL,
  destination_address TEXT NOT NULL,
  distance_km DECIMAL(10,2) NOT NULL,
  fare BIGINT NOT NULL,
  payment_method VARCHAR(20) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_food_items (
  id VARCHAR(20) PRIMARY KEY,
  order_id VARCHAR(20) NOT NULL REFERENCES orders(id),
  menu_item_id VARCHAR(20) NOT NULL REFERENCES menu_items(id),
  qty INT NOT NULL,
  price BIGINT NOT NULL
);

CREATE TABLE reviews (
  id VARCHAR(20) PRIMARY KEY,
  order_id VARCHAR(20) UNIQUE NOT NULL REFERENCES orders(id),
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
