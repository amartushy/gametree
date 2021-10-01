//HTML Elements
const driverInfoContainer = document.getElementById('driver-info-container')
const estimatedDeliveryTime = document.getElementById('estimated-delivery-time')

const customerAddressName = document.getElementById('customer-address-name')
const customerAddress = document.getElementById('customer-address')
const customerAddressCity = document.getElementById('customer-address-city')
const customerAddressNumber = document.getElementById('customer-address-number')
const customerNotifications = document.getElementById('customer-notifications')

const deliveryOrderDate = document.getElementById('delivery-order-date')
const deliveryOrderNumber = document.getElementById('delivery-order-number')
const deliveryItemsArea = document.getElementById('delivery-items-area')



//Global Variables
var database = firebase.firestore()
var globalUserID
const conditionDict = {
    'usedAcceptable' : 'Used - Acceptable',
    'usedGood' : 'Used - Good',
    'usedFantastic' : 'Used - Excellent',
    'new' : 'New'
}
var destinationLatLng, driverLatLng
var customDriverMarker
let map, infoWindow, geocoder;


window.onload = () => {
    initializeMap()

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            globalUserID = user.uid 

            var ordersRef = database.collection('orders').where('customerID', '==', globalUserID).where('orderStatus', 'in', ['processing', 'in-transit'])

            ordersRef.get().then((querySnapshot) => {

                querySnapshot.forEach((doc) => {       
                    let orderData = doc.data()

                    loadDeliveryPage(doc.id, orderData)

                    if(globalUserID == orderData.deliveryInfo.driverID) {
                        updateDriverLocation(doc.id)
                    }
                    
                });
            })
        } else {
            location.href = 'https://www.thegametree.io/login'
        }
    })
}

function initializeMap() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
      zoom: 15,
      center: latlng,
      disableDefaultUI: true,
      gestureHandling: 'none',
      keyboardShortcuts : false,
      styles : [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
      ],
    }
    map = new google.maps.Map(document.getElementById('delivery-map'), mapOptions);

}


function loadDeliveryPage(orderID, orderData) {
    while(driverInfoContainer.firstChild) {
        driverInfoContainer.removeChild(driverInfoContainer.firstChild)
    }

    let addressData = orderData.shippingAddress

    //Attach listener to driver data
    database.collection('orders').doc(orderID).onSnapshot( (doc) => {
        if(orderData.deliveryInfo) {
            const driverPhotoElement = createDOMElement('img', 'driver-photo', 'none', driverInfoContainer)
            driverPhotoElement.src = orderData.deliveryInfo.driverPhoto 
            const driverInfoDiv = createDOMElement('div', 'driver-info-div', 'none', driverInfoContainer )
            createDOMElement('div', 'driver-info-name', `${getFirstName(orderData.deliveryInfo.driverName)} is delivering your order`, driverInfoDiv )
            createDOMElement('div', 'driver-info-car-model', orderData.deliveryInfo.driverCarModel, driverInfoDiv )
            const contactDriverButton = createDOMElement('div', 'cart-item-change-button', 'Contact', driverInfoDiv )
            contactDriverButton.addEventListener('click', () => {
                console.log(orderData.deliveryInfo)
            })


            let driverLocation = orderData.deliveryInfo.driverLocation
            let driverPhoto = orderData.deliveryInfo.driverPhoto

            drawDriverMarker(driverLocation, driverPhoto)
        } else {
            var gtLogo = 'https://firebasestorage.googleapis.com/v0/b/gametree-43702.appspot.com/o/GT-Logo.png?alt=media&token=4b4ceb87-9070-4648-b39e-120330e6a585'
            drawDriverMarker({ lat: 44.049720, lng: -123.093170}, gtLogo)
        }
    })

    customerAddressName.innerHTML = addressData.firstName + ' ' + addressData.lastName
    customerAddress.innerHTML = (addressData.address2 != "") ? addressData.address1 + ', ' + addressData.address2 : addressData.address1
    customerAddressCity.innerHTML = `${addressData.city}, ${addressData.state} ${addressData.zipCode}`
    customerAddressNumber.innerHTML = orderData.phoneNumber
    customerNotifications.innerHTML = orderData.deliveryUpdates ? 'Text me' : "No SMS updates"

    var addressStr = `${addressData.address1}, ${addressData.city} ${addressData.state} ${addressData.zipCode}`

    while(deliveryItemsArea.firstChild) {
        deliveryItemsArea.removeChild(deliveryItemsArea.firstChild)
    }

    var orderItems = orderData.checkoutItems
    for (var item in orderItems) {
        if (orderItems.hasOwnProperty(item)) {
            buildOrderItem(orderItems[item])
        }
    }

    var dateObject = getFormattedDate(orderData.orderDate / 1000)
    deliveryOrderDate.innerHTML = `${dateObject[0]} ${dateObject[1]}, ${dateObject[2]} ${dateObject[3]}`
    deliveryOrderNumber.innerHTML = `Order Number: ${orderID}`



    drawDestinationMarker(addressStr)
}


function buildOrderItem(itemData) {
    const deliveryItemBlock = createDOMElement('div', 'delivery-item-block', 'none', deliveryItemsArea)
    const deliveryItemImage = createDOMElement('img', 'delivery-item-image', 'none', deliveryItemBlock)
    deliveryItemImage.src = itemData.productImage

    const deliveryItemInfoLeft = createDOMElement('div', 'delivery-item-info-left', 'none', deliveryItemBlock)
    createDOMElement('div', 'cart-item-title', itemData.productName, deliveryItemInfoLeft)
    createDOMElement('div', 'delivery-item-condition', conditionDict[itemData.condition], deliveryItemInfoLeft)

    const deliveryItemInfoRight = createDOMElement('div', 'cart-item-info-right', 'none', deliveryItemBlock)
    createDOMElement('div', 'cart-item-price-title', 'Item Price', deliveryItemInfoRight)
    let itemPrice = '$' + itemData.price
    createDOMElement('div', 'cart-item-price', itemPrice, deliveryItemInfoRight)
}
