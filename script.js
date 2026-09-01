// ============================================
// Sidequest Studio — Interactions
// ============================================

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Mobile menu toggle ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

 if (navToggle && mobileMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      // Close menu first
      mobileMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");

      // Wait for the menu to close, then scroll
      setTimeout(() => {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 320);
    });
  });
}

  /* ---------- Services list scroll highlight ----------
     As the user scrolls, whichever service row is nearest the
     vertical center of the viewport gets the white "highlight"
     treatment; every other row stays dark. Works scrolling both
     up and down.
  ---------------------------------------------------------- */
  const serviceRows = document.querySelectorAll(".service-row");

  if (serviceRows.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-active", entry.isIntersecting);
        });
      },
      {
        root: null,
        // Only counts a row as "active" while it crosses a thin band
        // through the middle of the viewport.
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    serviceRows.forEach((row) => observer.observe(row));
  }

  /* ---------- Image upload placeholders ----------
     Lets you click any placeholder (founder photos or artwork
     mock ups) and preview a local image immediately. Swap the
     placeholder divs for real <img> tags once you have final
     assets from Figma.
  ---------------------------------------------------------- */
  const uploadInputs = document.querySelectorAll(".image-upload-input");

  uploadInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const wrapper = input.closest(".image-placeholder, .artwork-placeholder");
      if (!wrapper) return;

      const reader = new FileReader();
      reader.onload = (ev) => {
        let img = wrapper.querySelector("img.uploaded-preview");
        if (!img) {
          img = document.createElement("img");
          img.className = "uploaded-preview";
          img.alt = input.getAttribute("aria-label") || "Uploaded image";
          wrapper.appendChild(img);
        }
        img.src = ev.target.result;
        wrapper.classList.add("has-image");
      };
      reader.readAsDataURL(file);
    });
  });

});
