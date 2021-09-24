

//HTML Elements
const accountHeaderMain = document.getElementById('account-header-main')
const accountSignOutButton = document.getElementById('sign-out-button')

const upcomingOrdersArea = document.getElementById('upcoming-orders-area')
const usersProductsArea = document.getElementById('users-products-area')

const deliveryAddressesContainer = document.getElementById('delivery-addresses-container')
const settingsName = document.getElementById('settings-name')
const settingsEmail = document.getElementById('settings-email')
const settingsPassword = document.getElementById('settings-password')
const settingsNameChange = document.getElementById('settings-name-change')
const settingsEmailChange = document.getElementById('settings-email-change')
const settingsPasswordChange = document.getElementById('settings-password-change')
const deliveryCheckbox = document.getElementById('delivery-checkbox')
const promotionsCheckbox = document.getElementById('promotions-checkbox')

//Global Variables
var database = firebase.firestore()

//Onload
window.onload = () => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            database.collection('users').doc(user.uid).get().then(function(doc) {
                let data = doc.data()

                loadAccountPage(user.uid, data)

                accountHeaderMain.innerHTML = `Welcome back, ${getFirstName(data.name)}`

                accountSignOutButton.addEventListener('click', () => {
                    firebase.auth().signOut().then(() => {
                        // Sign-out successful.
                      }).catch((error) => {
                        // An error happened.
                        console.log(error.message)
                      });
                })
            })
        } else {
            location.href = 'https://www.thegametree.io/login'
        }
    })
}



function loadAccountPage(userID, userData) {
    loadProductsAndOrders(userID, userData)
    loadAccountDetailsAndSettings(userID)
}




function loadProductsAndOrders(userID, userData) {
    while(upcomingOrdersArea.firstChild) {
        upcomingOrdersArea.removeChild(upcomingOrdersArea.firstChild)
    }
    
    while(usersProductsArea.firstChild) {
        usersProductsArea.removeChild(usersProductsArea.firstChild)
    }

    var hasUpcomingOrders = false
    var hasPastOrders = false

    database.collection('users').doc(userID).collection('orders').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            hasPastOrders = true

            var orderID = doc.id 
            var orderData = doc.data()

            if(orderData.orderStatus != 'delivered') {
                hasUpcomingOrders = true
                buildUpcomingOrder(orderID, orderData)
            }

            var orderItems = orderData.checkoutItems

            for (let item in orderItems) {
                if(orderItems.hasOwnProperty(item)) {
                    buildUsersProducts(orderID, orderItems[item], orderData.deliveredDate)
                }
            }
        })
    }).catch((error) => {
        //TODO: display no orders/products
        console.log("Error getting documents: ", error);
    });
}



function buildUpcomingOrder(orderID, orderData) {

    var firstProduct = orderData.checkoutItems[Object.keys(orderData.checkoutItems)[0]]
    const conditionDict = {
        'usedAcceptable' : 'Used - Acceptable',
        'usedGood' : 'Used - Good',
        'usedFantastic' : 'Used - Excellent',
        'new' : 'New'
    }


    const upcomingOrderContainer = createDOMElement('div', 'upcoming-order-container', 'none', upcomingOrdersArea)
    createDOMElement('div', 'account-order-header', `ORDER NUMBER: ${orderID}`, upcomingOrderContainer)
    createDOMElement('div', 'account-order-header', 'DELIVERY STATUS:', upcomingOrderContainer)
    switch (orderData.orderStatus) {
        case 'processing' :
            createDOMElement('div', 'order-processing-text', 'PROCESSING', upcomingOrderContainer)
            break;

        case 'in transit' :
            createDOMElement('div', 'order-in-transit-text', 'IN TRANSIT', upcomingOrderContainer)
            break;

        case 'shipped' :
            createDOMElement('div', 'order-in-transit-text', 'SHIPPED', upcomingOrderContainer)
            break;

        case 'delivered' :
            createDOMElement('div', 'order-delivered-text', 'DELIVERED', upcomingOrderContainer)
            break
    }

    const upcomingOrderItemHeader = createDOMElement('div', 'upcoming-order-item-header', 'none', upcomingOrderContainer)
    createDOMElement('div', 'account-order-header', `item 1 of ${Object.keys(orderData.checkoutItems).length}`, upcomingOrderItemHeader)
    const showAllButton = createDOMElement('div', 'account-button-text', 'Show all', upcomingOrderItemHeader)
    showAllButton.setAttribute('onClick', `showAllItemsInOrder("${orderID}")`)

    const upcomingOrderItemBlock = createDOMElement('div', 'upcoming-order-item-block', 'none', upcomingOrderContainer)
    const upcomingOrderImage = createDOMElement('img', 'upcoming-order-image', 'none', upcomingOrderItemBlock)
    upcomingOrderImage.src = firstProduct.productImage
    const upcomingOrderItemTextContainer = createDOMElement('div', 'upcoming-order-item-text-container', 'none', upcomingOrderItemBlock)
    createDOMElement('div', 'account-order-product-title', firstProduct.productName, upcomingOrderItemTextContainer)
    createDOMElement('div', 'account-text-small', conditionDict[firstProduct.condition], upcomingOrderItemTextContainer)
    createDOMElement('div', 'account-text-small', `$${firstProduct.price}`, upcomingOrderItemTextContainer)

    const trackOrderButton = createDOMElement('div', 'track-order-button', 'TRACK ORDER', upcomingOrderContainer)
    trackOrderButton.setAttribute('onClick', `showOrderTracking("${orderID}")`)

}

function buildUsersProducts(orderID, productData, deliveredDate) {

    const usersProductBlock = createDOMElement('div', 'users-product-block', 'none', usersProductsArea)
    const usersProductImage = createDOMElement('img', 'users-product-image', 'none', usersProductBlock)
    usersProductImage.src = productData.productImage 
    createDOMElement('div', 'users-product-title', productData.productName, usersProductBlock)

    if(deliveredDate) {
        const formattedDateObject = getFormattedDate(deliveredDate)
        const formattedDateStr = `Delivered on ${formattedDateObject[0]} ${formattedDateObject[1]}, ${formattedDateObject[2]}`
        createDOMElement('div', 'users-product-pending-text', formattedDateStr, usersProductBlock)
    } else {
        createDOMElement('div', 'users-product-pending-text', 'Pending Delivery', usersProductBlock)
    }

    usersProductBlock.setAttribute('onClick', `showUsersProductDetails("${orderID}")`)
}


function showOrderTracking(orderID) {
    //TODO: All of it
    console.log(`Showing tracking for ${orderID}`)
}


function showAllItemsInOrder(orderID) {
    //TODO: All of it
    console.log(`Showing all items for order ${orderID}`)
}


function showUsersProductDetails(orderID) {
    //TODO: All of it
    console.log(`Showing product details ${orderID}`)
}
