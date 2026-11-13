const body = document.body;
const root = document.documentElement;
const menuBtn = document.getElementById('menuBtn');
const closeMenu = document.getElementById('closeMenu');
const menuOverlay = document.getElementById('menuOverlay');
const drawer = document.getElementById('mobileDrawer');
const themeToggle = document.getElementById('themeToggle');

function setMenu(open) {
  body.classList.toggle('menu-open', open);
  drawer.setAttribute('aria-hidden', String(!open));
  menuBtn.setAttribute('aria-expanded', String(open));
}

menuBtn.addEventListener('click', () => setMenu(true));
closeMenu.addEventListener('click', () => setMenu(false));
menuOverlay.addEventListener('click', () => setMenu(false));

document.querySelectorAll('.drawer-link, .drawer-talk').forEach(link => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') setMenu(false);
});

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') root.setAttribute('data-theme', 'dark');

themeToggle.addEventListener('click', () => {
  const dark = root.getAttribute('data-theme') === 'dark';
  root.setAttribute('data-theme', dark ? 'light' : 'dark');
  localStorage.setItem('portfolio-theme', dark ? 'light' : 'dark');
});

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    const wanted = button.dataset.filter;

    document.querySelectorAll('.project-card').forEach(card => {
      const categories = card.dataset.category.split(' ');
      card.classList.toggle('hidden', wanted !== 'all' && !categories.includes(wanted));
    });
  });
});

const sections = [...document.querySelectorAll('main section[id]')];
const desktopLinks = [...document.querySelectorAll('.desktop-nav .nav-link')];
const drawerLinks = [...document.querySelectorAll('.drawer-nav .drawer-link')];

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;

    desktopLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
    drawerLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
  });
}, { rootMargin: '-30% 0px -55% 0px', threshold: 0.01 });

sections.forEach(section => observer.observe(section));

document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const status = document.getElementById('formStatus');
  status.textContent = 'Thanks! The form UI is working. Connect it to Formspree, EmailJS, or your backend to send real messages.';
  e.target.reset();
});

const year = new Date().getFullYear();
document.getElementById('year').textContent = year;
document.getElementById('drawerYear').textContent = year;
