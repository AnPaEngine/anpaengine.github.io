const ISS_API_URL = 'https://api.wheretheiss.at/v1/satellites/25544';

// Funktion zum Abrufen der ISS-Daten
async function getISSData() {
  try {
    const response = await fetch(ISS_API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fehler beim Abrufen der ISS-Daten:', error);
  }
}

// Export der Funktion, damit sie in anderen Dateien verwendet werden kann
export { getISSData };
