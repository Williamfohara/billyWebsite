// script.js — site-wide navigation helpers
// Attach to both index.html and projects.html with:
// <script src="script.js" defer></script>

(() => {
  // Wait for DOM
  document.addEventListener("DOMContentLoaded", () => {
    /* ───────── Smooth‑scroll for in‑page anchors ───────── */
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const hash = link.getAttribute("href");
        if (hash.length <= 1) return; // Skip plain '#'

        const target = document.querySelector(hash);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          setActive(link);
        }
      });
    });

    /* ───────── Active‑link highlighting on scroll ───────── */
    const navLinks = document.querySelectorAll('.sidebar nav a[href^="#"]');
    const sections = Array.from(document.querySelectorAll("section[id]"));

    if (sections.length && navLinks.length) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = `#${entry.target.id}`;
              navLinks.forEach((l) =>
                l.classList.toggle("active", l.getAttribute("href") === id)
              );
            }
          });
        },
        { rootMargin: "0px 0px -70% 0px", threshold: 0 }
      );
      sections.forEach((section) => observer.observe(section));
    }

    /* ───────── Active‑link highlighting for page links ───────── */
    document
      .querySelectorAll('.sidebar nav a:not([href^="#"])')
      .forEach((link) => {
        const href = link.getAttribute("href");
        if (href && location.pathname.endsWith(href)) {
          link.classList.add("active");
        }
      });

    function setActive(activeLink) {
      document
        .querySelectorAll(".sidebar nav a")
        .forEach((l) => l.classList.remove("active"));
      activeLink.classList.add("active");
    }
  });
})();
