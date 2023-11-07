
//Toggle theme
const themeBtn = document.querySelector('.js-theme-btn');
themeBtn.addEventListener('click', () => {
  let element = document.body;
  element.classList.toggle('light-mode')
  themeBtn.classList.toggle('light-mode')
})
