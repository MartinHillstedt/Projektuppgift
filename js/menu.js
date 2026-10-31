"use strict"

const menuButton = document.querySelector("#menu-btn");
const mainNav = document.querySelector("#huvudmeny");

menuButton.addEventListener("click", function () {
  mainNav.classList.toggle("open");
  const isOpen = mainNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen);
});

