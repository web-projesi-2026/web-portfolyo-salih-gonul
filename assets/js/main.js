// ── THEME TOGGLE ──
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'dark';
root.setAttribute('data-theme', savedTheme);

document.querySelectorAll('.theme-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
});

// ── CUSTOM CURSOR ──
const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
const animCursor = () => {
  if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; }
  rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
  if (cursorRing) { cursorRing.style.left = rx + 'px'; cursorRing.style.top = ry + 'px'; }
  requestAnimationFrame(animCursor);
};
animCursor();
document.querySelectorAll('a, button, .project-item, .project-card, .pill').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor?.classList.add('hover'); cursorRing?.classList.add('hover'); });
  el.addEventListener('mouseleave', () => { cursor?.classList.remove('hover'); cursorRing?.classList.remove('hover'); });
});

// ── HEADER SCROLL ──
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 60);
});

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── ACTIVE NAV ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a').forEach(a => {
  const href = a.getAttribute('href').split('/').pop();
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// ── PROJECT FILTER ──
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.style.opacity = show ? '1' : '0';
      card.style.transform = show ? '' : 'scale(0.95)';
      setTimeout(() => { card.style.display = show ? '' : 'none'; }, show ? 0 : 300);
      if (show) setTimeout(() => { card.style.display = ''; card.style.opacity = '1'; }, 10);
    });
  });
});

// ── CONTACT FORM ──
document.querySelector('.contact-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit span');
  if (btn) { btn.textContent = 'Gönderildi ✓'; setTimeout(() => { btn.textContent = 'Mesaj Gönder'; }, 3000); }
});

// ══════════════════════════════════════════════
// YENİ ETKİLEŞİMLER — Eklenen JavaScript
// ══════════════════════════════════════════════

// ── 1. MOBİL HAMBURGER MENÜ ──
(function() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');
  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    mobileOverlay.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
  });
  mobileOverlay.addEventListener('click', closeMenu);
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // Active nav link for mobile
  const currentPage2 = window.location.pathname.split('/').pop() || 'index.html';
  mobileMenu.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === currentPage2 || (currentPage2 === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ── 2. SLIDER ──
(function() {
  const track = document.querySelector('.slider-track');
  if (!track) return;
  const slides = track.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.slider-dots');
  let current = 0;
  let autoTimer;

  // Dot oluştur
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    document.querySelectorAll('.slider-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  document.querySelector('.slider-prev')?.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  document.querySelector('.slider-next')?.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  // Otomatik geçiş
  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 4000);
  }
  resetAuto();

  // Touch/swipe desteği
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { goTo(diff > 0 ? current + 1 : current - 1); resetAuto(); }
  });
})();

// ── 3. SEKMELİ İÇERİK ──
(function() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      // Aktif butonu güncelle
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Aktif paneli göster
      document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === `tab-${target}`);
      });
    });
  });
})();

// ── 4. İSTATİSTİK SAYACI ANİMASYONU ──
(function() {
  const counters = document.querySelectorAll('.stat-counter');
  if (!counters.length) return;

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const numEl = el.querySelector('.counter-num');
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      let start = 0;
      const duration = 1800;
      const startTime = performance.now();

      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(ease * target);
        numEl.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));
})();

// ── 5. YUKARIYA ÇIK BUTONU ──
(function() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ── 6. MODAL ──
(function() {
  const overlay = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('modalClose');
  const dismissBtn = document.getElementById('modalDismiss');
  if (!overlay) return;

  function openModal() { overlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeModal() { overlay.classList.remove('open'); document.body.style.overflow = ''; }

  // Sayfa yüklendikten 2.5sn sonra modal aç (ilk ziyarette)
  if (!sessionStorage.getItem('modalShown')) {
    setTimeout(() => {
      openModal();
      sessionStorage.setItem('modalShown', '1');
    }, 2500);
  }

  closeBtn?.addEventListener('click', closeModal);
  dismissBtn?.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

  // ESC tuşuyla kapat
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal(); });

  // Cursor hover için yeni elemanları ekle
  [closeBtn, dismissBtn].forEach(el => {
    el?.addEventListener('mouseenter', () => { document.querySelector('.cursor')?.classList.add('hover'); document.querySelector('.cursor-ring')?.classList.add('hover'); });
    el?.addEventListener('mouseleave', () => { document.querySelector('.cursor')?.classList.remove('hover'); document.querySelector('.cursor-ring')?.classList.remove('hover'); });
  });
})();
