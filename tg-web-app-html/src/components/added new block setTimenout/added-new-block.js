function randomBlocks() {
  let skins = [
    {
      rang: "blue",
      name: "AK-47",
      price: "7.90$",
      img: '1'
    },

    {
      rang: "blue-2",
      name: "AK-47",
      price: "10$",
      img: '2'
    },

    {
      rang: "fiol",
      name: "AK-47",
      price: "12$",
      img: '3'
    },

    {
      rang: "fiol",
      name: "AK-47",
      price: "12$",
      img: '3'
    },

    {
      rang: "orange",
      name: "AK-47",
      price: "15$",
      img: '4'
    },

    {
      rang: "orange-2",
      name: "AK-47",
      price: "50$",
      img: '5'
    },

    {
      rang: "orange-2",
      name: "AK-47",
      price: "60.89$",
      img: '6'
    },

    {
      rang: "orange-2",
      name: "AK-47",
      price: "89.99$",
      img: '7'
    },

    {
      rang: "orange-2",
      name: "AK-47",
      price: "99.99$",
      img: '8'
    },

    {
      rang: "fiol",
      name: "AUG",
      price: "7.99$",
      img: '9'
    },

    {
      rang: "fiol",
      name: "AWP",
      price: "11.99$",
      img: '10'
    },

    {
      rang: "orange",
      name: "AWP",
      price: "65$",
      img: '11'
    },

    {
      rang: "orange",
      name: "AWP",
      price: "75.35$",
      img: '12'
    },

    {
      rang: "orange",
      name: "AWP",
      price: "95.95$",
      img: '13'
    },

    {
      rang: "orange-2",
      name: "Bloodhound Gloves",
      price: "82.95$",
      img: '14'
    },

    {
      rang: "blue",
      name: "CZ75-auto",
      price: "8.90$",
      img: '15'
    },

    {
      rang: "fiol",
      name: "Desert Eagle",
      price: "14.90$",
      img: '16'
    },

    {
      rang: "orange-2",
      name: "Driver Gloves",
      price: "80$",
      img: '17'
    },

    {
      rang: "orange-2",
      name: "Dual Barettas",
      price: "24.99$",
      img: '18'
    },

    {
      rang: "blue",
      name: "Fames",
      price: "19$",
      img: '19'
    },

    {
      rang: "blue",
      name: "Five SeveN",
      price: "10.99$",
      img: '20'
    },

    {
      rang: "fiol",
      name: "Five SeveN",
      price: "14.99$",
      img: '21'
    },

    {
      rang: "fiol",
      name: "G3SG1",
      price: "44.99$",
      img: '22'
    },

    {
      rang: "blue",
      name: "Galil AR",
      price: "9$",
      img: '23'
    },

    {
      rang: "blue",
      name: "Glock-18",
      price: "8.90$",
      img: '24'
    },

    {
      rang: "blue",
      name: "Glock-18",
      price: "9.90$",
      img: '25'
    },

    {
      rang: "blue",
      name: "Glock-18",
      price: "11.90$",
      img: '26'
    },

    {
      rang: "fiol",
      name: "Glock-18",
      price: "16.90$",
      img: '27'
    },

    {
      rang: "orange",
      name: "Glock-18",
      price: "66.90$",
      img: '28'
    },

    {
      rang: "orange-2",
      name: "Huntsman Knife",
      price: "96.40$",
      img: '29'
    },

    {
      rang: "fiol",
      name: "M4A1-S",
      price: "8.40$",
      img: '30'
    },

    {
      rang: "fiol",
      name: "M4A1-S",
      price: "10.60$",
      img: '31'
    },

    {
      rang: "fiol",
      name: "M4A1-S",
      price: "15.60$",
      img: '32'
    },

    {
      rang: "orange",
      name: "M4A1-S",
      price: "65.60$",
      img: '33'
    },

    {
      rang: "blue",
      name: "M4A1",
      price: "6.60$",
      img: '34'
    },

    {
      rang: "orange-2",
      name: "M4A1",
      price: "64.60$",
      img: '35'
    },

    {
      rang: "blue",
      name: "MAC-10",
      price: "6.60$",
      img: '36'
    },

    {
      rang: "orange-2",
      name: "MAC-10",
      price: "59.90$",
      img: '37'
    },

    {
      rang: "orange-2",
      name: "Moto Gloves",
      price: "99.90$",
      img: '38'
    },

    {
      rang: "blue",
      name: "MP5-SD",
      price: "9.10$",
      img: '39'
    },

    {
      rang: "blue",
      name: "MP7",
      price: "9.08$",
      img: '40'
    },

    {
      rang: "orange-2",
      name: "MP7",
      price: "95.08$",
      img: '41'
    },

    {
      rang: "blue",
      name: "P90",
      price: "8.88$",
      img: '42'
    },

    {
      rang: "blue",
      name: "P2000",
      price: "7.68$",
      img: '43'
    },

    {
      rang: "blue",
      name: "PP-Bizon",
      price: "6.68$",
      img: '44'
    },

    {
      rang: "blue",
      name: "R8 Revolver",
      price: "7.88$",
      img: '45'
    },

    {
      rang: "blue",
      name: "Saved Off",
      price: "8.98$",
      img: '46'
    },

    {
      rang: "blue",
      name: "Scar-20",
      price: "5.18$",
      img: '47'
    },

    {
      rang: "fiol",
      name: "USP-S",
      price: "9.99$",
      img: '48'
    },

    {
      rang: "orange",
      name: "USP-S",
      price: "29.99$",
      img: '49'
    },
  ]

  const skinsContainer = document.querySelector('.skin-free__list')

  function getBlock(skin) {

    skinBlock =
      ` 
      <li class="skin-free__item ${skin.rang}">
        <img class="skin-free__item-img" src="./img/free-skins/${skin.img}.png" alt="${skin.img}">

        <div class="skin-free__item-info">
          <h3 class="skin-free__item-name">
              ${skin.name}
          </h3>

          <p class="skin-free__item-price">
              ${skin.price}
          </p>
        </div>
      </li>
    `

    skinsContainer.insertAdjacentHTML(`afterBegin`, skinBlock)

    // skinsContainer.innerHTML +=
    //   ` 
    //   <li class="skin-free__item ${skin.rang}">
    //     <img class="skin-free__item-img" src="./img/free-skins/${skin.img}.png" alt="${skin.img}">

    //     <div class="skin-free__item-info">
    //       <h3 class="skin-free__item-name">
    //           ${skin.name}
    //       </h3>

    //       <p class="skin-free__item-price">
    //           ${skin.price}
    //       </p>
    //     </div>
    //   </li>
    // `
  }

  let counter = 0

  for (let i = 0; i <= 15; i++) {
    getBlock(skins[i])
    counter = i
  }

  setInterval(() => {

    if (skins.length !== counter) {
      getBlock(skins[counter])
      counter++
    } else {
      counter = 0
    }

  }, 2000);

}

randomBlocks() 