window.onload = function() {
	document.getElementById('pop-nav').addEventListener('click', () => {
        location.href = 'https://thegametree.io/proof-of-purchase'
    })

    document.getElementById('purchases-nav').addEventListener('click', () => {
        location.href = 'https://thegametree.io/admin-purchases'
    })
}

var database = firebase.firestore()

//Admin Elements
const atcButton = document.getElementById('atc-button')
const atcCloseModal = document.getElementById('atc-close-modal')
atcButton.addEventListener('click', () => {
    setInitialState()
    $("#atc-modal").fadeIn();
})
atcCloseModal.addEventListener('click', () => {
    $("#atc-modal").fadeOut();
})


//Add to Catalog Elements
const atcModal = document.getElementById('atc-modal')
const atcSubheader = document.getElementById('atc-subheader')
const atcCategoryDiv = document.getElementById('atc-category-div')
const atcBrandDiv = document.getElementById('atc-brand-div')
const atcConsole = document.getElementById('atc-console')
const atcCompletionDiv = document.getElementById('atc-completion-div')

var atcCategoryConsole = document.getElementById('atc-category-consoles')
var atcCategoryGame = document.getElementById('atc-category-games')
var atcCategoryAccessory = document.getElementById('atc-category-accessories')

var atcBrandXbox = document.getElementById('atc-brand-xbox')
var atcBrandPlaystation = document.getElementById('atc-brand-playstation')
var atcBrandNintendo = document.getElementById('atc-brand-nintendo')

atcModal.style.visibility = "hidden"

var atcCategory,
    atcBrand,
    atcProductTitle,
    GTIN,
    productImageURL

function setInitialState() {
    GTIN = createID(10)
    $("#atc-div").show()

    atcCategoryConsole.setAttribute('class', 'atc-option')
    atcCategoryGame.setAttribute('class', 'atc-option')
    atcCategoryAccessory.setAttribute('class', 'atc-option')

    atcBrandXbox.setAttribute('class', 'atc-option')
    atcBrandPlaystation.setAttribute('class', 'atc-option')
    atcBrandNintendo.setAttribute('class', 'atc-option')

    atcCategoryDiv.style.display = 'flex'
    atcSubheader.style.visibility = 'hidden'
    atcBrandDiv.style.display = 'none'
    atcConsole.style.display = 'none'
    atcCompletionDiv.style.display = 'none'
}

//Category Option Buttons
var categoryElements = [atcCategoryConsole, atcCategoryGame, atcCategoryAccessory]

atcCategoryConsole.addEventListener('click', () => {
    categorySelected('consoles')
})

atcCategoryGame.addEventListener('click', () => {
    categorySelected('games')
})

atcCategoryAccessory.addEventListener('click', () => {
    categorySelected('accessories')
})

function categorySelected(category) {
    //Reset possible previous states
    atcConsole.style.display = 'none'
    atcCompletionDiv.style.display = 'none'
    brandElements.forEach(element => {element.setAttribute('class', 'atc-option')})

    atcCategory = category

    atcSubheader.style.visibility = 'visible'
    $('#atc-subheader').fadeIn()
    atcSubheader.innerHTML = atcCategory + ' -> '

    categoryElements.forEach(element => {element.setAttribute('class', 'atc-option')})
    document.getElementById(`atc-category-${category}`).setAttribute('class', 'atc-option-selected')

    $('#atc-brand-div').fadeIn()
}

//Brand Option Buttons
var brandElements = [atcBrandXbox, atcBrandPlaystation, atcBrandNintendo]

atcBrandXbox.addEventListener('click', () => {
    brandSelected('xbox')
})

atcBrandPlaystation.addEventListener('click', () => {
    brandSelected('playstation')
})

atcBrandNintendo.addEventListener('click', () => {
    brandSelected('nintendo')
})

function brandSelected(brand) {
    atcBrand = brand

    atcSubheader.innerHTML = atcCategory + ' -> ' + atcBrand + ' -> '

    brandElements.forEach(element => {element.setAttribute('class', 'atc-option')})
    document.getElementById(`atc-brand-${brand}`).setAttribute('class', 'atc-option-selected')

    switch(atcCategory) {
        case 'consoles' : 
            setConsoleFormInitialState();
            break;
        case 'games' : 
            console.log('Not available')
            break;
        case 'accessories' : 
            console.log('Not available')
            break;
    }
}

//Add to catalog: Console Form
var consoleObject = {}

const consoleImageContainer = document.getElementById('console-image-container')
const consoleTitle = document.getElementById('console-title')
const consoleStorageOptions = document.getElementById('console-storage-options')
const consoleColors = document.getElementById('console-colors')
const consoleReleaseDate = document.getElementById('console-release-date')
const consolePurchasePrice = document.getElementById('console-purchase-price')
const consoleManufacturer = document.getElementById('console-manufacturer')
const consoleCPU = document.getElementById('console-cpu')
const consoleGPU = document.getElementById('console-gpu')
const consoleMemory = document.getElementById('console-memory')
const consoleMedia = document.getElementById('console-media')
const consoleVideoOutput = document.getElementById('console-video-output')
const consoleNetwork = document.getElementById('console-network')
const consoleAudio = document.getElementById('console-audio')
const consoleControllers = document.getElementById('console-controllers')
const consoleCodeName = document.getElementById('console-code-name')
const consoleSubmitATC = document.getElementById('console-submit-atc')

