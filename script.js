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
  mMenu.setAttribute('aria-hidden', 'false');
  ham.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mMenu.classList.remove('open');
  mMenu.setAttribute('aria-hidden', 'true');
  ham.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

ham.addEventListener('click', openMenu);
ham.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openMenu(); }
});
mClose.addEventListener('click', closeMenu);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mMenu.classList.contains('open')) closeMenu();
});

// Fecha o menu ao redimensionar para desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 980 && mMenu.classList.contains('open')) closeMenu();
}, { passive: true });

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
