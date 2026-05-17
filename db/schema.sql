-- =============================================
-- Salih Gönül Portfolyo — Veritabanı Şeması
-- =============================================

CREATE DATABASE IF NOT EXISTS portfolyo_db
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE portfolyo_db;

-- ── Kullanıcılar ──────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  role       ENUM('user','admin') NOT NULL DEFAULT 'user',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── İletişim Mesajları ────────────────────────
CREATE TABLE IF NOT EXISTS messages (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL,
  subject    VARCHAR(100) NOT NULL,
  message    TEXT         NOT NULL,
  is_read    TINYINT(1)   NOT NULL DEFAULT 0,
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Admin Hesabı ──────────────────────────────
-- E-posta : admin@portfolyo.com
-- Şifre   : admin123
INSERT IGNORE INTO users (name, email, password, role) VALUES
  ('Salih Gönül',
   'admin@portfolyo.com',
   '$2y$10$fJB3SUxbHE0boHzkB37LYe/oJ/bsT5OntUdtna/gu3Bt0UcB3jGwi',
   'admin');
