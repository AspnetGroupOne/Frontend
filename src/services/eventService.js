const API_URL = 'https://eventbookingsystem20250526120605-azd2dcckf0guhzde.swedencentral-01.azurewebsites.net/api/events';
/*const API_URL = 'https://localhost:7180/api/events';*/
export const getEvents = async () => {
  
  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Fel vid hämtning av event: ${res.status} ${res.statusText}`, errorText);
      throw new Error(`Fel vid hämtning av event: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Ett oväntat fel inträffade i getEvents:", error);
    throw error;
  }
};

export const createEvent = async (eventForm) => {
  try {
  const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventForm),
    });

    if (!res.ok) {
      let errorMessage = `HTTP ${res.status} - ${res.statusText}`;
      try {
        const errorBody = await res.text();
        errorMessage += ` Serverns svar: ${errorBody}`;
      } catch (innerErr) {
        errorMessage += ' Kunde inte läsa felmeddelande från servern.';
      }

      console.error('Fel vid skapande av event:', errorMessage);
      throw new Error(errorMessage);
    }

    return await res.text(); 
  } catch (error) {
    console.error('Något gick fel i createEvent:', error);
    throw error;
  }
};
