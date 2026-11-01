"use strict";
//Mobilmeny - Hamburgervariant

//Hämta från DOM
const menuButton = document.querySelector("#menu-btn");
const mainNav = document.querySelector(".mainnav");

//Menyn växlar mellan öppen och stängd
menuButton.addEventListener("click", function () {
  const isOpen = mainNav.classList.toggle("open");
  //berättar för skärmläsaren om menyn är öppen
  menuButton.setAttribute("aria-expanded", isOpen);
});

