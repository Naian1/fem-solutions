const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.main-nav');
const menuLinks = document.querySelectorAll('.main-nav a');
const year = document.querySelector('[data-year]');

const updateHeader = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 24);
};

const closeMenu = () => {
  menuButton?.setAttribute('aria-expanded', 'false');
  menu?.classList.remove('is-open');
  document.body.classList.remove('menu-open');
};

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menu?.classList.toggle('is-open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

menuLinks.forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('scroll', updateHeader, { passive: true });
window.addEventListener('resize', () => {
  if (window.innerWidth > 820) closeMenu();
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
if (year) year.textContent = String(new Date().getFullYear());
updateHeader();
