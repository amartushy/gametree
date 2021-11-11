//HTML Elements
const sellSearchPage = document.getElementById('sell-search-page')
const scsSection = document.getElementById('scs-section')
const requestPickupScreen = document.getElementById('request-pickup-screen')

const showMoreBrands = document.getElementById('show-more-brands')
const searchCancel = document.getElementById('search-cancel')
const searchField = document.getElementById('store-search-field')

//Event Listeners and Initial States
showMoreBrands.style.display = 'none'

searchCancel.addEventListener('click', () => {
    searchField.value = ''
})

//Global Variables
var database = firebase.firestore()
var globalProductData
var globalUserId


window.onload = () => {

    loadInitialState()

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // Customer is logged in.
        globalUserId = user.uid

    } else {
        // No user is logged in.
        console.log('No authenticated user')
    }
  })
}

function loadInitialState() {
    sellSearchPage.style.display = 'flex'
    scsSection.style.display = 'none'
    requestPickupScreen.style.display = 'none'
}


//Algolia  
const search = instantsearch({
    indexName: 'products_gametree',
    searchClient
});


function createSellSearchResults(results) {
    let hitsContainer = document.createElement('div')
    hitsContainer.className = 'sell-results'

    results.hits.forEach(function(hit, hitIndex) {

        let productDiv = createDOMElement('div', 'sell-product-div', 'none', hitsContainer)
        productDiv.setAttribute('onClick', `openConfirmationScreen("${hit.objectID}")`)

        let productBackground = createDOMElement('div', 'sell-product-background', 'none', productDiv)

        let productImage = createDOMElement('img', 'store-product-image', 'none', productBackground)
        productImage.src = hit.productImage

        let productInfo = createDOMElement('div', 'store-product-info', 'none', productBackground)
        createDOMElement('div', 'store-product-title', instantsearch.highlight({ attribute: `general.productName`, hit }), productInfo)
        createDOMElement('div', 'store-product-brand', hit.brand, productInfo)
    })

    return hitsContainer.outerHTML
}

// Create the render functions
const renderAutocomplete = (renderOptions, isFirstRender) => {
  const { indices, currentRefinement, refine, widgetParams } = renderOptions;

  if (isFirstRender) {

    searchField.addEventListener('input', event => {
      refine(event.currentTarget.value);
    });
  }

  searchField.value = currentRefinement;
  widgetParams.container.innerHTML = indices
    .map(createSellSearchResults)
    .join('');
};


const renderCategoryMenu = (renderOptions, isFirstRender) => {
  const { items, refine, widgetParams } = renderOptions;

  while(widgetParams.container.firstChild) {
    widgetParams.container.removeChild(widgetParams.container.firstChild)
  }

  items.forEach( item => {
    var storeFilterDiv = createDOMElement('div', 'store-filter-div', 'none', widgetParams.container)

    if(item.isRefined) {
      createDOMElement('div', 'store-filter-text-selected', `${item.label}`, storeFilterDiv)
    } else {
      createDOMElement('div', 'store-filter-text', `${item.label}`, storeFilterDiv)
    }

    storeFilterDiv.addEventListener('click', event => {
      event.preventDefault();
      refine(item.value);
    });
  })

};


const renderRefinementList = (renderOptions, isFirstRender) => {
  const { items, refine, isShowingMore, canShowMore, toggleShowMore, widgetParams } = renderOptions;

  while(widgetParams.container.firstChild) {
    widgetParams.container.removeChild(widgetParams.container.firstChild)
  }

  items.forEach( item => {
    var storeFilterDiv = createDOMElement('div', 'store-filter-div', 'none', widgetParams.container)

    if(item.isRefined) {
      createDOMElement('div', 'store-filter-checkbox-selected', '', storeFilterDiv)
    } else {
      createDOMElement('div', 'store-filter-checkbox', '', storeFilterDiv)
    }
    createDOMElement('div', 'store-filter-text', item.label, storeFilterDiv)

    storeFilterDiv.addEventListener('click', event => {
      event.preventDefault();
      refine(item.value);
    });
  })

  if (isFirstRender) {

    showMoreBrands.style.display = 'flex'
    showMoreBrands.addEventListener('click', () => {
      toggleShowMore()
      if(showMoreBrands.innerHTML = 'Show More') {
        showMoreBrands.innerHTML = 'Show Less'
      } else {
        showMoreBrands.innerHTML = 'Show More'
      }
    })
  }
};



