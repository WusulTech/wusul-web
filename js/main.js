/* ================================================
  main.js — Wusul Scripts
   ================================================ */

"use strict";

/* Navbar shadow on scroll */
(function () {
  const nav = document.getElementById("mainNav");
  if (!nav) return;
  window.addEventListener(
    "scroll",
    function () {
      if (window.scrollY > 10) {
        nav.style.boxShadow = "0 2px 16px rgba(0,0,0,0.08)";
      } else {
        nav.style.boxShadow = "none";
      }
    },
    { passive: true },
  );
})();
/* Smooth scroll */
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener("click", function (e) {
    var target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    var navH = document.getElementById("mainNav").offsetHeight || 70;
    var top = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top: top, behavior: "smooth" });
  });
});

/* FAQ accordion */
(function () {
  var faqButtons = document.querySelectorAll('.faq-q');
  if (!faqButtons.length) return;

  faqButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var item = this.closest('.faq-item');
      var isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('open');
        }
      });

      if (isOpen) {
        item.classList.remove('open');
      } else {
        item.classList.add('open');
      }
    });
  });
})();
  // Start marquees after all resources (images) have loaded,
      // and set animation duration based on track width for smooth motion.
      window.addEventListener('load', function () {
        document.querySelectorAll('.ws-marquee__track').forEach(function (track) {
          // Set animation duration proportional to content width (px per second)
          var pxPerSec = 140; // increase to speed up
          var duration = Math.max(12, Math.round(track.scrollWidth / pxPerSec));
          track.style.animationDuration = duration + 's';
        });

        document.querySelectorAll('.ws-marquee').forEach(function (marquee) {
          marquee.classList.add('loaded');
        });
      });

/* Trust strip — count-up animation */
(function () {
  var nums = document.querySelectorAll(".ws-trust-strip__num[data-count]");
  if (!nums.length) return;

  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (isNaN(target)) return;

    var duration = 1400;
    var start = performance.now();

    function tick(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = "+" + Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animateCount(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.4 },
    );
    nums.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    nums.forEach(animateCount);
  }
})();