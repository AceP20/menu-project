import { menuArray, customerOrderArr } from '/data.js'

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

// adds whichever element is clicked to customer order array
document.addEventListener('click', (e)=>{
    if (e.target.dataset.item){
        customerOrderArr.push((e.target.dataset.item))
    }
})

document.getElementById('testBtn').addEventListener('click', ()=>{
    console.log(customerOrderArr)
})

if (customerOrderArr.length === 0){
    document.getElementById('customer-order').style.display = 'none'
} 

// try to fix the display when customerOrderArr is empty compared to when has elements in it