let consoleFormFields = [consoleTitle, consoleStorageOptions, consoleColors, consoleReleaseDate,
    consolePurchasePrice, consoleManufacturer, consoleCPU, consoleGPU, consoleMemory, consoleMedia, 
    consoleVideoOutput, consoleNetwork, consoleAudio, consoleControllers, consoleCodeName]

function setConsoleFormInitialState() {
    consoleFormFields.forEach(element => {element.value = "", element.placeholder = ""})
    $('#atc-console').fadeIn();

    consoleObject = {}

    //Create image upload button
    while(consoleImageContainer.firstChild) {
        consoleImageContainer.removeChild(consoleImageContainer.firstChild)
    }

    let addAtcImageContainer = document.createElement('div')
    addAtcImageContainer.setAttribute('class', 'add-atc-image-container')
    consoleImageContainer.appendChild(addAtcImageContainer)

    let addAtcImage = document.createElement('div')
    addAtcImage.setAttribute('class', 'add-atc-image')
    addAtcImageContainer.appendChild(addAtcImage)

    var addAtcImageText = document.createElement('div')
    addAtcImageText.setAttribute('class', 'add-pop-photo-text')
    addAtcImageText.innerHTML = ''
    addAtcImage.appendChild(addAtcImageText)

    addAtcImageText.addEventListener('click', () => {
        hiddenPhotoUploadButton.click();
    })
}

consoleTitle.addEventListener('keyup', () => {
    atcSubheader.innerHTML = atcCategory + ' -> ' + atcBrand + ' -> ' + consoleTitle.value
})

consoleSubmitATC.addEventListener('click', () => {
    consoleObject = {
        'productTitle' : consoleTitle.value,
        'productImage' : productImageURL,
        'purchasePrice' : getNumber(consolePurchasePrice.value),
        'releaseDate' : consoleReleaseDate.value,
        'storageOptions' : consoleStorageOptions.value.split(", "),
        'technicalSpecifications' : {
            'Audio' : consoleAudio.value,
            'Colors' : consoleColors.value,
            'CPU' : consoleCPU.value,
            'Code Name' : consoleCodeName.value,
            'Controllers' : consoleControllers.value,
            'GPU' : consoleGPU.value,
            'Network' : consoleNetwork.value,
            'Video Output' : consoleVideoOutput.value,
            'Manufacturer' : consoleManufacturer.value,
            'Media' : consoleMedia.value,
            'Memory' : consoleMemory.value,
        }
    }

    addToCatalog(consoleObject)
})

//Product Image Upload
var storageRef = firebase.storage().ref();
var hiddenPhotoUploadButton = document.getElementById('hidden-photo-upload-button')

hiddenPhotoUploadButton.addEventListener('change', uploadProfileImage);

var selectedPhotoFile;
function uploadProfileImage(e) {
    selectedPhotoFile = e.target.files[0];
    handlePhotoUpload()
}

async function handlePhotoUpload() {
	const uploadTask = await storageRef.child(`productImages/${GTIN}`).put(selectedPhotoFile);
	uploadAndUpdateFirebasePhoto()
}

//final submit button and update firebase
async function uploadAndUpdateFirebasePhoto() {
	await storageRef.child('/productImages/'+GTIN)
		.getDownloadURL()
		.then(function(url) { productImageURL = url.toString() })

    //Create Image
    while(consoleImageContainer.firstChild) {
        consoleImageContainer.removeChild(consoleImageContainer.firstChild)
    }
    var newImage = document.createElement('img')
    newImage.setAttribute('class', 'atc-product-image')
    newImage.src = productImageURL
    consoleImageContainer.appendChild(newImage)
}

//Helper functions
function createID(length) {
    var result           = [];
    var characters       = 'ABCDEFGHJKMNPQRTUVWXYZ2346789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() * 
        charactersLength)));
   }
   return result.join('');
}

function getNumber(strNum) {
    var containsDollarSign = strNum.includes("$")
    if(containsDollarSign) {
        strNum = strNum.replace(/\$/g,'');
    }
    let num = parseFloat(strNum)
    return (num)
}

function addToCatalog(object) {
    loadATCUpdatingState()

    //Update users history of purchases
    database.collection("catalog").doc(atcCategory).collection(atcBrand).doc(GTIN).set(object)
    .then(function() {
        $("#atc-updating-screen").hide(() => {
            $("#atc-confirmation-screen").fadeIn()
        })
    }).catch(function(error) {
        $("#atc-completion-div").hide(() => {
            $("#atc-div").show()
        })
        alert(error.message)
    })
}

function loadATCUpdatingState() {
    $("#atc-div").hide( () => {
        $("#atc-completion-div").show()
        $("#atc-updating-screen").show()
        $("#atc-confirmation-screen").hide()
    })
}
