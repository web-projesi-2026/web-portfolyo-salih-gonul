// ══════════════════════════════════════════════
// PROJECTS.JS — JSON'dan Dinamik Kart + Favoriler
// ══════════════════════════════════════════════

(function () {
  'use strict';

  // ── Sabitler ──────────────────────────────────
  const LS_KEY = 'sg_favorite_projects';  // localStorage anahtarı

  // ── Proje Verisi (data/projects.json ile aynı içerik) ──
  // fetch() yerine doğrudan gömülü veri kullanılıyor (file:// uyumluluğu)
  const PROJECTS_DATA = [
    {
      "id": 1, "num": "001", "year": "2026",
      "name": "Portfolyo Sitesi",
      "desc": "Saf HTML, CSS ve JavaScript ile geliştirdiğim kişisel portfolyo sitesi. Özel cursor efekti, açık/koyu tema geçişi, scroll reveal animasyonları ve mobil uyumlu tasarım içeriyor.",
      "icon": "🌐", "category": "web", "bg": "web",
      "techs": ["HTML", "CSS", "JavaScript"],
      "link": null, "github": "https://github.com"
    },
    {
      "id": 2, "num": "002", "year": "2026",
      "name": "Öğrenci Not Takip Sistemi",
      "desc": "PHP ve MySQL ile geliştirdiğim, öğrencilerin ders notlarını ve sınav sonuçlarını takip edebildiği veritabanı destekli web uygulaması.",
      "icon": "📊", "category": "web", "bg": "web",
      "techs": ["PHP", "MySQL", "HTML", "CSS"],
      "link": null, "github": null
    },
    {
      "id": 3, "num": "003", "year": "2025",
      "name": "Terminal Görev Yöneticisi",
      "desc": "Bash scripting ile yazdığım komut satırı tabanlı yapılacaklar listesi uygulaması. Görev ekleme, tamamlama ve silme özelliklerine sahip.",
      "icon": "🐧", "category": "tool", "bg": "web",
      "techs": ["Bash", "Linux"],
      "link": null, "github": null
    },
    {
      "id": 4, "num": "004", "year": "2025",
      "name": "Hava Durumu Uygulaması",
      "desc": "JavaScript Fetch API kullanarak OpenWeatherMap servisinden anlık hava durumu verisi çeken, şehir bazlı arama yapılabilen responsive bir web uygulaması.",
      "icon": "⛅", "category": "web", "bg": "web",
      "techs": ["HTML", "CSS", "JavaScript", "API"],
      "link": null, "github": null
    },
    {
      "id": 5, "num": "005", "year": "2025",
      "name": "SQL Sorgulama Aracı",
      "desc": "PHP ile geliştirilmiş, MySQL veritabanına bağlanarak tablo listeleme ve basit sorgu çalıştırma imkânı sunan mini bir yönetim paneli.",
      "icon": "🗄️", "category": "tool", "bg": "web",
      "techs": ["PHP", "MySQL"],
      "link": null, "github": null
    }
  ];

  // ── Durum ─────────────────────────────────────
  let allProjects = PROJECTS_DATA;
  let activeFilter = 'all';

  // ── localStorage Yardımcıları ─────────────────
  function getFavorites() {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveFavorites(favs) {
    localStorage.setItem(LS_KEY, JSON.stringify(favs));
  }

  function isFavorite(id) {
    return getFavorites().includes(id);
  }

  function toggleFavorite(id) {
    const favs = getFavorites();
    const idx = favs.indexOf(id);
    if (idx === -1) {
      favs.push(id);
    } else {
      favs.splice(idx, 1);
    }
    saveFavorites(favs);
    return idx === -1; // true = eklendi, false = çıkarıldı
  }

  // ── Kart HTML Oluşturucu ──────────────────────
  function createCardHTML(project) {
    const favored = isFavorite(project.id);
    const techsHTML = project.techs
      .map(t => `<span class="tech-tag">${t}</span>`)
      .join('');

    const linksHTML = [
      project.github
        ? `<a href="${project.github}" class="card-link-btn" target="_blank" rel="noopener" title="GitHub'da Gör">
             <span>GitHub</span><span>↗</span>
           </a>`
        : '',
      project.link
        ? `<a href="${project.link}" class="card-link-btn" target="_blank" rel="noopener" title="Canlı Demo">
             <span>Demo</span><span>↗</span>
           </a>`
        : ''
    ].join('');

    return `
      <div class="project-card reveal" 
           data-category="${project.category}" 
           data-bg="${project.bg}"
           data-id="${project.id}">
        <div class="project-card-header">
          <div class="project-card-icon">${project.icon}</div>
          <button 
            class="fav-btn ${favored ? 'active' : ''}" 
            data-id="${project.id}"
            aria-label="${favored ? 'Favorilerden çıkar' : 'Favorilere ekle'}"
            title="${favored ? 'Favorilerden çıkar' : 'Favorilere ekle'}">
            <span class="fav-icon">${favored ? '❤️' : '🤍'}</span>
          </button>
        </div>
        <div class="project-card-body">
          <div class="project-card-num">Proje — ${project.num} · ${project.year}</div>
          <div class="project-card-name">${project.name}</div>
          <div class="project-card-desc">${project.desc}</div>
          <div class="project-card-tech">${techsHTML}</div>
          ${linksHTML ? `<div class="card-links">${linksHTML}</div>` : ''}
        </div>
      </div>`;
  }

  // ── Kart Listesini Render Et ──────────────────
  function renderCards(filter) {
    const grid = document.getElementById('projects-grid-dynamic');
    if (!grid) return;

    const filtered = filter === 'all'
      ? allProjects
      : filter === 'fav'
        ? allProjects.filter(p => isFavorite(p.id))
        : allProjects.filter(p => p.category === filter);

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="no-projects-msg">
          ${filter === 'fav'
            ? '<span class="no-icon">🤍</span><p>Henüz favori proje eklemediniz.</p>'
            : '<span class="no-icon">📂</span><p>Bu kategoride proje bulunamadı.</p>'
          }
        </div>`;
      return;
    }

    grid.innerHTML = filtered.map(createCardHTML).join('');

    // Scroll reveal observer'a yeni kartları ekle
    grid.querySelectorAll('.reveal').forEach(el => {
      if (window.revealObserver) window.revealObserver.observe(el);
      else el.classList.add('visible'); // observer yoksa direkt göster
    });

    // Favori butonlarına event ekle
    grid.querySelectorAll('.fav-btn').forEach(btn => {
      btn.addEventListener('click', handleFavClick);
    });

    // Cursor hover için yeni elementlere de ekle
    grid.querySelectorAll('a, button, .project-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.querySelector('.cursor')?.classList.add('hover');
        document.querySelector('.cursor-ring')?.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        document.querySelector('.cursor')?.classList.remove('hover');
        document.querySelector('.cursor-ring')?.classList.remove('hover');
      });
    });
  }

  // ── Favori Buton Handler ──────────────────────
  function handleFavClick(e) {
    e.stopPropagation();
    const btn = e.currentTarget;
    const id = parseInt(btn.dataset.id);
    const added = toggleFavorite(id);

    // Buton animasyonu
    btn.classList.add('fav-pop');
    setTimeout(() => btn.classList.remove('fav-pop'), 350);

    // İkon ve sınıf güncelle
    btn.querySelector('.fav-icon').textContent = added ? '❤️' : '🤍';
    btn.classList.toggle('active', added);
    btn.setAttribute('aria-label', added ? 'Favorilerden çıkar' : 'Favorilere ekle');
    btn.setAttribute('title', added ? 'Favorilerden çıkar' : 'Favorilere ekle');

    // Sayaç güncelle
    updateFavCount();

    // Toast mesajı göster
    showToast(added
      ? `"${allProjects.find(p => p.id === id)?.name}" favorilere eklendi ❤️`
      : `"${allProjects.find(p => p.id === id)?.name}" favorilerden çıkarıldı`
    );

    // Eğer "Favoriler" filtresindeyse kartı kaldır/ekle
    if (activeFilter === 'fav') {
      renderCards('fav');
    }
  }

  // ── Favori Sayacını Güncelle ──────────────────
  function updateFavCount() {
    const count = getFavorites().length;
    const badge = document.getElementById('fav-count-badge');
    const filterFavBtn = document.querySelector('.filter-btn[data-filter="fav"]');

    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
    }

    if (filterFavBtn) {
      filterFavBtn.innerHTML = count > 0
        ? `❤️ Favoriler <span class="fav-badge">${count}</span>`
        : `❤️ Favoriler`;
    }
  }

  // ── Toast Bildirimi ───────────────────────────
  function showToast(message) {
    let toast = document.getElementById('sg-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'sg-toast';
      toast.className = 'sg-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2800);
  }

  // ── Filtre Butonları ──────────────────────────
  function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter;
        renderCards(activeFilter);
      });
    });
  }

  // ── Ana Başlatıcı ─────────────────────────────
  function init() {
    const grid = document.getElementById('projects-grid-dynamic');
    if (!grid) return; // Sadece projeler.html'de çalışır

    renderCards('all');
    initFilters();
    updateFavCount();
  }

  // DOM hazır olduğunda başlat
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
