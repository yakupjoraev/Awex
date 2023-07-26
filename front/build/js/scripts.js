// Custom Scripts
// Custom scripts


function sidebarFunctions() {
  const container = document.querySelector('.sidebar');

  if (!container) {
    return null
  }

  let menuItems = document.querySelectorAll('[data-menu-item]');

  menuItems.forEach(menuItem => {
    const arrow = menuItem.querySelector('[data-menu-item-arrow]');
    if (arrow) {
      arrow.addEventListener('click', () => {
        menuItem.classList.toggle('show');
      });
    }
  });

  let sideBarItems = document.querySelectorAll('.sidebar__menu-link, .sidebar__menu-sublink')

  sideBarItems.forEach(sideBarItem => {
    sideBarItem.addEventListener('click', (event) => {
      // Проверяем, что клик не произошел на элементе с классом .sidebar__menu-arrow
      if (!event.target.classList.contains('sidebar__menu-arrow')) {
        // Удаляем класс active у всех элементов
        sideBarItems.forEach(item => {
          item.classList.remove('active');
        });

        // Добавляем класс active к выбранному элементу
        sideBarItem.classList.add('active');
      }
    });
  });

}

sidebarFunctions();


function sidebarMobile() {
  const sidebarMobile = document.querySelector('[data-sidebar-mobile]');

  if (!sidebarMobile) {
    return null
  }

  const sidebarMobileBtn = document.querySelector('[data-sidebar-mobile-btn]');

  sidebarMobileBtn.addEventListener('click', () => {
    sidebarMobile.classList.toggle('show')
  })

}

sidebarMobile();

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
  });

  document.addEventListener('click', (event) => {
    selectWrappers.forEach(wrapper => {
      const isClickedInsideSelect = wrapper.contains(event.target);
      const selectList = wrapper.querySelector('[data-select-list]');

      if (!isClickedInsideSelect) {
        selectList.classList.remove('active');
        selectArrow.classList.remove('active');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  simpleSelect();
});

// function checkIntoView() {
//   const container = document.querySelector('.deposit-retention__form');

//   if (!container) {
//     return null
//   }
//   var checkbox = document.querySelector('.deposit-retention__checkbox');
//   var form = document.querySelector('.deposit-retention__form');

//   checkbox.addEventListener('change', function () {
//     if (checkbox.checked) {
//       form.classList.add('show');
//     } else {
//       form.classList.remove('show');
//     }
//   });

// }

// checkIntoView();


const openModalBtns = document.querySelectorAll('.open-modal-btn');
const closeModalBtns = document.querySelectorAll('.close-modal-btn');
const modals = document.querySelectorAll('.modal');

openModalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modalId = btn.dataset.modalId;
    const modal = document.getElementById(modalId);
    modal.classList.add('show');
  });
});

closeModalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.modal');
    modal.classList.remove('show');
  });
});

window.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
    event.target.classList.remove('show');
  }
});

