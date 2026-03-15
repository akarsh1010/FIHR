document.addEventListener("DOMContentLoaded", function () {
  // Mobile navigation toggle
  const navToggle = document.querySelector(".mobile-nav-toggle");
  const primaryNav = document.querySelector(".primary-nav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      const expanded =
        this.getAttribute("aria-expanded") === "true" ? false : true;
      this.setAttribute("aria-expanded", expanded);
      primaryNav.classList.toggle("show");
    });

    // Close nav when clicking a link (for better UX)
    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.setAttribute("aria-expanded", "false");
        primaryNav.classList.remove("show");
      });
    });
  }

  // Booking modal
  const modal = document.getElementById("booking-modal");
  const openBtn = document.getElementById("booking-toggle");
  const closeBtn = modal.querySelector(".modal-close");
  const overlay = modal.querySelector(".modal-overlay");

  function openModal() {
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    // Set focus to modal container for accessibility
    modal.querySelector(".modal-container").focus();
    // Trap focus (simplified)
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    openBtn.focus();
  }

  if (openBtn) {
    openBtn.addEventListener("click", openModal);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  if (overlay) {
    overlay.addEventListener("click", closeModal);
  }

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });

  // Focus management inside modal (basic)
  const focusableElements = modal.querySelectorAll(
    'button, input, select, [href], [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  modal.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        // shift + tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        // tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  });

  // Lazy loading is already handled by native loading="lazy"
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
