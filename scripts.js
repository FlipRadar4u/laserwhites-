// Burger menu
const burger = document.getElementById('navBurger');
const navLinks = document.querySelector('.nav-links');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(isOpen));
    burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Open menu');
    });
  });
  document.addEventListener('click', e => {
    if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Open menu');
    }
  });
}

// Scroll reveal for popular treatment cards
const ioCards = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const siblings = [...e.target.parentNode.querySelectorAll(':scope > *')];
      const idx = siblings.indexOf(e.target);
      setTimeout(() => e.target.classList.add('show'), idx * 60);
      ioCards.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.popular-card').forEach(el => ioCards.observe(el));

// Scroll reveal for testimonials
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const siblings = e.target.parentNode.querySelectorAll(':scope > *');
      const idx = [...siblings].indexOf(e.target);
      setTimeout(() => e.target.classList.add('show'), idx * 100);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.testi-card').forEach(el => io.observe(el));

// Lightbox
(function () {
  const imgs = [...document.querySelectorAll('.photo-hero img, .photo-item img')];
  if (!imgs.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lb-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Image viewer');
  overlay.dataset.count = imgs.length;

  const lbImg = document.createElement('img');
  lbImg.className = 'lb-img';
  lbImg.alt = '';

  const btnClose = document.createElement('button');
  btnClose.className = 'lb-close';
  btnClose.setAttribute('aria-label', 'Close');
  btnClose.innerHTML = '&times;';

  const btnPrev = document.createElement('button');
  btnPrev.className = 'lb-prev';
  btnPrev.setAttribute('aria-label', 'Previous image');
  btnPrev.innerHTML = '&#8592;';

  const btnNext = document.createElement('button');
  btnNext.className = 'lb-next';
  btnNext.setAttribute('aria-label', 'Next image');
  btnNext.innerHTML = '&#8594;';

  overlay.append(btnClose, btnPrev, lbImg, btnNext);
  document.body.appendChild(overlay);

  let idx = 0;

  function show(i) {
    idx = i;
    lbImg.src = imgs[i].src;
    lbImg.alt = imgs[i].alt;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function hide() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function step(dir) {
    idx = (idx + dir + imgs.length) % imgs.length;
    lbImg.src = imgs[idx].src;
    lbImg.alt = imgs[idx].alt;
  }

  imgs.forEach((el, i) => el.addEventListener('click', () => show(i)));
  btnClose.addEventListener('click', hide);
  btnPrev.addEventListener('click', () => step(-1));
  btnNext.addEventListener('click', () => step(1));
  overlay.addEventListener('click', e => { if (e.target === overlay) hide(); });
  document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') hide();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
})();

// Back to top
const backTop = document.getElementById('backTop');
if (backTop) {
  backTop.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
}
