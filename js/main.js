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
  var faqButtons = document.querySelectorAll(".faq-q");
  if (!faqButtons.length) return;

  faqButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var item = this.closest(".faq-item");
      var isOpen = item.classList.contains("open");

      document.querySelectorAll(".faq-item.open").forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove("open");
        }
      });

      if (isOpen) {
        item.classList.remove("open");
      } else {
        item.classList.add("open");
      }
    });
  });
})();
/* ================================================
   SCROLL TO TOP BUTTON
   ================================================ */
(function () {
  // إنشاء زر العودة للأعلى إذا لم يكن موجوداً
  let scrollBtn = document.querySelector(".ws-scroll-top");
  if (!scrollBtn) {
    scrollBtn = document.createElement("button");
    scrollBtn.className = "ws-scroll-top";
    scrollBtn.setAttribute("aria-label", "Scroll to top");
    scrollBtn.innerHTML = `<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>`;
    document.body.appendChild(scrollBtn);
  }

  function toggleScrollTop() {
    if (window.scrollY > 400) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  }

  window.addEventListener("scroll", toggleScrollTop);
  toggleScrollTop();

  scrollBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
