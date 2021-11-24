
//HTML Elements
const itemsCountText = document.getElementById('items-count-text')
const cartItemsContainer = document.getElementById('cart-items-container')
const shippingText = document.getElementById('shipping-text')
const orderSubtotal = document.getElementById('order-subtotal')
const orderShippingPrice = document.getElementById('order-shipping-price')
const orderTax = document.getElementById('order-tax')
const orderTotal = document.getElementById('order-total')
const checkoutButton = document.getElementById('checkout-button')

//Change Item Modal
const changeItemModal = document.getElementById('change-item-modal')
const changeItemCloseModal = document.getElementById('change-item-close-modal')
const changeItemProductTitle = document.getElementById('change-item-product-title')
const changeItemHeaderDiv = document.getElementById('change-item-header-div')

const changeItemNewButton = document.getElementById('change-item-new-button')
const changeItemExcellentButton = document.getElementById('change-item-excellent-button')
const changeItemGoodButton = document.getElementById('change-item-good-button')
const changeItemAcceptableButton = document.getElementById('change-item-acceptable-button')

const changeItemNewPrice = document.getElementById('change-item-new-price')
const changeItemExcellentPrice = document.getElementById('change-item-excellent-price')
const changeItemGoodPrice = document.getElementById('change-item-good-price')
const changeItemAcceptablePrice = document.getElementById('change-item-acceptable-price')

const changeItemGoodDiv = document.getElementById('change-item-good-div')
const changeItemAcceptableHeader = document.getElementById('change-item-acceptable-header')
const changeItemExcellentHeader = document.getElementById('change-item-excellent-header')
const changeItemListExcellent = document.getElementById('change-item-list-excellent')
const changeItemListAcceptable = document.getElementById('change-item-list-acceptable')

//Global Variables
var database = firebase.firestore()
var globalUserId
const cartridgeOnlyArray = ['Game Boy', 'Game Boy Color', 'Game Boy Advance', 'Nintendo GameCube', 'Nintendo 64', 'NES', 'Nintendo DS', 'Nintendo 3DS', 'Nintendo Switch']


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
}


function loadAuthUserCart(userID) {

    //Navigation and event listeners
    changeItemCloseModal.addEventListener('click', () => {
        $('#change-item-modal').fadeOut()
    })

    checkoutButton.addEventListener('click' , () => {
        location.href = 'https://www.thegametree.io/shop/gtcheckout'
    })


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

            orderSubtotal.innerHTML = '$-.--'
            orderShippingPrice.innerHTML = '$-.--'
            orderTax.innerHTML = '$-.--'
            orderTotal.innerHTML = '$-.--'
        }
    })
}



