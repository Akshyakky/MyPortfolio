// menu.js
document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menu-button");
  const closeMenuButton = document.getElementById("close-menu");
  const mobileMenu = document.getElementById("mobile-menu");
  const body = document.body;

  // Remove any existing event listeners
  const clearExistingListeners = () => {
    const newMenuButton = menuButton.cloneNode(true);
    const newCloseButton = closeMenuButton.cloneNode(true);
    menuButton.parentNode.replaceChild(newMenuButton, menuButton);
    closeMenuButton.parentNode.replaceChild(newCloseButton, closeMenuButton);
    return [newMenuButton, newCloseButton];
  };

  const [newMenuButton, newCloseButton] = clearExistingListeners();

  // Menu state
  let isMenuOpen = false;

  // Menu functions
  function openMenu() {
    isMenuOpen = true;
    mobileMenu.classList.remove("translate-x-full");
    body.style.overflow = "hidden";
    mobileMenu.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    isMenuOpen = false;
    mobileMenu.classList.add("translate-x-full");
    body.style.overflow = "";
    mobileMenu.setAttribute("aria-expanded", "false");
  }

  // Event Listeners
  newMenuButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    openMenu();
  });

  newCloseButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeMenu();
  });

  // Close menu when clicking links
  const menuLinks = document.querySelectorAll("#mobile-menu a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (isMenuOpen && !mobileMenu.contains(e.target) && !newMenuButton.contains(e.target)) {
      closeMenu();
    }
  });

  // Handle escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMenuOpen) {
      closeMenu();
    }
  });

  // Prevent scroll when menu is open
  mobileMenu.addEventListener(
    "touchmove",
    (e) => {
      if (isMenuOpen) {
        e.preventDefault();
      }
    },
    { passive: false }
  );

  // Reset body overflow when navigating away
  window.addEventListener("beforeunload", () => {
    body.style.overflow = "";
  });
});
