
function headerFixed() {
  // Получите ссылку на элемент хедера
  const header = document.querySelector('.new-header');

  // Вычислите начальную высоту хедера
  const initialHeaderHeight = header.clientHeight;

  // Флаг для отслеживания, был ли уже добавлен пустой блок
  let placeholderAdded = false;

  // Обработчик события прокрутки
  document.body.addEventListener('scroll', () => {

    // Получите текущее положение скролла
    const scrollY = window.scrollY || document.body.scrollTop;
    console.log(scrollY);
    // Если скролл больше или равен начальной высоте хедера, добавьте класс "fixed"
    if (scrollY >= initialHeaderHeight) {
      header.classList.add('fixed');

      // Если пустой блок еще не добавлен, добавьте его
      if (!placeholderAdded) {
        // Создайте пустой блок и добавьте его после хедера
        const placeholder = document.createElement('div');
        placeholder.classList.add('placeholder');
        placeholder.style.height = `${initialHeaderHeight}px`;
        header.insertAdjacentElement('afterend', placeholder);
        placeholderAdded = true; // Установите флаг, что блок был добавлен
      }
    } else {
      header.classList.remove('fixed');

      // Удалите пустой блок, если он был добавлен
      const placeholder = document.querySelector('.placeholder');
      if (placeholder) {
        placeholder.remove();
        placeholderAdded = false; // Сбросьте флаг
      }
    }
  });

}

document.addEventListener('DOMContentLoaded', () => {
  headerFixed();
});