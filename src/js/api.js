const API_BASE_URL = 'https://dragonball-api.com/api';

/**
 * Fetches characters from the Dragon Ball API.
 * Uses async/await and includes error handling.
 * @param {number} limit - Number of characters to fetch (default 100 to get all 58 characters)
 * @returns {Promise<Array>} Array of character objects
 */
export const fetchCharacters = async (limit = 100) => {
  try {
    // Start fetching data
    console.log('Loading characters from API...');
    
    const response = await fetch(`${API_BASE_URL}/characters?limit=${limit}`);
    
    // Check if the response is successful (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Log the data to fulfill the requirement
    console.log('Successfully fetched characters:', data.items);
    
    // The API wraps characters in an "items" array when paginated
    return data.items;
    
  } catch (error) {
    // Handle loading errors gracefully
    console.error('Failed to fetch characters:', error.message);
    return []; // Return an empty array so the rest of the app doesn't crash
  }
};
