
// функция для удаление класса если элемент не в таргете

window.addEventListener('click', function (event) {
  var target = event.target

  if (!containerDesktop.contains(event.target) || containerDesktop === target) {
    containerDesktop.classList.remove('active')
  }
})



document.addEventListener('click', (event) => {
  languages.forEach(language => {
    if (!language.contains(event.target)) {
      language.classList.remove('active');
    }
  });
});