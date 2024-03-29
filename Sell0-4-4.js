//HTML Elements
const sellSearchPage = document.getElementById('sell-search-page')
const scsSection = document.getElementById('scs-section')
const requestPickupScreen = document.getElementById('request-pickup-screen')

const showMoreBrands = document.getElementById('show-more-brands')
const searchCancel = document.getElementById('search-cancel')
const searchField = document.getElementById('store-search-field')

const searchSummaryBlock = document.getElementById('search-summary-block')
const searchSummaryItemsContainer = document.getElementById('search-summary-items-container')
const searchTotal = document.getElementById('search-total')
const searchRequestButton = document.getElementById('search-request-button')

const mobileFilterButton = document.getElementById('mobile-filter-button')
const categoriesContainer = document.getElementById('categories-container')
const closeFiltersMobile = document.getElementById('close-filters-mobile')

//Event Listeners and Initial States
showMoreBrands.style.display = 'none'

searchRequestButton.addEventListener('click', () => {
    $('#sell-search-page').fadeOut(200, () => {
        $('#request-pickup-screen').fadeIn().css('display', 'flex')
    })

    loadRequestPickupScreen()
})

mobileFilterButton.addEventListener('click', () => {
    $('#categories-container').fadeIn()
  })
  
closeFiltersMobile.addEventListener('click', () => {
    $('#categories-container').fadeOut()()
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
    searchSummaryBlock.style.display = 'none'
}

function loadSearchSummaryItems() {
    while(searchSummaryItemsContainer.firstChild) {
        searchSummaryItemsContainer.removeChild(searchSummaryItemsContainer.firstChild)
    }

    if(sellObject.items.length > 0) {
        searchSummaryBlock.style.display = 'flex'

        var totalItemValue = 0
        sellObject.items.forEach( (item) => {
            totalItemValue += parseFloat(item.itemPrice)
    
            const sellSummaryItemDiv = createDOMElement('div', 'sell-summary-item-div', 'none', searchSummaryItemsContainer)
    
            const sellSummaryLeftDiv = createDOMElement('div', 'sell-summary-left-div', 'none', sellSummaryItemDiv)
            const summaryItemImage = createDOMElement('img', 'sell-summary-image', 'none', sellSummaryLeftDiv)
            summaryItemImage.src = item.productImage
            createDOMElement('div', 'sell-summary-item-title', item.productName, sellSummaryLeftDiv)
        
            const sellSummaryPriceDiv = createDOMElement('div', 'order-summary-price-div', 'none', sellSummaryItemDiv)
            createDOMElement('div', 'order-summary-item-price', '$' + item.itemPrice, sellSummaryPriceDiv)
            const removeItemButton = createDOMElement('div', 'order-summary-remove-item', 'Remove', sellSummaryPriceDiv)
            var itemIndex = sellObject.items.indexOf(item)
            removeItemButton.setAttribute('onClick', `removeItem("${itemIndex}")`)
    
        })
        searchTotal.innerHTML = '$' + totalItemValue
    } else {
        searchSummaryBlock.style.display = 'none'
    }

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
        productDiv.setAttribute('onClick', `openConfirmationScreen("${hit.objectID}", "${hit.general.productName}", "${hit.productImage}")`)

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

    searchCancel.addEventListener('click', () => {
        searchField.value = ''
        refine(searchField.value);
    })
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



function openConfirmationScreen(productID, productName,productImage) {
    console.log(productID)

    loadSaleConfirmationScreen(productID, productName, productImage)
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

const scsNavigationDiv = document.getElementById('scs-nav-div')
const scsBack = document.getElementById('scs-back')
const scsAddMore = document.getElementById('scs-add-more')
const scsContinueButton = document.getElementById('scs-continue-button')

//Global Variables
var itemObject = {}

//Event Listeners
scsNewButton.addEventListener('click', () => {
    itemObject.itemCondition = 'new'
    itemObject.itemPrice = parseFloat(scsNewPrice.innerHTML.substring(1))
    resetPriceButtons(scsNewButton)
})
scsExcellentButton.addEventListener('click', () => {
    itemObject.itemCondition = 'usedExcellent'
    itemObject.itemPrice = parseFloat(scsExcellentPrice.innerHTML.substring(1))
    resetPriceButtons(scsExcellentButton)
})
scsGoodButton.addEventListener('click', () => {
    itemObject.itemCondition = 'usedGood'
    itemObject.itemPrice = parseFloat(scsGoodPrice.innerHTML.substring(1))
    resetPriceButtons(scsGoodButton)
})
scsAcceptableButton.addEventListener('click', () => {
    itemObject.itemCondition = 'usedAcceptable'
    itemObject.itemPrice = parseFloat(scsAcceptablePrice.innerHTML.substring(1))
    resetPriceButtons(scsAcceptableButton)
})

scsBack.addEventListener('click', () => {
    loadSearchSummaryItems()

    $('#scs-section').fadeOut(function() {$('#sell-search-page').fadeIn()})
})

scsAddMore.addEventListener('click', () => {

    $('#scs-section').fadeOut(function() {$('#sell-search-page').fadeIn()})

    sellObject.items.push(itemObject)
    loadSearchSummaryItems()
})

scsContinueButton.addEventListener('click', () => {
    $('#scs-section').fadeOut(() => {
        $('#request-pickup-screen').fadeIn().css('display', 'flex')
    })
    sellObject.items.push(itemObject)

    loadSearchSummaryItems()

    loadRequestPickupScreen()
})



function loadSaleConfirmationScreen(productID, productName, productImage) {
    scsNavigationDiv.style.display = 'none'
    $('#sell-search-page').fadeOut( () => {
        $('#scs-section').fadeIn().css('display', 'flex')
    })

    resetPriceButtons()

    itemObject = {
        'productID' : productID,
        'productName' : productName,
        'productImage' : productImage,
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
    loadSearchSummaryItems()
    var priceButtonsArray = [scsNewButton, scsExcellentButton, scsGoodButton, scsAcceptableButton]

    priceButtonsArray.forEach( (btn) => {
        if(btn == button) {
            btn.className = 'pp-add-to-cart'
            btn.innerHTML = 'Selected'
            $('#scs-nav-div').fadeIn()
        } else {
            btn.className = 'pp-unavailable'
            btn.innerHTML = 'Add to sale'
        }
    })
}



//____________________________Request Pickup Screen____________________________
//HTML Elements
const requestItemTotal = document.getElementById('request-item-total')
const sellSummaryItemsContainer = document.getElementById('sell-summary-items-container')

const requestPaymentZelle = document.getElementById('request-payment-zelle')
const requestPaymentVenmo = document.getElementById('request-payment-venmo')
const requestPaymentPaypal = document.getElementById('request-payment-paypal')
const requestPaymentCash = document.getElementById('request-payment-cash')

const requestLocationButton = document.getElementById('request-location-button')
const requestLocationField = document.getElementById('request-location-field')

const requestPickupTimeContainer = document.getElementById('request-pickup-time-container')
const requestTimeToggleAsap = document.getElementById('scs-time-toggle-asap')
const requestTimeToggleSchedule = document.getElementById('scs-time-toggle-schedule')

const requestPhoneField = document.getElementById('request-phone-field')
const requestNameField = document.getElementById('request-name-field')
const requestNotesField = document.getElementById('request-notes-field')

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
    changePaymentClasses(requestPaymentZelle)
})
requestPaymentVenmo.addEventListener('click', () => {
    sellObject.paymentType = 'venmo'
    changePaymentClasses(requestPaymentVenmo)
})
requestPaymentPaypal.addEventListener('click', () => {
    sellObject.paymentType = 'paypal'
    changePaymentClasses(requestPaymentPaypal)
})
requestPaymentCash.addEventListener('click', () => {
    sellObject.paymentType = 'cash'
    changePaymentClasses(requestPaymentCash)
})

requestTimeToggleAsap.addEventListener('click', () => {
    sellObject.pickupTime = 'asap'
    requestTimeToggleAsap.setAttribute('class', 'scs-toggle-left-selected')
    requestTimeToggleSchedule.setAttribute('class', 'scs-toggle-right')
})

requestTimeToggleSchedule.addEventListener('click', () => {
    sellObject.pickupTime = 'schedule'
    requestTimeToggleAsap.setAttribute('class', 'scs-toggle-left')
    requestTimeToggleSchedule.setAttribute('class', 'scs-toggle-right-selected')
})


requestLocationButton.addEventListener('click', () => {
    getMapLocation()
})

requestPhoneField.onblur = function() {
    sellObject.contactPhoneNumber = requestPhoneField.value
}

requestNameField.onblur = function() {
    sellObject.contactName = requestNameField.value
}

requestNotesField.onblur = function() {
    sellObject.additionalNotes = requestNotesField.value
}

requestNavBack.addEventListener('click', () => {
    $('#request-pickup-screen').fadeOut(function() {$('#sell-search-page').fadeIn()})
    loadSearchSummaryItems()
})

//Insert here

//

function loadRequestPickupScreen() {
    window.scrollTo(0, 0);

    buildSummmaryItems()
    requestPickupTimeContainer.style.display = 'none'

    changePaymentClasses()

    requestLocationField.value = ''
    requestPhoneField.value = ''
    requestNameField.value = ''
    requestPhoneField.value = ''
    requestNotesField.value = ''
}

function buildSummmaryItems(itemData) {
    while(sellSummaryItemsContainer.firstChild) {
        sellSummaryItemsContainer.removeChild(sellSummaryItemsContainer.firstChild)
    }


    var totalItemValue = 0
    sellObject.items.forEach( (item) => {
        totalItemValue += parseFloat(item.itemPrice)

        const sellSummaryItemDiv = createDOMElement('div', 'sell-summary-item-div', 'none', sellSummaryItemsContainer)

        const sellSummaryLeftDiv = createDOMElement('div', 'sell-summary-left-div', 'none', sellSummaryItemDiv)
        const summaryItemImage = createDOMElement('img', 'sell-summary-image', 'none', sellSummaryLeftDiv)
        summaryItemImage.src = item.productImage
        createDOMElement('div', 'sell-summary-item-title', item.productName, sellSummaryLeftDiv)
    
        const sellSummaryPriceDiv = createDOMElement('div', 'order-summary-price-div', 'none', sellSummaryItemDiv)
        createDOMElement('div', 'order-summary-item-price', '$' + item.itemPrice, sellSummaryPriceDiv)
        const removeItemButton = createDOMElement('div', 'order-summary-remove-item', 'Remove', sellSummaryPriceDiv)
        var itemIndex = sellObject.items.indexOf(item)
        removeItemButton.setAttribute('onClick', `removeItem("${itemIndex}")`)

    })
    requestItemTotal.innerHTML = '$' + totalItemValue

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
  addressField = document.querySelector("#request-location-field");

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




//___________________________________________Processing Screen___________________________________________

requestConfirmButton.addEventListener('click', () => {
    console.log(sellObject)

    if(sellObject.paymentType == '') {
        showErrorMessage('Please choose how you want to be paid')
    } else if (sellObject.location.formatted_address == undefined) {
        showErrorMessage('Please select a valid pickup location')
    } else if (sellObject.contactPhoneNumber == '') {
        showErrorMessage('Please enter a valid phone number') 
    } else if (sellObject.contactName == '') {
        showErrorMessage('Please enter your name')
    } else {
        loadRequestProcessingScreen()

        var saleID = createID(10)

        updateDatabaseAndUser(saleID)

    }
})


const requestProcessingScreen = document.getElementById('request-processing-screen')
const requestCheckMark = document.getElementById('request-check-mark')
const requestProcessingText = document.getElementById('request-processing-text')
const requestCompleteDiv = document.getElementById('request-complete-div')
const requestCompleteAccountDiv = document.getElementById('request-complete-account-div')
const trackRequestButton = document.getElementById('track-request-button')
const requestAccountCreateButton = document.getElementById('request-account-create-button')

trackRequestButton.addEventListener('click', () => {
    location.href = 'https://thegametree.io/account'
})

requestAccountCreateButton.addEventListener('click', () => {
    location.href = 'https://thegametree.io/account-creation'
})

function loadRequestProcessingScreen() {
    $('#request-pickup-screen').fadeOut( 200, () => {
        $('#request-processing-screen').fadeIn().css('display', 'flex')
    })

    requestCheckMark.style.display = 'none'
    requestProcessingText.style.display = 'block'
    requestCompleteDiv.style.display = 'none'
    requestCompleteAccountDiv.style.display = 'none'
}

function loadUserCompleteScreen() {
    requestProcessingScreen.style.display = 'flex'

    requestCheckMark.style.display = 'block'
    requestProcessingText.style.display = 'none'
    requestCompleteDiv.style.display = 'flex'
    requestCompleteAccountDiv.style.display = 'none'
}

function loadAnonymousAccountCompleteScreen() {
    requestProcessingScreen.style.display = 'flex'

    requestCheckMark.style.display = 'block'
    requestProcessingText.style.display = 'none'
    requestCompleteDiv.style.display = 'none'
    requestCompleteAccountDiv.style.display = 'flex'
}

function updateDatabaseAndUser(saleID) {
    const user = firebase.auth().currentUser;

    if (user) {
        // User is signed in.
        sellObject['customerID'] = user.uid

        database.collection("users").doc(user.uid).collection('sales').doc(saleID).set(sellObject).then(function() {

            console.log('Added to users sales')

        }).catch(function(error) {
            console.log(error)
        })

        //Update Sale Collection
        database.collection('sales').doc(saleID).set(sellObject).then( () => {
            loadUserCompleteScreen()

            sendAdminSellMessage(saleID)
        })

    } else {
        // No user is signed in, create an anonymous account and update sales

        firebase.auth().signInAnonymously()
        .then(() => {
            // Anonymous account dict
            var userID = firebase.auth().currentUser.uid
            var userAccountDict = {
                'name' : '',
                'email' : '',
                'dateCreated' : 0,
                'referralCode' : '',
                'isAdmin' : false,
                'availableBalance' : 0,
                'cart' : {},
                'isAnonymous' : true
            }
            sellObject['customerID'] = userID

            database.collection("users").doc(userID).set(userAccountDict).then(function() {

                //Update Users Sales Collection
                database.collection("users").doc(userID).collection('sales').doc(saleID).set(sellObject).then(function() {

                    console.log('Added to users sales')
        
                }).catch(function(error) {
                    console.log(error)
                })

                console.log('Created user and updated sales')

            }).catch(function(error) {
                console.log(error)
            })

            //Update Global Sales Collection
            database.collection('sales').doc(saleID).set(sellObject).then( () => {
                loadAnonymousAccountCompleteScreen()

                sendAdminSellMessage(saleID)
            })
        })
        .catch((error) => {
            console.log("Error code: " +  error.code + ", " + error.message)
        });
    }
}









//___________________________Helper functions___________________________

function changePaymentClasses(targetElement) {
    let paymentOptions = [requestPaymentZelle, requestPaymentVenmo, requestPaymentPaypal, requestPaymentCash]

    paymentOptions.forEach(element => {
        if(targetElement == element) {
            targetElement.setAttribute('class', 'scs-payment-button-selected')
        } else {
            element.setAttribute('class', 'scs-payment-button')

        }
    })
}




function sendAdminSellMessage(saleID) {
    var message = `New Sale Request %0D%0ARequest ID: ${saleID} %0D%0ACustomer Name: ${sellObject.contactName} %0D%0ACustomer Phone Number: ${sellObject.contactPhoneNumber} %0D%0A%0D%0AItems:`
    sellObject.items.forEach( (item) => {
        message += `%0D%0AProduct Name: ${item.productName} %0D%0AProduct Condition: ${item.itemCondition} %0D%0APurchase Price: ${item.itemPrice}`
    })

    sendSMSTo('4582108156', message)
}


function removeItem(itemIndex) {
    sellObject.items.splice(itemIndex, 1)
    buildSummmaryItems()
    loadSearchSummaryItems()
}
