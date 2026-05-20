/**
 * Genereert de HTML-string voor een enkele personagekaart.
 * @param {Object} character - Het personage-dataobject van de API
 * @returns {string} HTML-string die de personagekaart vertegenwoordigt
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
