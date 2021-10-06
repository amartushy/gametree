//HTML Elements
const ordersAllTab = document.getElementById('orders-all-tab')
const ordersLocalTab = document.getElementById('orders-local-tab')
const ordersShipmentTab = document.getElementById('orders-shipment-tab')
const ordersDeliveredTab = document.getElementById('orders-delivered-tab')
const ordersSelectAllActions = document.getElementById('select-all-actions')

const ordersSearchField = document.getElementById('orders-search-field')
const ordersGridContainer = document.getElementById('orders-grid-container')

//Global Variables
var database = firebase.firestore()
var allOrderIDs = []
var selectedOrders = []
const itemConditionDict = {
    'new' : 'New',
    'usedFantastic' : 'Used - Excellent',
    'usedGood' : 'Used - Good',
    'usedAcceptable' : 'Used - Acceptable'
}
var isSelectingAllOrders = false


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

        allOrderIDs = []
        database.collection('orders').get().then( (querySnapshot) => {
            querySnapshot.forEach( (doc) => {

                allOrderIDs.push(doc.id)
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
        allOrderIDs = []
        database.collection('orders').where('orderStatus', '==', 'delivered').get().then( (querySnapshot) => {
            querySnapshot.forEach( (doc) => {
                allOrderIDs.push(doc.id)

                buildOrder(doc.id, doc.data())
            })
        })
    })

    ordersAllTab.click()

    ordersSelectAllActions.addEventListener('click', () => {
        selectedOrders = []
        isSelectingAllOrders = !isSelectingAllOrders
    
        if(isSelectingAllOrders) {
            ordersSelectAllActions.innerHTML = ''
            ordersSelectAllActions.className = 'order-action-check-box'
    
            allOrderIDs.forEach( (orderID) => {
                selectedOrders.push(orderID)
                var actionCheckbox = document.getElementById(`${orderID}-checkbox`)
                actionCheckbox.innerHTML = ''
                actionCheckbox.className = 'order-action-check-box'
            })    
    
        } else {
            selectedOrders = []
            ordersSelectAllActions.innerHTML = ''
            ordersSelectAllActions.className = 'order-action-check-box-empty'
    
            allOrderIDs.forEach( (orderID) => {
                var actionCheckbox = document.getElementById(`${orderID}-checkbox`)
                actionCheckbox.innerHTML = ''
                actionCheckbox.className = 'order-action-check-box-empty'
            })  
        }
    })

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
    buyShippingOption.setAttribute('onClick', `loadSingleShippingPage("${orderID}")`)
    const markOrderInTransit = createDOMElement('div', 'dropdown-option', 'Mark In-Transit', dropdownOptionsContainer)
    markOrderInTransit.setAttribute('onClick', `markOrderInTransit("${orderID}")`)
    const printPackingSlip = createDOMElement('div', 'dropdown-option', 'Print Packing Slip', dropdownOptionsContainer)
    printPackingSlip.setAttribute('onClick', `printPackingSlip("${orderID}")`)

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












function orderSelected(orderID) {
    //TODO: all of it
    const orderCheckbox = document.getElementById(`${orderID}-checkbox`)

    if(orderCheckbox.innerHTML == '') {
        orderCheckbox.innerHTML = ''
        orderCheckbox.className = 'order-action-check-box-empty'

        const index = selectedOrders.indexOf(orderID);
        if (index > -1) {
            selectedOrders.splice(index, 1);
        }
        console.log(selectedOrders)

    } else {
        orderCheckbox.innerHTML = ''
        orderCheckbox.className = 'order-action-check-box'
        selectedOrders.push(orderID)
        console.log(selectedOrders)
    }
}

function showDropdownOptions(orderID) {
    var dropdownOptionsContainer = document.getElementById(`${orderID}-dropdown-options-container`)

    if(dropdownOptionsContainer.style.display == 'none') {
        $(`#${orderID}-dropdown-options-container`).fadeIn()
    } else {
        $(`#${orderID}-dropdown-options-container`).fadeOut(200, () => {
            dropdownOptionsContainer.style.display = 'none'
        })
    }
}




const inTransitModal = document.getElementById('in-transit-modal')
const closeInTransitModal = document.getElementById('close-in-transit-modal')
const inTransitOrderNumber = document.getElementById('in-transit-order-number')
const inTransitDriversArea = document.getElementById('in-transit-drivers-area')

closeInTransitModal.addEventListener('click', () => {
    $('#in-transit-modal').fadeOut()
})


function markOrderInTransit(orderID) {

    $('#in-transit-modal').fadeIn().css('display', 'flex')

    inTransitOrderNumber.innerHTML = orderID

    while(inTransitDriversArea.firstChild) {
        inTransitDriversArea.removeChild(inTransitDriversArea.firstChild)
    }

    database.collection('users').where('isDriver', '==', true ).get().then( (querySnapshot) => {
        querySnapshot.forEach( (doc) => {
            var driverData = doc.data()
            console.log(driverData)

            const ordersDriverBlock = createDOMElement('div', 'orders-driver-block', 'none', inTransitDriversArea)
            const ordersDriverImage = createDOMElement('img', 'orders-driver-image', 'none', ordersDriverBlock)
            ordersDriverImage.src = driverData.profileImage
            const ordersDriverInfoDiv = createDOMElement('div', 'orders-driver-info-div', 'none', ordersDriverBlock)
            createDOMElement('div', 'orders-driver-name', driverData.name, ordersDriverInfoDiv)
            createDOMElement('div', 'orders-driver-car-model', driverData.carModel, ordersDriverInfoDiv)
            const ordersDriverSelectButton = createDOMElement('div', 'orders-driver-select-button', 'Select', ordersDriverBlock)
            ordersDriverSelectButton.setAttribute('onClick', `selectDriverForOrder("${orderID}", "${doc.id}", "${driverData.name}", "${driverData.profileImage}", "${driverData.carModel}", "${driverData.PhoneNumber}")`)
        })
    })
}




function selectDriverForOrder(orderID, driverID, driverName, driverPhoto, driverCarModel, driverPhoneNumber) {

    console.log(orderID, driverID, driverName, driverPhoto, driverCarModel)
    var driverUpdateDict = {
        'driverID' : driverID,
        'driverName': driverName,
        'driverPhoto' : driverPhoto,
        'driverCarModel' : driverCarModel,
        'driverPhoneNumber' : driverPhoneNumber,
        'driverLocation' : {
            'lat' : '',
            'lng' : ''
        }
    }

    if(driverID = firebase.auth().currentUser) {
        navigator.geolocation.getCurrentPosition( (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            driverUpdateDict.driverLocation = pos

            database.collection('orders').doc(orderID).get().then( (doc) => {
                var data = doc.data()

                database.collection('orders').doc(orderID).update({
                    'deliveryInfo' : driverUpdateDict,
                    'orderStatus' : 'in-transit'
                })

                database.collection('users').doc(data.customerID).collection('orders').doc(orderID).update({
                    'deliveryInfo' : driverUpdateDict,
                    'orderStatus' : 'in-transit'
                })

                if(data.deliveryUpdates) {
                    var object = {
                        'number' : data.phoneNumber,
                        'driverName' : getFirstName(driverName),
                        'url' : 'www.thegametree.io/track-delivery'
                    }
                                            
                    sendDeliverySMSTo(object)
                }

                closeInTransitModal.click()
            })
        });
    } else {
        console.log(driverUpdateDict)
    }
}



function sendDeliverySMSTo(object) {
    // Create an XHR object
	var xhttp = new XMLHttpRequest();
    
    var herokuURL = "https://gametree-web.herokuapp.com/sendDeliverySMSTo"

    // open a connection
	xhttp.open("POST", herokuURL, true);

    // Set the request header i.e. which type of content you are sending
    xhttp.setRequestHeader("Content-Type", "application/json");

    // Create a state change callback
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {

            // Print received data from server
            console.log(this.responseText)

        }
    };

    // Converting JSON data to string
    var data = JSON.stringify(object);

    console.log(data)
	xhttp.send(data);
}
