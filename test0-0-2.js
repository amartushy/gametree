let atcConsoleModal = document.getElementById('atc-console-modal')
let atcCloseconsoleModal = document.getElementById('atc-close-console-modal')
let atcConsoleButton = document.getElementById('atc-console-button')

atcConsoleButton.addEventListener('click', () => {
    setATCConsoleInitialState()
    $('#atc-console-modal').fadeIn().css('display', 'flex');
})
atcCloseconsoleModal.addEventListener('click', () => {
    $('#atc-console-modal').fadeOut()
    $('#admin-nav-section').fadeIn().css('display', 'flex');
})


//Globals
var consoleID
var atcConsoleObject = {}

//ATC Console Top Container______________________________________________________________________________________________
//Main Image
let atcConsoleMainImageContainer = document.getElementById('atc-console-main-image-container')

var hiddenConsoleMainImageUploadButton = document.getElementById('hidden-console-main-image-upload-button')
hiddenConsoleMainImageUploadButton.addEventListener('change', uploadConsoleImage);

var selectedConsoleImageFile;
function uploadConsoleImage(e) {
    selectedConsoleImageFile = e.target.files[0];
    handleConsoleImageUpload()
}

async function handleConsoleImageUpload() {
	const uploadTask = await storageRef.child(`productImages/${consoleID}`).put(selectedConsoleImageFile);
	uploadAndCreateConsoleImage()
}

//final submit button and update firebase
async function uploadAndCreateConsoleImage() {
	await storageRef.child('/productImages/'+consoleID)
		.getDownloadURL()
		.then(function(url) { atcConsoleObject['productImage'] = url.toString() })

    //Create Image
    while(atcConsoleMainImageContainer.firstChild) {
        atcConsoleMainImageContainer.removeChild(atcConsoleMainImageContainer.firstChild)
    }
    var newImage = document.createElement('img')
    newImage.setAttribute('class', 'atc-main-product-image')
    newImage.src = atcConsoleObject['productImage']
    atcConsoleMainImageContainer.appendChild(newImage)
    newImage.addEventListener('click', () => {
        hiddenConsoleMainImageUploadButton.click();
    })
}


//Additional Images
let atcConsoleAdditionalImagesContainer = document.getElementById('atc-console-additional-images-container')

const hiddenConsoleAdditionalImageUploadButton = document.getElementById('hidden-console-additional-image-upload-button')
hiddenConsoleAdditionalImageUploadButton.addEventListener('change', uploadConsoleAdditionalImage);

var selectedConsoleAdditionalImageFile;
function uploadConsoleAdditionalImage(e) {
    selectedConsoleAdditionalImageFile = e.target.files[0];
    handleConsoleAdditionalImageUpload()
}

var newImageID, numImages
async function handleConsoleAdditionalImageUpload() {
    numImages = Object.keys(atcConsoleObject['productImages']).length
    newImageID = `${consoleID}-${numImages} `
	const uploadTask = await storageRef.child(`productImages/${newImageID}`).put(selectedConsoleAdditionalImageFile);
	uploadAndCreateAdditionalConsoleImages()
}

//final submit button and update firebase
async function uploadAndCreateAdditionalConsoleImages() {
	await storageRef.child('/productImages/'+newImageID)
		.getDownloadURL()
		.then(function(url) { atcConsoleObject['productImages'][numImages] = url.toString() })

    //Create Image
    while(atcConsoleAdditionalImagesContainer.firstChild) {
        atcConsoleAdditionalImagesContainer.removeChild(atcConsoleAdditionalImagesContainer.firstChild)
    }
    for( key in atcConsoleObject['productImages']) {
        var newImage = document.createElement('img')
        newImage.setAttribute('class', 'atc-additional-image')
        newImage.src = atcConsoleObject['productImages'][key]
        atcConsoleAdditionalImagesContainer.appendChild(newImage)
    }
    let addAdditionalImageButton = document.createElement('div')
    addAdditionalImageButton.className = 'atc-add-product-image'
    addAdditionalImageButton.innerHTML = ''
    atcConsoleAdditionalImagesContainer.appendChild(addAdditionalImageButton)
    addAdditionalImageButton.addEventListener('click', () => {
        hiddenConsoleAdditionalImageUploadButton.click()
    })
}




