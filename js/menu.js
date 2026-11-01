"use strict"

const menuButton = document.querySelector("#menu-btn");
const mainNav = document.querySelector(".mainnav");

menuButton.addEventListener("click", function () {
  const isOpen = mainNav.classList.toggle("open");
  
  menuButton.setAttribute("aria-expanded", isOpen);
});

