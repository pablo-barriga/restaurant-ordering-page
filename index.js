import {menuArray} from './data.js'
const cardForm = document.getElementById("card-form")
let totalPrice = 0
let modalOpen = false
let amountOfItems = [0, 0, 0]

document.addEventListener("click", function(e){
    
    if(e.target.dataset.add){
        addItem(e.target.dataset.add)
    }else if(e.target.dataset.remove){
        document.getElementById(e.target.id).blur()
        removeItem(e.target.dataset.remove)
    }else if(e.target.id ==="checkout-btn"){
        checkout()
        modalOpen = true
    }
    else if(modalOpen && !document.getElementById("modal").contains(e.target)){
        closeModal()
        modalOpen = false
    }
    
})

cardForm.addEventListener("submit", function(e){
    e.preventDefault()
    const cardFormData = new FormData(cardForm)
    const name = cardFormData.get('fullName')
    document.getElementById("your-order").style.display = 'none'
    closeModal()
    modalOpen = false
    const yourOrder = document.getElementById("info-container")
    yourOrder.innerHTML = `<div id = "thanks-msg">
                    <p id = "thank-user">Thanks, ${name}! Your order is on its way!</p>
                            </div>`
    document.getElementById("thanks-msg").style.display = "block"
})

  

function closeModal(){
    document.getElementById("modal").style.display = "none"
}
function checkout(){
    document.getElementById("modal").style.display = "block"
}

function removeItem(itemId){
    const itemsInCart = document.getElementById("items-in-cart")
    const itemToRemove = menuArray.filter( item => itemId == item.id)[0]
    amountOfItems[itemToRemove.id]--
    totalPrice -= itemToRemove.price
    itemsInCart.innerHTML = renderOrder()
    updateTotalPrice()
    if(totalPrice === 0){
        document.getElementById("your-order").style.display = 'none'
    }
}

function addItem(itemId){
    const itemsInCart = document.getElementById("items-in-cart")
    const itemToAdd = menuArray.filter( item => itemId == item.id)[0]
    amountOfItems[itemToAdd.id] ++
    totalPrice += itemToAdd.price
    itemsInCart.innerHTML = renderOrder()
    updateTotalPrice()
     if(totalPrice > 0){
        document.getElementById("your-order").style.display = 'block'
    }       
}

function updateTotalPrice(){
    document.getElementById("total-price").innerHTML = `\$${totalPrice}`
}

function renderOrder(){
    let orderHTML = ``
     menuArray.forEach(function(addedItem){
        const {name, id, price} = addedItem
        if(amountOfItems[addedItem.id] > 0){
            orderHTML += `
                <div class = "ordered-item">
                    <div class = "added-container">
                        <p class = "item-name">${name}</p>
                        <button class = "remove-btn" id = "remove" 
                        data-remove = '${id}'>remove</button>
                        <p class = "amount">x${amountOfItems[addedItem.id]}</p>
                    </div>
                    <p class = "price add-price">\$${price}</p>
                </div>`
        }
    })
    return orderHTML
}



function getItems(){
    let feedItems = ``
    menuArray.forEach(function(menuItem){
        const {name, ingredients, id, price, emoji} = menuItem
        const ingredientsArr = ingredients.join(`, `)
        feedItems += `<div class = "item">
                <p class = "item-logo">${emoji}</p>
                <div class = "item-info">
                    <p class = "item-name">${name}</p>
                    <p class = "ingredients">${ingredientsArr}</p>
                    <p class = "price">\$${price}</p>
                </div>
                <button class ="add-item" data-add = '${id}'>+</button>
            </div>`
    })
    return feedItems
}



function render(){
    const displayItems = document.getElementById("items")    
        
    displayItems.innerHTML = getItems()
}


render()













/*<div class = "item">
                    <p class = "item-logo">🍕</p>
                    <div class = "item-info">
                        <p class = "item-name">Pizza</p>
                        <p class = "ingredients">pepperoni, mushrom,mozerella</p>
                        <p class = "price">$14</p>
                    </div>
                    <button class ="add-item">+</button>
                </div>*/
                
                
/*
 
    <div class = "ordered-item">
        <div class = "added-container">
            <p class = "item-name">Pizza</p>
            <button class = "remove-btn" id = "remove">remove</button>
            <p class = "amount">x1</p>
        </div>
        <p class = "price add-price">$14</p>
    </div>
</div>
*/