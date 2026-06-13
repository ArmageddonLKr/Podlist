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

// Animações de entrada via IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade, .fade-l, .fade-r').forEach(el => observer.observe(el));
