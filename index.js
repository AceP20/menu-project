import { menuArray, customerOrderArr } from '/data.js'

const menuOptions = []

//goes through each item in array to return visual HTML code for food menu card
menuArray.forEach(item => {
    menuOptions.push(`
    <div class="menu-card">
    <h2>${item.emoji}</h2>
    <span>
    <h4>${item.name}</h4>
    <p>${item.ingredients}</p>
    <h4>$${item.price}</h4>
    </span><i data-price='${item.price}' data-name='${item.name}' class="fa-solid fa-plus"></i></div>`
    )
});

function renderMenu(menu) {
    document.querySelector('#menu').innerHTML = menu
}

renderMenu(menuOptions.join(''))

// adds whichever element is clicked to customer order array
document.addEventListener('click', (e) => {
    if (e.target.dataset.name) {
        customerOrderArr.push(e.target.dataset)
        renderCustomerOrder(e.target.dataset)
    } 
})

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')){
        console.log(customerOrderArr)
        if(customerOrderArr.includes(e.target.dataset.item)){
            console.log('working')
        }
    }
})

const customerOrderHTMLArr = []

const renderCustomerOrder = (itemsOrdered) =>{
    customerOrderHTMLArr.push(`
    <span><p>${itemsOrdered.name}</p><button data-item='${itemsOrdered.name}' class='remove-btn'>(remove)</button><p class='price-display'>$${itemsOrdered.price}</p></span>
    `
    )
    document.querySelector('#customer-order').innerHTML = customerOrderHTMLArr.join(' ')
    
    //adds up total price and updates the HTML on site
    const totalPrice = customerOrderArr.reduce((sum, currentItem )=> sum + Number(currentItem.price), 0)
    document.querySelector('#total-price-display').innerHTML = `Total Price: <span>$${totalPrice}</span>`
}












document.querySelector('#testBtn').addEventListener('click', () => {
    console.log(customerOrderArr)
})

