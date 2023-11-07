function languageSelection() {
  let languages = document.querySelectorAll('[data-languages]');
  let languagesItems = document.querySelectorAll('[data-languages-item]');

  languages.forEach(language => {
    language.addEventListener('click', (event) => {
      event.stopPropagation();
      language.classList.toggle('active');
    });
  });

  document.addEventListener('click', (event) => {
    languages.forEach(language => {
      if (!language.contains(event.target)) {
        language.classList.remove('active');
      }
    });
  });
}

languageSelection();
