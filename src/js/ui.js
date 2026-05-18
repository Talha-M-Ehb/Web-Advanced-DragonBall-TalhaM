import { createCharacterCard, createSkeletonCard } from '../components/characterCard.js';

// DOM Elements
const gridContainer = document.getElementById('characters-grid');

/**
 * Renders an array of characters to the grid container.
 * @param {Array} characters - Array of character objects
 */
export const renderCharacters = (characters) => {
  if (!gridContainer) return;
  
  // Handle empty state
  if (characters.length === 0) {
    gridContainer.innerHTML = '<p class="no-results">No characters match your search criteria.</p>';
    return;
  }
  
  // Use array mapping to transform objects to HTML strings, then join them
  const cardsHTML = characters.map(char => createCharacterCard(char)).join('');
  
  // Update the DOM efficiently with a single operation
  gridContainer.innerHTML = cardsHTML;
};

/**
 * Renders loading skeletons to the grid to indicate data is being fetched.
 * @param {number} count - Number of skeletons to display (default 12)
 */
export const renderSkeletons = (count = 12) => {
  if (!gridContainer) return;
  
  // Create an array of length 'count' and fill it with skeleton HTML
  const skeletonsHTML = Array.from({ length: count }, () => createSkeletonCard()).join('');
  gridContainer.innerHTML = skeletonsHTML;
};