const renderCurrentRefinements = (renderOptions, isFirstRender) => {
  const { items, refine, widgetParams } = renderOptions

  while(widgetParams.container.firstChild) {
    widgetParams.container.removeChild(widgetParams.container.firstChild)
  }

  if(items.length > 0) {
    widgetParams.container.style.display = 'flex'
  } else {
    widgetParams.container.style.display = 'none'
  }

  items.forEach( item => {
    console.log(item.refinements)
    item.refinements.forEach( (refinement, index) => {
        var refinementDiv = createDOMElement('div', 'refinement-div', 'none', widgetParams.container)

        createDOMElement('div', 'refinement-text', refinement.label, refinementDiv)
        
        const removeRefinement = createDOMElement('div', 'refinement-delete', '', refinementDiv)

        removeRefinement.addEventListener('click', () => {

        refine(refinement);
      })
    })
  })
};


// Create the custom widgets
const customAutocomplete = instantsearch.connectors.connectAutocomplete( renderAutocomplete );
const customCategoryMenu = instantsearch.connectors.connectMenu( renderCategoryMenu );
const customBrandRefinements = instantsearch.connectors.connectRefinementList( renderRefinementList );
const customCurrentRefinements = instantsearch.connectors.connectCurrentRefinements( renderCurrentRefinements );


// Instantiate the custom widgets
search.addWidgets([
    
  customAutocomplete({
    container: document.querySelector('#store-search-results'),
  }),

  customCategoryMenu({
    container: document.querySelector('#category-menu'),
    attribute: 'category',
    sortBy : ['name:asc']
  }),

  customBrandRefinements({
    container: document.querySelector('#brands-container'),
    attribute: 'brand',
    showMore: true,
    limit : 10,
    showMoreLimit : 40,
    limit : 10,
    sortBy : ['name:asc']
  }),

  customCurrentRefinements({
    container: document.querySelector('#refinements-container'),
  })
  
]);

search.start()



function openConfirmationScreen(productID) {
    console.log(productID)

    loadSaleConfirmationScreen(productID)
}









//____________________________Sale Confirmation Screen (SCS)____________________________
//HTML Elements
const scsImageContainer = document.getElementById('scs-image-container')
const scsHeader = document.getElementById('scs-header')

const scsNewPrice = document.getElementById('scs-new-price')
const scsExcellentPrice = document.getElementById('scs-excellent-price')
const scsGoodPrice = document.getElementById('scs-good-price')
const scsAcceptablePrice = document.getElementById('scs-acceptable-price')

const scsNewButton = document.getElementById('scs-new-button')
const scsExcellentButton = document.getElementById('scs-excellent-button')
const scsGoodButton = document.getElementById('scs-good-button')
const scsAcceptableButton = document.getElementById('scs-acceptable-button')

const scsAddMore = document.getElementById('scs-add-more')
const scsContinueButton = document.getElementById('scs-continue-button')

//Global Variables
var itemObject = {}

//Event Listeners
scsNewButton.addEventListener('click', () => {
    itemObject.itemCondition = 'new'
    itemObject.itemPrice = scsNewPrice.value
    resetPriceButtons(scsNewButton)
})
scsExcellentButton.addEventListener('click', () => {
    itemObject.itemCondition = 'usedExcellent'
    itemObject.itemPrice = scsExcellentPrice.value
    resetPriceButtons(scsExcellentButton)
})
scsGoodButton.addEventListener('click', () => {
    itemObject.itemCondition = 'usedGood'
    itemObject.itemPrice = scsGoodPrice.value
    resetPriceButtons(scsGoodButton)
})
scsAcceptableButton.addEventListener('click', () => {
    itemObject.itemCondition = 'usedAcceptable'
    itemObject.itemPrice = scsAcceptablePrice.value
    resetPriceButtons(scsAcceptableButton)
})

