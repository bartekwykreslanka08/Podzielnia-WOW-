// === Menu mobilne ===
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.classList.toggle('active', open);
  burger.setAttribute('aria-expanded', open);
  document.body.classList.toggle('no-scroll', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open'); burger.classList.remove('active');
  burger.setAttribute('aria-expanded', false);
  document.body.classList.remove('no-scroll');
}));

// === Cień nagłówka przy scrollu ===
const header = document.getElementById('header');
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 10), { passive: true });

// === Animacje przy scrollowaniu ===
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

// === Rok w stopce ===
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// === Tryb ciemny 🌙 ===
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const saved = localStorage.getItem('theme');
const prefersDark = matchMedia('(prefers-color-scheme:dark)').matches;
const initial = saved || (prefersDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', initial);
updateIcon(initial);
themeToggle?.addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateIcon(next);
});
function updateIcon(t){ if (!themeIcon) return; themeIcon.textContent = t === 'dark' ? '☀️' : '🌙'; }

// === Galeria / Lightbox ===
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');
const lbClose = document.getElementById('lbClose');
let currentIdx = 0;
const images = Array.from(galleryItems).map(it => it.querySelector('img').src);

galleryItems.forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
});
function openLightbox(i){
  currentIdx = i;
  lbImg.src = images[i];
  lightbox.classList.add('open');
  document.body.classList.add('no-scroll');
}
function closeLightbox(){
  lightbox.classList.remove('open');
  document.body.classList.remove('no-scroll');
}
function prevImg(){ currentIdx = (currentIdx - 1 + images.length) % images.length; lbImg.src = images[currentIdx]; }
function nextImg(){ currentIdx = (currentIdx + 1) % images.length; lbImg.src = images[currentIdx]; }
lbClose?.addEventListener('click', closeLightbox);
lbPrev?.addEventListener('click', prevImg);
lbNext?.addEventListener('click', nextImg);
lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (!lightbox?.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevImg();
  if (e.key === 'ArrowRight') nextImg();
});

// === Zakładki regulaminu ===
const lawTabs = document.querySelectorAll('.law-tab');
const lawPanels = document.querySelectorAll('.law-panel');
lawTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    lawTabs.forEach(t => t.classList.toggle('active', t === tab));
    lawPanels.forEach(p => p.classList.toggle('active', p.id === target));
  });
});
