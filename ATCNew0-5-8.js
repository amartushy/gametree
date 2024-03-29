

//HTML Elements
let atcButton = document.getElementById('atc-button')
let atcModal = document.getElementById('atc-modal')
let atcCloseModal = document.getElementById('atc-close-modal')

let atcPrimaryImageContainer = document.getElementById('atc-primary-image-container')
let hiddenPrimaryImageUploadButton = document.getElementById('hidden-primary-image-upload-button')
let atcAdditionalImagesContainer = document.getElementById('atc-additional-images-container')
let hiddeAdditionalImageUploadButton = document.getElementById('hidden-additional-image-upload-button')

let atcSearchField = document.getElementById('atc-search-field')
let atcProductNameField = document.getElementById('atc-product-name-field')

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
let atcSaleAcceptable = document.getElementById('atc-sale-1')
let atcSaleAcceptableDiv = document.getElementById('atc-sale-div-1')
let atcSaleAcceptableHeader = document.getElementById('atc-sale-header-1')
let atcSaleGood = document.getElementById('atc-sale-2')
let atcSaleGoodDiv = document.getElementById('atc-sale-div-2')
let atcSaleGoodHeader = document.getElementById('atc-sale-header-2')
let atcSaleExcellent = document.getElementById('atc-sale-3')
let atcSaleExcellentDiv = document.getElementById('atc-sale-div-3')
let atcSaleExcellentHeader = document.getElementById('atc-sale-header-3')
let atcSaleNew = document.getElementById('atc-sale-4')
let atcSaleNewDiv = document.getElementById('atc-sale-div-4')
let atcSaleNewHeader = document.getElementById('atc-sale-header-4')

let atcOverviewDropdown = document.getElementById('atc-overview-dropdown')
let atcOverviewChevron = document.getElementById('atc-overview-chevron')
let atcOverviewLower = document.getElementById('atc-overview-lower')
let atcBrandField = document.getElementById('atc-brand-field')
let atcPlatformField = document.getElementById('atc-platform-field')
let atcPriceChartingField = document.getElementById('atc-pricecharting-field')
let atcDescriptionField = document.getElementById('atc-description-field')

let atcFeaturesContainer = document.getElementById('atc-features-container')
let atcAddFeatureButton = document.getElementById('atc-add-feature-button')
let atcAddFeatureForm = document.getElementById('atc-add-feature-form')
let atcFeatureTitleField = document.getElementById('atc-feature-title-field')
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

let atcSubmit = document.getElementById('atc-submit')

let adminProcessingScreen = document.getElementById('admin-processing-screen')
let adminConfirmationCheck = document.getElementById('admin-confirmation-check')
let adminProcessingTextContainer = document.getElementById('admin-processing-text-container')
let adminConfirmationContainer = document.getElementById('admin-confirmation-container')
let adminProductID = document.getElementById('admin-product-id')
let adminProductTitleText = document.getElementById('product-title-text')
let adminConfirmationButton = document.getElementById('admin-confirmation-button')


//Global Variables
var productID
var storageRef = firebase.storage().ref()
var productObject = {}
var globalSpecsObject = {}
var selectedPrimaryImageFile;
var selectedAdditionalImageFile;
let categoryOptionButtons = ['Games-category', 'Consoles-category', 'Headsets-category', 'Controllers-category', 'Cables-category', 'Batteries-category', 'PC-category' ]
var isDoneSubmitting = false