let atcConsolePurchaseAcceptable = document.getElementById('atc-console-purchase-acceptable')
let atcConsolePurchaseGood = document.getElementById('atc-console-purchase-good')
let atcConsolePurchaseExcellent = document.getElementById('atc-console-purchase-excellent')
let atcConsolePurchaseNew = document.getElementById('atc-console-purchase-new')

atcConsolePurchaseAcceptable.addEventListener('blur', () => {
    atcConsoleObject['purchasePrices']['usedAcceptable'] = atcConsolePurchaseAcceptable.value
})
atcConsolePurchaseGood.addEventListener('blur', () => {
    atcConsoleObject['purchasePrices']['usedGood'] = atcConsolePurchaseGood.value
})
atcConsolePurchaseExcellent.addEventListener('blur', () => {
    atcConsoleObject['purchasePrices']['usedFantastic'] = atcConsolePurchaseExcellent.value
})
atcConsolePurchaseNew.addEventListener('blur', () => {
    atcConsoleObject['purchasePrices']['new'] = atcConsolePurchaseNew.value
})


let atcConsoleSaleAcceptable = document.getElementById('atc-console-sale-acceptable')
let atcConsoleSaleGood = document.getElementById('atc-console-sale-good')
let atcConsoleSaleExcellent = document.getElementById('atc-console-sale-excellent')
let atcConsoleSaleNew = document.getElementById('atc-console-sale-new')

atcConsoleSaleAcceptable.addEventListener('blur', () => {
    atcConsoleObject['salePrices']['usedAcceptable'] = atcConsoleSaleAcceptable.value
})
atcConsoleSaleGood.addEventListener('blur', () => {
    atcConsoleObject['salePrices']['usedGood'] = atcConsoleSaleGood.value
})
atcConsoleSaleExcellent.addEventListener('blur', () => {
    atcConsoleObject['salePrices']['usedFantastic'] = atcConsoleSaleExcellent.value
})
atcConsoleSaleNew.addEventListener('blur', () => {
    atcConsoleObject['salePrices']['new'] = atcConsoleSaleNew.value
})

function resetConsolePriceFields() {
    atcConsolePurchaseAcceptable.value = ''
    atcConsolePurchaseGood.value = ''
    atcConsolePurchaseExcellent.value = ''
    atcConsolePurchaseNew.value = ''

    atcConsoleSaleAcceptable.value = ''
    atcConsoleSaleGood.value = ''
    atcConsoleSaleExcellent.value = ''
    atcConsoleSaleNew.value = ''
}



//Overview elements___________________________________________________________________________________________________________________________________________________
let atcConsoleHeaderDiv = document.getElementById('atc-console-header-div')
let atcConsoleOverviewLower = document.getElementById('atc-console-overview-lower')
let atcConsoleOverviewChevron = document.getElementById('atc-console-overview-chevron')

atcConsoleHeaderDiv.setAttribute('onClick', 'displayConsoleOverviewLower()')
function displayConsoleOverviewLower() {
    $('#atc-console-overview-lower').toggle()

    if(atcConsoleOverviewLower.style.display == 'none') {
        atcConsoleOverviewChevron.setAttribute('class', 'atc-game-chevron-down')
    } else {
        atcConsoleOverviewChevron.setAttribute('class', 'atc-game-chevron')
    }
}

let atcConsoleDescriptionInput = document.getElementById('atc-console-description-input')
atcConsoleDescriptionInput.addEventListener('blur', () => {
    atcConsoleObject['overview']['description'] = atcConsoleDescriptionInput.value
})

let atcConsoleAddFeatureButton = document.getElementById('atc-console-add-feature-button')
let atcConsoleFeaturesContainer = document.getElementById('atc-console-features-container')
let atcConsoleAddFeatureForm = document.getElementById('atc-console-add-feature-form')
let atcConsoleFeatureTitleField = document.getElementById('atc-console-feature-title-field')
let atcConsoleFeatureDescriptionField = document.getElementById('atc-console-feature-description-field')
let atcConsoleAddFeatureCancel = document.getElementById('atc-console-add-feature-cancel')
let atcConsoleAddFeatureSubmit = document.getElementById('atc-console-add-feature-submit')

