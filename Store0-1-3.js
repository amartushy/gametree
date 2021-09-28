//HTML Elements

//Product Page
const productPageBack = document.getElementById('product-page-back')

const ppNewPriceText = document.getElementById('pp-new-price')
const ppExcellentPriceText = document.getElementById('pp-excellent-price')
const ppGoodPriceText = document.getElementById('pp-good-price')
const ppAcceptablePriceText = document.getElementById('pp-acceptable-price')

const ppNewButton = document.getElementById('pp-new-button')
const ppExcellentButton = document.getElementById('pp-excellent-button')
const ppGoodButton = document.getElementById('pp-good-button')
const ppAcceptableButton = document.getElementById('pp-acceptable-button')

const ppProductTitle = document.getElementById('pp-product-title')
const ppProductDescription = document.getElementById('pp-product-description')
const ppKeySpecsContainer = document.getElementById('pp-key-specs-container')
const ppSubsectionContainer = document.getElementById('pp-subsection-container')


//Cart Modal
const storeCartCloseModal = document.getElementById('store-cart-close-modal')
const storeCartItemArea = document.getElementById('store-cart-item-area')
const storeCartNumItems = document.getElementById('store-cart-num-items')
const storeCartSubtotal = document.getElementById('store-cart-subtotal')
const storeCartCheckoutButton = document.getElementById('store-cart-checkout-button')
const storeCartContinueButton = document.getElementById('store-cart-continue-button')


//Global Variables
var database = firebase.firestore()
var globalProductData
var globalUserId