const specHeadersDict = {
    'connectivity' : 'Connectivity',
    'dimensions' : 'Dimensions',
    'display' : 'Display',
    'features' : 'Features',
    'gameDetails' : 'Game Details',
    'gameplay' : 'Gameplay',
    'general' : 'General',
    'included' : 'Included',
    'keySpecs' : 'Key Specs',
    'other' : 'Other',
    'power' : 'Power',
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
    'games' : 'Number of Games Included',

    //Controllers
    'voiceAssistant' : 'Voice Assistant Built-in',
    'wireless' : 'Wireless',
    'batterySize' : 'Battery Size',
    'headsetJack' : 'Headset Jack',
    'rumbleVibration' : 'Rumble Vibration',
    'analogJoysticks' : 'Analog Joysticks',
    'buttonMapping' : 'Button Mapping',
    'lightingType' : 'Lighting Type',
    'illumination' : 'Illumination',
    'shareButton' : 'Share Button',
    'rechargeableBattery' : 'Rechargeable Battery',
    'chargingInterfaces' : 'Charging Interfaces',
    'numBatteries' : 'Number of Batteries Required',
    'batteriesIncluded' : 'Batteries Included',
    'cordLength' : 'Cord Length',
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

hiddenPrimaryImageUploadButton.addEventListener('change', uploadPrimaryImage);
hiddeAdditionalImageUploadButton.addEventListener('change', uploadAdditionalImage);

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


//Overview Event Listeners
atcOverviewDropdown.addEventListener('click', () => {
    $('#atc-overview-lower').toggle()

    if(atcOverviewLower.style.display == 'none') {
        atcOverviewChevron.className = 'atc-chevron'
    } else {
        atcOverviewChevron.className = 'atc-chevron-down'
    }
})

atcBrandField.addEventListener('blur', () => {
    productObject['brand'] = atcBrandField.value
})

atcPlatformField.addEventListener('blur', () => {
    productObject['platform'] = atcPlatformField.value
})

atcPriceChartingField.addEventListener('blur', () => {
    productObject['priceChartingID'] = atcPriceChartingField.value
})

atcDescriptionField.addEventListener('blur', () => {
    productObject['overview']['description'] = atcDescriptionField.value
})

atcAddFeatureButton.addEventListener('click', () => {
    $('#atc-add-feature-form').fadeIn()
})

atcAddFeatureCancel.addEventListener('click', () => {
    atcFeatureTitleField.value = ''
    atcFeatureDescriptionField.value = ''
    $('#atc-add-feature-form').fadeOut()
})
atcAddFeatureSubmit.addEventListener('click', () => {
    productObject.overview.features.push({
        'title' : atcFeatureTitleField.value,
        'description' : atcFeatureDescriptionField.value
    })

    buildATCFeatures()
    $('#atc-add-feature-form').fadeOut()
    atcFeatureTitleField.value = ''
    atcFeatureDescriptionField.value = ''
})

function buildATCFeatures() {
    atcAddFeatureForm.style.display = 'none'

    while(atcFeaturesContainer.firstChild) {
        atcFeaturesContainer.removeChild(atcFeaturesContainer.firstChild)
    }

    let features = productObject.overview.features
    features.forEach((feature) => {
        var index = features.findIndex(item => item == feature);

        let atcFeatureDiv = createDOMElement('div', 'atc-feature-div', 'none', atcFeaturesContainer)
        let atcFeatureDelete = createDOMElement('div', 'atc-feature-delete', '', atcFeatureDiv)
        atcFeatureDelete.setAttribute('onClick', `deleteFeature(${index})`)

        let atcFeatureInfo = createDOMElement('div', 'atc-feature-info', 'none', atcFeatureDiv)

        if(feature.description) {
            if(feature.title != '') {
                createDOMElement('div', 'atc-feature-title', feature.title , atcFeatureInfo)
            }

            createDOMElement('div', 'atc-feature-description', feature.description , atcFeatureInfo)

        } else {
            createDOMElement('div', 'atc-feature-description', feature, atcFeatureInfo)
        }
    })
}


atcAddIncludedButton.addEventListener('click', () => {
    $('#atc-add-included-form').fadeIn()
})
atcAddIncludedCancel.addEventListener('click', () => {
    atcAddIncludedField.value = ''
    $('#atc-add-included-form').fadeOut()
})
atcAddIncludedSubmit.addEventListener('click', () => {
    productObject.overview.included.push(atcAddIncludedField.value)
    buildATCIncluded()
    $('#atc-add-included-form').fadeOut()
    atcAddIncludedField.value = ''
})

function buildATCIncluded() {
    atcAddIncludedForm.style.display = 'none'

    while(atcWhatsIncludedContainer.firstChild) {
        atcWhatsIncludedContainer.removeChild(atcWhatsIncludedContainer.firstChild)
    }

    let included = productObject.overview.included
    included.forEach((includedText) => {
        var index = included.findIndex(item => item == includedText);

        let atcIncludedTextDiv = createDOMElement('div', 'atc-included-text-div', 'none', atcWhatsIncludedContainer)
        let deleteIncludedItem = createDOMElement('div', 'atc-feature-delete', '', atcIncludedTextDiv)
        deleteIncludedItem.setAttribute('onClick', `deleteIncluded(${index})`)

        createDOMElement('div', 'atc-feature-text', includedText, atcIncludedTextDiv)
    })
}

atcHazardWarning.addEventListener('click', () => {
    var previousHazardBool = productObject.hazardWarnings.chokingHazard
    productObject.hazardWarnings.chokingHazard = !previousHazardBool
    atcHazardWarning.className = previousHazardBool ? 'atc-hazard-warning' : 'atc-hazard-warning-selected'
})

//End Overview Event Listeners

atcSpecificationsDropdown.addEventListener('click', () => {
    $('#atc-specifications-lower').toggle()

    if(atcSpecificationsLower.style.display == 'none') {
        atcSpecificationsChevron.className = 'atc-chevron'
    } else {
        atcSpecificationsChevron.className = 'atc-chevron-down'
    }
})

adminConfirmationButton.addEventListener('click', () => {
    $('#admin-processing-screen').hide( () => {
        $('#admin-nav-section').fadeIn()
    })
})


//Final Submit Button
atcSubmit.addEventListener('click', () => {
    loadATCProcessingState()

    let finalProductObject = {...productObject, ...globalSpecsObject}
    console.log(productID)
    console.log(finalProductObject)

    database.collection("catalog").doc(productID).set(finalProductObject).then(function() {
        isDoneSubmitting = true

        adminConfirmationCheck.style.display = 'flex'
        adminProcessingTextContainer.style.display = 'none'
        adminConfirmationContainer.style.display = 'flex'
        adminProductID.innerHTML = productID
        adminProductTitleText.innerHTML = productObject['productName']

    }).catch(function(error) {
        $('#admin-processing-screen').hide( () => {
            $('#atc-modal').fadeIn()
        })
        alert(error.message)
    })
})











//________________________________________IMAGE UPLOAD________________________________________
//Main Image
function uploadPrimaryImage(e) {
    selectedPrimaryImageFile = e.target.files[0];
    handlePrimaryImageUpload()
}

async function handlePrimaryImageUpload() {
	const uploadTask = await storageRef.child(`productImages/${productID}`).put(selectedPrimaryImageFile);
	uploadAndCreatePrimaryImage()
}

async function uploadAndCreatePrimaryImage() {
    //Update database
	await storageRef.child('/productImages/'+productID)
		.getDownloadURL()
		.then(function(url) { productObject['productImage'] = url.toString() })

    //Create Image
    while(atcPrimaryImageContainer.firstChild) {
        atcPrimaryImageContainer.removeChild(atcPrimaryImageContainer.firstChild)
    }
    var newImage = document.createElement('img')
    newImage.setAttribute('class', 'atc-main-product-image')
    newImage.src = productObject['productImage']
    atcPrimaryImageContainer.appendChild(newImage)
    newImage.addEventListener('click', () => {
        hiddenPrimaryImageUploadButton.click();
    })
}


//Additional Images
function uploadAdditionalImage(e) {
    selectedAdditionalImageFile = e.target.files[0];
    handleAdditionalImageUpload()
}

var newImageID, numImages
async function handleAdditionalImageUpload() {
    numImages = Object.keys(productObject['productImages']).length
    newImageID = `${productID}-${numImages} `
	const uploadTask = await storageRef.child(`productImages/${newImageID}`).put(selectedAdditionalImageFile);
	uploadAndCreateAdditionalImages()
}

async function uploadAndCreateAdditionalImages() {
    //Update database
	await storageRef.child('/productImages/'+newImageID)
		.getDownloadURL()
		.then(function(url) { productObject['productImages'][numImages] = url.toString() })

    //Create Image
    while(atcAdditionalImagesContainer.firstChild) {
        atcAdditionalImagesContainer.removeChild(atcAdditionalImagesContainer.firstChild)
    }
    for( key in productObject['productImages']) {
        var newImage = document.createElement('img')
        newImage.setAttribute('class', 'atc-additional-image')
        newImage.src = productObject['productImages'][key]
        atcAdditionalImagesContainer.appendChild(newImage)
    }
    let addAdditionalImageButton = document.createElement('div')
    addAdditionalImageButton.className = 'atc-add-product-image'
    addAdditionalImageButton.innerHTML = ''
    atcAdditionalImagesContainer.appendChild(addAdditionalImageButton)
    addAdditionalImageButton.addEventListener('click', () => {
        hiddeAdditionalImageUploadButton.click()
    })
}








//Onload
function setATCInitialState() {
    productID = createID(8)
    productObject = {
        'availability' : {},
        'brand' : '',
        'category' : '',
        'dateCreated' : new Date() / 1000,
        'hazardWarnings' : {
            'chokingHazard' : false
        },
        'isAvailable' : false,
        'numItemsAvailable' : 0,
        'overview' : {
            'description' : '',
            'features' : [],
            'included' : [],
        },
        'platform' : '',
        'productImage' : '',
        'productImages' : {},
        'productName' : '',
        'priceChartingID' : '',
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

    //Reset Image Buttons and Containers
    while(atcPrimaryImageContainer.firstChild) {
        atcPrimaryImageContainer.removeChild(atcPrimaryImageContainer.firstChild)
    }

    var primaryImageButton = document.createElement('div')
    primaryImageButton.setAttribute('class', 'atc-main-product-image')
    primaryImageButton.innerHTML = ''
    atcPrimaryImageContainer.appendChild(primaryImageButton)
    primaryImageButton.addEventListener('click', () => {
        hiddenPrimaryImageUploadButton.click();
    })

    while(atcAdditionalImagesContainer.firstChild) {
        atcAdditionalImagesContainer.removeChild(atcAdditionalImagesContainer.firstChild)
    }

    let additionalImageButton = document.createElement('div')
    additionalImageButton.className = 'atc-add-product-image'
    additionalImageButton.innerHTML = ''
    atcAdditionalImagesContainer.appendChild(additionalImageButton)
    additionalImageButton.addEventListener('click', () => {
        hiddeAdditionalImageUploadButton.click()
    })

    //Load Search Field
    atcAutocompleteResults.style.display = 'none'

    //Reset product name field
    atcProductNameField.value = ''

    //Reset Category Buttons
    resetCategoryOptions()

    //Reset price fields
    atcPurchaseAcceptable.value = ''
    atcPurchaseGood.value = ''
    atcPurchaseExcellent.value = ''
    atcPurchaseNew.value = ''

    atcSaleAcceptable.value = ''
    atcSaleGood.value = ''
    atcSaleExcellent.value = ''
    atcSaleNew.value = ''

    //Reset Overview Fields
    atcOverviewLower.style.display = 'none'
    atcDescriptionField.value = ''
    buildATCFeatures()
    buildATCIncluded()


    //Reset Specification Fields
    atcSpecificationsLower.style.display = 'none'
    atcSpecificationsChevron.className = 'atc-chevron'
    while(atcSpecificationsLower.firstChild) {
        atcSpecificationsLower.removeChild(atcSpecificationsLower.firstChild)
    }

}




function resetCategoryOptions(option, data) {

    categoryOptionButtons.forEach( (categoryOption) => {
        document.getElementById(categoryOption).className = 'accessory-option-unselected'
    })

    switch (option) {
        case 'Games-category' :
            buildATCGame(data)
            document.getElementById(option).className = 'accessory-option-selected'
            break;

        case 'Consoles-category' :
            buildATCConsole(data)
            document.getElementById(option).className = 'accessory-option-selected'
            break;

        case 'Headsets-category' :
            buildATCHeadset(data)
            document.getElementById(option).className = 'accessory-option-selected'
            break;

        case 'Controllers-category' :
            buildATCController(data)
            document.getElementById(option).className = 'accessory-option-selected'
            break;

        case 'Cables-category' :
            buildATCCable(data)
            document.getElementById(option).className = 'accessory-option-selected'
            break;

        case 'Batteries-category' :
            buildATCPower(data)
            document.getElementById(option).className = 'accessory-option-selected'
            break;

        case 'PC-category' :
            buildATCPC(data)
            document.getElementById(option).className = 'accessory-option-selected'
            break;
        
        default:
            break;
    }
}

function buildATCGame(data) {
    productObject.category = 'Games'

    if(data) {
        globalSpecsObject = {
            'keySpecs' : {
                'edition' : data.keySpecs.edition ? data.keySpecs.edition : '',
                'ESRBRating' : data.keySpecs.ESRBRating ? data.keySpecs.ESRBRating : '',
                'ESRBDescriptors' : data.keySpecs.ESRBDescriptors ? data.keySpecs.ESRBDescriptors : '',
                'compatiblePlatforms' : data.keySpecs.compatiblePlatforms ? data.keySpecs.compatiblePlatforms : '',
                'softwareFormat' : data.keySpecs.softwareFormat ? data.keySpecs.softwareFormat : '',
            },
            'general' : {
                'productName' : data.general.productName ? data.general.productName : '',
                'brand' : data.general.brand ? data.general.brand : '',
                'publisher' : data.general.publisher ? data.general.publisher : '',
                'developer' : data.general.developer ? data.general.developer : '',
                'modelNumber' : data.general.modelNumber ? data.general.modelNumber : '',
                'releaseDate' : data.general.releaseDate ? data.general.releaseDate : '',
            },
            'gameDetails' : {
                'genre' : data.gameDetails.genre ? data.gameDetails.genre : '',
                'gameFranchise' : data.gameDetails.gameFranchise ? data.gameDetails.gameFranchise : '',
                'gameSeries' : data.gameDetails.gameSeries ? data.gameDetails.gameSeries : '',
                'enhancedFor' : data.gameDetails.enhancedFor ? data.gameDetails.enhancedFor : '',
                'multiplayer' : data.gameDetails.multiplayer ? data.gameDetails.multiplayer : '',
            },
            'other' : {
                'UPC' : '',
            }
        }
    } else {
        globalSpecsObject = {
            'keySpecs' : {
                'edition' : '',
                'ESRBRating' : '',
                'ESRBDescriptors' : '',
                'compatiblePlatforms' : '',
                'softwareFormat' : '',
            },
            'general' : {
                'productName' : '',
                'brand' : '',
                'publisher' :  '',
                'developer' : '',
                'modelNumber' :  '',
                'releaseDate' : '',
            },
            'gameDetails' : {
                'genre' :  '',
                'gameFranchise' :  '',
                'gameSeries' :  '',
                'enhancedFor' : '',
                'multiplayer' : '',
            },
            'other' : {
                'UPC' : '',
            }
        }
    }

    var specificationsArray = ['keySpecs', 'general', 'gameDetails', 'other']
    if(data){
        buildSpecificationsLower(specificationsArray, true)
    } else {
        buildSpecificationsLower(specificationsArray, false)
    }
}

function buildATCConsole(data) {
    productObject.category = 'Consoles'

    if(data) {
        globalSpecsObject = {
            'keySpecs' : {
                '4KPlayer' : data.keySpecs['4KPlayer'] ? data.keySpecs['4KPlayer'] : '',
                'maxGraphics' : data.keySpecs.maxGraphics ? data.keySpecs.maxGraphics : '',
                'maxResolution' : data.keySpecs.maxResolution ? data.keySpecs.maxResolution : '',
                'HDR' : data.keySpecs.HDR ? data.keySpecs.HDR : '',
                'bluetooth' : data.keySpecs.bluetooth ? data.keySpecs.bluetooth : '',
                'numUSBPorts' : data.keySpecs.numUSBPorts ? data.keySpecs.numUSBPorts : '',
            },
            'general' : {
                'productName' : data.general.productName ? data.general.productName : '',
                'brand' : data.general.brand ? data.general.brand : '',
                'additionalAccessories' : data.general.additionalAccessories ? data.general.additionalAccessories : '',
                'parentalControl' : data.general.parentalControl ? data.general.parentalControl : '',
                'consoleType' : data.general.consoleType ? data.general.consoleType : '',
                'compatiblePlatforms' : data.general.compatiblePlatforms ? data.general.compatiblePlatforms : '',
                'modelNumber' : data.general.modelNumber ? data.general.modelNumber : '',
                'color' : data.general.color ? data.general.color : '',
            },
            'features' : {
                'HDStreaming' : data.features.HDStreaming ? data.features.HDStreaming : '',
                'blurayPlayer' : data.features.blurayPlayer ? data.features.blurayPlayer : '',
                'onlineFeatures' : data.features.onlineFeatures ? data.features.onlineFeatures : '',
            },
            'display' : {
                'maxGraphics' : data.display.maxGraphics ? data.display.maxGraphics : '',
                'maxResolution' : data.display.maxResolution ? data.display.maxResolution : '',
                'HDR' : data.display['HDR'] ? data.display['HDR'] : '',
            },
            'storage' : {
                'internal' : data.storage.internal ? data.storage.internal : '',
                'type' : data.storage.type ? data.storage.type : '',
                'capacity' : data.storage.capacity ? data.storage.capacity : '',
                'memoryCards' : data.storage.memoryCards ? data.storage.memoryCards : '',
                'numMemoryCards' : data.storage.numMemoryCards ? data.storage.numMemoryCards : '',
            },
            'dimensions' : {
                'height' : data.dimensions.height ? data.dimensions.height : '',
                'width' : data.dimensions.width ? data.dimensions.width : '',
                'length' : data.dimensions.length ? data.dimensions.length : '',
                'weight' : data.dimensions.weight ? data.dimensions.weight : '',
            },
            'connectivity' : {
                'bluetooth' : data.connectivity.bluetooth ? data.connectivity.bluetooth : '',
                'internet' : data.connectivity.internet ? data.connectivity.internet : '',
                'wifi' : data.connectivity.wifi ? data.connectivity.wifi : '',
                'smartCapable' : data.connectivity.smartCapable ? data.connectivity.smartCapable : '',
                'usbPorts' : data.connectivity.usbPorts ? data.connectivity.usbPorts : '',
            },
            'gameplay' : {
                'maxPlayers' : data.gameplay.maxPlayers ? data.gameplay.maxPlayers : '',
                'motionSensing' : data.gameplay.motionSensing ? data.gameplay.motionSensing : '',
            },
            'included' : {
                'controllers' : data.included.controllers ? data.included.controllers : '',
                'games' : data.included.games ? data.included.games : '',
                'cables' : data.included.cables ? data.included.cables : '',
            },
            'other' : {
                'UPC' : ''
            }
        }
    } else {
        globalSpecsObject = {
            'keySpecs' : {
                '4KPlayer' : '',
                'maxGraphics' : '',
                'maxResolution' : '',
                'HDR' : '',
                'bluetooth' : '',
                'numUSBPorts' : '',
            },
            'general' : {
                'productName' : '',
                'brand' :  '',
                'additionalAccessories' : '',
                'parentalControl' : '',
                'consoleType' : '',
                'compatiblePlatforms' : '',
                'modelNumber' : '',
                'color' : '',
            },
            'features' : {
                'HDStreaming' : '',
                'blurayPlayer' : '',
                'onlineFeatures' : '',
            },
            'display' : {
                'maxGraphics' : '',
                'maxResolution' : '',
                'HDR' : '',
            },
            'storage' : {
                'internal' : '',
                'type' : '',
                'capacity' : '',
                'memoryCards' : '',
                'numMemoryCards' : '',
            },
            'dimensions' : {
                'height' : '',
                'width' : '',
                'length' : '',
                'weight' : '',
            },
            'connectivity' : {
                'bluetooth' : '',
                'internet' : '',
                'wifi' : '',
                'smartCapable' : '',
                'usbPorts' : '',
            },
            'gameplay' : {
                'maxPlayers' : '',
                'motionSensing' : '',
            },
            'included' : {
                'controllers' : '',
                'games' : '',
                'cables' : '',
            },
            'other' : {
                'UPC' : ''
            }
        }
    }

    var specificationsArray = ['keySpecs', 'general', 'features', 'display', 'storage', 'dimensions', 'connectivity', 'gameplay', 'included', 'other']
    if(data){
        buildSpecificationsLower(specificationsArray, true)
    } else {
        buildSpecificationsLower(specificationsArray, false)
    }
}

function buildATCHeadset(data) {
    console.log('headset')
}

function buildATCController(data) {
    productObject.category = 'Controllers'

    if(data) {
        globalSpecsObject = {
            'keySpecs' : {
                'voiceAssistant' : data.keySpecs.voiceAssistant ? data.keySpecs.voiceAssistant : '',
                'wireless' : data.keySpecs.wireless ? data.keySpecs.wireless : '',
                'batterySize' : data.keySpecs.wireless ? data.keySpecs.wireless : '',
                'compatiblePlatforms' : data.keySpecs.wireless ? data.keySpecs.wireless : '',
            },
            'general' : {
                'productName' : data.keySpecs.productName ? data.keySpecs.productName : '',
                'brand' : data.keySpecs.brand ? data.keySpecs.brand : '',
                'additionalAccessories' : data.keySpecs.additionalAccessories ? data.keySpecs.additionalAccessories : '',
                'modelNumber' : data.keySpecs.modelNumber ? data.keySpecs.modelNumber : '',
                'color' : data.keySpecs.color ? data.keySpecs.color : '',
            },
            'features' : {
                'headsetJack' : data.features.headsetJack ? data.features.headsetJack : '',
                'rumbleVibration' : data.features.rumbleVibration ? data.features.rumbleVibration : '',
                'analogJoysticks' : data.features.analogJoysticks ? data.features.analogJoysticks : '',
                'buttonMapping' : data.features.buttonMapping ? data.features.buttonMapping : '',
                'lightingType' : data.features.lightingType ? data.features.lightingType : '',
                'illumination' : data.features.illumination ? data.features.illumination : '',
                'shareButton' : data.features.shareButton ? data.features.shareButton : '',
            },
            'power' : {
                'rechargeableBattery' : data.power.rechargeableBattery ? data.power.rechargeableBattery : '',
                'chargingInterfaces' : data.power.chargingInterfaces ? data.power.chargingInterfaces : '',
                'batterySize' : data.power.batterySize ? data.power.batterySize : '',
                'numBatteries' : data.power.numBatteries ? data.power.numBatteries : '',
                'batteriesIncluded' : data.power.batteriesIncluded ? data.power.batteriesIncluded : '',
            },
            'dimensions' : {
                'height' : data.dimensions.height ? data.dimensions.height : '',
                'width' : data.dimensions.width ? data.dimensions.width : '',
                'length' : data.dimensions.length ? data.dimensions.length : '',
                'weight' : data.dimensions.weight ? data.dimensions.weight : '',
                'cordLength' : data.dimensions.cordLength ? data.dimensions.cordLength : '',
            },
            'other' : {
                'UPC' : ''
            }
        }

    } else {

        globalSpecsObject = {
            'keySpecs' : {
                'voiceAssistant' : '',
                'wireless' : '',
                'batterySize' : '',
                'compatiblePlatforms' : '',
            },
            'general' : {
                'productName' : '',
                'brand' : '',
                'additionalAccessories' : '',
                'modelNumber' : '',
                'color' : '',
            },
            'features' : {
                'headsetJack' :  '',
                'rumbleVibration' :  '',
                'analogJoysticks' :  '',
                'buttonMapping' :  '',
                'lightingType' :  '',
                'illumination' :  '',
                'shareButton' :  '',
            },
            'power' : {
                'rechargeableBattery' :  '',
                'chargingInterfaces' :  '',
                'batterySize' :  '',
                'numBatteries' :  '',
                'batteriesIncluded' :  '',
            },
            'dimensions' : {
                'height' :  '',
                'width' :  '',
                'length' :  '',
                'weight' :  '',
                'cordLength' :  '',
            },
            'other' : {
                'UPC' : ''
            }
        }
    }

    var specificationsArray = ['keySpecs', 'general', 'features', 'power', 'dimensions', 'other']
    if(data){
        buildSpecificationsLower(specificationsArray, true)
    } else {
        buildSpecificationsLower(specificationsArray, false)
    }
}

function buildATCCable(data) {
    console.log('cable')
}

function buildATCPower(data) {
    console.log('power')
}

function buildATCPC(data) {
    console.log('pc')
}


//__________________________________________Helper functions__________________________________________
function updateProductSpecs(header, spec) {
    globalSpecsObject[header][spec] = document.getElementById(`spec-${header}-${spec}`).value 

}


function deleteFeature(index) {
    productObject.overview.features.splice(index, 1)
    buildATCFeatures()
}


function deleteIncluded(index) {
    productObject.overview.included.splice(index, 1)
    buildATCIncluded()
}

function buildSpecificationsLower(specificationsArray, isPrefilledData) {
    while(atcSpecificationsLower.firstChild) {
        atcSpecificationsLower.removeChild(atcSpecificationsLower.firstChild)
    }

    specificationsArray.forEach( (specificationHeader) => {
        var atcSpecBlock = createDOMElement('div', 'atc-spec-block', 'none', atcSpecificationsLower)
        createDOMElement('text', 'atc-spec-header', specHeadersDict[specificationHeader], atcSpecBlock)
        var atcSpecBlockRight = createDOMElement('div', 'atc-spec-block-right', 'none', atcSpecBlock)
        for (var spec in globalSpecsObject[specificationHeader]) {
            if( globalSpecsObject[specificationHeader].hasOwnProperty(spec) ){
                var atcSpecSubsection = createDOMElement('div', 'atc-spec-subsection', 'none', atcSpecBlockRight)
                createDOMElement('text', 'atc-subsection-text', globalKeyDict[spec], atcSpecSubsection)
                var atcSubsectionInput = createDOMElement('input', 'atc-subsection-input w-input', 'none', atcSpecSubsection)
                atcSubsectionInput.setAttribute('type', 'text')
                if(isPrefilledData) {
                    atcSubsectionInput.value = globalSpecsObject[specificationHeader][spec] == '' ? 'Enter Text' : globalSpecsObject[specificationHeader][spec]
                } else {
                    atcSubsectionInput.placeholder = 'Enter Text'
                }
                atcSubsectionInput.setAttribute('id', `spec-${specificationHeader}-${spec}`)
                atcSubsectionInput.setAttribute('onblur', `updateProductSpecs("${specificationHeader}", "${spec}")`)
            }
        }
    })
}


function prefillDataFromProduct(ID) {
    $('#atc-autocomplete-results').fadeOut(200)
    console.log(ID)
    database.collection('catalog').doc(ID).get().then( (doc) => {
    var data = doc.data()

    productObject = {
        'availability' : {},
        'brand' : data.brand,
        'category' : data.category,
        'dateCreated' : new Date() / 1000,
        'hazardWarnings' : {
            'chokingHazard' : false
        },
        'isAvailable' : false,
        'numItemsAvailable' : 0,
        'overview' : {
            'description' : data.overview.description,
            'features' : data.overview.features,
            'included' : data.overview.included,
        },
        'platform' : data.platform,
        'productImage' : '',
        'productImages' : {},
        'productName' : data.productName,
        'purchasePrices' : data.purchasePrices,
        'salePrices' : data.salePrices,
    }


    //Prefill Top Container
    resetCategoryOptions(`${data.category}-category`, data)

    atcPurchaseAcceptable.value = data.purchasePrices.usedAcceptable
    atcPurchaseGood.value = data.purchasePrices.usedGood
    atcPurchaseExcellent.value = data.purchasePrices.usedExcellent
    atcPurchaseNew.value = data.purchasePrices.new

    atcSaleAcceptable.value = data.salePrices.usedAcceptable
    atcSaleGood.value = data.salePrices.usedGood
    atcSaleExcellent.value = data.salePrices.usedExcellent
    atcSaleNew.value = data.salePrices.new

    atcProductNameField.value = data.productName

    //Prefill Overview Container
    atcBrandField.value = data.brand
    atcPlatformField.value = data.platform
    atcDescriptionField.value = data.overview.description
    buildATCFeatures()
    buildATCIncluded()


  })
}


function loadATCProcessingState() {
    $('#atc-modal').fadeOut(200, () => {
        $('#admin-processing-screen').fadeIn()

        if(!isDoneSubmitting) {
            adminConfirmationCheck.style.display = 'none'
            adminProcessingTextContainer.style.display = 'flex'
            adminConfirmationContainer.style.display = 'none'
        }
    })
}











//_______________________________Search Field__________________________________
let atcAutocompleteResults = document.getElementById('atc-autocomplete-results')
let atcSearchCancel = document.getElementById('atc-search-cancel')

atcSearchCancel.addEventListener('click', () => {
    atcSearchField.value = ''
    $('#atc-autocomplete-results').fadeOut()
})

window.addEventListener('click', function(e){   
    if (document.getElementById('atc-autocomplete-results').contains(e.target)){
      // Clicked in box
    } else{
      // Clicked outside the box
      $('#atc-autocomplete-results').fadeOut()
    }
});

const atcSearch = instantsearch({
    indexName: 'products_gametree',
    searchClient,
    getSearchParams() {
        return {
          hitsPerPage: 10,
        }
    }
});

function createATCAutocompleteResults(results) {

    let hitsContainer = document.createElement('div')
    hitsContainer.className = 'atc-autocomplete-results'

    if(results.hits.length != 0) {

        for (i = 0; i < (results.hits.length < 10 ? results.hits.length : 10); i++) {

            var hit = results.hits[i]
    
            let atcAutocompleteResult = document.createElement('div')
            atcAutocompleteResult.className = 'atc-autocomplete-result'
            atcAutocompleteResult.setAttribute('onClick', `prefillDataFromProduct("${hit.objectID}")`)
            hitsContainer.appendChild(atcAutocompleteResult)
    
            let atcResultImage = createDOMElement('img', 'atc-result-image', 'none', atcAutocompleteResult)
            atcResultImage.src = hit.productImage
    
            let atcResultInfoDiv = createDOMElement('div', 'header-result-info-div', 'none', atcAutocompleteResult)
            createDOMElement('div', 'header-result-title', hit.general.productName, atcResultInfoDiv)
            createDOMElement('div', 'header-result-price', hit.category, atcResultInfoDiv)
    
            if (i != 9) {
                createDOMElement('div', 'header-autocomplete-divider', 'none', hitsContainer)
            }
        }
    } else {
        atcAutocompleteResults.style.display = 'none'
    }

    return hitsContainer.outerHTML
}

// Create the render function
const atcRenderAutocomplete = (renderOptions, isFirstRender) => {
  const { indices, currentRefinement, refine, widgetParams } = renderOptions;

  if (isFirstRender) {
    const input = document.querySelector('#atc-search-field');

    input.addEventListener('input', event => {
        refine(event.currentTarget.value);
        console.log('input changed')

        if(atcAutocompleteResults.style.display == 'none') {
            console.log('displaying results')
            $('#atc-autocomplete-results').fadeIn(200).css('display', 'block')
        }

        if(event.currentTarget.value == '') {
            $('#atc-autocomplete-results').fadeOut(200)
        }
    });
  }

  document.querySelector('#atc-search-field').value = currentRefinement;
  widgetParams.container.innerHTML = indices
    .map(createATCAutocompleteResults)
    .join('');
};

// Create the custom widget
const atcCustomAutocomplete = instantsearch.connectors.connectAutocomplete(
    atcRenderAutocomplete
);

// Instantiate the custom widget
atcSearch.addWidgets([
    
    atcCustomAutocomplete({
        container: document.querySelector('#atc-autocomplete-results'),
    })
  
]);

atcSearch.start()
