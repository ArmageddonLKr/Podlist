/* ==========================================================================
   PODLIST CULTURAL — Scripts
   ========================================================================== */

// Navbar — adiciona classe ao rolar
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Menu mobile
const ham   = document.getElementById('ham');
const mMenu = document.getElementById('mMenu');
const mClose = document.getElementById('mClose');

function openMenu() {
  mMenu.classList.add('open');
  ham.classList.add('is-open');
  mMenu.setAttribute('aria-hidden', 'false');
  ham.setAttribute('aria-expanded', 'true');
  ham.setAttribute('aria-label', 'Fechar menu');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mMenu.classList.remove('open');
  ham.classList.remove('is-open');
  mMenu.setAttribute('aria-hidden', 'true');
  ham.setAttribute('aria-expanded', 'false');
  ham.setAttribute('aria-label', 'Abrir menu');
  document.body.style.overflow = '';
}

ham.addEventListener('click', () => {
  mMenu.classList.contains('open') ? closeMenu() : openMenu();
});
ham.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); mMenu.classList.contains('open') ? closeMenu() : openMenu(); }
});
mClose.addEventListener('click', closeMenu);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mMenu.classList.contains('open')) closeMenu();
});

// Fallback JS para responsividade do navbar
// (cobre dispositivos onde media queries podem não disparar corretamente)
function checkNav() {
  const isMobile = window.innerWidth <= 1024;
  nav.classList.toggle('mobile-nav', isMobile);
  if (!isMobile && mMenu.classList.contains('open')) closeMenu();
}
checkNav();
window.addEventListener('resize', checkNav, { passive: true });

// Animações de entrada via IntersectionObserver
function animateCount(statEl) {
  const strong = statEl.querySelector('strong');
  if (!strong) return;
  const raw = strong.textContent.trim();
  const num = parseInt(raw.replace(/\D/g, ''), 10);
  if (!num) return;
  const prefix = raw.startsWith('+') ? '+' : '';
  const suffix = raw.replace(/^\+?\d+/, '');
  let start = null;
  const dur = 1600;
  function step(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    strong.textContent = prefix + Math.round(ease * num) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      if (entry.target.classList.contains('stat')) animateCount(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade, .fade-l, .fade-r').forEach(el => observer.observe(el));

// Spotlight em cards e feature items (radial gradient seguindo o mouse)
document.querySelectorAll('.card, .feature-item, .team-card').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100) + '%');
    el.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100) + '%');
  });
});

// Carrossel de fotos da equipe — autoplay, setas, dots e swipe
(function () {
  const carousel = document.getElementById('equipeCarousel');
  if (!carousel) return;

  const track    = document.getElementById('equipeTrack');
  const dotsWrap = document.getElementById('equipeDots');
  const prevBtn  = carousel.querySelector('.equipe-prev');
  const nextBtn  = carousel.querySelector('.equipe-next');
  const slides   = track.children;
  const total    = slides.length;
  const AUTOPLAY_MS = 5000;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let index = 0;
  let timer = null;

  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'equipe-dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', 'Foto ' + (i + 1));
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    dot.addEventListener('click', () => goTo(i, true));
    dotsWrap.appendChild(dot);
  }
  const dots = dotsWrap.children;

  function render() {
    carousel.style.setProperty('--pos', index);
    for (let i = 0; i < total; i++) {
      dots[i].classList.toggle('is-active', i === index);
      dots[i].setAttribute('aria-selected', i === index ? 'true' : 'false');
    }
  }

  function goTo(i, userAction) {
    index = (i + total) % total;
    render();
    if (userAction) restartAutoplay();
  }
  function next(userAction) { goTo(index + 1, userAction); }
  function prev(userAction) { goTo(index - 1, userAction); }

  function startAutoplay() {
    if (reduceMotion) return;
    stopAutoplay();
    timer = setInterval(() => next(false), AUTOPLAY_MS);
  }
  function stopAutoplay() { if (timer) { clearInterval(timer); timer = null; } }
  function restartAutoplay() { startAutoplay(); }

  prevBtn.addEventListener('click', () => prev(true));
  nextBtn.addEventListener('click', () => next(true));

  let touchStartX = null;
  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    stopAutoplay();
  }, { passive: true });
  track.addEventListener('touchend', e => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) {
      dx < 0 ? next(true) : prev(true);
    } else {
      restartAutoplay();
    }
    touchStartX = null;
  }, { passive: true });

  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  render();
  startAutoplay();
})();

// Feedback tátil (haptic) em botões primários em dispositivos móveis
if ('vibrate' in navigator) {
  document.querySelectorAll('.btn-pri, .nav-cta, .fab').forEach(btn => {
    btn.addEventListener('click', () => navigator.vibrate(8));
  });
}

// Indicador de status de rede
(function () {
  const banner = document.getElementById('net-banner');
  let hideTimer = null;

  function showBanner(msg, type, duration) {
    clearTimeout(hideTimer);
    banner.textContent = msg;
    banner.className = 'net-banner ' + type + ' show';
    if (duration) {
      hideTimer = setTimeout(() => banner.classList.remove('show'), duration);
    }
  }

  window.addEventListener('offline', () => {
    showBanner('Sem conexão com a internet', 'offline', 0);
  });

  window.addEventListener('online', () => {
    showBanner('Conexão restaurada', 'restored', 3000);
  });

  if (!navigator.onLine) {
    showBanner('Sem conexão com a internet', 'offline', 0);
  }
})();
