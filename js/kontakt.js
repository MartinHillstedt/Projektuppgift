"use strict"

// Hämta element från DOM
const contactForm = document.querySelector("#kontaktformular");
const statusMessage = document.querySelector("#formular-status");
const nameInput = document.querySelector("#namn");
const emailInput = document.querySelector("#epost");
const phoneInput = document.querySelector("#telefon");
const subjectSelect = document.querySelector("#arende");
const messageInput = document.querySelector("#meddelande");


const fields = [nameInput, emailInput, phoneInput, subjectSelect, messageInput];


function showError(field, message) {
  
  const errorElement = document.querySelector("#" + field.id + "-fel");
  errorElement.textContent = message;
  field.setAttribute("aria-invalid", "true");
}


function clearError(field) {
  const errorElement = document.querySelector("#" + field.id + "-fel");
  errorElement.textContent = "";
  field.removeAttribute("aria-invalid");
}


function validateForm() {
  let isValid = true;
  let firstInvalidField = null;

  
  function markInvalid(field, message) {
    showError(field, message);
    isValid = false;
    if (firstInvalidField === null) {
      firstInvalidField = field;
    }
  }

  
  fields.forEach(function (field) {
    clearError(field);
  });

  
  if (nameInput.value.trim() === "") {
    markInvalid(nameInput, "Skriv ditt namn.");
  }

  
  const email = emailInput.value.trim();
  const atPosition = email.indexOf("@");
  if (email === "") {
    markInvalid(emailInput, "Skriv din e-postadress.");
  } else if (atPosition < 1 || email.indexOf(".", atPosition) === -1) {
    markInvalid(emailInput, "E-postadressen verkar inte vara korrekt, till exempel namn@exempel.se.");
  }

  
  const phone = phoneInput.value.trim();
  if (phone !== "" && !/^[0-9 +()-]{6,}$/.test(phone)) {
    markInvalid(phoneInput, "Telefonnumret får bara innehålla siffror, mellanslag och tecknen + ( ) -.");
  }

  
  if (subjectSelect.value === "") {
    markInvalid(subjectSelect, "Välj vad din förfrågan gäller.");
  }

  
  if (messageInput.value.trim().length < 10) {
    markInvalid(messageInput, "Skriv ett meddelande på minst 10 tecken.");
  }

  
  if (firstInvalidField !== null) {
    firstInvalidField.focus();
  }

  return isValid;
}


contactForm.addEventListener("submit", function (event) {
  
  event.preventDefault();
  statusMessage.textContent = "";

  if (validateForm()) {
    
    statusMessage.textContent = "Tack för ditt meddelande! Vi återkommer så snart vi kan.";
    contactForm.reset();
  }
});


fields.forEach(function (field) {
  field.addEventListener("input", function () {
    clearError(field);
  });
});
