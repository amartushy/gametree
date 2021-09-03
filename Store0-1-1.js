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
var database = firebase.firestore()
var globalProductData

var productPageBack = document.getElementById('product-page-back')
productPageBack.addEventListener('click', () => {
  $('#product-page').fadeOut()
  $('#store-page').fadeIn()
})

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
  document.getElementById('pp-new-price').innerHTML = '$' + parseFloat(saleData.new).toFixed(2)
  document.getElementById('pp-excellent-price').innerHTML = '$' + parseFloat(saleData.usedFantastic).toFixed(2)
  document.getElementById('pp-good-price').innerHTML = '$' + parseFloat(saleData.usedGood).toFixed(2)
  document.getElementById('pp-acceptable-price').innerHTML = '$' + parseFloat(saleData.usedAcceptable).toFixed(2)

  const ppNewButton = document.getElementById('pp-new-button')
  const ppExcellentButton = document.getElementById('pp-excellent-button')
  const ppGoodButton = document.getElementById('pp-good-button')
  const ppAcceptableButton = document.getElementById('pp-acceptable-button')

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
  document.getElementById('pp-product-title').innerHTML = productTitle
  document.getElementById('pp-product-description').innerHTML = description

  const ppKeySpecsContainer = document.getElementById('pp-key-specs-container')

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