import { isFavorite } from '../js/storage.js';

/**
 * Genereert de HTML-string voor een enkele personagekaart.
 * @param {Object} character - Het personage-dataobject van de API
 * @returns {string} HTML-string die de personagekaart vertegenwoordigt
 */
export const createCharacterCard = (character) => {
  const favoriteClass = isFavorite(character.id) ? 'favorite-active' : '';

  return `
    <article class="character-card" data-id="${character.id}">
      <button class="favorite-btn ${favoriteClass}" aria-label="Toggle favoriet" data-id="${character.id}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
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
 * Genereert de HTML-string voor een laadskeletkaart.
 * @returns {string} HTML-string voor skelet
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