scsAddMore.addEventListener('click', () => {
    $('#scs-section').fadeOut(function() {$('#sell-search-page').fadeIn()})
})

scsContinueButton.addEventListener('click', () => {
    $('#scs-section').fadeOut(function() {$('#request-pickup-screen').fadeIn()})
    sellObject.items.push(itemObject)
})



function loadSaleConfirmationScreen(productID) {
    $('#sell-search-page').fadeOut(function() {$('#scs-section').fadeIn()})

    resetPriceButtons()

    itemObject = {
        'productID' : productID,
        'itemPrice' : 0,
        'itemCondition' : '',
    }

    database.collection('catalog').doc(productID).get().then( (doc) => {
        var data = doc.data()

        scsNewPrice.innerHTML = '$' + data.purchasePrices.new 
        scsExcellentPrice.innerHTML = '$' + data.purchasePrices.usedExcellent
        scsGoodPrice.innerHTML = '$' + data.purchasePrices.usedGood
        scsAcceptablePrice.innerHTML = '$' + data.purchasePrices.usedAcceptable

        scsImageContainer.removeChild(scsImageContainer.firstChild)
        let newSCSImage = createDOMElement('img', 'scs-image', 'none', scsImageContainer)
        newSCSImage.src = data.productImage

        scsHeader.innerHTML = data.productName 

    })
}

function resetPriceButtons(button) {
    var priceButtonsArray = [scsNewButton, scsExcellentButton, scsGoodButton, scsAcceptableButton]

    priceButtonsArray.forEach( (btn) => {
        if(btn == button) {
            btn.className = 'pp-add-to-cart'
            btn.innerHTML = 'Selected'
        } else {
            btn.className = 'pp-unavailable'
            btn.innerHTML = 'Select'
        }
    })
}



//____________________________Request Pickup Screen____________________________
//HTML Elements
const requestItemTotal = document.getElementById('request-item-total')

const scsPaymentZelle = document.getElementById('scs-payment-zelle')
const scsPaymentVenmo = document.getElementById('scs-payment-venmo')
const scsPaymentPaypal = document.getElementById('scs-payment-paypal')
const scsPaymentCash = document.getElementById('scs-payment-cash')

const requestLocationButton = document.getElementById('request-confirmation-button')
const requestLocationField = document.getElementById('request-confirmation-field')

const scsTimeToggleAsap = document.getElementById('scs-time-toggle-asap')
const scsTimeToggleSchedule = document.getElementById('scs-time-toggle-schedule')

const scsPhoneField = document.getElementById('scs-phone-field')
const scsNameField = document.getElementById('scs-name-field')
const scsNotesField = document.getElementById('scs-notes-field')

const requestNavBack = document.getElementById('request-nav-back')
const requestConfirmButton = document.getElementById('request-confirm-button')

//Global Variables
var sellObject = {
    'items' : [],
    'paymentType' : '',
    'location' : {},
    'pickupTime' : '',
    'contactPhoneNumber' : '',
    'contactName' : '',
    'additionalNotes' : ''
}

//Event Listeners
requestPaymentZelle.addEventListener('click', () => {
    sellObject.paymentType = 'zelle'
    changePaymentClasses(scsPaymentZelle)
})
requestPaymentVenmo.addEventListener('click', () => {
    sellObject.paymentType = 'venmo'
    changePaymentClasses(scsPaymentVenmo)
})
requestPaymentPaypal.addEventListener('click', () => {
    sellObject.paymentType = 'paypal'
    changePaymentClasses(scsPaymentPaypal)
})
requestPaymentCash.addEventListener('click', () => {
    sellObject.paymentType = 'cash'
    changePaymentClasses(scsPaymentCash)
})

requestTimeToggleAsap.addEventListener('click', () => {
    sellObject.pickupTime = 'asap'
    scsTimeToggleAsap.setAttribute('class', 'scs-toggle-left-selected')
    scsTimeToggleSchedule.setAttribute('class', 'scs-toggle-right')
})

