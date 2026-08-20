// Menu mobilne
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

// Cień nagłówka przy scrollu
const header = document.getElementById('header');
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 10), { passive: true });

// Animacje przy scrollowaniu
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

// Rok w stopce
document.getElementById('year').textContent = new Date().getFullYear();

// Kopiowanie numeru konta
const copyBtn = document.getElementById('copyAccount');
if (copyBtn) copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(copyBtn.dataset.copy);
    copyBtn.textContent = 'Skopiowano! ✓';
    setTimeout(() => copyBtn.textContent = 'Kopiuj numer konta', 2000);
  } catch (e) {}
});
