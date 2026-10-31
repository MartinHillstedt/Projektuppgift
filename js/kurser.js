"use strict";
/*
 * Metallkurser från LBMA (via metals.dev) som visas i sidfoten på startsidan.
 * Kurserna sparas i localStorage i en timme så att API:t inte anropas i onödan.
 */


const API_URL =
  "https://api.metals.dev/v1/metal/authority?api_key=R0CU5YEZLBHFNAESPK6V601ESPK6V&authority=lbma&currency=SEK&unit=kg";
const CACHE_KEY = "metallkurser";
const MAX_AGE_MINUTES = 60; // så länge sparade kurser används

// Hämta element från DOM
const goldElement = document.querySelector("#kurs-guld");
const silverElement = document.querySelector("#kurs-silver");
const palladiumElement = document.querySelector("#kurs-palladium");
const platinumElement = document.querySelector("#kurs-platina");
const statusElement = document.querySelector("#kurser-status");

/**
 * Hämtar de senaste LBMA-kurserna från API:t.
 * @returns {Promise<Object>} Svaret från API:t, med kurserna i egenskapen "rates"
 */
async function fetchMetalRates() {
  const response = await fetch(API_URL, {
    headers: { Accept: "application/json" },
  });

  
  if (!response.ok) {
    throw new Error("Servern svarade med status " + response.status);
  }

  const data = await response.json();

  if (data.status !== "success") {
    throw new Error("API:t svarade inte med status success");
  }

  return data;
}

/**
 * Väljer senaste pris för en metall. Guld, silver platina och palladium.
 * @param {Object} rates - Objektet med alla kurser
 * @param {string} baseName - Metallens namn i API:t, t.ex. "lbma_gold"
 * @returns {number} Priset i kronor per kilo
 */
function latestRate(rates, baseName) {
  const pmPrice = rates[baseName + "_pm"];
  if (pmPrice !== undefined && pmPrice !== null) {
    return pmPrice;
  }
  return rates[baseName + "_am"];
}

/**
 * Gör om ett pris per kilo till text i kronor per gram, t.ex. "1 313,97 kr/g".
 * @param {number} pricePerKg - Priset i kronor per kilo
 * @returns {string} Priset som text
 */
function formatPrice(pricePerKg) {
  const pricePerGram = pricePerKg / 1000;
  return (
    pricePerGram.toLocaleString("sv-SE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " kr/g"
  );
}


