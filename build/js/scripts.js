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


