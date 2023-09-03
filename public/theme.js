let theme = 'system';
if (typeof localStorage !== 'undefined') {
  const localTheme = localStorage.getItem('theme');
  if (localTheme === 'light') theme = 'light';
  if (localTheme === 'dark') theme = 'dark';
  if (theme === 'system') localStorage.removeItem('theme');
}

if (theme == 'system') {
  document.documentElement.setAttribute(
    'data-theme',
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
  );
} else {
  document.documentElement.setAttribute('data-theme', theme);
}

const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

darkQuery.addEventListener('change', (e) => {
  if ('theme' in localStorage) return;
  document.documentElement.setAttribute(
    'data-theme',
    e.matches ? 'dark' : 'light',
  );
});
