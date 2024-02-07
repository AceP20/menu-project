import menuArray from '/data.js'

const menuOptions = []

menuArray.forEach(item => {
    menuOptions.push(
        `<h2>${item.emoji}</h2>
        <h4>${item.name}</h4>
        <p>${item.ingredients}</p>
        <h4>${item.price}</h4>`
    )
}); 

function renderMenu(menu){
    document.getElementById('menu').innerHTML = menu
}

renderMenu(menuOptions.join(''))

// we need to fix the layout of the render in the main page
// also need to set the horizontal line divider