requestTimeToggleSchedule.addEventListener('click', () => {
    sellObject.pickupTime = 'schedule'
    scsTimeToggleAsap.setAttribute('class', 'scs-toggle-left')
    scsTimeToggleSchedule.setAttribute('class', 'scs-toggle-right-selected')
})


requestLocationButton.addEventListener('click', () => {
    getMapLocation()
})

//TODO
requestLocationField.addEventListener('onblur', () => {

})

requestPhoneField.onblur = function() {
    sellObject.contactPhoneNumber = scsPhoneField.value
}

requestNameField.onblur = function() {
    sellObject.contactName = scsNameField.value
}

requestNotesField.onblur = function() {
    sellObject.additionalNotes = scsNotesField.value
}

requestNavBack.addEventListener('click', () => {
    $('#request-pickup-screen').fadeOut(function() {$('#scs-section').fadeIn()})
})

requestConfirmButton.addEventListener('click', () => {
    console.log(sellObject)

    if(sellObject.paymentType == '') {
        showErrorMessage('Please choose how you want to be paid')
    } else if (sellObject.location.formatted_address == undefined) {
        showErrorMessage('Please select a valid pickup location')
    } else if (sellObject.pickupTime == '') {
        showErrorMessage('Please select your pickup time')
    } else if (sellObject.contactPhoneNumber == '') {
        showErrorMessage('Please enter a valid phone number') 
    } else if (sellObject.contactName == '') {
        showErrorMessage('Please enter your name')
    } else {
        console.log('all fields good')
    }
})

function loadRequestPickupScreen() {
    var totalItemValue = 0
    sellObject.items.forEach( (item) => {
        totalItemValue += parseFloat(item.itemPrice)
    })
    requestItemTotal.innerHTML = '$' + totalItemValue

    changePaymentClasses()

    requestLocationField.value = ''
    requestPhoneField.value = ''
    requestNameField.value = ''
    requestPhoneField.value = ''
    requestNotesField.value = ''
}



//___________________________________________Map Functions___________________________________________

let map, infoWindow;

function getMapLocation() {
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
                    sellObject.location = {
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

// Create the script tag, set the appropriate attributes
var mapScript = document.createElement('script');
mapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA_IJmCMbq_9m_5ybA9zkyNR8ff-J7JuGw&libraries=places&callback=initMap';
mapScript.async = true;


let autocomplete;
let addressField;

// Attach your callback function to the `window` object
window.initMap = function() {
  map = new google.maps.Map(document.getElementById("scs-map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 15,
    disableDefaultUI: true,
  });
  infoWindow = new google.maps.InfoWindow();

  //initialize autocomplete
  addressField = document.querySelector("#pickup-location");

  autocomplete = new google.maps.places.Autocomplete(addressField, {
    componentRestrictions: { country: ["us"] },
    fields: ["address_components", "geometry"],
    types: ["address"],
  });
  addressField.focus();

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    const pos = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
    };
    infoWindow.setPosition(pos);
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&key=AIzaSyA_IJmCMbq_9m_5ybA9zkyNR8ff-J7JuGw`)
        .then(response => response.json())
        .then(data => {
            console.log(data.results[0])
            infoWindow.setContent(`${data.results[0].formatted_address}`);
            infoWindow.open(map);
            map.setCenter(pos);
            sellObject.location = {
                'formatted_address' : data.results[0].formatted_address,
                'latitude' : pos.lat,
                'longitude' : pos.lng
            }
        })
  });
}

// Append the 'script' element to 'head'
document.head.appendChild(mapScript);

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}



//___________________________Helper functions___________________________

function changePaymentClasses(targetElement) {
    let paymentOptions = [scsPaymentZelle, scsPaymentVenmo, scsPaymentPaypal, scsPaymentCash]

    paymentOptions.forEach(element => {
        element.setAttribute('class', 'scs-payment-button')
    })
    targetElement.setAttribute('class', 'scs-payment-button-selected')
    $('#scs-bottom-div').fadeIn()
}
