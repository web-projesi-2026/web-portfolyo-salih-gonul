# 🌐 Salih Gönül — Kişisel Portfolyo Sitesi

> Bilgisayar Programcılığı öğrencisi Salih Gönül'ün kişisel portfolyo sitesi.
> HTML, CSS, JavaScript ve PHP + MySQL ile geliştirilmiştir.

**GitHub:** [github.com/salihgnl06](https://github.com/salihgnl06)

---

## ✨ Özellikler

### 1. Kullanıcı Deneyimi
- 🔍 **Proje Arama Kutusu** — İsim, açıklama veya teknoloji bazlı gerçek zamanlı arama
- 🔃 **Proje Sıralama** — A→Z, Z→A, En Yeni, En Eski
- 🏷️ **Kategori Filtreleme** — Web, Araçlar, Favoriler
- ❤️ **Favori Sistemi** — LocalStorage ile favori kaydetme
- 🌗 **Açık/Koyu Tema** — Kullanıcı tercihi kaydedilir
- 📱 **Responsive Tasarım** — Mobil, tablet, masaüstü uyumlu

### 2. API & Dinamik Veri
- ⛅ **Hava Durumu Widgeti** — Open-Meteo API (ücretsiz, API key gerekmez)
  - Şehir bazlı sorgulama, sıcaklık/nem/rüzgar bilgisi
- 📦 **JSON Veri Kaynağı** — Projeler `data/projects.json` dosyasından yüklenir

### 3. Veritabanı İşlemleri (PHP + MySQL)
- 👤 **Kullanıcı Kayıt** — bcrypt ile güvenli şifreleme
- 🔑 **Kullanıcı Giriş** — Session tabanlı kimlik doğrulama
- 📩 **Mesaj Kaydetme** — İletişim formu veritabanına yazar
- 📋 **Mesaj Listeleme** — Admin panelinde görüntüleme
- 🗑️ **Silme / Güncelleme** — CRUD işlemleri

---

## 🛠️ Teknolojiler

| Katman | Teknoloji |
|--------|-----------|
| Frontend | HTML5, CSS3, JavaScript ES6+ |
| Backend | PHP 8+ (PDO) |
| Veritabanı | MySQL 8 / MariaDB |
| API | Open-Meteo (Hava Durumu) |
| Araçlar | Git, GitHub, VS Code |

---

## ⚙️ Kurulum

### Statik Mod (PHP olmadan)
```bash
git clone https://github.com/salihgnl06/web-portfolyo.git
# index.html dosyasını tarayıcıda açın
```

### PHP + MySQL ile Tam Kurulum
```bash
# 1. Repoyu klonlayın ve htdocs/www klasörüne kopyalayın
# 2. api/db.php içindeki DB_USER ve DB_PASS değerlerini düzenleyin
# 3. Veritabanını oluşturun:
mysql -u root -p < db/schema.sql
# 4. http://localhost/portfolyo/ adresinden açın
```

**Test Admin:** `admin@example.com` / `admin123`

---

## 📁 Proje Yapısı

```
web-portfolyo/
├── index.html              # Ana sayfa (hava durumu widgeti dahil)
├── pages/
│   ├── about.html          # Hakkında
│   ├── projeler.html       # Projeler (arama + sıralama + filtre)
│   ├── contact.html        # İletişim formu
│   ├── auth.html           # Giriş / Kayıt
│   └── admin.html          # Admin paneli
├── assets/
│   ├── css/style.css       # Ana stil
│   ├── css/contact.css     # Form stilleri
│   ├── js/main.js          # Genel fonksiyonlar
│   ├── js/projects.js      # Proje kartları + arama + sıralama
│   ├── js/contact.js       # Form doğrulama + PHP entegrasyonu
│   └── img/favicon.svg     # Favicon
├── data/projects.json      # Proje verileri
├── api/
│   ├── db.php              # PDO bağlantısı
│   ├── register.php        # Kayıt API
│   ├── login.php           # Giriş API
│   ├── logout.php          # Çıkış
│   ├── contact.php         # Mesaj kaydetme API
│   └── messages.php        # Mesaj yönetimi API
├── db/schema.sql           # Veritabanı şeması
└── README.md
```

---

## 👤 Geliştirici

**Salih Gönül**
- GitHub: [@salihgnl06](https://github.com/salihgnl06)
- LinkedIn: [linkedin.com/in/salihgonul](https://linkedin.com/in/salihgonul)
- E-posta: salihgnl06@gmail.com

*Son güncelleme: 2026*
