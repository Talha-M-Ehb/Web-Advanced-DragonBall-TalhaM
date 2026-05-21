import './css/style.css';
import './css/cards.css';
import './css/modal.css';
import './css/responsive.css';

import { fetchCharacters, fetchCharacterById } from './js/api.js';
import { renderCharacters, renderSkeletons, openModal, showModalLoading } from './js/ui.js';
import { searchCharacters, filterCharacters, sortCharacters } from './js/filters.js';
import { toggleFavorite } from './js/storage.js';

// Applicatiestatus
let allCharacters = [];
let currentSearchTerm = '';
let currentSort = 'default';
let currentFilters = {
  race: '',
  gender: '',
  affiliation: '',
  favoritesOnly: false
};

// Centrale functie om alle actieve zoekopdrachten & dropdown filters toe te passen
const applyFiltersAndRender = () => {
  let processedCharacters = searchCharacters(allCharacters, currentSearchTerm);
  processedCharacters = filterCharacters(processedCharacters, currentFilters);
  processedCharacters = sortCharacters(processedCharacters, currentSort);
  renderCharacters(processedCharacters);
};

document.addEventListener('DOMContentLoaded', async () => {
  console.log('DragonDex App Geïnitialiseerd');
  
  // Toon onmiddellijk laadskeletten
  renderSkeletons(12);
  
  allCharacters = await fetchCharacters();
  renderCharacters(allCharacters);
  
  // Zoekfunctionaliteit instellen
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchTerm = e.target.value;
      applyFiltersAndRender();
    });
  }
  
  // Dropdown filters & sortering instellen
  const sortFilter = document.getElementById('sort-filter');
  const raceFilter = document.getElementById('race-filter');
  const genderFilter = document.getElementById('gender-filter');
  const affiliationFilter = document.getElementById('affiliation-filter');
  
  if (sortFilter) {
    sortFilter.addEventListener('change', (e) => {
      currentSort = e.target.value;
      applyFiltersAndRender();
    });
  }
  
  // Favorieten Weergave knop
  const favToggleBtn = document.getElementById('favorites-toggle');
  if (favToggleBtn) {
    favToggleBtn.addEventListener('click', () => {
      currentFilters.favoritesOnly = !currentFilters.favoritesOnly;
      favToggleBtn.classList.toggle('active', currentFilters.favoritesOnly);
      applyFiltersAndRender();
    });
  }
  
  // Klikgebeurtenissen op kaarten instellen voor de modale weergave en favorieten
  const gridContainer = document.getElementById('characters-grid');
  if (gridContainer) {
    gridContainer.addEventListener('click', async (e) => {
      // Controleer eerst of de hartjesknop (favoriet) is geklikt
      const favBtn = e.target.closest('.favorite-btn');
      if (favBtn) {
        e.stopPropagation(); // Voorkom dat de modale weergave opent
        const characterId = favBtn.getAttribute('data-id');
        const isFav = toggleFavorite(characterId);
        favBtn.classList.toggle('favorite-active', isFav);
        
        // Als we in 'Alleen Favorieten' modus zijn, herteken de lijst wanneer een favoriet wordt verwijderd
        if (currentFilters.favoritesOnly && !isFav) {
          applyFiltersAndRender();
        }
        return; // Stop hier, open het modaal venster niet
      }
      
      const card = e.target.closest('.character-card');
      if (card) {
        const characterId = card.getAttribute('data-id');
        showModalLoading();
        
        const fullCharacter = await fetchCharacterById(characterId);
        if (fullCharacter) {
          openModal(fullCharacter);
        }
      }
    });
  }
  
  // Helper om status bij te werken en herweergave te activeren
  const handleFilterChange = (filterKey) => (e) => {
    currentFilters[filterKey] = e.target.value;
    applyFiltersAndRender();
  };
  
  if (raceFilter) raceFilter.addEventListener('change', handleFilterChange('race'));
  if (genderFilter) genderFilter.addEventListener('change', handleFilterChange('gender'));
  if (affiliationFilter) affiliationFilter.addEventListener('change', handleFilterChange('affiliation'));
  
  console.log(`Initialisatie voltooid. ${allCharacters.length} personages weergegeven.`);
});