window.onload = () => {
  loadShopPage()

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

function loadShopPage() {

  //Navigation and Event Listeners
  productPageBack.addEventListener('click', () => {
    $('#product-page').fadeOut()
    $('#store-page').fadeIn()
  })



  storeCartCloseModal.addEventListener('click', () => {
    $('#cart-modal').fadeOut()
  })

  storeCartContinueButton.addEventListener('click', () => {
    $('#cart-modal').fadeOut()
  })

  storeCartCheckoutButton.addEventListener('click', () => {
    location.href = 'https://www.thegametree.io/shop/cart'
  })


}


//Algolia
const searchClient = algoliasearch('EXJJGW7VTC', '6253027161abf2af452a4c3551a7d6ab');
  
const search = instantsearch({
    indexName: 'products_gametree',
    searchClient,
});

function createStoreSearchResults(results) {
    let hitsContainer = document.createElement('div')
    hitsContainer.className = 'store-results'
    console.log(results.hits)

    results.hits.forEach(function(hit, hitIndex) {
        let storeProductDiv = document.createElement('div')
        storeProductDiv.className = 'store-product-div'
        storeProductDiv.setAttribute('onClick', `loadProductPage("${hit.objectID}")`)
        hitsContainer.appendChild(storeProductDiv)

        let storeProductBackground = document.createElement('div')
        storeProductBackground.className = 'store-product-background'
        storeProductDiv.appendChild(storeProductBackground)

        let storeProductImage = document.createElement('img')
        storeProductImage.className = 'store-product-image'
        storeProductImage.src = hit.productImage
        storeProductBackground.appendChild(storeProductImage)

        let storeProductInfo = document.createElement('div')
        storeProductInfo.className = 'store-product-info'
        storeProductBackground.appendChild(storeProductInfo)

        let storeProductTitle = document.createElement('div')
        storeProductTitle.className = 'store-product-title'
        storeProductTitle.innerHTML = instantsearch.highlight({ attribute: `general.productName`, hit })
        storeProductInfo.appendChild(storeProductTitle)

        let storeProductPrice = document.createElement('div')
        storeProductPrice.className = 'store-product-price'
        storeProductPrice.innerHTML = '$' + hit.salePrices.new
        storeProductInfo.appendChild(storeProductPrice)

        let storeButtonWrapper = document.createElement('div')
        storeButtonWrapper.className = 'store-button-wrapper'
        storeProductBackground.appendChild(storeButtonWrapper)

        let storeProductButton = document.createElement('div')
        storeProductButton.className = 'store-product-button'
        storeProductButton.innerHTML = 'Details'
        storeButtonWrapper.appendChild(storeProductButton)

        let storeQuickViewWrapper = document.createElement('div')
        storeQuickViewWrapper.className = 'store-quick-view-wrapper'
        storeProductBackground.appendChild(storeQuickViewWrapper)

        let storeQuickViewButton = document.createElement('div')
        storeQuickViewButton.className = 'store-quick-view-button'
        storeQuickViewButton.innerHTML = ''
        storeQuickViewWrapper.appendChild(storeQuickViewButton)
    })

    return hitsContainer.outerHTML
}

// Create the render function
const renderAutocomplete = (renderOptions, isFirstRender) => {
  const { indices, currentRefinement, refine, widgetParams } = renderOptions;

  if (isFirstRender) {
    const input = document.querySelector('#store-search-field');

    input.addEventListener('input', event => {
      refine(event.currentTarget.value);
    });
  }

  document.querySelector('#store-search-field').value = currentRefinement;
  widgetParams.container.innerHTML = indices
    .map(createStoreSearchResults)
    .join('');
};

// Create the custom widget
const customAutocomplete = instantsearch.connectors.connectAutocomplete(
  renderAutocomplete
);

// Instantiate the custom widget
search.addWidgets([
    
  customAutocomplete({
    container: document.querySelector('#store-search-results'),
  })
  
]);

search.start()






//__________________________________________________________________Product Page__________________________________________________________________

var globalKeyDict = {
  //Games
  'ESRBDescriptors' : 'ESRB Descriptors',
  'ESRBRating' : 'ESRB Rating',
  'compatiblePlatforms' : 'Compatible Platform(s)',
  'edition' : 'Edition',
  'softwareFormat' : 'Software Format',

  'brand' : 'Brand',
  'developer' : 'Developer',
  'modelNumber' : 'Model Number',
  'productName' : 'Product Name',
  'publisher' : 'Publisher',
  'releaseDate' : 'Release Date',

  'enhancedFor' : 'Enhanced For',
  'gameFranchise' : 'Game Franchise',
  'gameSeries' : 'Game Series',
  'genre' : 'Genre',
  'multiplayer' : 'Multiplayer',

  //Consoles
  '4KPlayer' : 'Ultra HD Compatible 4K Player',
  'HDR' : 'High Dynamic Range (HDR)',
  'bluetooth' : 'Bluetooth Enabled',
  'maxGraphics' : 'Maximum Graphic Quality',
  'numUSBPorts' : 'Number of USB Ports',
  'resolution' : 'Maximum Video Resolution (Streaming)',

  'additionalAccessories' : 'Additional Accessories Included',
  'color' : 'Color',
  'consoleType' : 'Console Type',
  'parentalControl' : 'Parental Control Capability',

  'HDStreaming' : 'HD Streaming',
  'blurayPlayer' : 'Blu-Ray Player',
  'onlineFeatures' : 'Online Features',

  'maxResolution' : 'Maximum Video Resolution (Streaming)',

  'storage' : 'Internal Storage',
  'type' : 'storageType',
  'capacity' : 'Storage Capacity',
  'memoryCards' : 'Memory Card Support',
  'numMemoryCards' : 'Number of Memory Card Slots',

  'height' : 'Product Height',
  'length' : 'Product Length',
  'width' : 'Product Width',
  'weight' : 'Product Weight',

  'internet' : 'Internet Connectable',
  'smartCapable' : 'Smart Capable',
  'usbPorts' : 'Number of USB Ports',
  'wifi' : 'Wi-Fi Compatible',

  'maxPlayers' : 'Maximum Number of Players',
  'motionSensing' : 'Motion-Sensing Technology',

  'cables' : 'Cable(s) Included',
  'controllers' : 'Number of Controllers Included',
  'games' : 'Number of Games Included'
}

function loadProductPage(GTIN) {
  console.log('Loading product: ' + GTIN)
  database.collection('catalog').doc(GTIN).onSnapshot(function(product) {
    var data = product.data()
    globalProductData = data

    $('#product-page').fadeIn()
    $('#store-page').fadeOut()
    window.scrollTo(0, 0);

    loadMainImage(data.productImage)
    loadAlternateImages(data.productImage, data.productImages)
    loadPricesAndAvailability(GTIN, data.salePrices, data.availability)

    loadProductMainInfo(data.general.productName, data.overview.description, data.keySpecs)
    loadProductPageTabs()
  })
}

function loadMainImage(imageURL) {
  const ppMainImageContainer = document.getElementById('pp-main-image-container')

  while(ppMainImageContainer.firstChild) {
    ppMainImageContainer.removeChild(ppMainImageContainer.firstChild)
  }

  var newMainImage = document.createElement('img')
  newMainImage.className = 'pp-main-image'
  newMainImage.src = imageURL
  ppMainImageContainer.appendChild(newMainImage)
}

function loadAlternateImages(mainImage, images) {
  const ppAlternateImagesContainer = document.getElementById('pp-alternate-images-container')

  while(ppAlternateImagesContainer.firstChild) {
    ppAlternateImagesContainer.removeChild(ppAlternateImagesContainer.firstChild)
  }
  if(images) {
    var newMainImage = document.createElement('img')
    newMainImage.className = 'pp-alternate-image'
    newMainImage.src = mainImage
    newMainImage.setAttribute('onClick', `loadMainImage("${mainImage}")`)
    ppAlternateImagesContainer.appendChild(newMainImage)
  
    for (var image in images) {
      if (images.hasOwnProperty(image)) {
        var alternateImageURL = images[image]
        var newAlternateImage = document.createElement('img')
        newAlternateImage.className = 'pp-alternate-image'
        newAlternateImage.setAttribute('onClick', `loadMainImage("${alternateImageURL}")`)
        newAlternateImage.src = alternateImageURL
        ppAlternateImagesContainer.appendChild(newAlternateImage)
      }
    }
  }
}


function loadPricesAndAvailability(GTIN, saleData, availability) {
  ppNewPriceText.innerHTML = '$' + parseFloat(saleData.new).toFixed(2)
  ppExcellentPriceText.innerHTML = '$' + parseFloat(saleData.usedFantastic).toFixed(2)
  ppGoodPriceText.innerHTML = '$' + parseFloat(saleData.usedGood).toFixed(2)
  ppAcceptablePriceText.innerHTML = '$' + parseFloat(saleData.usedAcceptable).toFixed(2)

  ppNewButton.className = 'pp-unavailable'
  ppExcellentButton.className = 'pp-unavailable'
  ppGoodButton.className = 'pp-unavailable'
  ppAcceptableButton.className = 'pp-unavailable'

  ppNewButton.innerHTML = 'UNAVAILABLE'
  ppExcellentButton.innerHTML = 'UNAVAILABLE'
  ppGoodButton.innerHTML = 'UNAVAILABLE'
  ppAcceptableButton.innerHTML = 'UNAVAILABLE'

  for (var item in availability) {
    if (availability.hasOwnProperty(item)) {
      switch(availability[item]) {
        case 'new' : 
          ppNewButton.className = 'pp-add-to-cart'
          ppNewButton.innerHTML = 'Add to Cart'
          ppNewButton.setAttribute('onClick', `addItemToCart("${GTIN}", "${item}")`)
          break

        case 'usedFantastic' : 
          ppExcellentButton.className = 'pp-add-to-cart'
          ppExcellentButton.innerHTML = 'Add to Cart'
          ppExcellentButton.setAttribute('onClick', `addItemToCart("${GTIN}", "${item}")`)
          break

        case 'usedGood' : 
          ppGoodButton.className = 'pp-add-to-cart'
          ppGoodButton.innerHTML = 'Add to Cart'
          ppGoodButton.setAttribute('onClick', `addItemToCart("${GTIN}", "${item}")`)
          break

        case 'usedAcceptable' : 
          ppAcceptableButton.className = 'pp-add-to-cart'
          ppAcceptableButton.innerHTML = 'Add to Cart'
          ppAcceptableButton.setAttribute('onClick', `addItemToCart("${GTIN}", "${item}")`)
          break
      }
    }
  }
}

function loadProductMainInfo(productTitle, description, keySpecs) {
  ppProductTitle.innerHTML = productTitle
  ppProductDescription.innerHTML = description

  while(ppKeySpecsContainer.firstChild) {
    ppKeySpecsContainer.removeChild(ppKeySpecsContainer.firstChild)
  }

  for (var spec in keySpecs) {
    if(keySpecs.hasOwnProperty(spec)) {
      if(keySpecs[spec] != "") {
        var keySpecContainer = document.createElement('div')
        keySpecContainer.className = 'pp-subsection-container'
        ppKeySpecsContainer.appendChild(keySpecContainer)
  
  
        let keySpecTitle = document.createElement('div')
        keySpecTitle.className = 'pp-specs-title'
        keySpecTitle.innerHTML = globalKeyDict[spec]
        keySpecContainer.appendChild(keySpecTitle)
  
        let keySpecDescription = document.createElement('div')
        keySpecDescription.className = 'pp-specs-text'
        keySpecDescription.innerHTML = keySpecs[spec]
        keySpecContainer.appendChild(keySpecDescription)
      }
    }
  }
}

//Load Tabs Section
function loadProductPageTabs() {
  let overviewTab = document.getElementById('pp-tab-1')
  let detailsSpecsTab = document.getElementById('pp-tab-2')

  overviewTab.innerHTML = 'Overview'
  detailsSpecsTab.innerHTML = 'Details & Specs'

  overviewTab.setAttribute('onClick', 'loadOverview()')
  detailsSpecsTab.setAttribute('onClick', 'loadDetailsAndSpecs()')

  overviewTab.click()
}



function loadOverview() {
  resetPPTabs(1)

  let overviewHeader = createDOMElement('div', 'pp-subsection-main-header', 'Overview', ppSubsectionContainer)

  let descriptionBlock = createDOMElement('div', 'pp-subsection-block', 'none', ppSubsectionContainer)
  let descriptionHeader = createDOMElement('div', 'pp-subsection-header', 'Description', descriptionBlock)
  let descriptionSubblock = createDOMElement('div', 'pp-subsection-subblock', 'none', descriptionBlock)
  let descriptionText = createDOMElement('div', 'pp-subsection-paragraph', `${globalProductData.overview.description}`, descriptionSubblock)
  let descriptionDivider = createDOMElement('div', 'pp-divider', 'none', descriptionSubblock)

  let featuresBlock = createDOMElement('div', 'pp-subsection-block', 'none', ppSubsectionContainer)
  let featuresHeader = createDOMElement('div', 'pp-subsection-header', 'Features', featuresBlock)
  let featuresSubblock = createDOMElement('div', 'pp-subsection-subblock', 'none', featuresBlock)
  globalProductData.overview.features.forEach( (feature) => {
    if(typeof(feature) == 'string') {
      let featureText = createDOMElement('div', 'pp-single-line-text', `${feature}`, featuresSubblock)
    } else {
      let featureContainer = createDOMElement('div', 'pp-feature-with-title-container', 'none', featuresSubblock)
      let featureTitle = createDOMElement('div', 'pp-feature-title', feature.title, featureContainer)
      let featureText = createDOMElement('div', 'pp-feature-text', feature.description, featureContainer)
    }
  })
  let featureDivider = createDOMElement('div', 'pp-divider', 'none', featuresSubblock)

  let whatsIncludedBlock = createDOMElement('div', 'pp-subsection-block', 'none', ppSubsectionContainer)
  let whatsIncludedHeader = createDOMElement('div', 'pp-subsection-header', "What's Included", whatsIncludedBlock)
  let whatsIncludedSubblock = createDOMElement('div', 'pp-subsection-subblock', 'none', whatsIncludedBlock)
  globalProductData.overview.included.forEach( (included) => {
    let includedText = createDOMElement('div', 'pp-subsection-text-bold', `${included}`, whatsIncludedSubblock)
  })
}


function loadDetailsAndSpecs() {
  resetPPTabs(2)

  let specsHeader = createDOMElement('div', 'pp-subsection-main-header', 'Specifications', ppSubsectionContainer)

  if (globalProductData.category == 'game') {
    createSpecificationsBlock('Key Specs', 'keySpecs')
    createSpecificationsBlock('General', 'general')
    createSpecificationsBlock('Game Details', 'gameDetails')

  } else if (globalProductData.category == 'console') {
    createSpecificationsBlock('Key Specs', 'keySpecs')
    createSpecificationsBlock('General', 'general')
    createSpecificationsBlock('Features', 'features')
    createSpecificationsBlock('Display', 'display')
    createSpecificationsBlock('Storage', 'storage')
    createSpecificationsBlock('Dimensions', 'dimensions')
    createSpecificationsBlock('Connectivity', 'connectivity')
    createSpecificationsBlock('Included', 'included')
  }


  let otherBlock = createDOMElement('div', 'pp-subsection-block', 'none', ppSubsectionContainer)
  let otherHeader = createDOMElement('div', 'pp-subsection-header', 'Other', otherBlock)
  let otherSubBlock = createDOMElement('div', 'pp-subsection-subblock', 'none', otherBlock)
  let UPCSubContainer = createDOMElement('div', 'pp-subsection-container', 'none', otherSubBlock)
  let UPCTitle = createDOMElement('div', 'pp-specs-title', 'UPC', UPCSubContainer)
  let UPCText = createDOMElement('div', 'pp-specs-text', globalProductData.other['UPC'], UPCSubContainer)
}




//Helper Functions

function resetPPTabs(index) {
  while(ppSubsectionContainer.firstChild) {
    ppSubsectionContainer.removeChild(ppSubsectionContainer.firstChild)
  }

  for(i=1; i<=2; i++) {
    if(i == index) {
      document.getElementById(`pp-tab-${i}`).className = 'pp-tab-selected'
    } else {
      document.getElementById(`pp-tab-${i}`).className = 'pp-tab-unselected'
    }
  }
}


function createSpecificationsBlock(headerStr, dataPath) {
  let specBlock = createDOMElement('div', 'pp-subsection-block', 'none', ppSubsectionContainer)
  let specBlockHeader = createDOMElement('div', 'pp-subsection-header', headerStr, specBlock)
  let specSubBlock = createDOMElement('div', 'pp-subsection-subblock', 'none', specBlock)
  for (var key in globalProductData[dataPath]) {
    if(globalProductData[dataPath].hasOwnProperty(key)) {

      if(globalProductData[dataPath][key] != "") {
        let dataSubContainer = createDOMElement('div', 'pp-subsection-container', 'none', specSubBlock)
        let dataTitle = createDOMElement('div', 'pp-specs-title', globalKeyDict[key], dataSubContainer)
        let dataText = createDOMElement('div', 'pp-specs-text', globalProductData[dataPath][key], dataSubContainer)
      }
    }
  }
  let specDivider = createDOMElement('div', 'pp-divider', 'none', specSubBlock)
}



function addItemToCart(GTIN, purchaseID) {

  var cartUpdateDict = {}
  cartUpdateDict[`cart.${purchaseID}`] = GTIN

  const user = firebase.auth().currentUser;

  if (user) {
    // User is signed in.
    database.collection("users").doc(user.uid).update(cartUpdateDict).then(function() {

      console.log('Added to users cart')
      loadCartModal(GTIN, purchaseID)

    }).catch(function(error) {
      console.log(error)
    })

  } else {
    // No user is signed in, create an anonymous account and update cart

    firebase.auth().signInAnonymously()
    .then(() => {
      // Anonymous account created
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
      userAccountDict['cart'][`${purchaseID}`] = GTIN

      database.collection("users").doc(userID).set(userAccountDict).then(function() {

        console.log('Created user and updated cart')
        loadCartModal(GTIN, purchaseID)
  
      }).catch(function(error) {
        console.log(error)
      })
    })
    .catch((error) => {
      console.log("Error code: " +  error.code + ", " + error.message)
    });
  }

}
