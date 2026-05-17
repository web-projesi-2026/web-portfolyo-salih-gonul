// ══════════════════════════════════════════════════════════════
// PROJECTS.JS — JSON'dan Dinamik Kart + Arama + Sıralama + Favoriler
// ══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  const LS_KEY = 'sg_favorite_projects';

  const PROJECTS_DATA = [
    { id:1, num:'001', year:'2026', name:'Portfolyo Sitesi',
      desc:'Saf HTML, CSS ve JavaScript ile geliştirdiğim kişisel portfolyo sitesi. Özel cursor efekti, açık/koyu tema geçişi, scroll reveal animasyonları ve mobil uyumlu tasarım içeriyor.',
      icon:'🌐', category:'web', bg:'web', techs:['HTML','CSS','JavaScript'], link:null, github:'https://github.com/salihgnl06' },
    { id:2, num:'002', year:'2026', name:'Öğrenci Not Takip Sistemi',
      desc:'PHP ve MySQL ile geliştirdiğim, öğrencilerin ders notlarını ve sınav sonuçlarını takip edebildiği veritabanı destekli web uygulaması.',
      icon:'📊', category:'web', bg:'web', techs:['PHP','MySQL','HTML','CSS'], link:null, github:null },
    { id:3, num:'003', year:'2025', name:'Terminal Görev Yöneticisi',
      desc:'Bash scripting ile yazdığım komut satırı tabanlı yapılacaklar listesi uygulaması. Görev ekleme, tamamlama ve silme özelliklerine sahip.',
      icon:'🐧', category:'tool', bg:'web', techs:['Bash','Linux'], link:null, github:null },
    { id:4, num:'004', year:'2025', name:'Hava Durumu Uygulaması',
      desc:'JavaScript Fetch API kullanarak OpenWeatherMap servisinden anlık hava durumu verisi çeken, şehir bazlı arama yapılabilen responsive bir web uygulaması.',
      icon:'⛅', category:'web', bg:'web', techs:['HTML','CSS','JavaScript','API'], link:null, github:null },
    { id:5, num:'005', year:'2025', name:'SQL Sorgulama Aracı',
      desc:'PHP ile geliştirilmiş, MySQL veritabanına bağlanarak tablo listeleme ve basit sorgu çalıştırma imkânı sunan mini bir yönetim paneli.',
      icon:'🗄️', category:'tool', bg:'web', techs:['PHP','MySQL'], link:null, github:null }
  ];

  let allProjects  = PROJECTS_DATA;
  let activeFilter = 'all';
  let searchQuery  = '';
  let sortOrder    = 'default';

  // ── Favoriler ─────────────────────────────────
  function getFavorites() {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; } catch { return []; }
  }
  function saveFavorites(favs) { localStorage.setItem(LS_KEY, JSON.stringify(favs)); }
  function isFavorite(id) { return getFavorites().includes(id); }
  function toggleFavorite(id) {
    const favs = getFavorites(), idx = favs.indexOf(id);
    idx === -1 ? favs.push(id) : favs.splice(idx, 1);
    saveFavorites(favs);
    return idx === -1;
  }

  // ── Filtre + Arama + Sırala ───────────────────
  function getVisibleProjects() {
    let list = allProjects.slice();
    if (activeFilter === 'fav')       list = list.filter(p => isFavorite(p.id));
    else if (activeFilter !== 'all')  list = list.filter(p => p.category === activeFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.techs.some(t => t.toLowerCase().includes(q))
      );
    }
    switch (sortOrder) {
      case 'az':     list.sort((a,b) => a.name.localeCompare(b.name,'tr')); break;
      case 'za':     list.sort((a,b) => b.name.localeCompare(a.name,'tr')); break;
      case 'newest': list.sort((a,b) => parseInt(b.year) - parseInt(a.year)); break;
      case 'oldest': list.sort((a,b) => parseInt(a.year) - parseInt(b.year)); break;
      default:       list.sort((a,b) => a.id - b.id);
    }
    return list;
  }

  // ── Kart HTML ─────────────────────────────────
  function createCardHTML(p) {
    const fav = isFavorite(p.id);
    const techs = p.techs.map(t => `<span class="tech-tag">${t}</span>`).join('');
    const links = [
      p.github ? `<a href="${p.github}" class="card-link-btn" target="_blank" rel="noopener"><span>GitHub</span><span>↗</span></a>` : '',
      p.link   ? `<a href="${p.link}"   class="card-link-btn" target="_blank" rel="noopener"><span>Demo</span><span>↗</span></a>`   : ''
    ].filter(Boolean).join('');
    return `
      <div class="project-card reveal" data-category="${p.category}" data-bg="${p.bg}" data-id="${p.id}">
        <div class="project-card-header">
          <div class="project-card-icon">${p.icon}</div>
          <button class="fav-btn ${fav?'active':''}" data-id="${p.id}"
            aria-label="${fav?'Favorilerden çıkar':'Favorilere ekle'}">
            <span class="fav-icon">${fav?'❤️':'🤍'}</span>
          </button>
        </div>
        <div class="project-card-body">
          <div class="project-card-num">Proje — ${p.num} · ${p.year}</div>
          <div class="project-card-name">${p.name}</div>
          <div class="project-card-desc">${p.desc}</div>
          <div class="project-card-tech">${techs}</div>
          ${links ? `<div class="card-links">${links}</div>` : ''}
        </div>
      </div>`;
  }

  // ── Render ────────────────────────────────────
  function renderCards() {
    const grid    = document.getElementById('projects-grid-dynamic');
    if (!grid) return;
    const visible = getVisibleProjects();
    const countEl = document.getElementById('project-count');
    if (countEl) countEl.textContent = visible.length;

    if (!visible.length) {
      grid.innerHTML = `<div class="no-projects-msg">
        ${activeFilter==='fav' ? '<span class="no-icon">🤍</span><p>Henüz favori proje eklemediniz.</p>'
          : searchQuery        ? '<span class="no-icon">🔍</span><p>Aramanızla eşleşen proje bulunamadı.</p>'
                               : '<span class="no-icon">📂</span><p>Bu kategoride proje bulunamadı.</p>'}
      </div>`;
      return;
    }
    grid.innerHTML = visible.map(createCardHTML).join('');
    grid.querySelectorAll('.reveal').forEach(el => {
      if (window.revealObserver) window.revealObserver.observe(el);
      else el.classList.add('visible');
    });
    grid.querySelectorAll('.fav-btn').forEach(btn => btn.addEventListener('click', handleFavClick));
    grid.querySelectorAll('a,button,.project-card').forEach(el => {
      el.addEventListener('mouseenter', () => { document.querySelector('.cursor')?.classList.add('hover'); document.querySelector('.cursor-ring')?.classList.add('hover'); });
      el.addEventListener('mouseleave', () => { document.querySelector('.cursor')?.classList.remove('hover'); document.querySelector('.cursor-ring')?.classList.remove('hover'); });
    });
  }

  function handleFavClick(e) {
    e.stopPropagation();
    const btn = e.currentTarget, id = parseInt(btn.dataset.id);
    const added = toggleFavorite(id);
    btn.classList.add('fav-pop');
    setTimeout(() => btn.classList.remove('fav-pop'), 350);
    btn.querySelector('.fav-icon').textContent = added ? '❤️' : '🤍';
    btn.classList.toggle('active', added);
    btn.setAttribute('aria-label', added ? 'Favorilerden çıkar' : 'Favorilere ekle');
    updateFavCount();
    showToast(added
      ? `"${allProjects.find(p=>p.id===id)?.name}" favorilere eklendi ❤️`
      : `"${allProjects.find(p=>p.id===id)?.name}" favorilerden çıkarıldı`);
    if (activeFilter === 'fav') renderCards();
  }

  function updateFavCount() {
    const count = getFavorites().length;
    const badge = document.getElementById('fav-count-badge');
    const btn   = document.querySelector('.filter-btn[data-filter="fav"]');
    if (badge) { badge.textContent = count; badge.style.display = count > 0 ? 'inline-flex' : 'none'; }
    if (btn)   btn.innerHTML = count > 0 ? `❤️ Favoriler <span class="fav-badge">${count}</span>` : '❤️ Favoriler';
  }

  function showToast(msg) {
    let t = document.getElementById('sg-toast');
    if (!t) { t = document.createElement('div'); t.id='sg-toast'; t.className='sg-toast'; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._timer); t._timer = setTimeout(() => t.classList.remove('show'), 2800);
  }

  function initFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter;
        renderCards();
      });
    });
  }

  function initSearch() {
    const inp = document.getElementById('project-search');
    const clr = document.getElementById('search-clear');
    if (!inp) return;
    let timer;
    inp.addEventListener('input', () => {
      clearTimeout(timer);
      searchQuery = inp.value;
      if (clr) clr.style.display = searchQuery ? 'flex' : 'none';
      timer = setTimeout(renderCards, 250);
    });
    clr?.addEventListener('click', () => {
      inp.value = ''; searchQuery = ''; clr.style.display = 'none';
      inp.focus(); renderCards();
    });
  }

  function initSort() {
    const sel = document.getElementById('project-sort');
    if (!sel) return;
    sel.addEventListener('change', () => { sortOrder = sel.value; renderCards(); });
  }

  function init() {
    if (!document.getElementById('projects-grid-dynamic')) return;
    renderCards(); initFilters(); initSearch(); initSort(); updateFavCount();
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();
