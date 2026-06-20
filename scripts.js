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

const backTop = document.getElementById('backTop');
if (backTop) {
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
}
