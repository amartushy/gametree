var database = firebase.firestore();
var mapsAPIKey = "AIzaSyA_IJmCMbq_9m_5ybA9zkyNR8ff-J7JuGw"
var availableBalance
var purchaserNameString

const itemTitleField = document.getElementById("item-title-field")
const purchasePriceField = document.getElementById("purchase-price-field")
const sellerNameField = document.getElementById("seller-name-field")
const notesField = document.getElementById("notes-field")
const popPhotoContainer = document.getElementById("pop-photo-container")
const submitPopForm = document.getElementById("submit-pop-form")


var popObject = {
    "itemTitle":"",
    "purchasePrice":"",
    "seller":"",
    "notes":"",
    "photos":[],
    "time":"",
    "purchaser":"",
    "purchaserName":"",
    "status" : "in transit",
    "location":{}
}

window.onload = function() {
    //Show form and hide processing screen
    loadPopInitialState()

    //Check if user is an admin
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            database.collection("users").doc(user.uid).get().then((doc) => {
                if(doc.data().isAdmin) {
                    popObject.purchaser = user.uid
                    purchaserNameString = doc.data.name
                    availableBalance = doc.data().availableBalance
                } else {
                    location.href = 'https://thegametree.io'
                }
            })
        } else {
            location.href = 'https://thegametree.io/login'
        }
    });
}

submitPopForm.addEventListener("click", () => {
    loadPopProcessingState()

    popObject.itemTitle = itemTitleField.value
    popObject.purchasePrice = getNumber(purchasePriceField.value)
    popObject.seller = sellerNameField.value
    popObject.notes = notesField.value
    popObject.time = Date.now()
    popObject.purchaserName = purchaserNameString
    console.log(popObject)
	console.log(purchaseID)

    let purchaseID = createID(8)
    var promises = []

    //Update global purchases collection
    var globalPromise = database.collection("purchases").doc(purchaseID).set(popObject)
        .then(function() {
            console.log("Purchase doc finished")
        }).catch(function(error) {
            console.log(error.message)
        })

    //Update users history of purchases
    var userPromise = database.collection("users").doc(popObject.purchaser).collection("purchases").doc(purchaseID).set(popObject)
        .then(function() {
            console.log("Users purchase doc finished")
        }).catch(function(error) {
            console.log(error.message)
        })

    //Update users available capital
    var balancePromise = database.collection("users").doc(popObject.purchaser).update({
            'availableBalance' : parseFloat(availableBalance) - popObject.purchasePrice
        }).then(function() {
            console.log("Capital updated")
        }).catch(function(error) {
            console.log(error.message)
        })
    
    promises.push(globalPromise, userPromise, balancePromise)
    Promise.all(promises).then( () => {
        console.log("All documents written successfully")
        $("#pop-processing-text").hide(() => {
            $('#pop-confirmation-text').fadeIn()
            $('#pop-confirmation-check').fadeIn()
        })
        document.getElementById('purchase-id-text').innerHTML = purchaseID
    })
})

let popFormContainer = document.getElementById('pop-form-container')
let popProcessingScreen = document.getElementById('pop-processing-screen')
let popProcessingText = document.getElementById('pop-processing-text')
let popConfirmationText = document.getElementById('pop-confirmation-text')
let popConfirmationCheck = document.getElementById('pop-confirmation-check')
let popConfirmationButton = document.getElementById('pop-confirmation-button')

function loadPopInitialState() {
    popFormContainer.style.display = 'block'

    popProcessingScreen.style.display = 'none'
    popProcessingText.style.display = 'flex'
    popConfirmationText.style.display = 'none'
    popConfirmationCheck.style.display = 'none'

    popConfirmationButton.addEventListener('click', () => {
        location.href = 'https://thegametree.io'
    })
}
function loadPopProcessingState() {
    $("#pop-form-container").hide( () => {
        $("#pop-processing-screen").show()
        $("#pop-processing-text").show()
        $("#pop-confirmation-text").hide()
        $("#pop-confirmation-check").hide()
    })
}


// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you
let map, infoWindow;

// Create the script tag, set the appropriate attributes
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA_IJmCMbq_9m_5ybA9zkyNR8ff-J7JuGw&callback=initMap';
script.async = true;

// Attach your callback function to the `window` object
window.initMap = function() {
  map = new google.maps.Map(document.getElementById("pop-map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 15,
    disableDefaultUI: true,
  });
  infoWindow = new google.maps.InfoWindow();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        infoWindow.setPosition(pos);
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&key=AIzaSyA_IJmCMbq_9m_5ybA9zkyNR8ff-J7JuGw`)
            .then(response => response.json())
            .then(data => {
                console.log(data.results[0])
                infoWindow.setContent(`${data.results[0].formatted_address}`);
                infoWindow.open(map);
                map.setCenter(pos);
                popObject.location = {
                    'formatted_address' : data.results[0].formatted_address,
                    'latitude' : pos.lat,
                    'longitude' : pos.lng
                }
            })
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

// Append the 'script' element to 'head'
document.head.appendChild(script);

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}


//Photo Upload
updatePopPhotos()
var storageRef = firebase.storage().ref();
var hiddenPhotoUploadButton = document.getElementById('hidden-photo-upload-button')
var photoID

hiddenPhotoUploadButton.addEventListener('change', uploadProfileImage);

var selectedPhotoFile;
function uploadProfileImage(e) {
    selectedPhotoFile = e.target.files[0];
    handlePhotoUpload()
}

async function handlePhotoUpload() {
    photoID = createID(8)
	const uploadTask = await storageRef.child(`purchaseImages/${photoID}`).put(selectedPhotoFile);
	uploadAndUpdateFirebasePhoto()
}

//final submit button and update firebase
async function uploadAndUpdateFirebasePhoto() {
	var photoFileURL = ""
	await storageRef.child('/purchaseImages/'+photoID)
		.getDownloadURL()
		.then(function(url) { photoFileURL = url.toString() })

    popObject.photos.push[photoFileURL]
    updatePopPhotos(photoFileURL)
}

function updatePopPhotos(photoURL) {
    while(popPhotoContainer.firstChild) {
        popPhotoContainer.removeChild(popPhotoContainer.firstChild)
    }
    //check if this is called on page load
    if(photoURL != null) {
        popObject.photos.push(photoURL)
    }

    for (const index in popObject.photos) {
        var newImage = document.createElement('img')
        newImage.setAttribute('class', 'pop-photo')
        newImage.src = popObject.photos[index]
        popPhotoContainer.appendChild(newImage)
    }

    //create new photo upload button
    var addPopPhotoContainer = document.createElement('div')
    addPopPhotoContainer.setAttribute('class', 'add-pop-photo-container')
    popPhotoContainer.appendChild(addPopPhotoContainer)
    
    var addPopPhoto = document.createElement('div')
    addPopPhoto.setAttribute('class', 'add-pop-photo')
    addPopPhotoContainer.appendChild(addPopPhoto)

    var addPopPhotoText = document.createElement('div')
    addPopPhotoText.setAttribute('class', 'add-pop-photo-text')
    addPopPhotoText.innerHTML = ''
    addPopPhoto.appendChild(addPopPhotoText)

    addPopPhoto.addEventListener('click', () => {
        hiddenPhotoUploadButton.click();
    })
}

//Helper functions
function createID(length) {
    var result           = [];
    var characters       = 'ABCDEFGHJKMNPQRTUVWXYZ2346789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() * 
        charactersLength)));
   }
   return result.join('');
}

function getNumber(strNum) {
    var containsDollarSign = strNum.includes("$")
    if(containsDollarSign) {
        strNum = strNum.replace(/\$/g,'');
    }
    let num = parseFloat(strNum)
    return (num)
}
