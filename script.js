/* ============================================
   EDEN GROUP — Script principal
   Particules dorées, scroll animations, navigation
   ============================================ */

(function () {
  'use strict';

  /* -----------------------------------------
     1. GOLDEN PARTICLES — Hero background
     ----------------------------------------- */
  function initParticles() {
    var canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var particles = [];
    var particleCount = 60;
    var mouse = { x: null, y: null };

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    // Track mouse for subtle interaction
    canvas.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', function () {
      mouse.x = null;
      mouse.y = null;
    });

    function Particle() {
      this.reset();
    }

    Particle.prototype.reset = function () {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.opacitySpeed = (Math.random() - 0.5) * 0.008;
      // Gold tones
      var goldTones = [
        { r: 201, g: 168, b: 76 },
        { r: 212, g: 175, b: 55 },
        { r: 240, g: 192, b: 64 },
        { r: 255, g: 215, b: 0 },
        { r: 218, g: 190, b: 120 }
      ];
      this.color = goldTones[Math.floor(Math.random() * goldTones.length)];
    };

    Particle.prototype.update = function () {
      this.x += this.speedX;
      this.y += this.speedY;

      // Mouse repulsion
      if (mouse.x !== null && mouse.y !== null) {
        var dx = this.x - mouse.x;
        var dy = this.y - mouse.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          var force = (120 - dist) / 120 * 0.015;
          this.x += dx * force;
          this.y += dy * force;
        }
      }

      // Opacity pulsing
      this.opacity += this.opacitySpeed;
      if (this.opacity <= 0.05 || this.opacity >= 0.6) {
        this.opacitySpeed *= -1;
      }

      // Wrap around edges
      if (this.x < -10) this.x = canvas.width + 10;
      if (this.x > canvas.width + 10) this.x = -10;
      if (this.y < -10) this.y = canvas.height + 10;
      if (this.y > canvas.height + 10) this.y = -10;
    };

    Particle.prototype.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ',' + this.opacity + ')';
      ctx.fill();

      // Glow effect for larger particles
      if (this.size > 1.5) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ',' + (this.opacity * 0.1) + ')';
        ctx.fill();
      }
    };

    // Create particles
    for (var i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Draw connecting lines between nearby particles
    function drawLines() {
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            var lineOpacity = (1 - dist / 150) * 0.1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(201, 168, 76, ' + lineOpacity + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (var i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      drawLines();
      requestAnimationFrame(animate);
    }

    // Respect reduced motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      animate();
    } else {
      // Static render for reduced motion
      for (var i = 0; i < particles.length; i++) {
        particles[i].draw();
      }
    }
  }

  /* -----------------------------------------
     2. STICKY HEADER
     ----------------------------------------- */
  function initStickyHeader() {
    var header = document.getElementById('header');
    if (!header) return;

    var scrollThreshold = 80;

    function onScroll() {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* -----------------------------------------
     3. MOBILE MENU
     ----------------------------------------- */
  function initMobileMenu() {
    var toggle = document.getElementById('menuToggle');
    var nav = document.getElementById('navLinks');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    var links = nav.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () {
        toggle.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
  }

  /* -----------------------------------------
     4. ACTIVE NAV LINK ON SCROLL
     ----------------------------------------- */
  function initActiveNav() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    function updateActive() {
      var scrollPos = window.scrollY + 200;

      for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        var top = section.offsetTop;
        var height = section.offsetHeight;
        var id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          for (var j = 0; j < navLinks.length; j++) {
            navLinks[j].classList.remove('active');
            if (navLinks[j].getAttribute('href') === '#' + id) {
              navLinks[j].classList.add('active');
            }
          }
        }
      }
    }

    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
  }

  /* -----------------------------------------
     5. SCROLL REVEAL ANIMATIONS
     ----------------------------------------- */
  function initScrollReveal() {
    var reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!reveals.length) return;

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      for (var i = 0; i < reveals.length; i++) {
        reveals[i].classList.add('revealed');
      }
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('revealed');
          observer.unobserve(entries[i].target);
        }
      }
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    for (var i = 0; i < reveals.length; i++) {
      observer.observe(reveals[i]);
    }
  }

  /* -----------------------------------------
     6. SMOOTH SCROLL for anchor links
     ----------------------------------------- */
  function initSmoothScroll() {
    var anchors = document.querySelectorAll('a[href^="#"]');

    for (var i = 0; i < anchors.length; i++) {
      anchors[i].addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;

        var target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        var headerHeight = document.getElementById('header').offsetHeight;
        var targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      });
    }
  }

  /* -----------------------------------------
     7. CONTACT FORM (basic validation + UX)
     ----------------------------------------- */
  function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var btn = form.querySelector('.btn');
      var originalText = btn.innerHTML;

      // Show sending state
      btn.innerHTML = 'Envoi en cours...';
      btn.style.opacity = '0.7';
      btn.style.pointerEvents = 'none';

      // Simulate send (replace with real endpoint)
      setTimeout(function () {
        btn.innerHTML = 'Message envoyé ✓';
        btn.style.opacity = '1';
        btn.style.background = 'linear-gradient(135deg, #25D366, #128C7E)';

        form.reset();

        setTimeout(function () {
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.style.pointerEvents = '';
        }, 3000);
      }, 1500);
    });
  }

  /* -----------------------------------------
     8. COUNTER ANIMATION (stats)
     ----------------------------------------- */
  function initCounters() {
    var counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;

    var observed = false;

    var observer = new IntersectionObserver(function (entries) {
      if (observed) return;

      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          observed = true;
          animateCounters();
          observer.disconnect();
          break;
        }
      }
    }, { threshold: 0.5 });

    for (var i = 0; i < counters.length; i++) {
      observer.observe(counters[i]);
    }

    function animateCounters() {
      for (var i = 0; i < counters.length; i++) {
        var el = counters[i];
        var text = el.textContent.trim();
        var match = text.match(/^(\d+)/);

        if (match) {
          var target = parseInt(match[1], 10);
          var suffix = text.replace(match[1], '');
          animateNumber(el, target, suffix);
        }
      }
    }

    function animateNumber(el, target, suffix) {
      var duration = 2000;
      var start = 0;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        // Ease out
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.floor(eased * target);

        el.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target + suffix;
        }
      }

      requestAnimationFrame(step);
    }
  }

  /* -----------------------------------------
     INIT — Launch everything on DOM ready
     ----------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initParticles();
    initStickyHeader();
    initMobileMenu();
    initActiveNav();
    initScrollReveal();
    initSmoothScroll();
    initContactForm();
    initCounters();
  });

})();
