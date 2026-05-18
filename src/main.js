import './css/style.css';
import './css/cards.css';
import './css/modal.css';
import './css/responsive.css';

import { fetchCharacters } from './js/api.js';

document.addEventListener('DOMContentLoaded', async () => {
  console.log('DragonDex App Initialized');
  
  // Phase 2: Fetch and log characters
  const characters = await fetchCharacters();
  console.log(`Initialization complete. Loaded ${characters.length} characters.`);
});
