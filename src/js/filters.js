import { getFavorites } from './storage.js';

/**
 * Filtert de lijst van personages op naam.
 * @param {Array} characters - De array met personage-objecten
 * @param {string} searchTerm - De zoekterm
 * @returns {Array} De gefilterde array met personages
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
 * Past meerdere dropdown-filters toe (ras, geslacht, affiliatie, favorieten).
 * @param {Array} characters - De array met personage-objecten
 * @param {Object} filters - Object met actieve filters {race: '', gender: '', affiliation: '', favoritesOnly: false}
 * @returns {Array} De gefilterde array met personages
 */
export const filterCharacters = (characters, filters) => {
  return characters.filter(char => {
    const match = (charValue, filterValue) => {
      if (!filterValue) return true;
      if (!charValue) return false;
      return charValue.toString().toLowerCase() === filterValue.toString().toLowerCase();
    };

    const matchRace = match(char.race, filters.race);
    const matchGender = match(char.gender, filters.gender);
    const matchAffiliation = match(char.affiliation, filters.affiliation);
    
    // Controleer favorieten
    const matchFavorites = !filters.favoritesOnly || getFavorites().includes(char.id.toString());
    
    // Combineer alle filters met EN logica (alle voorwaarden moeten waar zijn)
    return matchRace && matchGender && matchAffiliation && matchFavorites;
  });
};

/**
 * Sorteert personages op basis van het opgegeven sorteertype.
 * @param {Array} characters - De array met personage-objecten
 * @param {string} sortType - Het sorteertype ('name-asc', 'name-desc', 'ki-asc', 'ki-desc')
 * @returns {Array} De gesorteerde array met personages
 */
export const sortCharacters = (characters, sortType) => {
  // Maak een kopie om de oorspronkelijke array niet te wijzigen
  const sorted = [...characters];

  // Helper om een string zoals "60.000.000" om te zetten in een echt getal 60000000
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
