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

/**
 * Sorts characters based on the given sort type.
 * @param {Array} characters - The array of character objects
 * @param {string} sortType - The sorting type ('name-asc', 'name-desc', 'ki-asc', 'ki-desc')
 * @returns {Array} The sorted array of characters
 */
export const sortCharacters = (characters, sortType) => {
  // Create a copy to avoid mutating the original array
  const sorted = [...characters];

  // Helper to parse string "60.000.000" into a real number 60000000
  const parseKi = (kiString) => {
    if (!kiString) return 0;
    const cleanString = kiString.replace(/[.,]/g, '');
    const number = parseInt(cleanString, 10);
    return isNaN(number) ? 0 : number;
  };

  switch (sortType) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'ki-asc':
      return sorted.sort((a, b) => parseKi(a.ki) - parseKi(b.ki));
    case 'ki-desc':
      return sorted.sort((a, b) => parseKi(b.ki) - parseKi(a.ki));
    default:
      return sorted;
  }
};
