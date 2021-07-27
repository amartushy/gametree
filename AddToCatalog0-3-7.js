//________________________________________________________________ADD GAME TO CATALOG__________________________________________________________________________
//Globals
var gameID
var atcGameObject = {}

//ATC Game Top Container______________________________________________________________________________________________
//Product Image Upload - GAME
let atcGameImageContainer = document.getElementById('atc-game-image-container')
var hiddenGameImageUploadButton = document.getElementById('hidden-game-image-upload-button')

hiddenGameImageUploadButton.addEventListener('change', uploadGameImage);

var selectedGameImageFile;
function uploadGameImage(e) {
    selectedGameImageFile = e.target.files[0];
    handleGameImageUpload()
}

async function handleGameImageUpload() {
	const uploadTask = await storageRef.child(`productImages/${gameID}`).put(selectedGameImageFile);
	uploadAndCreateGameImage()
}

//final submit button and update firebase
async function uploadAndCreateGameImage() {
	await storageRef.child('/productImages/'+gameID)
		.getDownloadURL()
		.then(function(url) { atcGameObject['productImage'] = url.toString() })

    //Create Image
    while(atcGameImageContainer.firstChild) {
        atcGameImageContainer.removeChild(atcGameImageContainer.firstChild)
    }
    var newImage = document.createElement('img')
    newImage.setAttribute('class', 'atc-game-image')
    newImage.src = atcGameObject['productImage']
    atcGameImageContainer.appendChild(newImage)
    newImage.addEventListener('click', () => {
        console.log('clicked')
        hiddenGameImageUploadButton.click();
    })
}

let atcGamePurchaseAcceptable = document.getElementById('atc-game-purchase-acceptable')
let atcGamePurchaseGood = document.getElementById('atc-game-purchase-good')
let atcGamePurchaseExcellent = document.getElementById('atc-game-purchase-excellent')
let atcGamePurchaseNew = document.getElementById('atc-game-purchase-new')

atcGamePurchaseAcceptable.addEventListener('blur', () => {
    atcGameObject['purchasePrices']['usedAcceptable'] = atcGamePurchaseAcceptable.value
})
atcGamePurchaseGood.addEventListener('blur', () => {
    atcGameObject['purchasePrices']['usedGood'] = atcGamePurchaseGood.value
})
atcGamePurchaseExcellent.addEventListener('blur', () => {
    atcGameObject['purchasePrices']['usedFantastic'] = atcGamePurchaseExcellent.value
})
atcGamePurchaseNew.addEventListener('blur', () => {
    atcGameObject['purchasePrices']['new'] = atcGamePurchaseNew.value
})


let atcGameSaleAcceptable = document.getElementById('atc-game-sale-acceptable')
let atcGameSaleGood = document.getElementById('atc-game-sale-good')
let atcGameSaleExcellent = document.getElementById('atc-game-sale-excellent')
let atcGameSaleNew = document.getElementById('atc-game-sale-new')

atcGameSaleAcceptable.addEventListener('blur', () => {
    atcGameObject['salePrices']['usedAcceptable'] = atcGameSaleAcceptable.value
})
atcGameSaleGood.addEventListener('blur', () => {
    atcGameObject['salePrices']['usedGood'] = atcGameSaleGood.value
})
atcGameSaleExcellent.addEventListener('blur', () => {
    atcGameObject['salePrices']['usedFantastic'] = atcGameSaleExcellent.value
})
atcGameSaleNew.addEventListener('blur', () => {
    atcGameObject['salePrices']['new'] = atcGameSaleNew.value
})

function resetPriceFields() {
    atcGamePurchaseAcceptable.value = ''
    atcGamePurchaseGood.value = ''
    atcGamePurchaseExcellent.value = ''
    atcGamePurchaseNew.value = ''

    atcGameSaleAcceptable.value = ''
    atcGameSaleGood.value = ''
    atcGameSaleExcellent.value = ''
    atcGameSaleNew.value = ''
}


//Overview elements___________________________________________________________________________________________________________________________________________________
let atcGameHeaderDiv = document.getElementById('atc-game-header-div')
let atcGameOverviewLower = document.getElementById('atc-game-overview-lower')
let atcGameOverviewChevron = document.getElementById('atc-game-overview-chevron')

atcGameHeaderDiv.setAttribute('onClick', 'displayOverviewLower()')
function displayOverviewLower() {
    $('#atc-game-overview-lower').toggle()

    if(atcGameOverviewLower.style.display == 'none') {
        atcGameOverviewChevron.setAttribute('class', 'atc-game-chevron-down')
    } else {
        atcGameOverviewChevron.setAttribute('class', 'atc-game-chevron')
    }
}

