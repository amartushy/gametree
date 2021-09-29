

//HTML Elements
const accountHeaderMain = document.getElementById('account-header-main')
const accountSignOutButton = document.getElementById('sign-out-button')

const upcomingOrdersArea = document.getElementById('upcoming-orders-area')
const usersProductsArea = document.getElementById('users-products-area')

const settingsName = document.getElementById('settings-name')
const settingsNumber = document.getElementById('settings-number')
const settingsPassword = document.getElementById('settings-password')
const settingsNameChange = document.getElementById('settings-name-change')
const settingsNumberChange = document.getElementById('settings-number-change')
const settingsPasswordChange = document.getElementById('settings-password-change')
const deliveryAddressesContainer = document.getElementById('delivery-addresses-container')
const addAddressButton = document.getElementById('add-address-button')
const deliveryCheckbox = document.getElementById('delivery-checkbox')
const promotionsCheckbox = document.getElementById('promotions-checkbox')

//Account Settings Modal
const closeSettingsModal = document.getElementById('close-settings-modal')
const settingsNameField = document.getElementById('settings-name-field')
const settingsNameButton = document.getElementById('settings-name-button')
const settingsNumberField = document.getElementById('settings-number-field')
const settingsNumberButton = document.getElementById('settings-number-button')
const changePasswordToggle = document.getElementById('change-password-toggle')
const changePasswordChevron = document.getElementById('change-password-chevron')
const changePasswordContainer = document.getElementById('change-password-container')
const currentPasswordField = document.getElementById('current-password-field')
const newPasswordField = document.getElementById('new-password-field')
const confirmNewPasswordField = document.getElementById('confirm-new-password-field')
const changePasswordButton = document.getElementById('change-password-button')
const passwordErrorBlock = document.getElementById('password-error-block')
const passwordErrorText = document.getElementById('password-error-text')

//Address Modal
const closeAddressModal = document.getElementById('close-address-modal')
const addressTitleField = document.getElementById('address-title-field')
const addressTitleError = document.getElementById('address-title-error')
const addressFirstField =  document.getElementById('address-first-field')
const addressLastField = document.getElementById('address-last-field')
const address1Field = document.getElementById('address-1-field')
const addressAddSecond = document.getElementById('address-add-second')
const address2Field = document.getElementById('address-2-field')
const addressCityField = document.getElementById('address-city-field')
const addressStateDropdown = document.getElementById('address-state-dropdown')
const addressStateDropdownText = document.getElementById('address-state-dropdown-text')
const addressStateDropdownChevron = document.getElementById('address-state-dropdown-chevron')
const addressStateDropdownOptions = document.getElementById('address-state-dropdown-options')
const addressZipcodeField = document.getElementById('address-zipcode-field')

const addressFirstError = document.getElementById('address-first-error')
const addressLastError = document.getElementById('address-last-error')
const address1Error = document.getElementById('address-1-error')
const addressCityError = document.getElementById('address-city-error')
const addressStateError = document.getElementById('address-state-error')
const addressZipcodeError = document.getElementById('address-zipcode-error')

const submitAddressButton = document.getElementById('submit-address-button')

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

    loadSettingsModal(userID, userData)
    loadAddressModal(userID)
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
    location.href = 'https://www.thegametree.io/track-delivery'
}


function showAllItemsInOrder(orderID) {
    //TODO: All of it
    console.log(`Showing all items for order ${orderID}`)
}


function showUsersProductDetails(orderID) {
    //TODO: All of it
    console.log(`Showing product details ${orderID}`)
}
