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
    newImage.setAttribute('class', 'atc-game-image')
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
	'availability' : {
            'usedAcceptable' : 0,
            'usedGood' : 0,
            'usedFantastic' : 0,
            'new' : 0
        },
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
    loadATCGameProcessingState()

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
let adminConfirmationATCGame = document.getElementById('admin-confirmation-atc-game')
adminConfirmationATCGame.addEventListener('click', () => {
    $('#admin-processing-screen').hide( () => {
        setATCGameInitialState()
        $('#atc-game-modal').fadeIn()
    })
})
function loadATCGameProcessingState() {
    document.getElementById('admin-nav-section').style.display = 'none'

    $("#atc-game-modal").hide( () => {
        $("#admin-processing-screen").show()
        $("#admin-processing-text-container").show()

        $("#admin-confirmation-check").hide()
        $("#admin-confirmation-container").hide()
    })
}