let atcDescriptionTextInput = document.getElementById('atc-description-text-input')
atcDescriptionTextInput.addEventListener('blur', () => {
    atcGameObject['overview']['description'] = atcDescriptionTextInput.value
})

let atcAddFeatureButton = document.getElementById('atc-add-feature-button')
let atcFeaturesContainer = document.getElementById('atc-features-container')
let atcAddFeatureForm = document.getElementById('atc-add-feature-form')
let atcAddGameDescriptionField = document.getElementById('atc-add-game-description-field')
let atcAddFeatureCancel = document.getElementById('atc-add-feature-cancel')
let atcAddFeatureSubmit = document.getElementById('atc-add-feature-submit')

atcAddFeatureButton.addEventListener('click', () => {
    $('#atc-add-feature-form').fadeIn()
})
atcAddFeatureCancel.addEventListener('click', () => {
    atcAddGameDescriptionField.value = ''
    $('#atc-add-feature-form').fadeOut()
})
atcAddFeatureSubmit.addEventListener('click', () => {
    atcGameObject.overview.features.push(atcAddGameDescriptionField.value)
    buildATCGameFeatures()
    $('#atc-add-feature-form').fadeOut()
    atcAddGameDescriptionField.value = ''
})

function buildATCGameFeatures() {
    atcAddFeatureForm.style.display = 'none'

    while(atcFeaturesContainer.firstChild) {
        atcFeaturesContainer.removeChild(atcFeaturesContainer.firstChild)
    }

    let features = atcGameObject.overview.features
    features.forEach((featureText) => {
        let newFeature = document.createElement('div')
        newFeature.setAttribute('class', 'atc-feature-text')
        newFeature.innerHTML = featureText
        atcFeaturesContainer.appendChild(newFeature)
    })
}


let atcAddIncludedButton = document.getElementById('atc-add-included')
let atcWhatsIncludedContainer = document.getElementById('atc-whats-included-container')
let atcAddIncludedForm = document.getElementById('atc-add-included-form')
let atcAddGameIncludedField = document.getElementById('atc-add-game-included-field')
let atcAddIncludedCancel = document.getElementById('atc-add-included-cancel')
let atcAddIncludedSubmit = document.getElementById('atc-add-included-submit')

atcAddIncludedButton.addEventListener('click', () => {
    $('#atc-add-included-form').fadeIn()
})
atcAddIncludedCancel.addEventListener('click', () => {
    atcAddGameIncludedField.value = ''
    $('#atc-add-included-form').fadeOut()
})
atcAddIncludedSubmit.addEventListener('click', () => {
    atcGameObject.overview.included.push(atcAddGameIncludedField.value)
    buildATCGameIncluded()
    $('#atc-add-included-form').fadeOut()
    atcAddGameIncludedField.value = ''
})

function buildATCGameIncluded() {
    atcAddIncludedForm.style.display = 'none'

    while(atcWhatsIncludedContainer.firstChild) {
        atcWhatsIncludedContainer.removeChild(atcWhatsIncludedContainer.firstChild)
    }

    let included = atcGameObject.overview.included
    included.forEach((includedText) => {
        let newIncluded = document.createElement('div')
        newIncluded.setAttribute('class', 'atc-feature-text')
        newIncluded.innerHTML = includedText
        atcWhatsIncludedContainer.appendChild(newIncluded)
    })
}


let atcGameModal = document.getElementById('atc-game-modal')
let atcCloseGameModal = document.getElementById('atc-close-game-modal')
let atcGameButton = document.getElementById('atc-game-button')

atcGameButton.addEventListener('click', () => {
    setATCGameInitialState()
    $('#atc-game-modal').fadeIn().css('display', 'flex');
})
atcCloseGameModal.addEventListener('click', () => {
    $('#atc-game-modal').fadeOut()
    $('#admin-nav-section').fadeIn().css('display', 'flex');
})




//Specifications__________________________________________________________________________________________________________________
let atcGameSpecificationsHeader = document.getElementById('atc-game-specifications-header')
let atcGameSpecificationsLower = document.getElementById('atc-game-specifications-lower')
let atcGameSpecificationsChevron = document.getElementById('atc-game-specifications-chevron')

