/* THE REEM EDITION — vanilla JavaScript, no dependencies. */
const progress = document.querySelector('#progress-fill');
function updateProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0}%`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const revealItems = document.querySelectorAll('.gallery-heading, .memory-card, .gallery-endnote');
revealItems.forEach(item => item.classList.add('reveal'));
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('in-view'));
}

const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const closeLightboxButton = document.querySelector('#lightbox-close');
let previousFocus = null;
function openMemory(card) {
  previousFocus = document.activeElement;
  lightboxImage.src = card.dataset.image;
  lightboxImage.alt = card.querySelector('img').alt;
  document.querySelector('#lightbox-title').textContent = card.dataset.title;
  document.querySelector('#lightbox-note').textContent = card.dataset.note;
  document.querySelector('#lightbox-index').textContent = `A LITTLE PIECE OF REEM · ${card.dataset.title.toUpperCase()}`;
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  closeLightboxButton.focus();
}
function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
  if (previousFocus) previousFocus.focus();
}
document.querySelectorAll('.memory-card').forEach(card => card.addEventListener('click', () => openMemory(card)));
closeLightboxButton.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !lightbox.hidden) closeLightbox(); });

const toast = document.querySelector('#toast');
let toastTimeout;
function makeAWish() {
  toast.textContent = 'Wish made. The whole year is yours, Reem. ✳';
  toast.classList.add('show');
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove('show'), 3200);
  const colors = ['#b87a51', '#d6c39f', '#9aab91', '#f4f0e6', '#78856a'];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;
  for (let i = 0; i < 48; i++) {
    const fleck = document.createElement('span');
    const angle = (Math.PI * 2 * i) / 48;
    const distance = 55 + Math.random() * 145;
    fleck.style.cssText = `position:fixed;z-index:60;left:50%;top:50%;width:${4 + Math.random() * 7}px;height:${6 + Math.random() * 10}px;background:${colors[i % colors.length]};pointer-events:none;border-radius:${i % 4 === 0 ? '50%' : '1px'};`;
    document.body.appendChild(fleck);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - 50;
    fleck.animate([
      { transform: 'translate(-50%,-50%) scale(.25) rotate(0deg)', opacity: 1 },
      { transform: `translate(calc(-50% + ${x}px),calc(-50% + ${y}px)) scale(1) rotate(${120 + i * 19}deg)`, opacity: 0 }
    ], { duration: 850 + Math.random() * 650, easing: 'cubic-bezier(.12,.72,.24,1)' }).onfinish = () => fleck.remove();
  }
}
document.querySelector('#celebrate-top').addEventListener('click', makeAWish);
document.querySelector('#celebrate-bottom').addEventListener('click', makeAWish);
