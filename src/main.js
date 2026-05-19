import './css/style.css';
import './css/cards.css';
import './css/modal.css';
import './css/responsive.css';

import { fetchCharacters } from './js/api.js';
import { renderCharacters, renderSkeletons } from './js/ui.js';
import { searchCharacters, filterCharacters, sortCharacters } from './js/filters.js';

// Application State
let allCharacters = [];
let currentSearchTerm = '';
let currentSort = 'default';
let currentFilters = {
  race: '',
  gender: '',
  affiliation: ''
};

// Central function to apply all active search & dropdown filters
const applyFiltersAndRender = () => {
  // First, search by name
  let processedCharacters = searchCharacters(allCharacters, currentSearchTerm);
  
  // Second, apply dropdown filters
  processedCharacters = filterCharacters(processedCharacters, currentFilters);
  
  // Third, apply sorting
  processedCharacters = sortCharacters(processedCharacters, currentSort);
  
  // Render the final combined list
  renderCharacters(processedCharacters);
};

document.addEventListener('DOMContentLoaded', async () => {
  console.log('DragonDex App Initialized');
  
  // Show loading skeletons immediately
  renderSkeletons(12);
  
  // Fetch character data
  allCharacters = await fetchCharacters();
  
  // Render the real data to the grid
  renderCharacters(allCharacters);
  
  // Setup Search functionality
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchTerm = e.target.value;
      applyFiltersAndRender();
    });
  }
  
  // Setup Dropdown Filters & Sorting
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
  
  // Helper to update state and trigger re-render
  const handleFilterChange = (filterKey) => (e) => {
    currentFilters[filterKey] = e.target.value;
    applyFiltersAndRender();
  };
  
  if (raceFilter) raceFilter.addEventListener('change', handleFilterChange('race'));
  if (genderFilter) genderFilter.addEventListener('change', handleFilterChange('gender'));
  if (affiliationFilter) affiliationFilter.addEventListener('change', handleFilterChange('affiliation'));
  
  console.log(`Initialization complete. Rendered ${allCharacters.length} characters.`);
});