function buildCartItem(purchaseID, GTIN) {

    database.collection('catalog').doc(GTIN).get().then(function(doc) {

        var itemData = doc.data()

        const itemConditionDict = {
            'new' : 'New',
            'usedExcellent' : 'Used - Excellent',
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

            if(itemData.category == 'Games') {
                if(itemCondition == 'loose') {
                    if(cartridgeOnlyArray.includes(itemData.platform)) {
                        createDOMElement('div', 'cart-item-condition', 'Cartridge Only', cartItemInfoLeft)
    
                    } else {
                        createDOMElement('div', 'cart-item-condition', 'Disc(s) Only', cartItemInfoLeft)

                    }
                } else {
                    createDOMElement('div', 'cart-item-condition', 'Pre-Owned', cartItemInfoLeft)
                }
            } else {
                createDOMElement('div', 'cart-item-condition', itemConditionDict[itemCondition], cartItemInfoLeft)
            }

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
    var orderShipping = 0.00
    var taxAmount = 0.00
    var totalAmount = 0.00

    for (let item in cartItems) {
        if (cartItems.hasOwnProperty(item)) {
            database.collection('catalog').doc(cartItems[item]).get().then(function(doc) {
                var itemData = doc.data()
                var itemCondition = itemData.availability[item]
                var itemPrice = itemData.salePrices[itemCondition]

                subtotalAmount += parseFloat(itemPrice)

                if(subtotalAmount >= 50 ) {
                    orderShippingPrice.innerHTML = 'FREE'
                } else {
                    orderShippingPrice.innerHTML = '$3.79'
                    orderShipping = 3.79
                }

                totalAmount = subtotalAmount + taxAmount + orderShipping

                orderSubtotal.innerHTML = '$' + subtotalAmount
                orderTax.innerHTML = '$' + taxAmount
                orderTotal.innerHTML = '$' + totalAmount.toFixed(2)

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



function changeCartItem(GTIN, purchaseID) {
    $('#change-item-modal').fadeIn().css('display', 'flex')

    database.collection('catalog').doc(GTIN).onSnapshot( (doc) => {
        var data = doc.data()

        const itemConditionDict = {
            'new' : 'New',
            'usedExcellent' : 'Used - Excellent',
            'usedGood' : 'Used - Good',
            'usedAcceptable' : 'Used - Acceptable'
        }

        var saleData = data.salePrices
        var availabilityData = data.availability
        var itemCondition = availabilityData[purchaseID]

        while (changeItemHeaderDiv.firstChild) {
            changeItemHeaderDiv.removeChild(changeItemHeaderDiv.firstChild)
        }

        //Build item header div
        const itemImage = createDOMElement('img', 'cart-item-image', 'none', changeItemHeaderDiv)
        itemImage.src = data.productImage
        var changeItemCartInfo = createDOMElement('div', 'cart-item-info-left', 'none', changeItemHeaderDiv)
        createDOMElement('div', 'cart-item-title', data.general.productName, changeItemCartInfo)

        changeItemNewPrice.innerHTML = '$' + parseFloat(saleData.new).toFixed(2)
        changeItemExcellentPrice.innerHTML = '$' + parseFloat(saleData.usedExcellent).toFixed(2)

        if(data.category == 'Games') {
            changeItemExcellentHeader.innerHTML = 'Pre-Owned'

            changeItemGoodDiv.style.display = 'none'
            changeItemAcceptablePrice.innerHTML = '$' + parseFloat(saleData.loose).toFixed(2)

            while(changeItemListExcellent.firstChild) {
                changeItemListExcellent.removeChild(changeItemListExcellent.firstChild)
            }
            createDOMElement('div', 'list-item', '• Includes original case and insert(s), if applicable', changeItemListExcellent)
            createDOMElement('div', 'list-item', '• Tested and backed by the GameTree Guarantee', changeItemListExcellent)
    
            while(changeItemListAcceptable.firstChild) {
                changeItemListAcceptable.removeChild(changeItemListAcceptable.firstChild)
            }
            createDOMElement('div', 'list-item', '• Does not include original case', changeItemListAcceptable)
            createDOMElement('div', 'list-item', '• Tested and backed by the GameTree Guarantee', changeItemListAcceptable)


            if(itemCondition == 'loose') {

                if(cartridgeOnlyArray.includes(data.platform)) {
                    createDOMElement('div', 'cart-item-condition', 'Cartridge Only', changeItemCartInfo)
    
                } else {
                    createDOMElement('div', 'cart-item-condition', 'Disc(s) Only', changeItemCartInfo)
                }

                const itemPrice = '$' + saleData['loose']
                createDOMElement('div', 'cart-item-price', itemPrice, changeItemCartInfo)

            } else {
                createDOMElement('div', 'cart-item-condition', 'Pre-Owned', changeItemCartInfo)

                const itemPrice = '$' + saleData['usedExcellent']
                createDOMElement('div', 'cart-item-price', itemPrice, changeItemCartInfo)
            }

            if(cartridgeOnlyArray.includes(data.platform)) {
                changeItemAcceptableHeader.innerHTML = 'Cartridge Only'

            } else {
                changeItemAcceptableHeader.innerHTML = 'Disc(s) Only'     
            }

        } else {

            while(changeItemListExcellent.firstChild) {
                changeItemListExcellent.removeChild(changeItemListExcellent.firstChild)
            }
            createDOMElement('div', 'list-item', '• Little to no cosmetic signs of use', changeItemListExcellent)
            createDOMElement('div', 'list-item', '• No scratches, dents, or chips', changeItemListExcellent)
            createDOMElement('div', 'list-item', '• Includes all original parts/accessories', changeItemListExcellent)
    
            while(changeItemListAcceptable.firstChild) {
                changeItemListAcceptable.removeChild(changeItemListAcceptable.firstChild)
            }
            createDOMElement('div', 'list-item', '• Significant cosmetic signs of use', changeItemListAcceptable)
            createDOMElement('div', 'list-item', '• Any signs of use will not impact performance', changeItemListAcceptable)
            createDOMElement('div', 'list-item', '• Nonessential parts or accessories may be missing', changeItemListAcceptable)


            changeItemExcellentHeader.innerHTML = 'Used-Excellent'

            createDOMElement('div', 'cart-item-condition', itemConditionDict[itemCondition], changeItemCartInfo)
            changeItemAcceptablePrice.innerHTML = '$' + parseFloat(saleData.usedAcceptable).toFixed(2)

            const itemPrice = '$' + saleData[itemCondition]
            createDOMElement('div', 'cart-item-price', itemPrice, changeItemCartInfo)

            changeItemGoodDiv.style.display = 'flex'
        }

        changeItemGoodPrice.innerHTML = '$' + parseFloat(saleData.usedGood).toFixed(2)
      
        changeItemNewButton.className = 'pp-unavailable'
        changeItemExcellentButton.className = 'pp-unavailable'
        changeItemGoodButton.className = 'pp-unavailable'
        changeItemAcceptableButton.className = 'pp-unavailable'
      
        changeItemNewButton.innerHTML = 'UNAVAILABLE'
        changeItemExcellentButton.innerHTML = 'UNAVAILABLE'
        changeItemGoodButton.innerHTML = 'UNAVAILABLE'
        changeItemAcceptableButton.innerHTML = 'UNAVAILABLE'
      
        for (var item in availabilityData) {
          if (availabilityData.hasOwnProperty(item)) {
            switch(availabilityData[item]) {
              case 'new' : 
                changeItemNewButton.className = 'pp-add-to-cart'
                changeItemNewButton.innerHTML = 'Available'
                changeItemNewButton.setAttribute('onClick', `changeItemCondition("${GTIN}", "${item}", "${purchaseID}")`)
                break
      
              case 'usedExcellent' : 
                changeItemExcellentButton.className = 'pp-add-to-cart'
                changeItemExcellentButton.innerHTML = 'Available'
                changeItemExcellentButton.setAttribute('onClick', `changeItemCondition("${GTIN}", "${item}", "${purchaseID}")`)
                break
      
              case 'usedGood' : 
                changeItemGoodButton.className = 'pp-add-to-cart'
                changeItemGoodButton.innerHTML = 'Available'
                changeItemGoodButton.setAttribute('onClick', `changeItemCondition("${GTIN}", "${item}", "${purchaseID}")`)
                break
      
              case 'usedAcceptable' : 
                changeItemAcceptableButton.className = 'pp-add-to-cart'
                changeItemAcceptableButton.innerHTML = 'Available'
                changeItemAcceptableButton.setAttribute('onClick', `changeItemCondition("${GTIN}", "${item}", "${purchaseID}")`)
                break
            }
          }
        }
    })

}


function changeItemCondition(GTIN, newPurchaseID, oldPurchaseID) {

    var cartUpdateDict = {}
    cartUpdateDict[`cart.${oldPurchaseID}`] = firebase.firestore.FieldValue.delete()
    cartUpdateDict[`cart.${newPurchaseID}`] = GTIN

    database.collection('users').doc(globalUserId).update(cartUpdateDict).then( () => {
        $('#change-item-modal').fadeOut()
    })

}
