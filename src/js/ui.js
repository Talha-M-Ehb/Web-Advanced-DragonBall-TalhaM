import { createCharacterCard, createSkeletonCard } from '../components/characterCard.js';

// DOM Elementen
const gridContainer = document.getElementById('characters-grid');

/**
 * Rendert een array van personages in de grid container.
 * @param {Array} characters - Array met personage-objecten
 */
export const renderCharacters = (characters) => {
  if (!gridContainer) return;
  
  if (characters.length === 0) {
    gridContainer.innerHTML = '<p class="no-results">Geen personages gevonden die aan uw criteria voldoen.</p>';
    return;
  }
  
  const cardsHTML = characters.map(char => createCharacterCard(char)).join('');
  
  gridContainer.innerHTML = cardsHTML;
};

/**
 * Rendert laadskeletten in de grid om aan te geven dat data wordt opgehaald.
 * @param {number} count - Aantal skeletten om weer te geven (standaard 12)
 */
export const renderSkeletons = (count = 12) => {
  if (!gridContainer) return;
  
  const skeletonsHTML = Array.from({ length: count }, () => createSkeletonCard()).join('');
  gridContainer.innerHTML = skeletonsHTML;
};

// --- Modale weergave functionaliteit ---
import { createModalContent } from '../components/modal.js';
const modalContainer = document.getElementById('modal-container');

export const openModal = (character) => {
  if (!modalContainer) return;
  modalContainer.innerHTML = createModalContent(character);
  modalContainer.classList.remove('hidden');
  
  const closeBtn = document.getElementById('close-modal');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
};

export const closeModal = () => {
  if (!modalContainer) return;
  modalContainer.classList.add('hidden');
  setTimeout(() => {
    modalContainer.innerHTML = ''; 
  }, 300);
};

export const showModalLoading = () => {
  if (!modalContainer) return;
  modalContainer.innerHTML = `
    <div class="modal-content">
      <div class="modal-loading">Personage details laden...</div>
    </div>
  `;
  modalContainer.classList.remove('hidden');
};

if (modalContainer) {
  modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) {
      closeModal();
    }
  });
}
