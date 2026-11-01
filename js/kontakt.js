"use strict";

//Hämta från DOM
const contactForm = document.querySelector("#kontaktformular");
const statusMessage = document.querySelector("#formular-status");
const nameInput = document.querySelector("#namn");
const emailInput = document.querySelector("#epost");
const phoneInput = document.querySelector("#telefon");
const subjectSelect = document.querySelector("#arende");
const messageInput = document.querySelector("#meddelande");

//Alla fält i en lista så man kan loopa dom
const fields = [nameInput, emailInput, phoneInput, subjectSelect, messageInput];

/**
 * Visar ett felmeddelande under ett fält.
 * @param {HTMLElement} field - Fältet som är fel ifyllt
 * @param {string} message - Meddelandet som ska visas
 */
function showError(field, message) {
  
  const errorElement = document.querySelector("#" + field.id + "-fel");
  errorElement.textContent = message;
  field.setAttribute("aria-invalid", "true");
}

/**
 * Tar bort felmeddelandet för ett fält.
 * @param {HTMLElement} field - Fältet vars felmeddelande ska tas bort
 */
function clearError(field) {
  const errorElement = document.querySelector("#" + field.id + "-fel");
  errorElement.textContent = "";
  field.removeAttribute("aria-invalid");
}

/**
 * Kontrollerar alla fält i formuläret.
 * @returns {boolean} true om allt är korrekt ifyllt, annars false
 */
function validateForm() {
  let isValid = true;
  let firstInvalidField = null;

  // Sparar att ett fält är fel och visar meddelandet
  function markInvalid(field, message) {
    showError(field, message);
    isValid = false;
    if (firstInvalidField === null) {
      firstInvalidField = field;
    }
  }

  // Ta bort gamla felmeddelanden
  fields.forEach(function (field) {
    clearError(field);
  });

  //Kontrollerar att allt är ifyllt enligt regler för varje fält annars felmeddelande.
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

//Stoppar sidan från att laddsa om när formuläret skickas
contactForm.addEventListener("submit", function (event) {
  
  event.preventDefault();
  statusMessage.textContent = "";

  if (validateForm()) {
    
    statusMessage.textContent = "Tack för ditt meddelande! Vi återkommer så snart vi kan.";
    contactForm.reset();
  }
});

//Felmeddelandet tas bort när man börjar skriva i fältet
fields.forEach(function (field) {
  field.addEventListener("input", function () {
    clearError(field);
  });
});
