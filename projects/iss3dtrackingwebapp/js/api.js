const ISS_API_URL = 'https://api.wheretheiss.at/v1/satellites/25544';  // Positionsdaten der ISS
const CREW_API_URL = 'https://open-notify.org/astros.json'; // ISS-Crew-Daten (astronauten an Bord)

// Funktion zum Abrufen der ISS-Daten
async function getISSData() {
  try {
    // Abrufen der ISS-Positionsdaten
    const issResponse = await fetch(ISS_API_URL);
    const issData = await issResponse.json();

    // Abrufen der Crew-Daten
    const crewResponse = await fetch(CREW_API_URL);
    const crewData = await crewResponse.json();

    return {
      latitude: issData.latitude,           // Latitude der ISS
      longitude: issData.longitude,         // Longitude der ISS
      velocity: issData.velocity,           // Geschwindigkeit der ISS
      altitude: issData.altitude,           // Höhe der ISS
      crew: crewData.people,                // Crew an Bord der ISS
      orbit: 'Low Earth Orbit'              // Orbit der ISS (kann als statische Information angezeigt werden)
    };
  } catch (error) {
    console.error('Fehler beim Abrufen der ISS-Daten:', error);
  }
}

// Export der Funktion, damit sie in anderen Dateien verwendet werden kann
export { getISSData };
