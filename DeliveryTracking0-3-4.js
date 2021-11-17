

//HTML Elements
const loadingScreen = document.getElementById('loading-screen')
loadingScreen.style.display = 'flex'

const driverInfoContainer = document.getElementById('driver-info-container')
const estimatedDeliveryTime = document.getElementById('estimated-delivery-time')
const markDeliveredButton = document.getElementById('mark-delivered-button')

const customerDeliveryInfoBlock = document.getElementById('customer-delivery-info-block')
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
var isUserDriver = false
var globalUserID, globalOrderID
const conditionDict = {
    'usedAcceptable' : 'Used - Acceptable',
    'usedGood' : 'Used - Good',
    'usedFantastic' : 'Used - Excellent',
    'new' : 'New'
}
var destinationLatLng, driverLatLng
var customDriverMarker, driverProfilePhoto
let map, geocoder;


//Custom Marker Object and Functions
function CustomMarker(latlng, map, imageSrc) { 
    this.latlng_ = latlng;
    this.imageSrc = imageSrc; //added imageSrc
    this.setMap(map)
    this.repositionMarker = repositionMarker
}


window.onload = () => {

    initializeMap()
    markDeliveredButton.style.display = 'none'

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            globalUserID = user.uid 
            var orderID = sessionStorage.getItem('orderID')
            console.log(orderID)

            if(orderID) {
                sessionStorage.removeItem('orderID')

                database.collection('orders').doc(orderID).get().then( (doc) => {
                
                    let orderData = doc.data()
                    getTravelTime()

                    globalOrderID = doc.id

                    if(globalUserID == orderData.deliveryInfo.driverID) {
                        isUserDriver = true
                        watchDriverLocation()
                        updateDatabaseWithDriverLocation()

                        markDeliveredButton.style.display = 'flex'
                        markDeliveredButton.addEventListener('click', () => {
                            markOrderDelivered(orderData)
                        })
                    }

                    loadDeliveryPage(doc.id, orderData)

                    loadingScreen.style.display = 'none'
                })
            } else {
                //No order selected
            }

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
            div.id = 'custom-driver-marker'
        
        
            var img = document.createElement("img");
            img.src = this.imageSrc;
            div.appendChild(img);
        
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
        console.log('removed')
        if (this.div_) {
            console.log('removed2')
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
        const contactDriverButton = createDOMElement('a', 'cart-item-change-button', 'Contact', driverInfoDiv )
        if(orderData.deliveryInfo.driverPhoneNumber.substring(0,2) == '+1') {
            contactDriverButton.setAttribute('href', `sms://${orderData.deliveryInfo.driverPhoneNumber}`)
        } else {
            contactDriverButton.setAttribute('href', `sms://+1${orderData.deliveryInfo.driverPhoneNumber}`)
        }
        contactDriverButton.setAttribute('style', 'text-decoration:none')
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

    if(isUserDriver) {
        const contactCustomerButton = createDOMElement('a', 'cart-item-change-button', 'Contact', customerDeliveryInfoBlock )
        if(orderData.phoneNumber.substring(0,2) == '+1') {
            contactCustomerButton.setAttribute('href', `sms://${orderData.phoneNumber}`)
        } else {
            contactCustomerButton.setAttribute('href', `sms://+1${orderData.phoneNumber}`)
        }
        contactCustomerButton.setAttribute('style', 'text-decoration:none')
    }

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



//Helper functions

//Updates global variable for driver data everytime the device moves
function repositionMarker() {
    var div = this.div_
    var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
    if (point) {
        div.style.left = point.x + 'px';
        div.style.top = point.y + 'px';
    }
}

function watchDriverLocation() {

    const watchID = navigator.geolocation.watchPosition((position) => {
        const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          
          driverLatLng = { lat : pos.lat, lng : pos.lng}

    })
}

//Takes global location variable and updates the database every 5 seconds
function updateDatabaseWithDriverLocation() {
    if(driverLatLng) {
        var updateDict = {}
        updateDict['deliveryInfo.driverLocation'] = driverLatLng
        database.collection('orders').doc(globalOrderID).update(updateDict)
    }

    setTimeout(updateDatabaseWithDriverLocation, 5000)
}


function drawDestinationMarker(destinationAddress) {
    var destinationIcon = 'https://firebasestorage.googleapis.com/v0/b/gametree-43702.appspot.com/o/package-icon.png?alt=media&token=f53ace70-f898-41ba-ae3c-95ac1ede4ea2'

    geocoder.geocode( { 'address': destinationAddress}, function(results, status) {
        if (status == 'OK') {
            destinationLatLng = { lat: results[0].geometry.location.lat(), lng : results[0].geometry.location.lng()}
            new CustomMarker( new google.maps.LatLng(destinationLatLng.lat, destinationLatLng.lng), map, destinationIcon )

            resizeAndCenterMap(driverLatLng, destinationLatLng)
        } else {
          console.log('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function drawDriverMarker(location) {

    if(!customDriverMarker) {
        customDriverMarker = new CustomMarker( new google.maps.LatLng(location.lat, location.lng), map, driverProfilePhoto )
    } else {

        customDriverMarker.latlng_ = new google.maps.LatLng(location.lat, location.lng)
        customDriverMarker.repositionMarker()
    }

    resizeAndCenterMap(location, destinationLatLng)
}

function resizeAndCenterMap(location1, location2) {

    if(location1 && location2) {
        var x1, x2, y1, y2

        x1 = location1.lat
        x2 = location2.lat
        y1 = location1.lng
        y2 = location2.lng
    
        var midX = (x1 + x2)/2
        var midY = (y1 + y2)/2
    
        map.setCenter({lat : midX, lng : midY})

        var bounds = new google.maps.LatLngBounds()
        bounds.extend( {lat: location1.lat, lng : location1.lng})
        bounds.extend( {lat: location2.lat, lng : location2.lng})
        map.fitBounds(bounds)
    }
}

var hasTravelTimeBeenCalculated = false

function getTravelTime() {

    if( driverLatLng && destinationLatLng) {

        if(!hasTravelTimeBeenCalculated) {
            const service = new google.maps.DistanceMatrixService(); // instantiate Distance Matrix service

            //TODO: Make call to database and get all stops for driver
    
            const matrixOptions = {
                origins: [`${driverLatLng.lat},${driverLatLng.lng}`], 
                destinations: [`${destinationLatLng.lat},${destinationLatLng.lng}`], 
                travelMode: 'DRIVING',
                unitSystem: google.maps.UnitSystem.IMPERIAL
            };
            // Call Distance Matrix service
            service.getDistanceMatrix(matrixOptions, callback);
        
            // Callback function used to process Distance Matrix response
            function callback(response, status) {
                if (status !== "OK") {
                    alert("Error with distance matrix");
                    return;
                }
                console.log(response);
        
                let allStopsForDriver = response.rows[0].elements;
                var travelTime = 0;
        
                //Driver has multiple stops, add 5 mins in between each one
                if(allStopsForDriver.length > 1) {
                    for (let i = 0; i < allStopsForDriver.length; i++) {
                        const routeseconds = allStopsForDriver[i].duration.value;
            
                        travelTime += (routeseconds + 300)
            
                    }
                } else {
                    travelTime = allStopsForDriver[0].duration.value
                }
                console.log(travelTime)

                //Display estimated arrival time
                var currentTime = new Date().getTime() / 1000;
                var bestCaseArrivalTime = getFormattedDate(currentTime + travelTime)
                var worstCaseArrivalTime = getFormattedDate(currentTime + travelTime + 600)

                estimatedDeliveryTime.innerHTML = bestCaseArrivalTime[3] + ' - ' + worstCaseArrivalTime[3]
                hasTravelTimeBeenCalculated = true
            }
        }
    } else {
        setTimeout(getTravelTime, 250)
    }
}



function markOrderDelivered(orderData) {
    
    //Update database
    var updateDict = {
        'orderStatus' : 'delivered',
        'dateDelivered' : new Date().getTime()
    }

    database.collection('orders').doc(globalOrderID).update(updateDict).then( () => {
        if(orderData.deliveryUpdates) {
            var message = `${getFirstName(orderData.deliveryInfo.driverName)} has delivered your order from GameTree. We hope you enjoy it!`
            sendSMSTo(orderData.phoneNumber, message)
        }
    })

}




function getFormattedDate(timeEpoch) {
    var time = parseFloat(timeEpoch)
    var d = new Date(0);
    d.setUTCSeconds(time);
  
    var month = d.toLocaleDateString("en-US", {month: "short"});
    var dayInt = d.toLocaleDateString("en-US", {day: "numeric"});
    var yearLong = d.toLocaleDateString("en-US", {year: "numeric"});

    var suffix
    if (dayInt == 1 || dayInt == 21 ||dayInt == 31) {
        suffix = "st"
    } else if( dayInt == 2 || dayInt == 22) {
        suffix = "nd"
    } else if (dayInt == 3 || dayInt == 23) {
        suffix = "rd"
    } else {
        suffix = "th"
    }
    dayWithSuffix = dayInt + suffix

    var timeHour = d.getHours()
    var ampm = 'am'
    var timeMinutes = '00'

    if (timeHour > 12) {
        timeHour = timeHour - 12
        ampm = 'pm'
    }
    var minutes = d.getMinutes()

    if (minutes > 0) {
        if(minutes.toString().length == 1)
        timeMinutes = d.getMinutes()
    }
    var timeString = timeHour + ":" + timeMinutes + ampm


    var dateObject = [month, dayWithSuffix, yearLong, timeString]
    return (dateObject)
}
