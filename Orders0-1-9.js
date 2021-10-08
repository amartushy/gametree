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
    printPackingSlip.setAttribute('onClick', `loadPackingSlipPage("${orderID}")`)

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
        
        case 'shipped' :
            createDOMElement('div', 'order-status-in-transit-grid-div', 'SHIPPED', orderItemGridBlock)
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









//Packing Slips_______________________________________________________
//HTML Elements
const packingSlipScreen = document.getElementById('packing-slip-screen')
packingSlipScreen.classList.add('printPackingSlip')

const packingSlipName = document.getElementById('packing-slip-name')
const packingSlipAddress1 = document.getElementById('packing-slip-address1')
const packingSlipAddress2 = document.getElementById('packing-slip-address2')
const packingSlipCityState = document.getElementById('packing-slip-city-state')

const packingSlipOrderID = document.getElementById('packing-slip-order-id')
const packingSlipOrderDate = document.getElementById('packing-slip-order-date')
const packingSlipItemsArea = document.getElementById('packing-slip-items-area')

const packingSlipSubtotal = document.getElementById('packing-slip-subtotal')
const packingSlipShipping = document.getElementById('packing-slip-shipping')
const packingSlipSalesTax = document.getElementById('packing-slip-sales-tax')
const packingSlipDiscount = document.getElementById('packing-slip-discount')
const packingSlipTotal = document.getElementById('packing-slip-total')


//Global Variables

function loadPackingSlipPage(orderID) {
    while(packingSlipItemsArea.firstChild) {
        packingSlipItemsArea.removeChild(packingSlipItemsArea.firstChild)
    }

    database.collection('orders').doc(orderID).get().then( (doc) => {

        var orderData = doc.data()

        packingSlipName.innerHTML = orderData.shippingAddress.firstName + ' ' + orderData.shippingAddress.lastName
        packingSlipAddress1.innerHTML = orderData.shippingAddress.address1
        if(orderData.shippingAddress.address2 != "") {
            packingSlipAddress2.innerHTML = orderData.shippingAddress.address2
            packingSlipAddress2.style.display = 'flex'
        } else {
            packingSlipAddress2.style.display = 'none'
        }
        packingSlipCityState.innerHTML = `${orderData.shippingAddress.city}, ${orderData.shippingAddress.state} ${orderData.shippingAddress.zipCode}`

        packingSlipOrderID.innerHTML = `ORDER ID: ${orderID}`
        var dateObject = getFormattedDate(parseFloat(orderData.orderDate) / 1000)
        var dateString = `${dateObject[0]} ${dateObject[1]}, ${dateObject[2]} ${dateObject[3]}`
        packingSlipOrderDate.innerHTML = `Order Date: ${dateString}`

        var orderItems = orderData.checkoutItems
        for (var item in orderItems) {
            if (orderItems.hasOwnProperty(item)) {
                var packingSlipItemBlock = createDOMElement('div', 'packing-slip-item-block', 'none', packingSlipItemsArea)
                var packingSlipTextBlock = createDOMElement('div', 'packing-slip-item-text-block', 'none', packingSlipItemBlock)
                createDOMElement('div', 'packing-slip-item-text', `${orderItems[item].productName} - ${itemConditionDict[orderItems[item].condition]}`, packingSlipTextBlock)
                createDOMElement('div', 'packing-slip-item-text', `Item ID: ${item}`, packingSlipTextBlock)
                createDOMElement('div', 'packing-slip-item-text-small', '1', packingSlipItemBlock)
                createDOMElement('div', 'packing-slip-item-text-small', orderItems[item].price, packingSlipItemBlock)
            }
        }

        packingSlipSubtotal.innerHTML = '$' + orderData.itemSubtotal
        packingSlipShipping.innerHTML = '$0.00'
        packingSlipSalesTax.innerHTML = '$' + parseFloat(orderData.tax).toFixed(2)
        packingSlipDiscount.innerHTML = '$0.00'
        packingSlipTotal.innerHTML = '$' + orderData.checkoutTotal

        window.print()
    })
}





//Buy Shipping____________________________________________________________________________________________________________________________________
//HTML Elements
const inventoryPage = document.getElementById('inventory-page')
const loadingScreen = document.getElementById('loading-screen')
inventoryPage.classList.add('inventoryHide')

