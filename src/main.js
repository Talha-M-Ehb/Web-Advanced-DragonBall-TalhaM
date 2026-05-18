import './css/style.css';
import './css/cards.css';
import './css/modal.css';
import './css/responsive.css';

import { fetchCharacters } from './js/api.js';
import { renderCharacters, renderSkeletons } from './js/ui.js';

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
  
  console.log(`Initialization complete. Rendered ${allCharacters.length} characters.`);
});
