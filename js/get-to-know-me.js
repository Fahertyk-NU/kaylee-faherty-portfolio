/**
 * get-to-know-me.js
 * Portfolio — Get to Know Me page interactions
 * type="module"
 */

/* ── Scroll-reveal for Q&A items ── */
function initScrollReveal() {
  const items = document.querySelectorAll(".qa-item");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // stagger each item slightly
          const delay = Array.from(items).indexOf(entry.target) * 80;
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  items.forEach((item) => observer.observe(item));
}

/* ── Q&A accordion toggle ── */
function initAccordion() {
  const questions = document.querySelectorAll(".qa-question");

  questions.forEach((question) => {
    question.addEventListener("click", () => {
      const item = question.closest(".qa-item");
      const isOpen = item.classList.contains("open");

      // close all
      document
        .querySelectorAll(".qa-item.open")
        .forEach((el) => el.classList.remove("open"));

      // open clicked (unless it was already open)
      if (!isOpen) {
        item.classList.add("open");
      }
    });

    // keyboard accessibility
    question.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        question.click();
      }
    });
  });
}

/* ── Scroll-to-top button ── */
function initScrollTop() {
  const btn = document.querySelector(".scroll-top-btn");
  if (!btn) return;

  const toggleVisibility = () => {
    if (window.scrollY > 400) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  };

  window.addEventListener("scroll", toggleVisibility, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ── Active nav link on scroll ── */
function initActiveNav() {
  const sections = document.querySelectorAll("[data-section]");
  const navLinks = document.querySelectorAll(".site-nav .nav-link[href^='#']");

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.dataset.section;
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${id}`,
            );
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" },
  );

  sections.forEach((section) => observer.observe(section));
}

/* ── Open first Q&A item by default ── */
function openFirstItem() {
  const first = document.querySelector(".qa-item");
  if (first) first.classList.add("open");
}

/* ── Init ── */
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  initScrollReveal();
  initAccordion();
  initScrollTop();
  initActiveNav();
  openFirstItem();
});