const singleShippingPage = document.getElementById('single-shipping-page')
const singleShippingModalBack = document.getElementById('single-shipping-modal-back')
const singleShippingOptionsArea = document.getElementById('single-shipping-options-area')
const singleShippingLoadingContainer = document.getElementById('single-shipping-loading-container')
const singleShippingPrice = document.getElementById('single-shipping-price')
const buySingleShippingButton = document.getElementById('buy-single-shipping-button')
const calculateShippingRates = document.getElementById('calculate-shipping-rates')

const weightLbField = document.getElementById('weight-lb-field')
const weightOzField = document.getElementById('weight-oz-field')
const lengthField = document.getElementById('length-field')
const widthField = document.getElementById('width-field')
const heightField = document.getElementById('height-field')


//Global Variables
var shippingObject = {}
var globalShippingOptions = {}
var globalShippingID

//Event Listeners
singleShippingModalBack.addEventListener('click', () => {
    $('#single-shipping-page').fadeOut(200, () => {
        $('#inventory-page').fadeIn().css('display', 'flex')
    })
})

buySingleShippingButton.addEventListener('click', () => {
    singleShippingPage.style.display = 'none'
    loadingScreen.style.display = 'flex'

    var xhttp = new XMLHttpRequest();
    var herokuURL = `https://gametree-web.herokuapp.com/purchaseShippingLabel/${globalShippingID}`
    xhttp.open("GET", herokuURL, true);

    xhttp.onreadystatechange = function () {
        
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            loadingScreen.style.display = 'none'
            $('#inventory-page').fadeIn().css('display', 'flex')

            responseObject = JSON.parse(this.responseText)

            var shippingDict = {
                'trackingNumber' : responseObject['tracking_number'],
                'labelPurchasedBy' : responseObject['object_owner'],
                'labelCreated' : responseObject['object_created'],
                'labelURL' : responseObject['label_url'],
                'trackingStatus' : responseObject['tracking_status'],
                'trackingProvider' : responseObject['tracking_url_provider'],
            }

            database.collection('orders').doc(shippingObject.orderID).update({
                'shippingInfo' : shippingDict,
                'orderStatus' : 'shipped'
            })

            window.open(shippingDict.labelURL)
        }
    };

    xhttp.send();
})

calculateShippingRates.addEventListener('click', () => {
    var parcelWeight = parseFloat(weightLbField.value) + ( parseFloat(weightOzField.value) / 16 )
    shippingObject.parcelWeight = parcelWeight.toFixed(2)

    shippingObject.parcelLength = lengthField.value
    shippingObject.parcelWidth = widthField.value
    shippingObject.parcelHeight = heightField.value

    getShippingRatesFromServer()
})


function loadSingleShippingPage(orderID) {
    $('#inventory-page').fadeOut(200, () => {
        $('#single-shipping-page').fadeIn().css('display', 'flex')
    })

    while (singleShippingOptionsArea.firstChild) {
        singleShippingOptionsArea.removeChild(singleShippingOptionsArea.firstChild)
    }

    singleShippingLoadingContainer.style.display = 'none'

    singleShippingPrice.innerHTML = '$-.--'
    buySingleShippingButton.className = 'purchase-shipping-label-unavailable'

    globalShippingOptions = {}

    shippingObject = {
        'orderID' : orderID,
        'destinationName' : '',
        'destinationStreet1' : '',
        'destinationStreet2' : '',
        'destinationCity' : '',
        'destinationState' : '',
        'destinationZipcode' : '',
        'destinationCountry' : '',
        'parcelLength' : '',
        'parcelWidth' : '',
        'parcelHeight' : '',
        'parcelWeight' : '',
    }

    database.collection('orders').doc(orderID).get().then( (doc) => {
        var orderData = doc.data()

        shippingObject.destinationName = orderData.shippingAddress.firstName + ' ' + orderData.shippingAddress.lastName
        shippingObject.destinationStreet1 = orderData.shippingAddress.address1
        shippingObject.destinationStreet2 = orderData.shippingAddress.address2
        shippingObject.destinationCity = orderData.shippingAddress.city
        shippingObject.destinationState = orderData.shippingAddress.state
        shippingObject.destinationZipcode = orderData.shippingAddress.zipCode
        shippingObject.destinationCountry = 'US'
    })

    weightLbField.value = 0
    weightOzField.value = 0
    lengthField.value = 0
    widthField.value = 0
    heightField.value = 0
}


