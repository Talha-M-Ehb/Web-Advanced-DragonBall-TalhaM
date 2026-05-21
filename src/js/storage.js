/**
 * Haalt de opgeslagen favorieten op uit localStorage.
 * @returns {Array<string>} Array met personage-ID's
 */
export const getFavorites = () => {
  const favs = localStorage.getItem('dragonDexFavorites');
  return favs ? JSON.parse(favs) : [];
};

/**
 * Controleert of een personage een favoriet is.
 * @param {string|number} id - De ID van het personage
 * @returns {boolean} True als het een favoriet is
 */
export const isFavorite = (id) => {
  const favs = getFavorites();
  return favs.includes(id.toString());
};

/**
 * Voegt een personage toe aan favorieten of verwijdert deze.
 * @param {string|number} id - De ID van het personage
 * @returns {boolean} True als het nu een favoriet is, false als het verwijderd is
 */
export const toggleFavorite = (id) => {
  const favs = getFavorites();
  const strId = id.toString();
  const index = favs.indexOf(strId);
  
  if (index === -1) {
    favs.push(strId);
    localStorage.setItem('dragonDexFavorites', JSON.stringify(favs));
    return true; // Toegevoegd
  } else {
    favs.splice(index, 1);
    localStorage.setItem('dragonDexFavorites', JSON.stringify(favs));
    return false; // Verwijderd
  }
};
