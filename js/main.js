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
