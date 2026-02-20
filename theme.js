// theme.js

function setTheme(theme) {
    const html = document.documentElement;
  
    if (theme === 'dark') {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      document.getElementById('darkCard').classList.add('border-green-400');
      document.getElementById('lightCard').classList.remove('border-green-400');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      document.getElementById('lightCard').classList.add('border-green-400');
      document.getElementById('darkCard').classList.remove('border-green-400');
    }
  }
  
  // Load theme on page load
  document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  });

  const toggle = document.getElementById('themeToggle');

function applyTheme(theme) {
  const html = document.documentElement;
  if (theme === 'dark') {
    html.classList.add('dark');
    toggle.checked = true;
  } else {
    html.classList.remove('dark');
    toggle.checked = false;
  }
  localStorage.setItem('theme', theme);
}

// On toggle switch change
toggle.addEventListener('change', () => {
  const theme = toggle.checked ? 'dark' : 'light';
  applyTheme(theme);
});

// On page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);
});

  