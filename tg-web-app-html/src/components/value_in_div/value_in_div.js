// в "клас кнопки" будет добовляется значение выбранное с "название селекта (с радио кнопками использовал в E-okna)"

document.querySelectorAll('input[name="названия селекта"]').forEach(function (input) {
  input.addEventListener('click', function () {
      document.querySelector('класс кнопки').innerHTML = this.value
  })
})