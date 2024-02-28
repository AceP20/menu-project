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

//renders the html into the index.html document
function renderMenu(menu) {
    document.querySelector('#menu').innerHTML = menu
}

renderMenu(menuOptions.join(''))

// adds whichever element is clicked to customer order array
document.addEventListener('click', (e) => {
    if (e.target.dataset.name) {
        customerOrderArr.push(e.target.dataset)
        renderCustomerOrder()
        document.querySelector('aside').classList.add('hidden')
        document.querySelector('#order-display').classList.remove('hidden')
    }
})

//removes an element from the customer order menu after delete is clicked on item
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        const itemToRemove = e.target.dataset.item

        //find location in array of item to remove
        const itemIndex = customerOrderArr.findIndex(item => item.name === itemToRemove)

        //remove item and update the render to HTML document
        if (itemIndex !== -1) {
            customerOrderArr.splice(itemIndex, 1)

            renderCustomerOrder()
        }

        if (customerOrderArr.length === 0) {
            document.querySelector('#order-display').classList.add('hidden')
        }
    }
})

//logic to get the price for each item 
const getPriceForItem = (itemName) => {
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
    //counts to see how many items have been ordered by customer and saves data in object
    const counts = {}
    customerOrderArr.forEach(currentItem => {
        counts[currentItem.name] = (counts[currentItem.name] || 0) + 1
    })

    //goes through the items ordered(keys) and the counts value of each item and constructs HTML to diplay an item once and 
    const itemHTMLArr = Object.keys(counts).map(itemName => {
        const count = counts[itemName]
        return `
        <span>
        <p>${itemName}</p>
        <p id='item-count'>x${count}</p>
        <button data-item='${itemName}' class='remove-btn'>(remove)</button>
        <p class='price-display'>$${getPriceForItem(itemName)}</p>
        </span>
        `
    })

    document.querySelector('#customer-order').innerHTML = itemHTMLArr.join(' ')

    //sums up prices of items ordered so far and displays the total
    const totalPrice = customerOrderArr.reduce((sum, currentItem) => sum + Number(currentItem.price), 0)
    document.querySelector('#total-price-display').innerHTML = `Total Price: <span>$${totalPrice}</span>`
}

// Opens of payment form after complete is clicked
document.querySelector('#complete-btn').addEventListener('click', () => {
    document.querySelector('#payment-form').classList.remove('hidden')
})



// completes order and also resets input fields
document.querySelector('#pay-btn').addEventListener('click', (e) => {

    // hides and displays what is needed and not
    document.querySelector('#order-display').classList.toggle('hidden')
    document.querySelector('#payment-form').classList.toggle('hidden')
    document.querySelector('aside').classList.toggle('hidden')


    //saves input name locally to use later
    const userNameInput = document.getElementById('user-name').value;
    //Confirms order has been placed
    document.querySelector('aside').innerHTML = `<p>Thanks, ${userNameInput}! Your order is on its way!</p>`

    // reset payment info as well as customer's order
    document.querySelector('#payment-form').reset()
    customerOrderArr.length = 0;
})