atcGameSpecificationsHeader.setAttribute('onClick', 'displaySpecificationsLower()')
function displaySpecificationsLower() {
    $('#atc-game-specifications-lower').toggle()

    if(atcGameOverviewLower.style.display == 'none') {
        atcGameSpecificationsChevron.setAttribute('class', 'atc-game-chevron-down')
    } else {
        atcGameSpecificationsChevron.setAttribute('class', 'atc-game-chevron')
    }
}

//Specifications
let atcGameSpecsEdition = document.getElementById('game-specs-edition')
let atcGameSpecsRating = document.getElementById('game-specs-rating')
let atcGameSpecsDescriptors = document.getElementById('game-specs-descriptors')
let atcGameSpecsPlatform = document.getElementById('game-specs-platform')
let atcGameSpecsFormat = document.getElementById('game-specs-format')

atcGameSpecsEdition.addEventListener('blur', () => {
    atcGameObject['keySpecs']['edition'] = atcGameSpecsEdition.value
})
atcGameSpecsRating.addEventListener('blur', () => {
    atcGameObject['keySpecs']['ESRBRating'] = atcGameSpecsRating.value
})
atcGameSpecsDescriptors.addEventListener('blur', () => {
    atcGameObject['keySpecs']['ESRBDescriptors'] = atcGameSpecsDescriptors.value
})
atcGameSpecsPlatform.addEventListener('blur', () => {
    atcGameObject['keySpecs']['compatiblePlatforms'] = atcGameSpecsPlatform.value
    atcGameObject['brand'] = atcGameSpecsPlatform.value
})
atcGameSpecsFormat.addEventListener('blur', () => {
    atcGameObject['keySpecs']['softwareFormat'] = atcGameSpecsFormat.value
})

//General
let atcGameGeneralProduct = document.getElementById('game-general-product')
let atcGameGeneralBrand = document.getElementById('game-general-brand')
let atcGameGeneralPublisher = document.getElementById('game-general-publisher')
let atcGameGeneralDeveloper = document.getElementById('game-general-developer')
let atcGameGeneralModel = document.getElementById('game-general-model')
let atcGameGeneralRelease = document.getElementById('game-general-release')
atcGameGeneralProduct.addEventListener('blur', () => {
    atcGameObject['general']['productName'] = atcGameGeneralProduct.value
})
atcGameGeneralBrand.addEventListener('blur', () => {
    atcGameObject['general']['brand'] = atcGameGeneralBrand.value
})
atcGameGeneralPublisher.addEventListener('blur', () => {
    atcGameObject['general']['publisher'] = atcGameGeneralPublisher.value
})
atcGameGeneralDeveloper.addEventListener('blur', () => {
    atcGameObject['general']['developer'] = atcGameGeneralDeveloper.value
})
atcGameGeneralModel.addEventListener('blur', () => {
    atcGameObject['general']['modelNumber'] = atcGameGeneralModel.value
})
atcGameGeneralRelease.addEventListener('blur', () => {
    atcGameObject['general']['releaseDate'] = atcGameGeneralRelease.value
})

//Details
let atcGameDetailsGenre = document.getElementById('game-details-genre')
let atcGameDetailsFranchise = document.getElementById('game-details-franchise')
let atcGameDetailsSeries = document.getElementById('game-details-series')
let atcGameDetailsEnhanced = document.getElementById('game-details-enhanced')
let atcGameDetailsMultiplayer = document.getElementById('game-details-multiplayer')
atcGameDetailsGenre.addEventListener('blur', () => {
    atcGameObject['gameDetails']['genre'] = atcGameDetailsGenre.value
})
atcGameDetailsFranchise.addEventListener('blur', () => {
    atcGameObject['gameDetails']['gameFranchise'] = atcGameDetailsFranchise.value
})
atcGameDetailsSeries.addEventListener('blur', () => {
    atcGameObject['gameDetails']['gameSeries'] = atcGameDetailsSeries.value
})
atcGameDetailsEnhanced.addEventListener('blur', () => {
    atcGameObject['gameDetails']['enhancedFor'] = atcGameDetailsEnhanced.value
})
atcGameDetailsMultiplayer.addEventListener('blur', () => {
    atcGameObject['gameDetails']['multiplayer'] = atcGameDetailsMultiplayer.value
})

//Other
let atcGameOtherUPC = document.getElementById('game-other-upc')
atcGameOtherUPC.addEventListener('blur', () => {
    atcGameObject['other']['UPC'] = atcGameOtherUPC.value
})

