//Global Variables
var database = firebase.firestore()
var globalUserId

//HTML Elements
const itemsCountText = document.getElementById('items-count-text')
const cartItemsContainer = document.getElementById('cart-items-container')
const orderSubtotal = document.getElementById('order-subtotal')
const shippingText = document.getElementById('shipping-text')
const orderTax = document.getElementById('order-tax')
const orderTotal = document.getElementById('order-total')
const checkoutButton = document.getElementById('checkout-button')


window.onload = () => {
    //TODO: Change shipping/same day deliver text based on users locale

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // Customer is logged in.
            loadAuthUserCart(user.uid)
            globalUserId = user.uid

        } else {
            // No user is logged in.
        }
    })

    checkoutButton.addEventListener('click' , () => {
        location.href = 'https://www.thegametree.io/shop/gtcheckout'
    })
}


function loadAuthUserCart(userID) {
    database.collection("users").doc(userID).onSnapshot((doc) => {
        while(cartItemsContainer.firstChild) {
            cartItemsContainer.removeChild(cartItemsContainer.firstChild)
        }

        var cartData = doc.data().cart

        if(Object.keys(cartData).length > 0 ) {
            var numItems = Object.keys(cartData).length
            if (numItems == 1) {
                itemsCountText.innerHTML = numItems + ' Item'
            } else {
                itemsCountText.innerHTML = numItems + ' Items'
            }

            for (var item in cartData) {
                if (cartData.hasOwnProperty(item)) {
                    buildCartItem(item, cartData[item])
                }
            }

            updateOrderTotal(cartData)

        } else {
            //TODO: display no cart items

            orderSubtotal.innerHTML = '$0.00'
            orderTax.innerHTML = '$0.00'
            orderTotal.innerHTML = '$0.00'
        }
    })
}



function buildCartItem(purchaseID, GTIN) {

    database.collection('catalog').doc(GTIN).get().then(function(doc) {

        var itemData = doc.data()

        const itemConditionDict = {
            'new' : 'New',
            'usedFantastic' : 'Used - Excellent',
            'usedGood' : 'Used - Good',
            'usedAcceptable' : 'Used - Acceptable'
        }

        //Check if item is still in stock
        if( itemData.availability.hasOwnProperty(purchaseID) ) {
            var itemCondition = itemData.availability[purchaseID]

            const cartItemBlock = createDOMElement('div', 'cart-item-block', 'none', cartItemsContainer)
            const cartImage = createDOMElement('img', 'cart-item-image', 'none', cartItemBlock)
            cartImage.src = itemData.productImage
            const cartItemInfoContainer = createDOMElement('div', 'cart-item-info-container', 'none', cartItemBlock)
            const cartItemInfoTop = createDOMElement('div', 'cart-item-info-top', 'none', cartItemInfoContainer)

            const cartItemInfoLeft = createDOMElement('div', 'cart-item-info-left', 'none', cartItemInfoTop)
            createDOMElement('div', 'cart-item-title', itemData.general.productName, cartItemInfoLeft)
            createDOMElement('div', 'cart-item-condition', itemConditionDict[itemCondition], cartItemInfoLeft)
            const changeItem = createDOMElement('div', 'cart-item-change-button', 'Change', cartItemInfoLeft)
            changeItem.setAttribute('onClick', `changeCartItem("${GTIN}", "${purchaseID}")`)

            const cartItemInfoRight = createDOMElement('div', 'cart-item-info-right', 'none', cartItemInfoTop)
            createDOMElement('div', 'cart-item-price-title', 'Item Price', cartItemInfoRight)
            const itemPrice = '$' + itemData.salePrices[itemCondition]
            createDOMElement('div', 'cart-item-price', itemPrice, cartItemInfoRight)
            var removeItem = createDOMElement('div', 'cart-item-change-button', 'Remove', cartItemInfoRight)
            removeItem.setAttribute('onClick', `removeItemFromCart("${purchaseID}")`)

            const cartItemInfoBottom = createDOMElement('div', 'cart-item-info-bottom', 'none', cartItemInfoContainer)
            createDOMElement('div', 'cart-guarantee-icon', '', cartItemInfoBottom)
            createDOMElement('div', 'cart-guarantee-text', 'Backed by the GameTree Guarantee', cartItemInfoBottom)

        } else {
            //TODO: Notify customer the item is no longer in stock, remove from cart
        }
    })
}

function updateOrderTotal(cartItems) {

    var subtotalAmount = 0.00
    var taxAmount = 0.00
    var totalAmount = 0.00

    for (let item in cartItems) {
        if (cartItems.hasOwnProperty(item)) {
            database.collection('catalog').doc(cartItems[item]).get().then(function(doc) {
                var itemData = doc.data()
                var itemCondition = itemData.availability[item]
                var itemPrice = itemData.salePrices[itemCondition]

                console.log(item)
                console.log(itemData.availability)
                console.log(itemData.availability[item])
                subtotalAmount += parseFloat(itemPrice)
                //TODO: Calculate Sales Tax
                totalAmount = subtotalAmount + taxAmount

                orderSubtotal.innerHTML = '$' + subtotalAmount
                orderTax.innerHTML = '$' + taxAmount
                orderTotal.innerHTML = '$' + totalAmount

            })
        }
    }
}



function removeItemFromCart(purchaseID) {
    //TODO: Remove item from cart
    var cartUpdateDict = {}
    cartUpdateDict[`cart.${purchaseID}`] = firebase.firestore.FieldValue.delete()
  
    var userID = firebase.auth().currentUser.uid
    database.collection("users").doc(userID).update(cartUpdateDict).then(function() {
        console.log('Removed Item')
        updateOrderTotal(false)

    }).catch(function(error) {
        console.log(error)
    })
}
