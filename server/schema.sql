CREATE TABLE IF NOT EXISTS enrollments (
  id BIGINT UNSIGNED NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(320) NOT NULL,
  phone VARCHAR(30) NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  program VARCHAR(255) NOT NULL,
  status ENUM('received', 'under-review', 'processing', 'completed') NOT NULL DEFAULT 'received',
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  INDEX idx_enrollments_email (email),
  INDEX idx_enrollments_status (status),
  INDEX idx_enrollments_created_at (created_at)
);

CREATE TABLE IF NOT EXISTS inquiries (
  id BIGINT UNSIGNED NOT NULL PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL DEFAULT '',
  contact_name VARCHAR(255) NOT NULL,
  email VARCHAR(320) NOT NULL,
  phone VARCHAR(30) NOT NULL DEFAULT '',
  industry VARCHAR(255) NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  category VARCHAR(255) NOT NULL DEFAULT 'Partnership',
  status ENUM('received', 'under-review', 'processing', 'completed') NOT NULL DEFAULT 'received',
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  INDEX idx_inquiries_email (email),
  INDEX idx_inquiries_status (status),
  INDEX idx_inquiries_created_at (created_at)
);

CREATE TABLE IF NOT EXISTS notifications (
  id BIGINT UNSIGNED NOT NULL PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  INDEX idx_notifications_created_at (created_at),
  INDEX idx_notifications_read (is_read)
);
