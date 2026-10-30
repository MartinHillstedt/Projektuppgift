"use strict"

const figures = document.querySelectorAll(".gal figure");
const filterButtons = document.querySelectorAll(".flt button");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector("p");
const prevButton = document.querySelector("#lb-prev");
const nextButton = document.querySelector("#lb-next");
const closeButton = document.querySelector("#lb-close");


let shownFigures = [];
let currentIndex = 0;


function filterGallery(category) {
  figures.forEach(function (figure) {
    if (category === "alla" || figure.dataset.cat === category) {
      figure.hidden = false;
    } else {
      figure.hidden = true;
    }
  });
}


function showImage(index) {
  
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


filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    filterGallery(button.dataset.cat);

    
    filterButtons.forEach(function (other) {
      other.setAttribute("aria-pressed", other === button);
    });
  });
});


figures.forEach(function (figure) {
  figure.querySelector("a").addEventListener("click", function (event) {
    event.preventDefault();
    openLightbox(figure);
  });
});


prevButton.addEventListener("click", function () {
  showImage(currentIndex - 1);
});
nextButton.addEventListener("click", function () {
  showImage(currentIndex + 1);
});
closeButton.addEventListener("click", function () {
  lightbox.close();
});