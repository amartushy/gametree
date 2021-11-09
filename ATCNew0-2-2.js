

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

//Global Variables
var productID
var storageRef = firebase.storage().ref()
var productObject = {}
var globalSpecsObject = {}
var selectedPrimaryImageFile;
var selectedAdditionalImageFile;
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
        atcOverviewLower.setAttribute('class', 'atc-chevron-down')
    } else {
        atcOverviewLower.setAttribute('class', 'atc-chevron')
    }
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
        let atcFeatureDiv = document.createElement('div')
        atcFeatureDiv.className = 'atc-feature-div'
        atcFeaturesContainer.appendChild(atcFeatureDiv)

        let atcFeatureTitle = document.createElement('div')
        atcFeatureTitle.className = 'atc-feature-title'
        atcFeatureTitle.innerHTML = feature.title 
        atcFeatureDiv.appendChild(atcFeatureTitle)

        let atcFeatureDescription = document.createElement('div')
        atcFeatureDescription.className = 'atc-feature-description'
        atcFeatureDescription.innerHTML = feature.description 
        atcFeatureDiv.appendChild(atcFeatureDescription)
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
        let newIncluded = document.createElement('div')
        newIncluded.setAttribute('class', 'atc-feature-text')
        newIncluded.innerHTML = includedText
        atcWhatsIncludedContainer.appendChild(newIncluded)
    })
}

atcHazardWarning.addEventListener('click', () => {
    var previousHazardBool = productObject.hazardWarnings.chokingHazard
    productObject.hazardWarnings.chokingHazard = !previousHazardBool
    atcHazardWarning.className = previousHazardBool ? 'atc-hazard-warning' : 'atc-hazard-warning-selected'
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

async function uploadAndCreateAdditionalConsoleImages() {
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


//Final Submit Button
atcSubmit.addEventListener('click', () => {
    console.log(productObject)
    console.log(globalSpecsObject)
})








//Onload
function setATCInitialState() {
    productID = createID(8)
    productObject = {
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
        'hazardWarnings' : {
            'chokingHazard' : false
        }
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
    while(atcSpecificationsLower.firstChild) {
        atcSpecificationsLower.removeChild(atcSpecificationsLower.firstChild)
    }
}




function resetCategoryOptions(option) {

    categoryOptionButtons.forEach( (categoryOption) => {
        document.getElementById(categoryOption).className = 'accessory-option-unselected'
    })

    switch (option) {
        case 'game-category' :
            buildATCGame()
            document.getElementById(option).className = 'accessory-option-selected'
            break;

        case 'console-category' :
            buildATCConsole()
            document.getElementById(option).className = 'accessory-option-selected'
            break;

        case 'headset-category' :
            buildATCHeadset()
            document.getElementById(option).className = 'accessory-option-selected'
            break;

        case 'controller-category' :
            buildATCController()
            document.getElementById(option).className = 'accessory-option-selected'
            break;

        case 'cable-category' :
            buildATCCable()
            document.getElementById(option).className = 'accessory-option-selected'
            break;

        case 'power-category' :
            buildATCPower()
            document.getElementById(option).className = 'accessory-option-selected'
            break;

        case 'pc-category' :
            buildATCPC()
            document.getElementById(option).className = 'accessory-option-selected'
            break;
        
        default:
            break;
    }
}

function buildATCGame() {
    console.log('game')
}

function buildATCConsole() {
    globalSpecsObject = {
        'keySpecs' : {
            '4KPlayer' : '',
            'maxGraphics' : '',
            'maxResolution' : '',
            'HDR' : '',
            'bluetooth' : '',
            'numUSBPorts' : ''
        },
        'general' : {
            'productName' : '',
            'brand' : '',
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

    //Build specifications lower
    while(atcSpecificationsLower.firstChild) {
        atcSpecificationsLower.removeChild(atcSpecificationsLower.firstChild)
    }

    var specificationsArray = ['keySpecs', 'general', 'features', 'display', 'storage', 'dimensions', 'connectivity', 'gameplay', 'included', 'other']

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
                atcSubsectionInput.placeholder = 'Enter Text'
                atcSubsectionInput.setAttribute('id', `spec-${specificationHeader}-${spec}`)
                atcSubsectionInput.setAttribute('onblur', `updateProductSpecs("${specificationHeader}", "${spec}")`)
            }
        }
    })
}

function buildATCHeadset() {
    console.log('headset')
}

function buildATCController() {
    console.log('controller')
}

function buildATCCable() {
    console.log('cable')
}

function buildATCPower() {
    console.log('power')
}

function buildATCPC() {
    console.log('pc')
}


//Helper functions
function updateProductSpecs(header, spec) {
    globalSpecsObject[header][spec] = document.getElementById(`spec-${header}-${spec}`).value 

    console.log(globalSpecsObject)
}
