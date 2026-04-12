/* ============================================
   Study Square Tuition Centre — script.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== Header Scroll Effect =====
  const header = document.getElementById('header');
  const backToTop = document.getElementById('back-to-top');

  const onScroll = () => {
    const scrollY = window.scrollY;
    header.classList.toggle('scrolled', scrollY > 50);
    backToTop.classList.toggle('visible', scrollY > 600);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ===== Mobile Navigation =====
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileClose = document.getElementById('mobile-close');

  function openMobileNav() {
    mobileNav.classList.add('active');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', openMobileNav);
  mobileClose.addEventListener('click', closeMobileNav);
  mobileOverlay.addEventListener('click', closeMobileNav);

  // Close mobile nav on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // ===== Smooth Scroll =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== Back to Top =====
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== Scroll Reveal Animation =====
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== Counter Animation =====
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.textContent.includes('+') ? '+' : '';
    const duration = 2000;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }

    requestAnimationFrame(step);
  }

  // ===== Contact Form Submission =====
  const contactForm = document.getElementById('contact-form');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('parent-name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const studentClass = document.getElementById('student-class').value;
    const message = document.getElementById('message').value.trim();

    if (!name || !phone || !studentClass) {
      showFormMessage('Please fill in all required fields.', 'error');
      return;
    }

    // Build WhatsApp message
    let waMsg = `Hi Study Square!\n\n`;
    waMsg += `*New Enquiry*\n`;
    waMsg += `👤 Name: ${name}\n`;
    waMsg += `📞 Phone: ${phone}\n`;
    waMsg += `📚 Class: ${studentClass}\n`;
    if (message) waMsg += `💬 Message: ${message}\n`;

    const waUrl = `https://wa.me/918550850010?text=${encodeURIComponent(waMsg)}`;

    showFormMessage('Redirecting to WhatsApp...', 'success');

    setTimeout(() => {
      window.open(waUrl, '_blank');
      contactForm.reset();
    }, 800);
  });

  function showFormMessage(text, type) {
    // Remove existing message
    const existing = contactForm.querySelector('.form-message');
    if (existing) existing.remove();

    const msg = document.createElement('div');
    msg.className = `form-message form-message-${type}`;
    msg.textContent = text;
    msg.style.cssText = `
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 16px;
      font-size: .88rem;
      font-weight: 500;
      animation: fade-in-up .3s ease forwards;
      ${type === 'success'
        ? 'background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0;'
        : 'background: #fef2f2; color: #991b1b; border: 1px solid #fecaca;'}
    `;
    contactForm.insertBefore(msg, contactForm.firstChild);

    setTimeout(() => msg.remove(), 4000);
  }

  // ===== Active Nav Link Highlight =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.style.color = '';
          link.style.background = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = '#E8561A';
            link.style.background = 'rgba(232, 86, 26, .06)';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ===== Parallax-like subtle movement on stat cards =====
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual && window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      heroVisual.style.transform = `translate(${x}px, ${y}px)`;
    }, { passive: true });
  }

});
