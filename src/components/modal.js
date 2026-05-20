/**
 * Genereert de HTML voor de modale weergave met behulp van volledige personagedata.
 * @param {Object} character - Het volledige personage-object (inclusief planeet/transformaties)
 * @returns {string} HTML string
 */
export const createModalContent = (character) => {
  const planetName = character.originPlanet ? character.originPlanet.name : 'Onbekend';
  const planetImage = character.originPlanet && character.originPlanet.image 
    ? `<img src="${character.originPlanet.image}" alt="${planetName}" class="planet-img">` 
    : '';

  let transformationsHTML = '<p class="no-data">Geen transformaties beschikbaar.</p>';
  if (character.transformations && character.transformations.length > 0) {
    transformationsHTML = `
      <div class="transformations-grid">
        ${character.transformations.map(t => `
          <div class="transformation-card">
            <img src="${t.image}" alt="${t.name}" loading="lazy" />
            <span>${t.name}</span>
            <small>Ki: ${t.ki}</small>
          </div>
        `).join('')}
      </div>
    `;
  }

  return `
    <div class="modal-content">
      <button class="close-modal" id="close-modal" aria-label="Sluit modaal venster">&times;</button>
      
      <div class="modal-header">
        <img src="${character.image}" alt="${character.name}" class="modal-main-img">
        <div class="modal-info">
          <h2>${character.name}</h2>
          <p class="race-gender">${character.race} • ${character.gender}</p>
          <div class="stats">
            <p><strong>Base Ki:</strong> <span class="ki-value">${character.ki}</span></p>
            <p><strong>Max Ki:</strong> <span class="ki-value">${character.maxKi}</span></p>
            <p><strong>Affiliatie:</strong> ${character.affiliation}</p>
          </div>
        </div>
      </div>
      
      <div class="modal-body">
        <p class="description">${character.description}</p>
        
        <div class="modal-section">
          <h3>Oorsprongsplaneet: ${planetName}</h3>
          ${planetImage}
        </div>
        
        <div class="modal-section">
          <h3>Transformaties</h3>
          ${transformationsHTML}
        </div>
      </div>
    </div>
  `;
};
