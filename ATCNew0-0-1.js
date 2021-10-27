

//HTML Elements
let atcButton = document.getElementById('atc-button')
let atcModal = document.getElementById('atc-modal')
let atcCloseModal = document.getElementById('atc-close-modal')
console.log(atcButton)

let atcPrimaryImageContainer = document.getElementById('atc-primary-image-container')
let atcAdditionalImagesContainer = document.getElementById('atc-additional-images-container')
let atcSearchField = document.getElementById('atc-search-field')
let atcProductNameField = document.getElementById('atc-product-name-fieldr')

let atcPurchase1 = document.getElementById('atc-purchase-1')
let atcPurchaseDiv1 = document.getElementById('atc-purchase-div-1')
let atcPurchaseHeader1 = document.getElementById('atc-purchase-header-1')
let atcPurchase2 = document.getElementById('atc-purchase-2')
let atcPurchaseDiv2 = document.getElementById('atc-purchase-div-2')
let atcPurchaseHeader2 = document.getElementById('atc-purchase-header-2')
let atcPurchase3 = document.getElementById('atc-purchase-3')
let atcPurchaseDiv3 = document.getElementById('atc-purchase-div-3')
let atcPurchaseHeader3 = document.getElementById('atc-purchase-header-3')
let atcPurchase4 = document.getElementById('atc-purchase-4')
let atcPurchaseDiv4 = document.getElementById('atc-purchase-div-4')
let atcPurchaseHeader4 = document.getElementById('atc-purchase-header-4')
let atcPurchase5 = document.getElementById('atc-purchase-5')
let atcPurchaseDiv5 = document.getElementById('atc-purchase-div-5')
let atcPurchaseHeader5 = document.getElementById('atc-purchase-header-5')
let atcPurchase6 = document.getElementById('atc-purchase-6')
let atcPurchaseDiv6 = document.getElementById('atc-purchase-div-6')
let atcPurchaseHeader6 = document.getElementById('atc-purchase-header-6')
let atcPurchase7 = document.getElementById('atc-purchase-7')
let atcPurchaseDiv7 = document.getElementById('atc-purchase-div-7')
let atcPurchaseHeader7 = document.getElementById('atc-purchase-header-7')
let atcPurchase8 = document.getElementById('atc-purchase-8')
let atcPurchaseDiv8 = document.getElementById('atc-purchase-div-8')
let atcPurchaseHeader8 = document.getElementById('atc-purchase-header-8')

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


let atcSpecificationsLower = document.getElementById('atc-overview-lower')
let atcSpecificationsDropdown = document.getElementById('atc-specifications-dropdown')
let atcSpecificationsChevron = document.getElementById('atc-specifications-chevron')

let atcHazardWarning = document.getElementById('atc-hazard-warning')


//Global Variables
var productID
var productObject = {}
var productImagesURLObject = {}
var productImageURL = {}
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
    setATCAccessoryInitialState()
    $('#admin-nav-section').fadeOut(200, () => {
        $('#atc-modal').fadeIn().css('display', 'flex');
    })
})

atcCloseModal.addEventListener('click', () => {
    $('#atc-modal').fadeOut()
    $('#admin-nav-section').fadeIn().css('display', 'flex');
})


categoryOptionButtons.forEach((option) => {
    document.getElementById(option).addEventListener('click', () => {

        resetCategoryOptions(option)
    })
})


//Onload
function setATCAccessoryInitialState() {
    productID = createID(8)

    //Reset Image Buttons and Containers

    //Load Search Field

    //Reset product name field

    //Reset Category Buttons
    resetCategoryOptions()

    //Reset price fields

    //Reset Overview Fields

    //Reset Specification Fields
    while(atcSpecificationsLower.firstChild) {
        atcSpecificationsLower.removeChild(atcSpecificationsLower.firstChild)
    }
}
