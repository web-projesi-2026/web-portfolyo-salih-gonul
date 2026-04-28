# 🚀 Kişisel Portfolyo Web Sitesi

Modern, şık ve tamamen responsive bir kişisel portfolyo web sitesi.
Bu proje, geliştirici olarak kendini tanıtmak, projelerini sergilemek ve iletişim kurmak için tasarlanmıştır.

---

## 🖼️ Proje Hakkında

Bu portfolyo sitesi aşağıdaki amaçlarla geliştirilmiştir:

* 👨‍💻 Kişisel bilgileri sunmak
* 💼 Projeleri sergilemek
* 📬 Ziyaretçilerle iletişim kurmak
* 🌐 Profesyonel bir dijital kimlik oluşturmak

---

## ✨ Özellikler

* 🖤 Modern **Dark Mode** tasarım (Light Mode desteği ile)
* 📱 Tam uyumlu **Responsive Design**
* 🎬 Akıcı animasyonlar (hover & scroll)
* 📌 Sticky (sabit) navbar
* 🔍 Aktif menü vurgulama
* 📊 Yetenek gösterimi (skill bars / ikonlar)
* 💼 Proje kartları
* 📄 Çok sayfalı yapı (About, Projects, Contact)
* 📬 **Tam çalışan iletişim formu** (form doğrulama dahil)

---

## 📋 İletişim Formu — Özellikler

`pages/contact.html` sayfasında yer alan iletişim formu aşağıdaki teknik gereksinimleri karşılar:

| Özellik | Açıklama |
|---|---|
| `required` alanlar | Tüm form alanları zorunludur; boş gönderilemez |
| E-posta formatı | `type="email"` + regex ile format doğrulaması |
| Boş alan denetimi | Her alan gönderimde ve `blur` sonrası kontrol edilir |
| Hata mesajları | Alan başına özel, anlık hata mesajları gösterilir |
| Başarı mesajı | Form doğru doldurulduğunda yeşil başarı bildirimi görünür |
| Canlı doğrulama | Kullanıcı alandan çıktıktan sonra anlık geri bildirim |
| Karakter sayacı | Mesaj alanı için 0/1000 sayacı |
| KVKK onayı | Checkbox ile KVKK onayı zorunluluğu |
| Yükleme durumu | Gönderim sırasında spinner animasyonu |
| Sıfırlama | Başarı sonrası "Yeni Mesaj Gönder" ile form sıfırlanır |

### Form Alanları

1. **Ad Soyad** — Minimum 2 karakter, boş bırakılamaz
2. **E-posta Adresi** — `ornek@domain.com` formatında, boş bırakılamaz
3. **Konu** — Açılır menüden seçim zorunlu (5 seçenek)
4. **Mesaj** — Minimum 10, maximum 1000 karakter
5. **KVKK Onayı** — Checkbox, işaretlenmeden gönderilemez

### İlgili Dosyalar

```
pages/contact.html       → Form HTML yapısı
assets/css/contact.css   → Form özel stilleri
assets/js/contact.js     → Doğrulama (validation) mantığı
```

---

## 🛠️ Kullanılan Teknolojiler

* 🌐 HTML5 (`required`, `type="email"`, `minlength`, `maxlength`, `novalidate`)
* 🎨 CSS3 (Flexbox & Grid, CSS Variables, Animasyonlar)
* ⚡ JavaScript (Vanilla JS, DOM API, Form Validation)

---

## 📁 Proje Yapısı

```
portfolio-site/
│
├── index.html
├── assets/
│   ├── css/
│   │   ├── style.css         ← Ana stil dosyası
│   │   └── contact.css       ← İletişim formu stilleri (YENİ)
│   └── js/
│       ├── main.js           ← Genel JS (slider, navbar, vb.)
│       └── contact.js        ← Form doğrulama mantığı (YENİ)
│
├── pages/
│   ├── about.html
│   ├── projeler.html
│   └── contact.html          ← İletişim formu (GÜNCELLENDİ)
│
└── README.md
```

---

## 🚀 Kurulum ve Kullanım

1. Bu repoyu klonla:

```bash
git clone https://github.com/web-projesi-2026/web-portfolyo-salih-gonul.git
```

2. Klasöre gir:

```bash
cd web-portfolyo-salih-gonul
```

3. `index.html` dosyasını tarayıcıda aç 🎉

> **Not:** Proje saf HTML/CSS/JS ile geliştirildiğinden herhangi bir kurulum, derleme veya sunucu gerektirmez. Doğrudan tarayıcıda açılabilir.

---

## 🎯 Özelleştirme

Aşağıdaki alanları kendine göre düzenleyebilirsin:

* 👤 İsim ve başlık — `index.html`
* 📝 Hakkımda sayfası — `pages/about.html`
* 💼 Projeler — `pages/projeler.html`
* 📬 İletişim formu — `pages/contact.html` + `assets/js/contact.js`
* 🎨 Stil ayarları — `assets/css/style.css` + `assets/css/contact.css`
* ⚡ Script işlemleri — `assets/js/main.js` + `assets/js/contact.js`

---

## 📬 İletişim

Benimle iletişime geçmek için:

* 📧 Email: [salihgnl06@gmail.com](mailto:salihgnl06@gmail.com)
* 💼 LinkedIn: <https://linkedin.com/in/salihgonul>
* 🐙 GitHub: <https://github.com/salihgnl06>
