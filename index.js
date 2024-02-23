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
        addCustomerOrder(e.target.dataset)
    }
})

//removes whichever element user deletes on customer order section
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        const customerOrder = customerOrderArr.map(currentFood => currentFood.name)
        if (customerOrder.includes(e.target.dataset.item)) {
            const indexToRemove = customerOrder.indexOf(e.target.dataset.item)
            customerOrderHTMLArr.splice(indexToRemove, 1)
            customerOrderArr.splice(indexToRemove, 1)
            renderCustomerOrder()
        }
    }
})

let customerOrderHTMLArr = []

const addCustomerOrder = (itemsOrdered) => {
    //Gather how of the same items are in the customers order
    const counts = {}
    customerOrderArr.forEach(currentItem => {
        counts[currentItem.name] = (counts[currentItem.name] || 0) + 1
    })

    //Generate HTML for each item in the customer order
    const itemHTMLArr = Object.keys(counts).map(itemName => {
        const count = counts[itemName]
        return `
        <span>
            <p>${itemName}</p>
            <p>x${count}</p>
            <button data-item='${itemName}' class='remove-btn'>(remove)</button>
            <p class='price-display'>$${getPriceForItem(itemName)}</p>
        </span>
    `
    })

    customerOrderHTMLArr = itemHTMLArr

    renderCustomerOrder()

}

const getPriceForItem = (itemName) => {
    // Add logic to get the price for each item (e.g., from a menu or predefined prices)
    switch (itemName) {
        case 'Hamburger':
            return 12;
        case 'Beer':
            return 12;
        case 'Pizza':
            return 14;
        default:
            return 0;
    }
};

const renderCustomerOrder = () => {
    document.querySelector('#customer-order').innerHTML = customerOrderHTMLArr.join(' ')

    //adds up total price and updates the HTML on site
    const totalPrice = customerOrderArr.reduce((sum, currentItem) => sum + Number(currentItem.price), 0)
    document.querySelector('#total-price-display').innerHTML = `Total Price: <span>$${totalPrice}</span>`
}














