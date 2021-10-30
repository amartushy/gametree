

//HTML Elements
let atcButton = document.getElementById('atc-button')
let atcModal = document.getElementById('atc-modal')
let atcCloseModal = document.getElementById('atc-close-modal')

let atcPrimaryImageContainer = document.getElementById('atc-primary-image-container')
let atcAdditionalImagesContainer = document.getElementById('atc-additional-images-container')
let atcSearchField = document.getElementById('atc-search-field')
let atcProductNameField = document.getElementById('atc-product-name-fieldr')

let atcPurchaseAcceptable = document.getElementById('atc-purchase-1')
let atcPurchaseAcceptableDiv = document.getElementById('atc-purchase-div-1')
let atcPurchaseAcceptableHeader = document.getElementById('atc-purchase-header-1')
let atcPurchaseGood = document.getElementById('atc-purchase-2')
let atcPurchaseGoodDiv = document.getElementById('atc-purchase-div-2')
let atcPurchaseGoodHeader = document.getElementById('atc-purchase-header-2')
let atcPurchaseExcellent = document.getElementById('atc-purchase-3')
let atcPurchaseExcellentDiv = document.getElementById('atc-purchase-div-3')
let atcPurchaseExcellentHeader = document.getElementById('atc-purchase-header-3')
let atcPurchaseNew = document.getElementById('atc-purchase-4')
let atcPurchaseNewDiv = document.getElementById('atc-purchase-div-4')
let atcPurchaseNewHeader = document.getElementById('atc-purchase-header-4')
let atcSaleAcceptable = document.getElementById('atc-sale-5')
let atcSaleAcceptableDiv = document.getElementById('atc-sale-div-5')
let atcSaleAcceptableHeader = document.getElementById('atc-sale-header-5')
let atcSaleGood = document.getElementById('atc-sale-6')
let atcSaleGoodDiv = document.getElementById('atc-sale-div-6')
let atcSaleGoodHeader = document.getElementById('atc-sale-header-6')
let atcSaleExcellent = document.getElementById('atc-sale-7')
let atcSaleExcellentDiv = document.getElementById('atc-sale-div-7')
let atcSaleExcellentHeader = document.getElementById('atc-sale-header-7')
let atcSaleNew = document.getElementById('atc-sale-8')
let atcSaleNewDiv = document.getElementById('atc-sale-div-8')
let atcSaleNewHeader = document.getElementById('atc-sale-header-8')

let atcOverviewDropdown = document.getElementById('atc-overview-dropdown')
let atcOverviewChevron = document.getElementById('atc-overview-chevron')
let atcOverviewLower = document.getElementById('atc-overview-lower')
let atcDescriptionField = document.getElementById('atc-description-field')

let atcFeaturesContainer = document.getElementById('atc-features-container')
let atcAddFeatureButton = document.getElementById('atc-add-feature-button')
let atcAddFeatureForm = document.getElementById('atc-add-feature-form')
let atcFeatureDescriptionField = document.getElementById('atc-feature-description-field')
let atcAddFeatureCancel = document.getElementById('atc-add-feature-cancel')
let atcAddFeatureSubmit = document.getElementById('atc-add-feature-submit')

let atcAddIncludedButton = document.getElementById('atc-add-included')
let atcWhatsIncludedContainer = document.getElementById('atc-whats-included-container')
let atcAddIncludedForm = document.getElementById('atc-add-included-form')
let atcAddIncludedField = document.getElementById('atc-add-included-field')
let atcAddIncludedCancel = document.getElementById('atc-add-included-cancel')
let atcAddIncludedSubmit = document.getElementById('atc-add-included-submit')


let atcSpecificationsLower = document.getElementById('atc-specifications-lower')
let atcSpecificationsDropdown = document.getElementById('atc-specifications-dropdown')
let atcSpecificationsChevron = document.getElementById('atc-specifications-chevron')

let atcHazardWarning = document.getElementById('atc-hazard-warning')


//Global Variables
var productID
var productObject = {
    'category' : 'Consoles',
    'brand' : '',
    'platform' : '',
    'productImage' : '',
    'isAvailable' : false,
    'numItemsAvailable' : 0,
    'dateCreated' : new Date() / 1000,
    'productImages' : {},
    'availability' : {},
    'overview' : {
        'description' : '',
        'features' : [],
        'included' : [],
    },
    'purchasePrices' : {
        'usedAcceptable' :  0,
        'usedGood' : 0,
        'usedExcellent' : 0,
        'new' : 0,
    },
    'salePrices' : {
        'usedAcceptable' :  0,
        'usedGood' : 0,
        'usedExcellent' : 0,
        'new' : 0,
    },
}
var globalSpecsObject = {}
let categoryOptionButtons = ['game-category', 'console-category', 'headset-category', 'controller-category', 'cable-category', 'power-category', 'pc-category' ]

const specHeadersDict = {
    'connectivity' : 'Connectivity',
    'dimensions' : 'Dimensions',
    'display' : 'Display',
    'features' : 'Features',
    'gameplay' : 'Gameplay',
    'general' : 'General',
    'included' : 'Included',
    'keySpecs' : 'Key Specs',
    'other' : 'Other',
    'storage' : 'Storage'
}

var globalKeyDict = {
    //All
    'UPC' : 'UPC',

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


//Event Listeners
atcButton.addEventListener('click', () => {
    setATCInitialState()
    $('#admin-nav-section').fadeOut(200, () => {
        $('#atc-modal').fadeIn().css('display', 'flex');
    })
})

atcCloseModal.addEventListener('click', () => {
    $('#atc-modal').fadeOut()
    $('#admin-nav-section').fadeIn().css('display', 'flex');
})

atcProductNameField.onblur = () => {
    productObject.productName = atcProductNameField.value
}

categoryOptionButtons.forEach((option) => {
    document.getElementById(option).addEventListener('click', () => {

        resetCategoryOptions(option)
    })
})


atcPurchaseAcceptable.addEventListener('blur', () => {
    productObject['purchasePrices']['usedAcceptable'] = atcPurchaseAcceptable.value
})
atcPurchaseGood.addEventListener('blur', () => {
    productObject['purchasePrices']['usedGood'] = atcPurchaseGood.value
})
atcPurchaseExcellent.addEventListener('blur', () => {
    productObject['purchasePrices']['usedExcellent'] = atcPurchaseExcellent.value
})
atcPurchaseNew.addEventListener('blur', () => {
    productObject['purchasePrices']['new'] = atcPurchaseNew.value
})

atcSaleAcceptable.addEventListener('blur', () => {
    productObject['salePrices']['usedAcceptable'] = atcSaleAcceptable.value
})
atcSaleGood.addEventListener('blur', () => {
    productObject['salePrices']['usedGood'] = atcSaleGood.value
})
atcSaleExcellent.addEventListener('blur', () => {
    productObject['salePrices']['usedExcellent'] = atcSaleExcellent.value
})
atcSaleNew.addEventListener('blur', () => {
    productObject['salePrices']['new'] = atcSaleNew.value
})


atcOverviewDropdown.addEventListener('click', () => {
    $('#atc-overview-lower').toggle()

    if(atcOverviewLower.style.display == 'none') {
        atcOverviewLower.setAttribute('class', 'atc-chevron-down')
    } else {
        atcOverviewLower.setAttribute('class', 'atc-chevron')
    }
})
