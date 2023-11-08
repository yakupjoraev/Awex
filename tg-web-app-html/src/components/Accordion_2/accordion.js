// Аккордеон
const accordionItems = document.querySelectorAll('[data-accordion-item]');
let openAccordion = null; // переменная для хранения ссылки на открытый аккордеон

function toggleAccordion() {
  if (openAccordion && openAccordion !== this) {
    // Если есть открытый аккордеон, который не совпадает с текущим
    openAccordion.classList.remove('active'); // закрыть его
    const openAccordionContent = openAccordion.nextElementSibling;
    if (openAccordionContent) {
      // если у аккордеона есть содержимое
      openAccordionContent.style.maxHeight = null; // сбросить высоту контента
    }
  }

  this.classList.toggle('active'); // открыть или закрыть текущий аккордеон

  const content = this.nextElementSibling;
  if (content) {
    // если у аккордеона есть содержимое
    if (content.style.maxHeight) {
      // Если контент открыт, закрыть его
      content.style.maxHeight = null;
    } else {
      // Если контент закрыт, открыть его
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }

  openAccordion = this; // запомнить ссылку на открытый аккордеон
}


accordionItems.forEach(item => item.addEventListener('click', toggleAccordion));
