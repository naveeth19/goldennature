const phoneNumber = '+910000000000'; // Update with real phone number
const whatsappNumber = '+910000000000'; // Update with real WhatsApp number

const initHeroSwiper = () => {
  return new Swiper('.hero-slider', {
    loop: true,
    autoplay: { delay: 4000, disableOnInteraction: false },
    speed: 900,
    effect: 'fade',
    fadeEffect: { crossFade: true }
  });
};

const cycleTaglines = () => {
  const items = document.querySelectorAll('#taglineList li');
  if (!items.length) return;
  let index = 0;
  setInterval(() => {
    items[index].classList.remove('active');
    index = (index + 1) % items.length;
    items[index].classList.add('active');
  }, 3200);
};

const smoothScroll = () => {
  document.querySelectorAll('.bottom-nav .nav-link, .btn-cta').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('href');
      if (target && target.startsWith('#')) {
        e.preventDefault();
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
};

const highlightNavOnScroll = () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.bottom-nav .nav-link');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => observer.observe(section));
};

const initLightbox = () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImage');
  const closeBtn = document.querySelector('.lightbox-close');

  document.querySelectorAll('[data-lightbox]').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
    });
  });

  const close = () => lightbox.classList.remove('active');
  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
};

const initIntersectionAnimations = () => {
  const animated = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  animated.forEach(el => observer.observe(el));
};

const initContactLinks = () => {
  const whatsappBtn = document.getElementById('whatsappBtn');
  const callBtn = document.getElementById('callBtn');

  if (whatsappBtn) {
    const message = encodeURIComponent('Hi, I would like to book Golden Nature Homestay. Please share availability.');
    whatsappBtn.href = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${message}`;
  }
  if (callBtn) {
    callBtn.href = `tel:${phoneNumber.replace(/\D/g, '')}`;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initHeroSwiper();
  cycleTaglines();
  smoothScroll();
  highlightNavOnScroll();
  initLightbox();
  initIntersectionAnimations();
  initContactLinks();
});

