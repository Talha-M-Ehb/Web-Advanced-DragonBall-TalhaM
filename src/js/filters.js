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
