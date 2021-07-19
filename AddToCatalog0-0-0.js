var atcGameObject = {
    'productImage' : '',
    'purchasePrices' : {
        'usedAcceptable' :  0,
        'usedGood' : 0,
        'usedGreat' : 0,
        'usedFantastic' : 0,
        'new' : 0,
    },
    'salePrices' : {
        'usedAcceptable' :  0,
        'usedGood' : 0,
        'usedGreat' : 0,
        'usedFantastic' : 0,
        'new' : 0,
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

//ATC Game Top Container
let atcGameImageContainer = document.getElementById('atc-game-image-container')
//TODO: add image to database and update object

let atcGamePurchaseAcceptable = document.getElementById('atc-game-purchase-acceptable')
let atcGamePurchaseGood = document.getElementById('atc-game-purchase-good')
let atcGamePurchaseGreat = document.getElementById('atc-game-purchase-great')
let atcGamePurchaseFantastic = document.getElementById('atc-game-purchase-fantastic')
let atcGamePurchaseNew = document.getElementById('atc-game-purchase-new')

let atcGameSaleAcceptable = document.getElementById('atc-game-sale-acceptable')
let atcGameSaleGood = document.getElementById('atc-game-sale-good')
let atcGameSaleGreat = document.getElementById('atc-game-sale-great')
let atcGameSaleFantastic = document.getElementById('atc-game-sale-fantastic')
let atcGameSaleNew = document.getElementById('atc-game-sale-new')

atcGamePurchaseAcceptable.onBlur = () => {
    atcGameObject.purchasePrices.usedAcceptable = atcGamePurchaseAcceptable.value
}
atcGamePurchaseGood.onBlur = () => {
    atcGameObject.purchasePrices.usedGood = atcGamePurchaseGood.value
}
atcGamePurchaseGreat.onBlur = () => {
    atcGameObject.purchasePrices.usedGreat = atcGamePurchaseGreat.value
}
atcGamePurchaseFantastic.onBlur = () => {
    atcGameObject.purchasePrices.usedFantastic = atcGamePurchaseFantastic.value
}
atcGamePurchaseNew.onBlur = () => {
    atcGameObject.purchasePrices.new = atcGamePurchaseNew.value
}


atcGameSaleAcceptable.onBlur = () => {
    atcGameObject.salePrices.usedAcceptable = atcGameSaleAcceptable.value
}
atcGameSaleGood.onBlur = () => {
    atcGameObject.salePrices.usedGood = atcGameSaleGood.value
}
atcGameSaleGreat.onBlur = () => {
    atcGameObject.salePrices.usedGreat = atcGameSaleGreat.value
}
atcGameSaleFantastic.onBlur = () => {
    atcGameObject.salePrices.usedFantastic = atcGameSaleFantastic.value
}
atcGameSaleNew.onBlur = () => {
    atcGameObject.salePrices.new = atcGameSaleNew.value
}


//Overview elements
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
atcDescriptionTextInput.onblur = () => {
    atcGameObject.overview.description = atcDescriptionTextInput.value
}

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
    atcGameObject.overview.features.push(atcAddGameIncludedField.value)
    buildATCGameIncluded()
    $('#atc-add-included-form').fadeOut()
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
    $('#atc-game-modal').fadeIn()
})
atcCloseGameModal.addEventListener('click', () => {
    $('#atc-game-modal').fadeOut()
})