function getShippingRatesFromServer() {
    while (singleShippingOptionsArea.firstChild) {
        singleShippingOptionsArea.removeChild(singleShippingOptionsArea.firstChild)
    }
    singleShippingLoadingContainer.style.display = 'flex'
    globalShippingOptions = {}

        // Create an XHR object
	var xhttp = new XMLHttpRequest();
    
    var herokuURL = "https://gametree-web.herokuapp.com/getShippingRates"

    // open a connection
	xhttp.open("POST", herokuURL, true);

    // Set the request header i.e. which type of content you are sending
    xhttp.setRequestHeader("Content-Type", "application/json");

    // Create a state change callback
    xhttp.onreadystatechange = function () {

        if (xhttp.readyState === 4 && xhttp.status === 200) {

            singleShippingLoadingContainer.style.display = 'none'
            // Print received data from server
            var responseObject = JSON.parse(this.responseText)
            console.log(responseObject)
            buildShippingOptions(responseObject.rates)

        }
    };

    // Converting JSON data to string
    var data = JSON.stringify(shippingObject);
    console.log(shippingObject)
	xhttp.send(data);
}


function buildShippingOptions(shippingOptions) {

    shippingOptions.forEach( (option) => {
        var shippingID = option['object_id']
        globalShippingOptions[shippingID] = option

        const singleShippingOptionBlock = createDOMElement('div', 'shipping-service-option-block', 'none', singleShippingOptionsArea)

        const shippingServiceTitleDiv = createDOMElement('div', 'shipping-service-title-div', 'none',  singleShippingOptionBlock)
        const shippingOptionSelector = createDOMElement('div', 'shipping-option-unselected', 'none',  shippingServiceTitleDiv)
        shippingOptionSelector.setAttribute('id', `${shippingID}-selector`)
        shippingOptionSelector.setAttribute('onClick', `selectShippingOption("${shippingID}")`)
        const shippingOptionUnselectedHeader = createDOMElement('div', 'shipping-option-unselected-header', option.servicelevel.name, shippingServiceTitleDiv)
        shippingOptionUnselectedHeader.setAttribute('id', `${shippingID}-header`)
        var shippingAttributes = option.attributes
        if(shippingAttributes.length > 0) {
            shippingAttributes.forEach( (attribute) => {
                if(attribute == 'CHEAPEST') {
                    const shippingCheapestDiv = createDOMElement('div', 'shipping-cheapest-div', 'none', shippingServiceTitleDiv)
                    createDOMElement('div', 'shipping-cheapest-check', '', shippingCheapestDiv)
                    createDOMElement('div', 'shipping-cheapest-text', 'CHEAPEST', shippingCheapestDiv)
                }
            })
        }

        const shippingCarrierImageContainer = createDOMElement('div', 'shipping-service-info-div', 'none', singleShippingOptionBlock)
        const shippingCarrierImage = createDOMElement('img', 'shipping-carrier-image', 'none', shippingCarrierImageContainer)
        shippingCarrierImage.src = option['provider_image_200']

        const deliveryDateDiv = createDOMElement('div', 'shipping-service-info-div', 'none', singleShippingOptionBlock)
        createDOMElement('div', 'shipping-service-info-text', `${option['estimated_days']} days`, deliveryDateDiv)

        const deliveryPriceDiv = createDOMElement('div', 'shipping-service-info-div', 'none', singleShippingOptionBlock)
        createDOMElement('div', 'shipping-service-info-text', `$${option['amount']}`, deliveryPriceDiv)

    })
    console.log(shippingOptions)
}

function selectShippingOption(shippingID) {

    globalShippingID = shippingID

    for (var option in globalShippingOptions) {
        if (globalShippingOptions.hasOwnProperty(option)){

            var optionSelector = document.getElementById(`${option}-selector`)
            optionSelector.className = 'shipping-option-unselected'
            optionSelector.innerHTML = ''
        }
    }

    var optionSelected = document.getElementById(`${shippingID}-selector`)
    optionSelected.className = 'shipping-option-selected'
    optionSelected.innerHTML = ''

    buySingleShippingButton.className = 'purchase-shipping-label'
    singleShippingPrice.innerHTML = '$' + globalShippingOptions[shippingID].amount

}
