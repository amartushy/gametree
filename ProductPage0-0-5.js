
//HTML Elements

//Product Page
const productPage = document.getElementById('product-page')
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
  
    'internal' : 'Internal Storage',
    'type' : 'Storage Type',
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



window.onload = () => {

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // Customer is logged in.
            globalUserId = user.uid

            var productID =  document.getElementById('hidden-id').innerHTML
            loadProductPage(productID)
            
        } else {
            // No user is logged in.
            console.log('No authenticated user')
        }
    })
}


  

function loadProductPage(GTIN) {
    console.log('Loading product: ' + GTIN)

    //Navigation and Event Listeners
    
    storeCartCloseModal.addEventListener('click', () => {
        $('#cart-modal').fadeOut()
    })
    
    storeCartContinueButton.addEventListener('click', () => {
        location.href = 'https://thegametree.io/shop/store'
    })
    
    storeCartCheckoutButton.addEventListener('click', () => {
        location.href = 'https://www.thegametree.io/shop/cart'
    })

    database.collection('catalog').doc(GTIN).onSnapshot(function(product) {
        var data = product.data()
        globalProductData = data

        $('#product-page').fadeIn()
        $('#store-page').fadeOut()
        window.scrollTo(0, 0);

        loadMainImage(data.productImage)
        loadAlternateImages(data.productImage, data.productImages)
        loadPricesAndAvailability(GTIN, data.salePrices, data.availability, data.category, data.platform)

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
  

//Insert Here_________________

const ppNewDiv = document.getElementById('pp-new-div')
const ppExcellentDiv = document.getElementById('pp-excellent-div')
const ppGoodDiv = document.getElementById('pp-good-div')
const ppAcceptableDiv = document.getElementById('pp-acceptable-div')

const ppListExcellent = document.getElementById('pp-list-excellent')
const ppListGood = document.getElementById('pp-list-good')
const ppListAcceptable = document.getElementById('pp-list-acceptable')

const ppNewHeader = document.getElementById('pp-new-header')
const ppExcellentHeader = document.getElementById('pp-excellent-header')
const ppGoodHeader = document.getElementById('pp-good-header')
const ppAcceptableHeader= document.getElementById('pp-acceptable-header')


const cartridgeOnlyArray = ['Game Boy', 'Game Boy Color', 'Game Boy Advance', 'Nintendo GameCube', 'Nintendo 64', 'NES', 'Nintendo DS', 'Nintendo 3DS', 'Nintendo Switch']

function loadPricesAndAvailability(GTIN, saleData, availability, category, platform) {
    if(category == 'Games') {
        ppGoodDiv.style.display = 'none'

        ppExcellentHeader.innerHTML = 'Pre-Owned'
        if(cartridgeOnlyArray.includes(platform)) {
            ppAcceptableHeader.innerHTML = 'Cartridge Only'
        } else {
            ppAcceptableHeader.innerHTML = 'Disc(s) Only'
        }

        while(ppListExcellent.firstChild) {
            ppListExcellent.removeChild(ppListExcellent.firstChild)
        }
        createDOMElement('div', 'list-item', '• Includes original case and insert(s), if applicable', ppListExcellent)
        createDOMElement('div', 'list-item', '• Fully tested and backed by the GameTree Guarantee', ppListExcellent)

        while(ppListAcceptable.firstChild) {
            ppListAcceptable.removeChild(ppListAcceptable.firstChild)
        }
        createDOMElement('div', 'list-item', '• Does not include original case', ppListAcceptable)
        createDOMElement('div', 'list-item', '• Fully tested and backed by the GameTree Guarantee', ppListAcceptable)

        ppNewPriceText.innerHTML = '$' + parseFloat(saleData.new).toFixed(2)
        ppExcellentPriceText.innerHTML = '$' + parseFloat(saleData.usedExcellent).toFixed(2)
        ppAcceptablePriceText.innerHTML = '$' + parseFloat(saleData.loose).toFixed(2)

    } else {
        ppNewPriceText.innerHTML = '$' + parseFloat(saleData.new).toFixed(2)
        ppExcellentPriceText.innerHTML = '$' + parseFloat(saleData.usedExcellent).toFixed(2)
        ppGoodPriceText.innerHTML = '$' + parseFloat(saleData.usedGood).toFixed(2)
        ppAcceptablePriceText.innerHTML = '$' + parseFloat(saleData.usedAcceptable).toFixed(2)
    }

    ppNewButton.className = 'pp-unavailable'
    ppExcellentButton.className = 'pp-unavailable'
    ppGoodButton.className = 'pp-unavailable'
    ppAcceptableButton.className = 'pp-unavailable'

    ppNewButton.innerHTML = 'UNAVAILABLE'
    ppExcellentButton.innerHTML = 'UNAVAILABLE'
    ppGoodButton.innerHTML = 'UNAVAILABLE'
    ppAcceptableButton.innerHTML = 'UNAVAILABLE'

    if(category == 'Games') {
        for (var item in availability) {
            if (availability.hasOwnProperty(item)) {
            switch(availability[item]) {
                case 'new' : 
                ppNewButton.className = 'pp-add-to-cart'
                ppNewButton.innerHTML = 'Add to Cart'
                ppNewButton.setAttribute('onClick', `addItemToCart("${GTIN}", "${item}")`)
                break
    
                case 'usedExcellent' : 
                ppExcellentButton.className = 'pp-add-to-cart'
                ppExcellentButton.innerHTML = 'Add to Cart'
                ppExcellentButton.setAttribute('onClick', `addItemToCart("${GTIN}", "${item}")`)
                break
    
                case 'loose' : 
                ppAcceptableButton.className = 'pp-add-to-cart'
                ppAcceptableButton.innerHTML = 'Add to Cart'
                ppAcceptableButton.setAttribute('onClick', `addItemToCart("${GTIN}", "${item}")`)
                break
            }
            }
        }
    } else {
        for (var item in availability) {
            if (availability.hasOwnProperty(item)) {
            switch(availability[item]) {
                case 'new' : 
                ppNewButton.className = 'pp-add-to-cart'
                ppNewButton.innerHTML = 'Add to Cart'
                ppNewButton.setAttribute('onClick', `addItemToCart("${GTIN}", "${item}")`)
                break
    
                case 'usedExcellent' : 
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
}
//
  






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
  
  
  
  
  
//Cart Modal
function loadCartModal(GTIN, purchaseID) {
$('#cart-modal').fadeIn().css('display', 'flex')

    //Get number of items and subtotal
    database.collection('users').doc(globalUserId).get().then( (doc) => {
        storeCartNumItems.innerHTML = Object.keys(doc.data().cart).length + ' Items'

        let cartItems = doc.data().cart

        var subtotalAmount = 0.0
        for (let item in cartItems) {
        if (cartItems.hasOwnProperty(item)) {
            database.collection('catalog').doc(cartItems[item]).get().then(function(doc) {
                var itemData = doc.data()
                var itemCondition = itemData.availability[item]
                var itemPrice = itemData.salePrices[itemCondition]

                subtotalAmount += parseFloat(itemPrice)
                storeCartSubtotal.innerHTML = '$' + subtotalAmount
            })
        }
        }
    })

    while(storeCartItemArea.firstChild) {
        storeCartItemArea.removeChild(storeCartItemArea.firstChild)
    }

    database.collection('catalog').doc(GTIN).get().then(function(doc) {
        var itemData = doc.data()

        const itemConditionDict = {
            'new' : 'New',
            'usedFantastic' : 'Used - Excellent',
            'usedGood' : 'Used - Good',
            'usedAcceptable' : 'Used - Acceptable'
        }

        if( itemData.availability.hasOwnProperty(purchaseID) ) {
            var itemCondition = itemData.availability[purchaseID]

            const storeCartItemBlock = createDOMElement('div', 'store-cart-item-block', 'none', storeCartItemArea)
            const storeCartImage = createDOMElement('img', 'store-cart-item-image', 'none', storeCartItemBlock)
            storeCartImage.src = itemData.productImage
            const storeCartItemInfoContainer = createDOMElement('div', 'store-cart-item-info-container', 'none', storeCartItemBlock)
            const storeCartItemInfoTop = createDOMElement('div', 'store-cart-item-info-top', 'none', storeCartItemInfoContainer)

            createDOMElement('div', 'cart-item-title', itemData.general.productName, storeCartItemInfoTop)
            createDOMElement('div', 'store-cart-item-text', itemConditionDict[itemCondition], storeCartItemInfoTop)

            const itemPrice = '$' + itemData.salePrices[itemCondition]
            createDOMElement('div', 'store-cart-item-text', itemPrice, storeCartItemInfoTop)
            createDOMElement('div', 'store-cart-item-text-small', 'Free Shipping & Returns', storeCartItemInfoTop)

            const storeCartItemInfoBottom = createDOMElement('div', 'store-cart-item-info-bottom', 'none', storeCartItemInfoContainer)
            createDOMElement('div', 'cart-guarantee-icon', '', storeCartItemInfoBottom)
            createDOMElement('div', 'cart-guarantee-text', 'Backed by the GameTree Guarantee', storeCartItemInfoBottom)

        } else {
            //TODO: Notify customer the item is no longer in stock, remove from cart
        }
    })
}
