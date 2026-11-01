"use strict";
/*
 * Galleri: filtrera bilder efter kategori och visa bilder större i en bildvisare.
 */

//Hämta från DOM
const figures = document.querySelectorAll(".gal figure");
const filterButtons = document.querySelectorAll(".flt button");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector("p");
const prevButton = document.querySelector("#lb-prev");
const nextButton = document.querySelector("#lb-next");
const closeButton = document.querySelector("#lb-close");

//bilderna som syns just nu beroende på filter och vilken bild som visas
let shownFigures = [];
let currentIndex = 0;

/**
 * Visar bara bilderna som tillhör vald kategori.
 * @param {string} category - Kategorin, eller "alla" för att visa alla
 */
function filterGallery(category) {
  figures.forEach(function (figure) {
    if (category === "alla" || figure.dataset.cat === category) {
      figure.hidden = false;
    } else {
      figure.hidden = true;
    }
  });
}

/**
 * Visar en bild i bildvisaren.
 * @param {number} index - Plats i listan shownFigures
 */
 function showImage(index) {
  // Efter sista bilden kommer den första, och tvärtom
  if (index < 0) {
    index = shownFigures.length - 1;
  }
  if (index >= shownFigures.length) {
    index = 0;
  }
  currentIndex = index;

  const figure = shownFigures[index];
  const link = figure.querySelector("a");
  const image = figure.querySelector("img");

  lightboxImage.src = link.href;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = figure.querySelector("figcaption").textContent;
}

/**
 * Öppnar bildvisaren med en vald bild.
 * @param {HTMLElement} figure - Bilden (figure-elementet) som klickades
 */
function openLightbox(figure) {
  
  shownFigures = [];
  figures.forEach(function (item) {
    if (!item.hidden) {
      shownFigures.push(item);
    }
  });

  showImage(shownFigures.indexOf(figure));
  lightbox.showModal();
}

//Filterknappar 
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    filterGallery(button.dataset.cat);

    
    filterButtons.forEach(function (other) {
      other.setAttribute("aria-pressed", other === button);
    });
  });
});

//Öppnar bildvisaren istället för att gå till filen
figures.forEach(function (figure) {
  figure.querySelector("a").addEventListener("click", function (event) {
    event.preventDefault();
    openLightbox(figure);
  });
});

//Knapparna
prevButton.addEventListener("click", function () {
  showImage(currentIndex - 1);
});
nextButton.addEventListener("click", function () {
  showImage(currentIndex + 1);
});
closeButton.addEventListener("click", function () {
  lightbox.close();
});