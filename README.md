# Guldsmederna
 
En projektuppgift som jag genomfört i kursen Introduktion till webbutveckling med HTML, CSS och JavaScript på Webbutvecklingsprogrammet - TWEUG, Mittuniversitetet.
Det är en webbplats utvecklad till företaget Guldsmederna Nilsson och Jonsson AB.
Webbplatsen presenterar verksamheten, tjänsterna och hantverket, och gör det enkelt för kunder att ta kontakt.
 
Webbplatsen är byggd med HTML, CSS och JavaScript.
 
**Publicerad på:** guldsmederna.netlify.app
 
## Sidor
 
- **Hem** (`index.html`): presentation, erfarenhet, hantverk, intyg, galleriförhandsvisning och historia.
- **Tjänster** (`tjanster.html`): verksamhetens tjänster som kort med bild och text.
- **Galleri** (`galleri.html`): bilder på smycken och skisser, med kategorifilter och bildvisare.
- **Kontakta oss** (`kontakt.html`): kontaktuppgifter, kartlänk och kontaktformulär.
## Funktioner
 
- Responsiv layout för mobil och större skärmar.
- Mobilmeny som öppnas och stängs med JavaScript.
- Galleri med filter och bildvisare (föregående, nästa och stäng).
- Kontaktformulär som valideras med JavaScript, med tydliga felmeddelanden.
- Aktuella metallkurser (guld, silver, palladium och platina) från LBMA via API:et metals.dev, visade i sidfoten på startsidan. Kurserna sparas i `localStorage` i en timme.

 ## Köra lokalt
 
Öppna `index.html` i en webbläsare. Alternativt kan du använda tillägget Live Server i VS Code (högerklicka på `index.html` och välj Open with Live Server).
 
## Versionshantering
 
Projektet versionshanteras med Git och GitHub.
 
- `develop`: löpande utveckling.
- `main`: färdiga versioner som är redo att publiceras.
## Kända begränsningar
 
- Kontaktformuläret skickar ingen information vidare. Det visar bara en bekräftelse. För skarp drift behövs en e-posttjänst eller en serverdel.
- API-nyckeln för metallkurserna ligger i `js/kurser.js` och syns för alla som öppnar sidans kod. För skarp drift bör anropet gå via en serverfunktion som döljer nyckeln.
- Innehållet (texter och bilder) ändras direkt i HTML-filerna.