atcConsoleAddFeatureButton.addEventListener('click', () => {
    $('#atc-console-add-feature-form').fadeIn()
})
atcConsoleAddFeatureCancel.addEventListener('click', () => {
    atcConsoleFeatureTitleField.value = ''
    atcConsoleFeatureDescriptionField.value = ''
    $('#atc-console-add-feature-form').fadeOut()
})
atcConsoleAddFeatureSubmit.addEventListener('click', () => {
    atcConsoleObject.overview.features.push({
        'title' : atcConsoleFeatureTitleField.value,
        'description' : atcConsoleFeatureDescriptionField.value
    })

    buildATCConsoleFeatures()
    $('#atc-console-add-feature-form').fadeOut()
    atcConsoleFeatureTitleField.value = ''
    atcConsoleFeatureDescriptionField.value = ''
})

function buildATCConsoleFeatures() {
    atcConsoleAddFeatureForm.style.display = 'none'

    while(atcConsoleFeaturesContainer.firstChild) {
        atcConsoleFeaturesContainer.removeChild(atcConsoleFeaturesContainer.firstChild)
    }

    let features = atcConsoleObject.overview.features
    features.forEach((feature) => {
        let atcFeatureDiv = document.createElement('div')
        atcFeatureDiv.className = 'atc-feature-div'
        atcConsoleFeaturesContainer.appendChild(atcFeatureDiv)

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


let atcConsoleAddIncludedButton = document.getElementById('atc-console-add-included')
let atcConsoleWhatsIncludedContainer = document.getElementById('atc-console-whats-included-container')
let atcConsoleAddIncludedForm = document.getElementById('atc-console-add-included-form')
let atcConsoleAddIncludedField = document.getElementById('atc-console-add-included-field')
let atcConsoleAddIncludedCancel = document.getElementById('atc-console-add-included-cancel')
let atcConsoleAddIncludedSubmit = document.getElementById('atc-console-add-included-submit')


atcConsoleAddIncludedButton.addEventListener('click', () => {
    $('#atc-console-add-included-form').fadeIn()
})
atcConsoleAddIncludedCancel.addEventListener('click', () => {
    atcConsoleAddIncludedField.value = ''
    $('#atc-console-add-included-form').fadeOut()
})
atcConsoleAddIncludedSubmit.addEventListener('click', () => {
    atcConsoleObject.overview.included.push(atcConsoleAddIncludedField.value)
    buildATCConsoleIncluded()
    $('#atc-console-add-included-form').fadeOut()
    atcConsoleAddIncludedField.value = ''
})

function buildATCConsoleIncluded() {
    atcConsoleAddIncludedForm.style.display = 'none'

    while(atcConsoleWhatsIncludedContainer.firstChild) {
        atcConsoleWhatsIncludedContainer.removeChild(atcConsoleWhatsIncludedContainer.firstChild)
    }

    let included = atcConsoleObject.overview.included
    included.forEach((includedText) => {
        let newIncluded = document.createElement('div')
        newIncluded.setAttribute('class', 'atc-feature-text')
        newIncluded.innerHTML = includedText
        atcConsoleWhatsIncludedContainer.appendChild(newIncluded)
    })
}

const storageOptionsArea = document.getElementById('storage-options-area')
const storageOptions = ['4GB', '8GB', '16GB', '32GB', '40GB', '60GB', '64GB', '80GB', '120GB', '128GB', '160GB', '250GB', '256GB', '320GB', '500GB', '512GB', '1TB', '2TB']
var selectedStorageOptions = []

function buildATCConsoleStorageOptions() {
    while(storageOptionsArea.firstChild) {
        storageOptionsArea.removeChild(storageOptionsArea.firstChild)
    }

    storageOptions.forEach( (option) => {
        var storageOptionButton = createDOMElement('div', 'storage-option-unselected', option, storageOptionsArea)
        storageOptionButton.setAttribute('id', `storage-option-${option}`)
        storageOptionButton.setAttribute('onClick', `selectStorageOption("${option}")`)
    })

}

function selectStorageOption(optionValue) {

    if ( selectedStorageOptions.includes(optionValue) ){
        const indexOfOption = selectedStorageOptions.indexOf(optionValue)
        if (indexOfOption > -1) {
            selectedStorageOptions.splice(indexOfOption, 1)
        }
    } else {
        selectedStorageOptions.push(optionValue)
    }

    storageOptions.forEach( (option) => {
        var optionButton = document.getElementById(`storage-option-${option}`)

        if (selectedStorageOptions.includes(option)) {
            optionButton.className = 'storage-option-selected'
        } else {
            optionButton.className = 'storage-option-unselected'
        }
    })

    atcConsoleObject['storageOptions'] = selectedStorageOptions
    console.log(atcConsoleObject)
}




//Specifications__________________________________________________________________________________________________________________
let atcConsoleSpecificationsHeader = document.getElementById('atc-console-specifications-header')
let atcConsoleSpecificationsLower = document.getElementById('atc-console-specifications-lower')
let atcConsoleSpecificationsChevron = document.getElementById('atc-console-specifications-chevron')

atcConsoleSpecificationsHeader.setAttribute('onClick', 'displayConsoleSpecificationsLower()')
function displayConsoleSpecificationsLower() {
    $('#atc-console-specifications-lower').toggle()

    if(atcConsoleSpecificationsLower.style.display == 'none') {
        atcConsoleSpecificationsChevron.setAttribute('class', 'atc-game-chevron-down')
    } else {
        atcConsoleSpecificationsChevron.setAttribute('class', 'atc-game-chevron')
    }
}

//Specifications
let atcConsoleSpecs4K = document.getElementById('console-specs-4k')
let atcConsoleSpecsGraphics = document.getElementById('console-specs-graphics')
let atcConsoleSpecsResolution = document.getElementById('console-specs-resolution')
let atcConsoleSpecsHDR = document.getElementById('console-specs-hdr')
let atcConsoleSpecsBluetooth = document.getElementById('console-specs-bluetooth')
let atcConsoleSpecsUSBPorts = document.getElementById('console-specs-usbports')


atcConsoleSpecs4K.addEventListener('blur', () => {
    atcConsoleObject['keySpecs']['4KPlayer'] = atcConsoleSpecs4K.value
})
atcConsoleSpecsGraphics.addEventListener('blur', () => {
    atcConsoleObject['keySpecs']['maxGraphics'] = atcConsoleSpecsGraphics.value
})
atcConsoleSpecsResolution.addEventListener('blur', () => {
    atcConsoleObject['keySpecs']['maxResolution'] = atcConsoleSpecsResolution.value
})
atcConsoleSpecsHDR.addEventListener('blur', () => {
    atcConsoleObject['keySpecs']['HDR'] = atcConsoleSpecsHDR.value
})
atcConsoleSpecsBluetooth.addEventListener('blur', () => {
    atcConsoleObject['keySpecs']['bluetooth'] = atcConsoleSpecsBluetooth.value
})
atcConsoleSpecsUSBPorts.addEventListener('blur', () => {
    atcConsoleObject['keySpecs']['numUSBPorts'] = atcConsoleSpecsUSBPorts.value
})


//General
let atcConsoleGeneralProductName = document.getElementById('console-general-productname')
let atcConsoleGeneralBrand = document.getElementById('console-general-brand')
let atcConsoleGeneralAccessories = document.getElementById('console-general-accessories')
let atcConsoleGeneralParental = document.getElementById('console-general-parental')
let atcConsoleGeneralType = document.getElementById('console-general-type')
let atcConsoleGeneralCompatible = document.getElementById('console-general-compatible')
let atcConsoleGeneralModel = document.getElementById('console-general-model')
let atcConsoleGeneralColor = document.getElementById('console-general-color')

atcConsoleGeneralProductName.addEventListener('blur', () => {
    atcConsoleObject['general']['productName'] = atcConsoleGeneralProductName.value
})
atcConsoleGeneralBrand.addEventListener('blur', () => {
    atcConsoleObject['general']['brand'] = atcConsoleGeneralBrand.value
})
atcConsoleGeneralAccessories.addEventListener('blur', () => {
    atcConsoleObject['general']['additionalAccessories'] = atcConsoleGeneralAccessories.value
})
atcConsoleGeneralParental.addEventListener('blur', () => {
    atcConsoleObject['general']['parentalControl'] = atcConsoleGeneralParental.value
})
atcConsoleGeneralType.addEventListener('blur', () => {
    atcConsoleObject['general']['consoleType'] = atcConsoleGeneralType.value
})
atcConsoleGeneralCompatible.addEventListener('blur', () => {
    atcConsoleObject['general']['compatiblePlatforms'] = atcConsoleGeneralCompatible.value
})
atcConsoleGeneralModel.addEventListener('blur', () => {
    atcConsoleObject['general']['modelNumber'] = atcConsoleGeneralModel.value
})
atcConsoleGeneralColor.addEventListener('blur', () => {
    atcConsoleObject['general']['color'] = atcConsoleGeneralColor.value
})


//Features
let atcConsoleFeaturesStreaming = document.getElementById('console-features-streaming')
let atcConsoleFeaturesBluray = document.getElementById('console-features-bluray')
let atcConsoleFeaturesOnline = document.getElementById('console-features-online')

atcConsoleFeaturesStreaming.addEventListener('blur', () => {
    atcConsoleObject['features']['HDStreaming'] = atcConsoleFeaturesStreaming.value
})
atcConsoleFeaturesBluray.addEventListener('blur', () => {
    atcConsoleObject['features']['blurayPlayer'] = atcConsoleFeaturesBluray.value
})
atcConsoleFeaturesOnline.addEventListener('blur', () => {
    atcConsoleObject['features']['onlineFeatures'] = atcConsoleFeaturesOnline.value
})

//Display
let atcConsoleDisplayGraphics = document.getElementById('console-display-graphics')
let atcConsoleDisplayResolution = document.getElementById('console-display-resolution')
let atcConsoleDisplayHDR = document.getElementById('console-display-hdr')

atcConsoleDisplayGraphics.addEventListener('blur', () => {
    atcConsoleObject['display']['maxGraphics'] = atcConsoleDisplayGraphics.value
})
atcConsoleDisplayResolution.addEventListener('blur', () => {
    atcConsoleObject['display']['maxResolution'] = atcConsoleDisplayResolution.value
})
atcConsoleDisplayHDR.addEventListener('blur', () => {
    atcConsoleObject['display']['HDR'] = atcConsoleDisplayHDR.value
})

//Storage
let atcConsoleStorageInternal = document.getElementById('console-storage-internal')
let atcConsoleStorageType = document.getElementById('console-storage-type')
let atcConsoleStorageCapacity = document.getElementById('console-storage-capacity')
let atcConsoleStorageCard = document.getElementById('console-storage-card')
let atcConsoleStorageNumCards = document.getElementById('console-storage-numcards')

atcConsoleStorageInternal.addEventListener('blur', () => {
    atcConsoleObject['storage']['internal'] = atcConsoleStorageInternal.value
})
atcConsoleStorageType.addEventListener('blur', () => {
    atcConsoleObject['storage']['type'] = atcConsoleStorageType.value
})
atcConsoleStorageCapacity.addEventListener('blur', () => {
    atcConsoleObject['storage']['capacity'] = atcConsoleStorageCapacity.value
})
atcConsoleStorageCard.addEventListener('blur', () => {
    atcConsoleObject['storage']['memoryCards'] = atcConsoleStorageCard.value
})
atcConsoleStorageNumCards.addEventListener('blur', () => {
    atcConsoleObject['storage']['numMemoryCards'] = atcConsoleStorageNumCards.value
})

//Dimensions
let atcConsoleDimensionsHeight = document.getElementById('console-dimensions-height')
let atcConsoleDimensionsWidth = document.getElementById('console-dimensions-width')
let atcConsoleDimensionsLength = document.getElementById('console-dimensions-length')
let atcConsoleDimensionsWeight = document.getElementById('console-dimensions-weight')

atcConsoleDimensionsHeight.addEventListener('blur', () => {
    atcConsoleObject['dimensions']['height'] = atcConsoleDimensionsHeight.value
})
atcConsoleDimensionsWidth.addEventListener('blur', () => {
    atcConsoleObject['dimensions']['width'] = atcConsoleDimensionsWidth.value
})
atcConsoleDimensionsLength.addEventListener('blur', () => {
    atcConsoleObject['dimensions']['length'] = atcConsoleDimensionsLength.value
})
atcConsoleDimensionsWeight.addEventListener('blur', () => {
    atcConsoleObject['dimensions']['weight'] = atcConsoleDimensionsWeight.value
})

//Connectivity
let atcConsoleConnectivityBluetooth = document.getElementById('console-connectivity-bluetooth')
let atcConsoleConnectivityInternet = document.getElementById('console-connectivity-internet')
let atcConsoleConnectivityWifi = document.getElementById('console-connectivity-wifi')
let atcConsoleConnectivitySmart = document.getElementById('console-connectivity-smart')
let atcConsoleConnectivityPorts = document.getElementById('console-connectivity-ports')


atcConsoleConnectivityBluetooth.addEventListener('blur', () => {
    atcConsoleObject['connectivity']['bluetooth'] = atcConsoleConnectivityBluetooth.value
})
atcConsoleConnectivityInternet.addEventListener('blur', () => {
    atcConsoleObject['connectivity']['internet'] = atcConsoleConnectivityInternet.value
})
atcConsoleConnectivityWifi.addEventListener('blur', () => {
    atcConsoleObject['connectivity']['wifi'] = atcConsoleConnectivityWifi.value
})
atcConsoleConnectivitySmart.addEventListener('blur', () => {
    atcConsoleObject['connectivity']['smartCapable'] = atcConsoleConnectivitySmart.value
})
atcConsoleConnectivityPorts.addEventListener('blur', () => {
    atcConsoleObject['connectivity']['usbPorts'] = atcConsoleConnectivityPorts.value
})

//Gameplay
let atcConsoleGameplayMaxplayers = document.getElementById('console-gameplay-maxplayers')
let atcConsoleGameplayMotion = document.getElementById('console-gameplay-motion')

atcConsoleGameplayMaxplayers.addEventListener('blur', () => {
    atcConsoleObject['gameplay']['maxPlayers'] = atcConsoleGameplayMaxplayers.value
})
atcConsoleGameplayMotion.addEventListener('blur', () => {
    atcConsoleObject['gameplay']['motionSensing'] = atcConsoleGameplayMotion.value
})

//Included
let atcConsoleIncludedControllers = document.getElementById('console-included-controllers')
let atcConsoleIncludedGames = document.getElementById('console-included-games')
let atcConsoleIncludedCables = document.getElementById('console-included-cables')

atcConsoleIncludedControllers.addEventListener('blur', () => {
    atcConsoleObject['included']['controllers'] = atcConsoleIncludedControllers.value
})
atcConsoleIncludedGames.addEventListener('blur', () => {
    atcConsoleObject['included']['games'] = atcConsoleIncludedGames.value
})
atcConsoleIncludedCables.addEventListener('blur', () => {
    atcConsoleObject['included']['cables'] = atcConsoleIncludedCables.value
})

//Other
let atcConsoleOtherUPC = document.getElementById('console-other-upc')

atcConsoleOtherUPC.addEventListener('blur', () => {
    atcConsoleObject['other']['UPC'] = atcConsoleOtherUPC.value
})



function resetConsoleSpecificationFields() {
    atcConsoleSpecs4K.value = ''
    atcConsoleSpecsGraphics.value = ''
    atcConsoleSpecsResolution.value = ''
    atcConsoleSpecsHDR.value = ''
    atcConsoleSpecsBluetooth.value = ''
    atcConsoleSpecsUSBPorts.value = ''

    atcConsoleGeneralProductName.value = ''
    atcConsoleGeneralBrand.value = ''
    atcConsoleGeneralAccessories.value = ''
    atcConsoleGeneralParental.value = ''
    atcConsoleGeneralType.value = ''
    atcConsoleGeneralCompatible.value = ''
    atcConsoleGeneralModel.value = ''
    atcConsoleGeneralColor.value = ''

    atcConsoleFeaturesStreaming.value = ''
    atcConsoleFeaturesBluray.value = ''
    atcConsoleFeaturesOnline.value = ''


    atcConsoleDisplayGraphics.value = ''
    atcConsoleDisplayResolution.value = ''
    atcConsoleDisplayHDR.value = ''

    atcConsoleStorageInternal.value = ''
    atcConsoleStorageType.value = ''
    atcConsoleStorageCapacity.value = ''
    atcConsoleStorageCard.value = ''
    atcConsoleStorageNumCards.value = ''

    atcConsoleDimensionsHeight.value = ''
    atcConsoleDimensionsWidth.value = ''
    atcConsoleDimensionsLength.value = ''
    atcConsoleDimensionsWeight.value = ''

    atcConsoleConnectivityBluetooth.value = ''
    atcConsoleConnectivityInternet.value = ''
    atcConsoleConnectivityWifi.value = ''
    atcConsoleConnectivitySmart.value = ''
    atcConsoleConnectivityPorts.value = ''

    atcConsoleGameplayMaxplayers.value = ''
    atcConsoleGameplayMotion.value = ''

    atcConsoleIncludedControllers.value = ''
    atcConsoleIncludedGames.value = ''
    atcConsoleIncludedCables.value = ''

    atcConsoleOtherUPC.value = ''
}



function setATCConsoleInitialState() {
    atcConsoleOverviewLower.style.display = 'none'
    atcConsoleSpecificationsLower.style.display = 'none'
    atcConsoleSpecificationsChevron.setAttribute('class', 'atc-game-chevron')

    //Set Image Containers
    while(atcConsoleMainImageContainer.firstChild) {
        atcConsoleMainImageContainer.removeChild(atcConsoleMainImageContainer.firstChild)
    }

    var mainImageButton = document.createElement('div')
    mainImageButton.setAttribute('class', 'atc-main-product-image')
    mainImageButton.innerHTML = ''
    atcConsoleMainImageContainer.appendChild(mainImageButton)
    mainImageButton.addEventListener('click', () => {
        hiddenConsoleMainImageUploadButton.click();
    })

    while(atcConsoleAdditionalImagesContainer.firstChild) {
        atcConsoleAdditionalImagesContainer.removeChild(atcConsoleAdditionalImagesContainer.firstChild)
    }

    let addAdditionalImageButton = document.createElement('div')
    addAdditionalImageButton.className = 'atc-add-product-image'
    addAdditionalImageButton.innerHTML = ''
    atcConsoleAdditionalImagesContainer.appendChild(addAdditionalImageButton)
    addAdditionalImageButton.addEventListener('click', () => {
        hiddenConsoleAdditionalImageUploadButton.click()
    })


    atcConsoleObject = {
        'category' : 'console',
        'brand' : '',
        'productImage' : '',
        'productImages' : {},
        'purchasePrices' : {
            'usedAcceptable' :  0,
            'usedGood' : 0,
            'usedFantastic' : 0,
            'new' : 0,
        },
        'salePrices' : {
            'usedAcceptable' :  0,
            'usedGood' : 0,
            'usedFantastic' : 0,
            'new' : 0,
        },
        'availability' : {},
        'overview' : {
            'description' : '',
            'features' : [],
            'included' : [],
        },
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
    resetConsolePriceFields()

    atcConsoleDescriptionInput.value = ''

    buildATCConsoleFeatures()

    buildATCConsoleIncluded()

    buildATCConsoleStorageOptions()

    resetConsoleSpecificationFields()

    consoleID = createID(8)
    console.log(`Console ID: ${consoleID}`)
}





let submitATCConsole = document.getElementById('submit-atc-console')
submitATCConsole.addEventListener('click', () => {
    console.log(atcConsoleObject)
    loadATCProcessingState('console')

    database.collection("catalog").doc(consoleID).set(atcConsoleObject)
    .then(function() {
        adminProcessingTextContainer.style.display = 'none'
        adminConfirmationContainer.style.display = 'flex'
        adminProductID.innerHTML = consoleID
        adminProductTitleText.innerHTML = atcConsoleObject['general']['productName']

    }).catch(function(error) {
        $('#admin-processing-screen').hide( () => {
            $('#atc-game-modal').fadeIn()
        })
        alert(error.message)
    })
})
