import menuArray from '/data.js'

const menuOptions = []

menuArray.forEach(item => {
    menuOptions.push(`
        <div class="menu-card">
        <h2>${item.emoji}</h2>
        <spam>
        <h4>${item.name}</h4>
        <p>${item.ingredients}</p>
        <h4>$${item.price}</h4>
        </spam></div>`
    )
}); 

function renderMenu(menu){
    document.getElementById('menu').innerHTML = menu
}

renderMenu(menuOptions.join(''))

// Add plus button on right and begin the function for the Your order menu