window.onload = function() {
    loadInitialState()
}

//Global Variables
var category, brand, productID, productData
var database = firebase.firestore()

//HTML Elements
const categoryScreen = document.getElementById('category-section')
const consoleCategoryOption = document.getElementById('console-category-option')
const gamesCategoryOption = document.getElementById('games-category-option')
const accessoryCategoryOption = document.getElementById('accessories-category-option')
const categoryNavNext = document.getElementById('category-nav-next')

const brandScreen = document.getElementById('brand-section')
const xboxBrandOption = document.getElementById('xbox-brand-option')
const playstationBrandOption = document.getElementById('playstation-brand-option')
const nintendoBrandOption = document.getElementById('nintendo-brand-option')
const brandNavBack = document.getElementById('brand-nav-back')
const brandNavNext = document.getElementById('brand-nav-next')

const productScreen = document.getElementById('product-section')
const productHeader = document.getElementById('product-header')
const productContainer = document.getElementById('product-container')
const productNavBack = document.getElementById('product-nav-back')
const productNavNext = document.getElementById('product-nav-next')

const saleConfirmationScreen = document.getElementById('scs-section')
const scsNavBack = document.getElementById('scs-nav-back')

//Navigation Event Listeners
categoryNavNext.addEventListener('click', loadBrandScreen )
brandNavBack.addEventListener('click', () => {
    loadInitialState('brands')
})
brandNavNext.addEventListener('click', loadProductScreen )
productNavBack.addEventListener('click', () => {
    loadBrandScreen('products') 
})
productNavNext.addEventListener('click', loadSaleConfirmationScreen)
scsNavBack.addEventListener('click', () => {
    loadProductScreen('scs')
})


//Category and Brand Option Event Listeners
consoleCategoryOption.addEventListener('click', () => {
    category = 'consoles'
    changeCategoryClasses(consoleCategoryOption)
    $('#category-nav-next').fadeIn()
})

gamesCategoryOption.addEventListener('click', () => {
    category = 'games'
    changeCategoryClasses(gamesCategoryOption)
    $('#category-nav-next').fadeIn()
})

accessoryCategoryOption.addEventListener('click', () => {
    category = 'accessories'
    changeCategoryClasses(accessoryCategoryOption)
    $('#category-nav-next').fadeIn()
})

xboxBrandOption.addEventListener('click', () => {
    brand = 'xbox'
    changeBrandClasses(xboxBrandOption)
})

playstationBrandOption.addEventListener('click', () => {
    brand = 'playstation'
    changeBrandClasses(playstationBrandOption)
})

nintendoBrandOption.addEventListener('click', () => {
    brand = 'nintendo'
    changeBrandClasses(nintendoBrandOption)
})

//Display Screens 
function loadInitialState(origin) {
    if(origin == 'brands') {
        $('#brand-section').fadeOut(function() {$('#category-section').fadeIn()})
    } else {
        categoryScreen.style.display = 'flex'
        brandScreen.style.display = 'none'
        productScreen.style.display = 'none'
        saleConfirmationScreen.style.display = 'none'
    }
    categoryNavNext.style.display = 'none'

    consoleCategoryOption.setAttribute('class', 'category-option-unselected')
    gamesCategoryOption.setAttribute('class', 'category-option-unselected')
    accessoryCategoryOption.setAttribute('class', 'category-option-unselected')
}

function loadBrandScreen(origin) {
    if (origin == 'products') {
        $('#product-section').fadeOut(function() {$('#brand-section').fadeIn()})
    } else {
        $('#category-section').fadeOut(function() {$('#brand-section').fadeIn()})
    }
    brandNavNext.style.display = 'none'

    xboxBrandOption.setAttribute('class', 'brand-option-unselected')
    playstationBrandOption.setAttribute('class', 'brand-option-unselected')
    nintendoBrandOption.setAttribute('class', 'brand-option-unselected')
}

function loadProductScreen(origin) {
    if (origin == 'scs') {
        $('#scs-section').fadeOut(function() {$('#product-section').fadeIn()})
    } else {
        $('#brand-section').fadeOut(function() {$('#product-section').fadeIn()})
    }
    productNavNext.style.display = 'none'

    while(productContainer.firstChild) {
        productContainer.removeChild(productContainer.firstChild)
    }
    database.collection("catalog").doc(category).collection(brand).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            buildProductOption(doc.id, doc.data())
        });
    });
}

