import { createCharacterCard, createSkeletonCard } from '../components/characterCard.js';
import { createModalContent } from '../components/modal.js';

const gridContainer = document.getElementById('characters-grid');
const modalContainer = document.getElementById('modal-container');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1 
};

const scrollObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

export const renderCharacters = (characters) => {
  if (!gridContainer) return;
  if (characters.length === 0) {
    gridContainer.innerHTML = '<p class="no-results">Geen personages gevonden die aan uw criteria voldoen.</p>';
    return;
  }
  const cardsHTML = characters.map(char => createCharacterCard(char)).join('');
  gridContainer.innerHTML = cardsHTML;

  const animatedCards = gridContainer.querySelectorAll('.animate-on-scroll');
  animatedCards.forEach(card => scrollObserver.observe(card));
};

export const renderSkeletons = (count = 12) => {
  if (!gridContainer) return;
  const skeletonsHTML = Array.from({ length: count }, () => createSkeletonCard()).join('');
  gridContainer.innerHTML = skeletonsHTML;
};

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
