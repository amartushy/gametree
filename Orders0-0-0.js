//HTML Elements
const ordersAllTab = document.getElementById('orders-all-tab')
const ordersLocalTab = document.getElementById('orders-local-tab')
const ordersShipmentTab = document.getElementById('orders-shipment-tab')
const ordersDeliveredTab = document.getElementById('orders-delivered-tab')

const ordersSearchField = document.getElementById('orders-search-field')
const ordersGridContainer = document.getElementById('orders-grid-container')

//Global Variables
var database = firebase.firestore()
var selectedOrders = []
const itemConditionDict = {
    'new' : 'New',
    'usedFantastic' : 'Used - Excellent',
    'usedGood' : 'Used - Good',
    'usedAcceptable' : 'Used - Acceptable'
}

window.onload = () => {

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            database.collection('users').doc(user.uid).get().then(function(doc) {
                let data = doc.data()
                
                if(data.isAdmin) {
                    loadOrdersPage()
                } else {
                    location.href = 'https://www.thegametree.io/login'
                }
            })
        } else {
            location.href = 'https://www.thegametree.io/login'
        }
    })
}


function loadOrdersPage() {

    while(ordersGridContainer.firstChild) {
        ordersGridContainer.removeChild(ordersGridContainer.firstChild)
    }

    ordersAllTab.addEventListener('click', () => {
        while(ordersGridContainer.firstChild) {
            ordersGridContainer.removeChild(ordersGridContainer.firstChild)
        }
        
        database.collection('orders').get().then( (querySnapshot) => {
            querySnapshot.forEach( (doc) => {
                buildOrder(doc.id, doc.data())
            })
        })
    })

    //TODO
    ordersLocalTab.addEventListener('click', () => {
        buildOrders('local')
    })

    //TODO
    ordersShipmentTab.addEventListener('click', () => {
        buildOrders('shipments')
    })

    ordersDeliveredTab.addEventListener('click', () => {
        while(ordersGridContainer.firstChild) {
            ordersGridContainer.removeChild(ordersGridContainer.firstChild)
        }
        
        database.collection('orders').where('orderStatus', '==', 'delivered').get().then( (querySnapshot) => {
            querySnapshot.forEach( (doc) => {
                buildOrder(doc.id, doc.data())
            })
        })
    })

    ordersAllTab.click()
}




