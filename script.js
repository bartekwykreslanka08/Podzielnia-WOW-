// === Menu mobilne ===
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.classList.toggle('active', open);
  burger.setAttribute('aria-expanded', open);
  document.body.classList.toggle('no-scroll', open);
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open'); burger.classList.remove('active');
  burger.setAttribute('aria-expanded', false);
  document.body.classList.remove('no-scroll');
}));

// === Cień nagłówka przy scrollu ===
const header = document.getElementById('header');
addEventListener('scroll', () => header?.classList.toggle('scrolled', scrollY > 10), { passive: true });

// === Animacje przy scrollowaniu (różne warianty) ===
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
}), { threshold: .1 });
document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

// === Rok w stopce ===
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// === Parallax hero ===
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  addEventListener('scroll', () => {
    if (scrollY > 600) return;
    heroBg.style.transform = `translate3d(0, ${scrollY * .25}px, 0)`;
  }, { passive: true });
}

// === Animowane liczniki ===
const counters = document.querySelectorAll('[data-count]');
const counterIO = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) {
    animateCount(e.target);
    counterIO.unobserve(e.target);
  }
}), { threshold: .4 });
counters.forEach(c => counterIO.observe(c));
function animateCount(el){
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();
  function tick(now){
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

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

// === Tilting kart (subtelny 3D) na hover ===
document.querySelectorAll('.cta-card, .media-card, .polaroid').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - .5;
    const y = (e.clientY - rect.top) / rect.height - .5;
    card.style.transform = `translateY(-10px) rotateX(${-y*6}deg) rotateY(${x*6}deg)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});
