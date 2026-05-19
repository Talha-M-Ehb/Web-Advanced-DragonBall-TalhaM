/**
 * Filters the list of characters by name.
 * @param {Array} characters - The array of character objects
 * @param {string} searchTerm - The term to search for
 * @returns {Array} The filtered array of characters
 */
export const searchCharacters = (characters, searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') {
    return characters;
  }
  
  const lowerCaseTerm = searchTerm.toLowerCase().trim();
  return characters.filter(char => 
    char.name.toLowerCase().includes(lowerCaseTerm)
  );
};

/**
 * Applies multiple dropdown filters (race, gender, affiliation).
 * @param {Array} characters - The array of character objects
 * @param {Object} filters - Object containing active filters {race: '', gender: '', affiliation: ''}
 * @returns {Array} The filtered array of characters
 */
export const filterCharacters = (characters, filters) => {
  return characters.filter(char => {
    // Helper function for safe, case-insensitive comparison
    const match = (charValue, filterValue) => {
      if (!filterValue) return true; // if filter is not active, it's a match
      if (!charValue) return false; // if character doesn't have this property, it fails
      return charValue.toString().toLowerCase() === filterValue.toString().toLowerCase();
    };

    const matchRace = match(char.race, filters.race);
    const matchGender = match(char.gender, filters.gender);
    const matchAffiliation = match(char.affiliation, filters.affiliation);
    
    // Combine all filters using AND logic (all conditions must be true)
    return matchRace && matchGender && matchAffiliation;
  });
};