function resetSpecificationFiels() {
    atcGameSpecsEdition.value = ''
    atcGameSpecsRating.value = ''
    atcGameSpecsDescriptors.value = ''
    atcGameSpecsPlatform.value = ''
    atcGameSpecsFormat.value = ''

    atcGameGeneralProduct.value = ''
    atcGameGeneralBrand.value = ''
    atcGameGeneralPublisher.value = ''
    atcGameGeneralDeveloper.value = ''
    atcGameGeneralModel.value = ''
    atcGameGeneralRelease.value = ''

    atcGameDetailsGenre.value = ''
    atcGameDetailsFranchise.value = ''
    atcGameDetailsSeries.value = ''
    atcGameDetailsEnhanced.value = ''
    atcGameDetailsMultiplayer.value = ''

    atcGameOtherUPC.value = ''
}



function setATCGameInitialState() {
    atcGameOverviewLower.style.display = 'none'
    atcGameSpecificationsLower.style.display = 'none'
    atcGameSpecificationsChevron.setAttribute('class', 'atc-game-chevron')

	//Create Image
    while(atcGameImageContainer.firstChild) {
        atcGameImageContainer.removeChild(atcGameImageContainer.firstChild)
    }
    var newImage = document.createElement('img')
    newImage.setAttribute('class', 'atc-main-product-image')
    newImage.innerHTML = ''
    atcGameImageContainer.appendChild(newImage)
    newImage.addEventListener('click', () => {
        hiddenGameImageUploadButton.click();
    })

    atcGameObject = {
        'category' : 'game',
        'brand' : '',
        'productImage' : '',
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
            'edition' : '',
            'ESRBRating' : '',
            'ESRBDescriptors' : '',
            'compatiblePlatforms' : '',
            'softwareFormat' : '',
        },
        'general' : {
            'productName' : '',
            'brand' : '',
            'publisher' : '',
            'developer' : '',
            'modelNumber' : '',
            'releaseDate' : '',
        },
        'gameDetails' : {
            'genre' : '',
            'gameFranchise' : '',
            'gameSeries' : '',
            'enhancedFor' : '',
            'multiplayer' : '',
        },
        'other' : {
            'UPC' : ''
        }
    }
    resetPriceFields()

    atcDescriptionTextInput.value = ''

    buildATCGameFeatures()

    buildATCGameIncluded()

    resetSpecificationFiels()

    gameID = createID(8)
    console.log(`Game ID: ${gameID}`)
}





let submitATCGame = document.getElementById('submit-atc-game')
submitATCGame.addEventListener('click', () => {
    console.log(atcGameObject)
    loadATCProcessingState('game')

    database.collection("catalog").doc(gameID).set(atcGameObject)
    .then(function() {
        adminProcessingTextContainer.style.display = 'none'
        adminConfirmationContainer.style.display = 'flex'
        adminProductID.innerHTML = gameID
        adminProductTitleText.innerHTML = atcGameObject['general']['productName']

    }).catch(function(error) {
        $('#admin-processing-screen').hide( () => {
            $('#atc-game-modal').fadeIn()
        })
        alert(error.message)
    })
})


//load ATC Processing
let adminConfirmationContainer = document.getElementById('admin-confirmation-container')
let adminConfirmationCheck = document.getElementById('admin-confirmation-check')
let adminProcessingTextContainer = document.getElementById('admin-processing-text-container')
let adminProductID = document.getElementById('admin-product-id')
let adminProductTitleText = document.getElementById('product-title-text')
let adminConfirmationATC = document.getElementById('admin-confirmation-atc')
adminConfirmationATC.addEventListener('click', () => {
    $('#admin-processing-screen').hide( () => {
	$('#admin-nav-section').fadeIn().css('display', 'flex')
    })
})
function loadATCProcessingState(source) {
    document.getElementById('admin-nav-section').style.display = 'none'

    if(source == 'game'){
        $("#atc-game-modal").hide( () => {
            $("#admin-processing-screen").show()
            $("#admin-processing-text-container").show()
    
            $("#admin-confirmation-check").hide()
            $("#admin-confirmation-container").hide()
        })
    } else if(source == 'console') {
        $("#atc-console-modal").hide( () => {
            $("#admin-processing-screen").show()
            $("#admin-processing-text-container").show()
    
            $("#admin-confirmation-check").hide()
            $("#admin-confirmation-container").hide()
        })
    }
}






















//________________________________________________________________ADD CONSOLE TO CATALOG____________________________________________________________________
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





