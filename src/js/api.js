const API_BASE_URL = 'https://dragonball-api.com/api';

/**
 * Haalt personages op van de Dragon Ball API.
 * Gebruikt async/await en bevat foutafhandeling.
 * @param {number} limit - Aantal op te halen personages (standaard 100)
 * @returns {Promise<Array>} Array met personage-objecten
 */
export const fetchCharacters = async (limit = 100) => {
  try {
    const response = await fetch(`${API_BASE_URL}/characters?limit=${limit}`);
    
    // Controleer of het antwoord succesvol is (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP fout! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.items;
    
  } catch (error) {
    // Vang laadfouten netjes op
    console.error('Fout bij het ophalen van personages:', error.message);
    return []; 
  }
};

/**
 * Haalt de volledige details van één personage op basis van ID (inclusief transformaties en planeet).
 * @param {number|string} id - De ID van het personage
 * @returns {Promise<Object>} Personage-object met volledige details
 */
export const fetchCharacterById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/characters/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP fout! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Fout bij het ophalen van personage ${id}:`, error.message);
    return null;
  }
};
