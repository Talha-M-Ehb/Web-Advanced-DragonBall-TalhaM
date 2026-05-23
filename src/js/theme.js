
export const initTheme = () => {
  const toggleBtn = document.getElementById('theme-toggle');

  const savedTheme = localStorage.getItem('dragonDexTheme');

  if (savedTheme === 'light') {
    document.documentElement.classList.add('light-mode');
    if (toggleBtn) toggleBtn.textContent = '⏾';
  } else {
    if (toggleBtn) toggleBtn.textContent = '☀︎';
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isLightMode = document.documentElement.classList.toggle('light-mode');

      toggleBtn.textContent = isLightMode ? '⏾' : '☀︎';

      localStorage.setItem('dragonDexTheme', isLightMode ? 'light' : 'dark');
    });
  }
};
