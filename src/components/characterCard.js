/**
 * Generates the HTML string for a single character card.
 * @param {Object} character - The character data object from the API
 * @returns {string} HTML string representing the character card
 */
export const createCharacterCard = (character) => {
  return `
    <article class="character-card" data-id="${character.id}">
      <div class="card-image-wrapper">
        <img src="${character.image}" alt="${character.name}" loading="lazy" />
      </div>
      <div class="card-content">
        <h2 class="character-name">${character.name}</h2>
        <span class="character-race">${character.race} • ${character.gender}</span>
        <div class="character-stats">
          <p class="character-ki">Base Ki: <span class="ki-value">${character.ki}</span></p>
          <p class="character-ki">Max Ki: <span class="ki-value">${character.maxKi}</span></p>
        </div>
      </div>
    </article>
  `;
};

/**
 * Generates the HTML string for a loading skeleton card.
 * @returns {string} HTML string for skeleton
 */
export const createSkeletonCard = () => {
  return `
    <div class="skeleton-card">
      <div class="skeleton skeleton-img"></div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text short"></div>
    </div>
  `;
};
