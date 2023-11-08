function dateInputs() {
  // Получаем все элементы с атрибутом data-date-input
  const dateInputs = document.querySelectorAll('[data-mask-input]');

  if (!dateInputs) {
    return null
  }

  // Проходимся по каждому элементу и создаем для него экземпляр IMask
  dateInputs.forEach(dateInput => {
    IMask(dateInput, {
      mask: "+{7}(000)000-00-00",
    });
  });

}
dateInputs();
