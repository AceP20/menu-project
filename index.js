import { menuArray, customerOrder } from '/data.js'

const menuOptions = []

//goes through each item in array to return visual HTML code for food menu card
menuArray.forEach(item => {
    menuOptions.push(`
    <div class="menu-card">
    <h2>${item.emoji}</h2>
    <spam>
    <h4>${item.name}</h4>
    <p>${item.ingredients}</p>
    <h4>$${item.price}</h4>
    </spam><i data-item='${item.name}' class="fa-solid fa-plus"></i></div>`
    )
}); 

function renderMenu(menu){
    document.getElementById('menu').innerHTML = menu
}
 
renderMenu(menuOptions.join(''))

//create Your order bottom of the page

document.addEventListener('click', (e)=>{
    console.log(e.target.dataset.item)
})