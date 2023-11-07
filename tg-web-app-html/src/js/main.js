// Custom scripts
function simpleSelect() {
  const selectWrappers = document.querySelectorAll('[data-select-wrapper]');

  selectWrappers.forEach(wrapper => {
    const selectValue = wrapper.querySelector('[data-select-value]');
    const selectArrow = wrapper.querySelector('[data-select-arrow]');
    const selectList = wrapper.querySelector('[data-select-list]');
    const selectItems = wrapper.querySelectorAll('[data-select-item]');

    if (selectValue) {
      selectValue.addEventListener('click', toggleSelectList);
    }

    if (selectArrow) {
      selectArrow.addEventListener('click', toggleSelectList);
    }

    function toggleSelectList() {
      selectList.classList.toggle('active');
      selectArrow.classList.toggle('active');
    }

    selectItems.forEach(item => {
      item.addEventListener('click', () => {
        selectList.classList.remove('active');
        selectArrow.classList.remove('active');
      });
    });

    document.addEventListener('click', (event) => {
      selectWrappers.forEach(wrapper => {
        const isClickedInsideSelect = wrapper.contains(event.target);
        const selectList = wrapper.querySelector('[data-select-list]');

        if (!isClickedInsideSelect) {
          selectList.classList.remove('active');
          selectArrow.classList.remove('active'); // Moved the selectArrow variable here
        }
      });
    });
  });
}

simpleSelect();


function copyText() {
  let copyText = document.querySelector(".copy");

  if (!copyText) {
    return null
  }

  copyText.querySelector("button").addEventListener("click", function () {
    let input = copyText.querySelector(".copy__text");
    input.select();
    document.execCommand("copy");
    copyText.classList.add("active");
    window.getSelection().removeAllRanges();
    setTimeout(function () {
      copyText.classList.remove("active");
    }, 2500);
  });

}

copyText();

function cryptoSelect() {
  const list = document.querySelector('[data-crypto-list]');

  if (!list) {
    return null;
  }

  let items = document.querySelectorAll('[data-crypto-item]');

  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(otherItem => {
        otherItem.classList.remove('checked');
      });

      item.classList.add('checked');
    });
  });
}

cryptoSelect();


document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector('.invoicing__radios');

  if (!container) {
    return null
  }
  // Получаем радиокнопки
  const cryptoRadio = document.querySelector('[data-radio-input="crypto"]');
  const fiatRadio = document.querySelector('[data-radio-input="fiat"]');

  // Функция для обработки изменения радиокнопок
  function handleRadioChange() {
    const invoicingForm = document.querySelector(".invoicing");

    if (cryptoRadio.checked) {
      // Если выбрана криптовалюта, добавляем класс "crypto" к форме
      invoicingForm.classList.add("crypto");
    } else {
      // Если выбран фиат, удаляем класс "crypto" из формы
      invoicingForm.classList.remove("crypto");
    }
  }

  // Слушаем изменения радиокнопок
  cryptoRadio.addEventListener("change", handleRadioChange);
  fiatRadio.addEventListener("change", handleRadioChange);

  // Вызываем функцию при загрузке страницы, чтобы установить начальное состояние
  handleRadioChange();
});


function checkedOthers() {
  const others = document.querySelector('.checked-others');

  if (!others) {
    return null
  }
  const checkbox = document.querySelector('[data-checkbox-input]');

  checkbox.addEventListener('change', () => {
    if (!checkbox.checked) {
      others.classList.remove('active');
    } else {
      others.classList.add('active');
    }
  })
}

checkedOthers();