//Helper functions
function buildProductOption(ID, data) {
    let productDiv = document.createElement('div')
    productDiv.setAttribute('class', 'product-option')
    productContainer.appendChild(productDiv)
    productDiv.addEventListener('click', () => {
        productID = ID
        productData = data
        $('#product-nav-next').fadeIn()
    })

    let productImage = document.createElement('img')
    productImage.setAttribute('class', 'product-img')
    productImage.src = data.productImage
    productDiv.appendChild(productImage)

    let productText = document.createElement('div')
    productText.setAttribute('class', 'product-text')
    productText.innerHTML = data.productTitle
    productDiv.appendChild(productText)
}

function changeCategoryClasses(targetElement) {
    let categoryOptions = [consoleCategoryOption, gamesCategoryOption, accessoryCategoryOption]

    categoryOptions.forEach(element => {
        element.setAttribute('class', 'category-option-unselected')
    })
    targetElement.setAttribute('class', 'category-option-selected')
}

function changeBrandClasses(targetElement) {
    let brandOptions = [xboxBrandOption, playstationBrandOption, nintendoBrandOption]

    brandOptions.forEach(element => {
        element.setAttribute('class', 'brand-option-unselected')
    })
    targetElement.setAttribute('class', 'brand-option-selected')
    $('#brand-nav-next').fadeIn()
}

function changePaymentClasses(targetElement) {
    let paymentOptions = [scsPaymentZelle, scsPaymentVenmo, scsPaymentPaypal, scsPaymentCash]

    paymentOptions.forEach(element => {
        element.setAttribute('class', 'scs-payment-button')
    })
    targetElement.setAttribute('class', 'scs-payment-button-selected')
    $('#scs-bottom-div').fadeIn()
}

function showErrorMessage(message) {
    var errorMessageDiv = document.getElementById('error-message')
    errorMessageDiv.innerHTML = message

    $('#error-message').fadeIn().delay(5000).fadeOut("slow")
}


//Sale Confirmation Screen (SCS) Functions
var sellObject = {
    'productData' : {},
    'paymentType' : '',
    'location' : {},
    'pickupTime' : '',
    'contactPhoneNumber' : '',
    'contactName' : '',
    'additionalNotes' : ''
}

const scsTopDiv = document.getElementById('scs-top-div')
const scsBottomDiv = document.getElementById('scs-bottom-div')
const scsImageContainer = document.getElementById('scs-image-container')
const scsHeader = document.getElementById('scs-header')
const scsValue = document.getElementById('scs-value')
const scsPaymentZelle = document.getElementById('scs-payment-zelle')
const scsPaymentVenmo = document.getElementById('scs-payment-venmo')
const scsPaymentPaypal = document.getElementById('scs-payment-paypal')
const scsPaymentCash = document.getElementById('scs-payment-cash')

scsPaymentZelle.addEventListener('click', () => {
    sellObject.paymentType = 'zelle'
    changePaymentClasses(scsPaymentZelle)
})
scsPaymentVenmo.addEventListener('click', () => {
    sellObject.paymentType = 'venmo'
    changePaymentClasses(scsPaymentVenmo)
})
scsPaymentPaypal.addEventListener('click', () => {
    sellObject.paymentType = 'paypal'
    changePaymentClasses(scsPaymentPaypal)
})
scsPaymentCash.addEventListener('click', () => {
    sellObject.paymentType = 'cash'
    changePaymentClasses(scsPaymentCash)
})


function loadSaleConfirmationScreen() {
    sellObject.productData = productData

    $('#product-section').fadeOut(function() {$('#scs-section').fadeIn()})
    scsBottomDiv.style.display = 'none'

    scsImageContainer.removeChild(scsImageContainer.firstChild)
    let newSCSImage = document.createElement('img')
    newSCSImage.setAttribute('class', 'scs-image')
    newSCSImage.src = productData.productImage
    scsImageContainer.appendChild(newSCSImage)

    scsHeader.innerHTML = productData.productTitle 
    scsValue.innerHTML = '$' + productData.purchasePrice
    changePaymentClasses()
}


