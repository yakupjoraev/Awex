// Custom Scripts
// Custom scripts


function sidebarFunctions() {
  let menuItems = document.querySelectorAll('[data-menu-item]');

  menuItems.forEach(menuItem => {
    const arrow = menuItem.querySelector('[data-menu-item-arrow]');
    if (arrow) {
      arrow.addEventListener('click', () => {
        menuItem.classList.toggle('active');
      });
    }
  });
}

sidebarFunctions();


