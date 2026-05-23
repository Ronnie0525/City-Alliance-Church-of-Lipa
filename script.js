// Theme toggle with localStorage persistence
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

const savedTheme = localStorage.getItem('cac-theme');
if (savedTheme !== 'light') root.setAttribute('data-theme', 'dark');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
      localStorage.setItem('cac-theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('cac-theme', 'dark');
    }
  });
}

// Ministry dropdown
const dropdowns = document.querySelectorAll('.nav-dropdown');
dropdowns.forEach((dd) => {
  const toggle = dd.querySelector('.dropdown-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dd.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
});
document.addEventListener('click', (e) => {
  dropdowns.forEach((dd) => {
    if (!dd.contains(e.target)) {
      dd.classList.remove('open');
      const toggle = dd.querySelector('.dropdown-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  });
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    dropdowns.forEach((dd) => {
      dd.classList.remove('open');
      const toggle = dd.querySelector('.dropdown-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  }
});

// Mobile menu
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

function openMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.add('open');
  if (mobileMenuOverlay) mobileMenuOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'true');
}
function closeMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.remove('open');
  if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('open');
  document.body.style.overflow = '';
  if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'false');
}
if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openMobileMenu);
if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMobileMenu);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
    closeMobileMenu();
  }
});

// Mark current page in mobile menu
const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
document.querySelectorAll('.mobile-link, .mobile-sublink').forEach((link) => {
  const linkHref = (link.getAttribute('href') || '').toLowerCase();
  if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
    link.classList.add('active');
  }
});

// Scroll-triggered fade animations
if ('IntersectionObserver' in window
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('main > section').forEach((el) => {
    // Skip the hero (it has its own entrance animation)
    if (el.classList.contains('hero')) return;
    el.classList.add('fade-up');
    fadeObserver.observe(el);
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
