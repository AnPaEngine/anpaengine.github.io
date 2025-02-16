const ISS_API_URL = 'https://api.wheretheiss.at/v1/satellites/25544';  // Positionsdaten
const CREW_API_URL = 'https://api.le-systeme-solaire.net/rest/astronauts'; // Astronauten an Bord
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=location&appid=YOUR_API_KEY'; // Beispiel für Wetter, setze hier deine API ein

// Funktion zum Abrufen der ISS-Daten
async function getISSData() {
  try {
    const issResponse = await fetch(ISS_API_URL);
    const issData = await issResponse.json();

    // Crew-Daten abrufen
    const crewResponse = await fetch(CREW_API_URL);
    const crewData = await crewResponse.json();

    // Wetterdaten abrufen (z.B. für den Standort der ISS)
    const weatherResponse = await fetch(`${WEATHER_API_URL}&lat=${issData.latitude}&lon=${issData.longitude}`);
    const weatherData = await weatherResponse.json();

    return {
      latitude: issData.latitude,
      longitude: issData.longitude,
      velocity: issData.velocity,
      altitude: issData.altitude,
      crew: crewData.astronauts, // Crew-Daten
      weather: weatherData.weather[0].description, // Wetterbeschreibung
      orbit: 'Low Earth Orbit', // Orbit der ISS, dies müsste aus einer separaten Quelle kommen
    };
  } catch (error) {
    console.error('Fehler beim Abrufen der ISS-Daten:', error);
  }
}

// Export der Funktion, damit sie in anderen Dateien verwendet werden kann
export { getISSData };
