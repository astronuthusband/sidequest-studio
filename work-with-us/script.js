document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Consultation modal ---------- */
  var modal = document.getElementById('consult-modal');
  var openTriggers = document.querySelectorAll('[data-open-modal]');
  var closeTriggers = document.querySelectorAll('[data-close-modal]');
  var form = document.getElementById('consult-form');
  var successPanel = document.getElementById('consult-success');
  var lastFocusedElement = null;

  function openModal() {
    lastFocusedElement = document.activeElement;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    var firstField = modal.querySelector('input, select, button');
    if (firstField) firstField.focus();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  openTriggers.forEach(function (btn) {
    btn.addEventListener('click', openModal);
  });

  closeTriggers.forEach(function (btn) {
    btn.addEventListener('click', closeModal);
  });

  modal.addEventListener('click', function (event) {
    if (event.target === modal) closeModal();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  if (form) {
  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    var submitButton = form.querySelector('button[type="submit"]');
    var submitText = submitButton ? submitButton.querySelector('span:first-child') : null;

    if (submitButton) {
      submitButton.disabled = true;
    }

    if (submitText) {
      submitText.textContent = 'Sending...';
    }

    try {
      var formData = new FormData(form);

      var response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      var result = await response.json();

      if (result.success) {
        form.hidden = true;
        successPanel.hidden = false;
      } else {
        throw new Error(result.message || 'Form submission failed.');
      }

    } catch (error) {
      console.error('Form submission error:', error);

      alert('Something went wrong. Please try again or WhatsApp us directly.');

      if (submitButton) {
        submitButton.disabled = false;
      }

      if (submitText) {
        submitText.textContent = 'Request Free Strategy Call';
      }
    }
  });
}

  /* ---------- Smooth scroll for in-page anchor links ---------- */
  var anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      var targetId = link.getAttribute('href');
      if (targetId.length < 2) return;
      var target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ---------- Subtle scroll reveal ---------- */
  var revealTargets = document.querySelectorAll(
    '.service-card, .highlight-card, .pillar-card, .founder-card, .work-card, .process-card'
  );

  revealTargets.forEach(function (el) {
    el.classList.add('reveal');
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

});


const cursor = document.getElementById('customCursor');

if (cursor && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let x = 0, y = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });

    function loop() {
        x += (mouseX - x) * 0.5;
        y += (mouseY - y) * 0.5;

        cursor.style.left = `${x - 18}px`;
        cursor.style.top = `${y - 18}px`;

        requestAnimationFrame(loop);
    }

    loop();

    document.querySelectorAll('a, button, .nav-toggle').forEach((el) => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('is-hover');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('is-hover');
        });
    });
} else if (cursor) {
    cursor.style.display = 'none';
}