document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMenu = document.getElementById("close-menu");

  function toggleMenu() {
    mobileMenu.classList.toggle("translate-x-full");
  }

  menuButton?.addEventListener("click", toggleMenu);
  closeMenu?.addEventListener("click", toggleMenu);

  // Close menu when clicking on a link
  document.querySelectorAll("#mobile-menu a").forEach((link) => {
    link.addEventListener("click", toggleMenu);
  });
});