function buildOrder(orderID, orderData) {

    const orderItemGridBlock = createDOMElement('div', 'order-item-grid-block', 'none', ordersGridContainer)

    //Order Actions Div
    const orderActionsGridDiv = createDOMElement('div', 'order-actions-grid-div', 'none', orderItemGridBlock)
    const orderActionCheckBox = createDOMElement('div', 'order-action-check-box-empty', 'none', orderActionsGridDiv)
    orderActionCheckBox.innerHTML = ''
    orderActionCheckBox.setAttribute('onClick', `orderSelected("${orderID}")`)
    orderActionCheckBox.setAttribute('id', `${orderID}-checkbox`)
    const orderActionsDropdownContainer = createDOMElement('div', 'order-actions-dropdown-container', 'none', orderActionsGridDiv)
    const orderActionButton = createDOMElement('div', 'order-action-button', 'none', orderActionsDropdownContainer)
    orderActionButton.setAttribute('onClick', `showDropdownOptions("${orderID}")`)
    createDOMElement('div', 'dropdown-button-text', 'Actions', orderActionButton)
    const dropdownButtonChevron = createDOMElement('div', 'dropdown-button-chevron', '', orderActionButton)
    const dropdownOptionsContainer = createDOMElement('div', 'dropdown-options-container', 'none', orderActionsDropdownContainer)
    dropdownOptionsContainer.setAttribute('id', `${orderID}-dropdown-options-container`)
    dropdownOptionsContainer.style.display = 'none'
    const buyShippingOption = createDOMElement('div', 'dropdown-option', 'Buy Shipping', dropdownOptionsContainer)
    buyShippingOption.setAttribute('onClick', `buyShippingForOrder("${orderID}")`)
    const markOrderInTransit = createDOMElement('div', 'dropdown-option', 'Mark In-Transit', dropdownOptionsContainer)
    markOrderInTransit.setAttribute('onClick', `markOrderInTransit("${orderID}")`)

    //Order Details Div
    const orderDetailsGridDiv = createDOMElement('div', 'order-details-grid-div', 'none', orderItemGridBlock)
    const orderDetailsGridTop = createDOMElement('div', 'order-details-grid-top', 'none', orderDetailsGridDiv)
    createDOMElement('div', 'order-item-text', orderID, orderDetailsGridTop)
    if(orderData.trackingNumber) {
        createDOMElement('div', 'order-item-text', `Tracking: ${orderData.trackingNumber}`, orderDetailsGridTop)
    } else {
        //TODO: tracking for local vs shipping
        createDOMElement('div', 'order-item-text', `Tracking: None Set`, orderDetailsGridTop)
    }
    const orderDetailsGridBottom = createDOMElement('div', 'order-details-grid-bottom', 'none', orderDetailsGridDiv)
    var orderItems = orderData.checkoutItems
    for (var item in orderItems) {
        if (orderItems.hasOwnProperty(item)) {
            var orderItemBlock = createDOMElement('div', 'order-item-block', 'none', orderDetailsGridBottom)
            var orderItemImage = createDOMElement('img', 'order-item-image', 'none', orderItemBlock)
            orderItemImage.src = orderItems[item].productImage
            var orderItemInfoBlock = createDOMElement('div', 'order-item-info-block', 'none', orderItemBlock)
            createDOMElement('div', 'order-item-purchase-id', item, orderItemInfoBlock)
            createDOMElement('div', 'order-item-text', orderItems[item].productName, orderItemInfoBlock)
            createDOMElement('div', 'order-item-text', itemConditionDict[orderItems[item].condition], orderItemInfoBlock)
            createDOMElement('div', 'order-item-text', '$' + orderItems[item].price, orderItemInfoBlock)
        }
    }

    //Customer Info Div
    const orderCustomerGridDiv = createDOMElement('div', 'order-customer-grid-div', 'none', orderItemGridBlock)
    createDOMElement('div', 'order-item-text', orderData.billingAddress.firstName + ' ' + orderData.billingAddress.lastName, orderCustomerGridDiv)
    createDOMElement('div', 'order-item-text', orderData.emailAddress, orderCustomerGridDiv)
    createDOMElement('div', 'order-item-text', orderData.phoneNumber, orderCustomerGridDiv)

    //Sold, Total, and Date
    createDOMElement('div', 'order-sold-grid-div', '$' + orderData.itemSubtotal, orderItemGridBlock)
    createDOMElement('div', 'order-total-grid-div', '$' + orderData.checkoutTotal, orderItemGridBlock)
    var dateObject = getFormattedDate(orderData.orderDate)
    var dateString = `${dateObject[0]} ${dateObject[1]}, ${dateObject[2]} ${dateObject[3]}`
    createDOMElement('div', 'order-date-grid-div', dateString, orderItemGridBlock)

    //Destination Div
    const orderDestinationGridDiv = createDOMElement('div', 'order-destination-grid-div', 'none', orderItemGridBlock)
    createDOMElement('div', 'order-item-text', orderData.shippingAddress.firstName + ' ' + orderData.shippingAddress.lastName, orderDestinationGridDiv)
    if(orderData.shippingAddress.address2 != "") {
        createDOMElement('div', 'order-item-text', `${orderData.shippingAddress.address1}, ${orderData.shippingAddress.address2}`, orderDestinationGridDiv)
    } else {
        createDOMElement('div', 'order-item-text', orderData.shippingAddress.address1, orderDestinationGridDiv)
    }
    createDOMElement('div', 'order-item-text', `${orderData.shippingAddress.city}, ${orderData.shippingAddress.state} ${orderData.shippingAddress.zipCode}`, orderDestinationGridDiv)

    //Status
    switch(orderData.orderStatus) {
        case 'processing' :
            createDOMElement('div', 'order-status-processing-grid-div', 'PROCESSING', orderItemGridBlock)
            break;
        
        case 'in-transit' :
            createDOMElement('div', 'order-status-in-transit-grid-div', 'IN TRANSIT', orderItemGridBlock)
            break;
        
        case 'delivered' :
            createDOMElement('div', 'order-status-delivered-grid-div', 'DELIVERED', orderItemGridBlock)
            break;
    } 
}
