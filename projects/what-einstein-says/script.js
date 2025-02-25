let currentLanguage = 'de'; // Standardmäßig Deutsch

// Sprachdaten laden
let languageData = {};
fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    languageData = data.languages;

    // Standardtexte setzen
    setLanguage(currentLanguage);
  })
  .catch(error => console.error('Fehler beim Laden der JSON:', error));

// Funktion, um Sprache zu ändern
function setLanguage(language) {
  currentLanguage = language;

  // Text in der Sprechblase setzen
  const speechText = document.getElementById('speechText');
  speechText.textContent = languageData[language].greeting;

  // Button-Text aktualisieren
  const tellMeButton = document.getElementById('tellMeButton');
  tellMeButton.textContent = languageData[language].buttonText;
}

// Zitat generieren
document.getElementById('tellMeButton').addEventListener('click', () => {
  const quotes = languageData[currentLanguage].quotes;
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  // Zitat in der Sprechblase anzeigen
  document.getElementById('speechText').textContent = randomQuote;
});

// Sprachumschalter
document.getElementById('languageSelector').addEventListener('change', (event) => {
  setLanguage(event.target.value);
});
