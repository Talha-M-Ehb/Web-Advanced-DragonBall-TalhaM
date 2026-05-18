import './css/style.css';
import './css/cards.css';
import './css/modal.css';
import './css/responsive.css';

import { fetchCharacters } from './js/api.js';
import { renderCharacters, renderSkeletons } from './js/ui.js';
import { searchCharacters } from './js/filters.js';

// Application State
let allCharacters = [];

document.addEventListener('DOMContentLoaded', async () => {
  console.log('DragonDex App Initialized');
  
  // Show loading skeletons immediately
  renderSkeletons(12);
  
  // Fetch character data
  allCharacters = await fetchCharacters();
  
  // Render the real data to the grid
  renderCharacters(allCharacters);
  
  // Phase 4: Search functionality setup
  const searchInput = document.getElementById('search-input');
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value;
      const filteredCharacters = searchCharacters(allCharacters, searchTerm);
      renderCharacters(filteredCharacters);
    });
  }
  
  console.log(`Initialization complete. Rendered ${allCharacters.length} characters.`);
});
