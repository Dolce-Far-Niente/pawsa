/* =============================================
   PAWSA – script.js
   All interactivity for the Pawsa website
   ============================================= */

   document.addEventListener('DOMContentLoaded', () => {

    // ===========================
    // 1. NAVBAR: scroll shadow + hamburger menu
    // ===========================
    const navbar = document.querySelector('.navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
  
    if (navbar) {
      window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
      });
    }
  
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        hamburger.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
      });
  
      // Close menu on link click
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('open');
          hamburger.textContent = '☰';
        });
      });
    }
  
    // ===========================
    // 2. SCROLL REVEAL ANIMATION
    // ===========================
    const revealTargets = document.querySelectorAll(
      '.feature-card, .testimonial-card, .color-card, .value-item, .story-text, .story-values, .faq-item, .info-item'
    );
  
    // Add reveal class
    revealTargets.forEach(el => el.classList.add('reveal'));
  
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger delay for grid items
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, (entry.target.dataset.delay || 0));
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
  
    // Stagger siblings
    const grids = ['.features-grid', '.testimonials-grid', '.colors-grid'];
    grids.forEach(selector => {
      const container = document.querySelector(selector);
      if (container) {
        [...container.children].forEach((child, i) => {
          child.dataset.delay = i * 120;
        });
      }
    });
  
    revealTargets.forEach(el => revealObserver.observe(el));
  
    // ===========================
    // 3. HERO IMAGE: load product image
    //    (Replace URL with your real product photo)
    // ===========================
    const heroImg = document.getElementById('heroImg');
    if (heroImg) {
      heroImg.onerror = () => {
        heroImg.style.display = 'none';
      };
    }
  
    // ===========================
    // 4. COLOR CARD: active state toggle + image switch
    // ===========================
    const colorCards = document.querySelectorAll('.color-card');
    colorCards.forEach(card => {
      card.addEventListener('click', () => {
        colorCards.forEach(c => {
          c.style.outline = 'none';
          c.classList.remove('active');
        });
        card.style.outline = '3px solid #7ecdc4';
        card.style.outlineOffset = '4px';
        card.classList.add('active');

        const imageSrc = card.dataset.image;
        if (heroImg && imageSrc) {
          heroImg.src = imageSrc;
          heroImg.alt = `${card.querySelector('h3')?.textContent || 'Pawsa'} product image`;
          heroImg.style.display = '';
        }
      });
    });
  
    // ===========================
    // 5. CONTACT FORM validation + fake submit
    // ===========================
    const submitBtn = document.getElementById('submitBtn');
    const formFeedback = document.getElementById('formFeedback');
  
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const subject = document.getElementById('subject')?.value;
        const message = document.getElementById('message')?.value.trim();
  
        // Clear previous feedback
        if (formFeedback) {
          formFeedback.className = 'form-feedback';
          formFeedback.textContent = '';
        }
  
        // Validate
        if (!name || !email || !subject || !message) {
          if (formFeedback) {
            formFeedback.className = 'form-feedback error';
            formFeedback.textContent = '⚠️ Fyll ut alle feltene før du sender.';
          }
          return;
        }
  
        if (!isValidEmail(email)) {
          if (formFeedback) {
            formFeedback.className = 'form-feedback error';
            formFeedback.textContent = '⚠️ Vennligst skriv inn en gyldig e-postadresse.';
          }
          return;
        }
  
        // Simulate sending (replace with real form handler or Shopify form)
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sender...';
  
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send melding 🐾';
          if (formFeedback) {
            formFeedback.className = 'form-feedback success';
            formFeedback.textContent = `🐾 Takk, ${name}! Vi svarer deg innen 24 timer.`;
          }
          // Clear form
          ['name', 'email', 'message'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
          });
          const sel = document.getElementById('subject');
          if (sel) sel.value = '';
        }, 1200);
      });
    }
  
    // ===========================
    // 6. SMOOTH ANCHOR SCROLL
    // ===========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const offset = 80; // navbar height
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  
    // ===========================
    // 7. ACTIVE NAV LINK (highlight current page)
    // ===========================
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-links a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'frontpage.html')) {
        link.classList.add('active');
      }
    });
  
    // ===========================
    // HELPERS
    // ===========================
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  
  });