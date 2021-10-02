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
var globalUserID, globalOrderID
const conditionDict = {
    'usedAcceptable' : 'Used - Acceptable',
    'usedGood' : 'Used - Good',
    'usedFantastic' : 'Used - Excellent',
    'new' : 'New'
}
var destinationLatLng, driverLatLng
var customDriverMarker, driverProfilePhoto
let map, infoWindow, geocoder;


//Custom Marker Object and Functions
function CustomMarker(latlng, map, imageSrc) { 
    this.latlng_ = latlng;
    this.imageSrc = imageSrc; //added imageSrc
    this.setMap(map)
}


window.onload = () => {
    console.log(CustomMarker)

    initializeMap()

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            globalUserID = user.uid 

            var ordersRef = database.collection('orders').where('customerID', '==', globalUserID).where('orderStatus', 'in', ['processing', 'in-transit'])

            ordersRef.get().then((querySnapshot) => {

                querySnapshot.forEach((doc) => {       
                    let orderData = doc.data()

                    globalOrderID = doc.id

                    loadDeliveryPage(doc.id, orderData)

                    if(globalUserID == orderData.deliveryInfo.driverID) {
                        watchDriverLocation()
                        updateDatabaseWithDriverLocation()
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

    CustomMarker.prototype = new google.maps.OverlayView();

    CustomMarker.prototype.draw = function() {

        // Check if the div has been created.
        var div = this.div_;
        if (!div) {
        // Create a overlay text DIV
        div = this.div_ = document.createElement('div');
        // Create the DIV representing our CustomMarker
        div.className = "customMarker"
    
    
        var img = document.createElement("img");
        img.src = this.imageSrc;
        div.appendChild(img);
        var me = this;
        google.maps.event.addDomListener(div, "click", function (event) {
            google.maps.event.trigger(me, "click");
        });
    
        // Then add the overlay to the DOM
        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
        }

        // Position the overlay 
        var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
        if (point) {
            div.style.left = point.x + 'px';
            div.style.top = point.y + 'px';
        }
    }

    CustomMarker.prototype.remove = function () {
        // Check if the overlay was on the map and needs to be removed.
        if (this.div_) {
            this.div_.parentNode.removeChild(this.div_);
            this.div_ = null;
        }
    };

    CustomMarker.prototype.getPosition = function () {
        console.log(this.latlng_)
        return this.latlng_;
    };
}


function loadDeliveryPage(orderID, orderData) {
    while(driverInfoContainer.firstChild) {
        driverInfoContainer.removeChild(driverInfoContainer.firstChild)
    }
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
    }

    let addressData = orderData.shippingAddress

    //Attach listener to driver data
    database.collection('orders').doc(orderID).onSnapshot( (doc) => {
        if(orderData.deliveryInfo) {
            driverProfilePhoto = orderData.deliveryInfo.driverPhoto

            driverLocation = doc.data().deliveryInfo.driverLocation
            drawDriverMarker(driverLocation)

        } else {

            driverProfilePhoto = 'https://firebasestorage.googleapis.com/v0/b/gametree-43702.appspot.com/o/GT-Logo.png?alt=media&token=4b4ceb87-9070-4648-b39e-120330e6a585'
            driverLatLng = { lat: 44.049720, lng: -123.093170}

            drawDriverMarker(driverLatLng)
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


