const backToCartButton = document.getElementById('back-to-cart-button')


//Login
const checkoutLoginScreen = document.getElementById('checkout-login-screen')
const loginEmailField = document.getElementById('login-email-field')
const loginPasswordField = document.getElementById('login-password-field')
const forgotPasswordButton = document.getElementById('forgot-password-button')
const loginButton = document.getElementById('login-button')
const loginAppleButton = document.getElementById('login-apple-button')
const loginGoogleButton = document.getElementById('login-google-button')
const guestLoginButton = document.getElementById('guest-login-button')

//___________________________________Guest Checkout__________________________________________
const checkoutScreen = document.getElementById('checkout-screen')
const orderSummaryItemsContainer = document.getElementById('order-summary-items-container')
const orderSubtotal = document.getElementById('order-subtotal')
const orderShippingPrice = document.getElementById('order-shipping-price')
const orderTax = document.getElementById('order-tax')
const orderTotal = document.getElementById('order-total')

//Delivery Screen
const orderDeliveryFormBlock = document.getElementById('order-delivery-form-block')
const shippingPrefilledAddressContainer = document.getElementById('shipping-prefilled-address-container')
const shippingPrefilledName = document.getElementById('shipping-prefilled-name')
const shippingPrefilledAddress = document.getElementById('shipping-prefilled-address')
const shippingPrefilledAddress2 = document.getElementById('shipping-prefilled-address-2')
const shippingPrefilledCity = document.getElementById('shipping-prefilled-city')
const shippingPrefilledChange = document.getElementById('shipping-prefilled-change')
const shippingAddressFormBlock = document.getElementById('shipping-address-form-block')
const shippingFirstNameField = document.getElementById('shipping-first-name-field')
const shippingFirstNameError = document.getElementById('shipping-first-name-error')
const shippingLastNameField = document.getElementById('shipping-last-name-field')
const shippingLastNameError = document.getElementById('shipping-last-name-error')
const shippingAddressField = document.getElementById('shipping-address-field')
const shippingAddressError = document.getElementById('shipping-address-error')
const shippingAddressAddSecond = document.getElementById('shipping-address-add-second')
const shippingAddressSecondField = document.getElementById('shipping-address-second-field')
const shippingCityField = document.getElementById('shipping-city-field')
const shippingCityError = document.getElementById('shipping-city-error')
const shippingStateDropdown = document.getElementById('shipping-state-dropdown')
const shippingStateDropdownText = document.getElementById('shipping-state-dropdown-text')
const shippingStateDropdownChevron = document.getElementById('shipping-state-dropdown-chevron')
const shippingStateDropdownOptions = document.getElementById('shipping-state-dropdown-options')
const shippingStateError = document.getElementById('shipping-state-error')
const shippingZipField = document.getElementById('shipping-zip-field')
const shippingZipError = document.getElementById('shipping-zip-error')
const shippingAddressCheckbox = document.getElementById('shipping-address-checkbox')
const contactEmailField = document.getElementById('contact-email-field')
const contactEmailError = document.getElementById('contact-email-error')
const contactPhoneField = document.getElementById('contact-phone-field')
const contactPhoneError = document.getElementById('contact-phone-error')
const textUpdatesCheckbox = document.getElementById('text-updates-checkbox')
const continueToPaymentButton = document.getElementById('continue-to-payment-button')

//Payment Screen
const orderPaymentFormBlock = document.getElementById('order-payment-form-block')
const orderPaymentBack = document.getElementById('order-payment-back')
const creditCardField = document.getElementById('credit-card-field')
const creditCardFieldError = document.getElementById('credit-card-field-error')
const expirationMonthDropdown = document.getElementById('expiration-month-dropdown')
const expirationMonthDropdownText = document.getElementById('expiration-month-dropdown-text')
const expirationMonthDropdownChevron = document.getElementById('expiration-month-chevron')
const expirationMonthDropdownOptions = document.getElementById('expiration-month-dropdown-options')
const expirationMonthError = document.getElementById('expiration-month-error')
const expirationYearDropdown = document.getElementById('expiration-year-dropdown')
const expirationYearDropdownText = document.getElementById('expiration-year-dropdown-text')
const expirationYearDropdownChevron = document.getElementById('expiration-year-chevron')
const expirationYearDropdownOptions = document.getElementById('expiration-year-dropdown-options')
const expirationYearError = document.getElementById('expiration-year-error')
const cvcField = document.getElementById('cvc-field')
const cvcFieldError = document.getElementById('cvc-field-error')
const paymentOptionsButton = document.getElementById('payment-options-button')
const paymentOptionsContainer = document.getElementById('payment-options-container')
const paypalButton = document.getElementById('paypal-button')
const venmoButton = document.getElementById('venmo-button')
const applePayButton = document.getElementById('apple-pay-button')
const prefilledBillingAddressContainer = document.getElementById('prefilled-billing-address-container')
const billingPrefilledName = document.getElementById('billing-prefilled-name')
const billingPrefilledAddress = document.getElementById('billing-prefilled-address')
const billingPrefilledAddress2 = document.getElementById('billing-prefilled-address-2')
const billingPrefilledCity = document.getElementById('billing-prefilled-city')
const billingPrefilledChange = document.getElementById('billing-prefilled-change')
const billingAddressContainer = document.getElementById('billing-address-container')
const billingFirstField = document.getElementById('billing-first-field')
const billingFirstError = document.getElementById('billing-first-error')
const billingLastField = document.getElementById('billing-last-field')
const billingLastError = document.getElementById('billing-last-error')
const billingAddressField = document.getElementById('billing-address-field')
const billingAddressError = document.getElementById('billing-address-error')
const billingAddressAddSecond = document.getElementById('billing-address-add-second')
const biillingAddressSecond = document.getElementById('billing-address-second')
const billingCityField = document.getElementById('billing-city-field')
const billingCityError = document.getElementById('billing-city-error')
const billingStateDropdown = document.getElementById('billing-state-dropdown')
const billingStateDropdownText = document.getElementById('billing-state-text')
const billingStateChevron = document.getElementById('billing-state-chevron')
const billingStateDropdownOptions = document.getElementById('billing-state-dropdown-options')
const billingStateError = document.getElementById('billing-state-error')
const billingZipField = document.getElementById('billing-zip-field')
const billingZipError = document.getElementById('billing-zip-error')
const placeOrderButton = document.getElementById('place-order-button')


//Global Variables
var database = firebase.firestore()
var userHasShippingAddress = false
var useShippingAddressForBilling = true
var globalUserId

var checkoutDict = {
        'shippingAddress' : {
            'firstName' : '',
            'lastName' : '',
            'address1' : '',
            'address2' : '',
            'city' : '',
            'state' : '',
            'zipCode' : '',
        },
        'deliveryUpdates' : false,
        'emailAddress' : '',
        'phoneNumber' : '',
        'billingAddress' : {
            'firstName' : '',
            'lastName' : '',
            'address1' : '',
            'address2' : '',
            'city' : '',
            'state' : '',
            'zipCode' : ''
        },

        'checkoutItems' : {},
        'itemSubtotal' : 0.0,
        'shippingFees' : 0.0,
        'tax' : 0.0,
        'checkoutTotal' : 0.0,
        'paymentMethod' : '',
        'orderStatus' : 'processing'
}





window.onload = () => {
    loadInitialCheckoutState()

    //TODO: Check if user is logged in
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            globalUserId = user.uid


            firebase.firestore().collection('users').doc(user.uid).get().then(function(doc) {
                let data = doc.data()

                //Prefill shipping address if applicable
                if(data.shippingAddress.primary) {
                    userHasShippingAddress = true

                    let primaryAddress = data.shippingAddress.primary

                    shippingPrefilledAddressContainer.style.display = 'block'
                    shippingAddressFormBlock.style.display = 'none'

                    shippingPrefilledName.innerHTML = primaryAddress.firstName + ' ' + primaryAddress.lastName
                    shippingPrefilledAddress.innerHTML = primaryAddress.address1
                    if(primaryAddress.address2 && primaryAddress.address2 != "") {
                        shippingPrefilledAddress2.innerHTML = primaryAddress.address2
                        shippingPrefilledAddress2.style.display = 'block'
                    } else {
                        shippingPrefilledAddress2.style.display = 'none'
                    }
                    shippingPrefilledCity.innerHTML = primaryAddress.city + ', ' + primaryAddress.state + ' ' + primaryAddress.zipCode

                    checkoutDict.shippingAddress = data.shippingAddress.primary
                }

                //Prefill email and phone number
                if(data.email) {
                    contactEmailField.value = data.email
                }
                if(data.phoneNumber) {
                    contactPhoneField.value = data.phoneNumber
                }
            })
        } else {
            //TODO: Sign in and guest checkout workflow

            checkoutLoginScreen.style.display = 'flex'
            checkoutScreen.style.display = 'none'
        
            guestLoginButton.addEventListener('click', () => {
                loadGuestCheckoutInitialState()
            })
        }
    })
}

function loadInitialCheckoutState() {
    backToCartButton.addEventListener('click', () => {
        location.href = 'https://www.thegametree.io/shop/cart'
    })

    loadDropdownInitialStates()
    resetDeliveryInfoErrorFields()
    resetBillingInfoErrorFields()
    loadOrderSummary()

    $('#checkout-login-screen').fadeOut(200, () => {
        $('#checkout-screen').fadeIn()
    })

    orderDeliveryFormBlock.style.display = 'block'
    shippingPrefilledAddressContainer.style.display = 'none'
    orderPaymentFormBlock.style.display = 'none'
    
    paymentOptionsContainer.style.display = 'none'
    shippingAddressSecondField.style.display = 'none'
    biillingAddressSecond.style.display = 'none'


    //Navigation and onClicks
    shippingPrefilledChange.addEventListener('click', () => {
        $('#shipping-address-form-block').fadeIn()
        userHasShippingAddress = false
        shippingPrefilledAddressContainer.style.display = 'none'
    })

    shippingAddressAddSecond.addEventListener('click', () => {
        $('#shipping-address-add-second').fadeOut(200, () => {
            $('#shipping-address-second-field').fadeIn()
        })
    })

    shippingAddressCheckbox.addEventListener('click', () => {

        if(shippingAddressCheckbox.innerHTML == '') {
            shippingAddressCheckbox.innerHTML = ''
            useShippingAddressForBilling = false

        } else {
            shippingAddressCheckbox.innerHTML = ''
            useShippingAddressForBilling = true
        }
    })

    textUpdatesCheckbox.addEventListener('click', () => {
        //TODO: update text preferences on click
        if(textUpdatesCheckbox.innerHTML == '') {
            textUpdatesCheckbox.innerHTML = ''
        } else {
            textUpdatesCheckbox.innerHTML = ''
        }
    })

    continueToPaymentButton.addEventListener('click', () => {

        if (checkForDeliveryInfoErrors()) {
            if(!userHasShippingAddress) {
                checkoutDict.shippingAddress.firstName = shippingFirstNameField.value
                checkoutDict.shippingAddress.lastName = shippingLastNameField.value
                checkoutDict.shippingAddress.address1 = shippingAddressField.value
                checkoutDict.shippingAddress.address2 = shippingAddressSecondField.value
                checkoutDict.shippingAddress.city = shippingCityField.value
                checkoutDict.shippingAddress.state = shippingStateDropdownText.innerHTML
                checkoutDict.shippingAddress.zipCode = shippingZipField.value
            }
            checkoutDict.emailAddress = contactEmailField.value
            checkoutDict.phoneNumber = contactPhoneField.value

            displayAndUpdateBillingAddress()

            $('#order-delivery-form-block').fadeOut(200, () => {
                $('#order-payment-form-block').fadeIn()
            })

        } else {
            showErrorMessage("There's an issue with your delivery info")
        }
    })

    orderPaymentBack.addEventListener('click', () => {
        if(shippingAddressCheckbox.innerHTML == '') {
            useShippingAddressForBilling = true
        } else {
            useShippingAddressForBilling = false
        }

        $('#order-payment-form-block').fadeOut(200, () =>{
            $('#order-delivery-form-block').fadeIn()
        })
    })

    paymentOptionsButton.addEventListener('click', () => {
        if(paymentOptionsContainer.style.display == 'none') {
            $('#payment-options-container').fadeIn()
        } else {
            $('#payment-options-container').fadeOut()
        }
    })

    billingPrefilledChange.addEventListener('click', () => {
        $('#billing-address-container').fadeIn()
        useShippingAddressForBilling = false
        prefilledBillingAddressContainer.style.display = 'none'
    })

    billingAddressAddSecond.addEventListener('click', () => {
        $('#billing-address-add-second').fadeOut(200, () => {
            $('#billing-address-second').fadeIn()
        })
    })

    placeOrderButton.addEventListener('click', () => {

        if(checkForBillingInfoErrors()) {
            submitOrderAndProcessPayment()

        } else {
            showErrorMessage("There's an issue with your billing information")
        }
    })
}



function loadDropdownInitialStates() {
    shippingStateDropdown.className = 'checkout-state-dropdown'
    expirationMonthDropdown.className = 'checkout-dropdown-button'
    expirationYearDropdown.className = 'checkout-dropdown-button'
    billingStateDropdown.className = 'checkout-state-dropdown'

    var dropdownIDs = ['shipping-state-dropdown', 'expiration-month-dropdown', 'expiration-year-dropdown', 'billing-state-dropdown']
    var dropdownOptionIDs = ['shipping-state-dropdown-options', 'expiration-month-dropdown-options', 'expiration-year-dropdown-options', 'billing-state-dropdown-options']

    dropdownIDs.forEach( (id) => {
        var dropdownOptionID = dropdownOptionIDs[dropdownIDs.indexOf(id)]
        var dropdownOptionElement = document.getElementById(dropdownOptionID)
        while(dropdownOptionElement.firstChild) {
            dropdownOptionElement.removeChild(dropdownOptionElement.firstChild)
        }

        dropdownOptionElement.style.display = 'none'

        document.getElementById(id).addEventListener('click', () => {
            if(dropdownOptionElement.style.display != 'none') {
                $(`#${dropdownOptionID}`).fadeOut(400, () => {
                    dropdownOptionElement.style.display = 'none'
                })
            } else {
                $(`#${dropdownOptionID}`).fadeIn()
            }
        })
    })


    
    const monthOptions = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    const yearOptions = ['2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031']
    const stateOptions = [ "AK","AL","AR","AS","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID","IL",
                        "IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM",
                        "NV","NY","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"]

    stateOptions.forEach( (state) => {
        let shippingStateOption = document.createElement('div')
        shippingStateOption.className = 'dropdown-option'
        shippingStateOption.innerHTML = state
        shippingStateOption.addEventListener('click', () => {
            shippingStateDropdownText.innerHTML = state
            $('#shipping-state-dropdown-options').fadeOut()
        })
        shippingStateDropdownOptions.appendChild(shippingStateOption)

        let billingStateOption = document.createElement('div')
        billingStateOption.className = 'dropdown-option'
        billingStateOption.innerHTML = state
        billingStateOption.addEventListener('click', () => {
            billingStateDropdownText.innerHTML = state
            $('#billing-state-dropdown-options').fadeOut()
        })
        billingStateDropdownOptions.appendChild(billingStateOption)
    })

    monthOptions.forEach( (month) => {
        let monthOption = document.createElement('div')
        monthOption.className = 'dropdown-option'
        monthOption.innerHTML = month
        monthOption.addEventListener('click', () => {
            expirationMonthDropdownText.innerHTML = month
            $('#expiration-month-dropdown-options').fadeOut()
        })
        expirationMonthDropdownOptions.appendChild(monthOption)
    })

    yearOptions.forEach( (year) => {
        let yearOption = document.createElement('div')
        yearOption.className = 'dropdown-option'
        yearOption.innerHTML = year
        yearOption.addEventListener('click', () => {
            expirationYearDropdownText.innerHTML = year
            $('#expiration-year-dropdown-options').fadeOut()
        })
        expirationYearDropdownOptions.appendChild(yearOption)
    })
}





function checkForDeliveryInfoErrors() {
    resetDeliveryInfoErrorFields()

    shippingStateDropdown.className = 'checkout-state-dropdown'
    shippingStateError.style.display = 'none'

    if(userHasShippingAddress) {
        if (!checkValidEmail(contactEmailField.value)) {
            console.log(checkValidEmail(contactEmailField.value))
            contactEmailField.className = 'checkout-input-field-error w-input'
            contactEmailError.style.display = 'flex'
            return false
    
        } else if (!checkValidPhone(contactPhoneField.value)) {
            contactPhoneField.className = 'checkout-input-field-error w-input'
            contactPhoneError.style.display = 'flex'
            return false
    
        } else {
            return true
        }

    } else if (shippingFirstNameField.value == '') {
        shippingFirstNameField.className = 'checkout-input-field-error w-input'
        shippingFirstNameError.style.display = 'flex'
        return false

    } else if (shippingLastNameField.value == '') {
        shippingLastNameField.className = 'checkout-input-field-error w-input'
        shippingLastNameError.style.display = 'flex'
        return false

    } else if (shippingAddressField.value == '') {
        shippingAddressField.className = 'checkout-input-field-error w-input'
        shippingAddressError.style.display = 'flex'
        return false

    } else if (shippingCityField.value == '') {
        shippingCityField.className = 'checkout-input-field-error w-input'
        shippingCityError.style.display = 'flex'
        return false

    } else if (shippingStateDropdownText.innerHTML == '--') {
        shippingStateDropdown.className = 'checkout-state-dropdown-error'
        shippingStateError.style.display = 'flex'
        return false

    } else if (shippingZipField.value == '') {
        shippingZipField.className = 'checkout-input-field-error w-input'
        shippingZipError.style.display = 'flex'
        return false

    } else if (!checkValidEmail(contactEmailField.value)) {
        console.log(checkValidEmail(contactEmailField.value))
        contactEmailField.className = 'checkout-input-field-error w-input'
        contactEmailError.style.display = 'flex'
        return false

    } else if (!checkValidPhone(contactPhoneField.value)) {
        contactPhoneField.className = 'checkout-input-field-error w-input'
        contactPhoneError.style.display = 'flex'
        return false

    } else {
        return true
    }
}

function checkForBillingInfoErrors() {

    if(!useShippingAddressForBilling) {
        resetBillingInfoErrorFields()

        billingStateDropdown.className = 'checkout-state-dropdown'
        billingStateError.style.display = 'none'

        if (billingFirstField.value == '') {
            billingFirstField.className = 'checkout-input-field-error w-input'
            billingFirstError.style.display = 'flex'
            return false
    
        } else if (billingLastField.value == '') {
            billingLastField.className = 'checkout-input-field-error w-input'
            billingLastError.style.display = 'flex'
            return false
    
        } else if (billingAddressField.value == '') {
            billingAddressField.className = 'checkout-input-field-error w-input'
            billingAddressError.style.display = 'flex'
            return false
    
        } else if (billingCityField.value == '') {
            billingCityField.className = 'checkout-input-field-error w-input'
            billingCityError.style.display = 'flex'
            return false
    
        } else if (billingStateDropdownText.innerHTML == '--') {
            billingStateDropdown.className = 'checkout-state-dropdown-error'
            billingStateError.style.display = 'flex'
            return false
    
        } else if (billingZipField.value == '') {
            billingZipField.className = 'checkout-input-field-error w-input'
            billingZipError.style.display = 'flex'
            return false

        } else {
            checkoutDict.billingAddress.firstName = billingFirstField.value
            checkoutDict.billingAddress.lastName = billingLastField.value
            checkoutDict.billingAddress.address1 = billingAddressField.value
            checkoutDict.billingAddress.address2 = biillingAddressSecond.value
            checkoutDict.billingAddress.city = billingCityField.value
            checkoutDict.billingAddress.state = billingStateDropdownText.value
            checkoutDict.billingAddress.zipCode = billingZipField.value

            return true
        }
    } else {
        return true
    }
}

//Load Order Summary

function loadOrderSummary() {
    database.collection("users").doc(globalUserId).onSnapshot((doc) => {
        while(orderSummaryItemsContainer.firstChild) {
            orderSummaryItemsContainer.removeChild(orderSummaryItemsContainer.firstChild)
        }

        var cartData = doc.data().cart

        if(Object.keys(cartData).length > 0 ) {
            //Reset Checkout Object
            checkoutDict.checkoutItems = {}

            //Build Cart Items
            for (var item in cartData) {
                if (cartData.hasOwnProperty(item)) {
                    buildCartItem(item, cartData[item])
                }
            }

            updateOrderTotal(cartData)

        } else {
            //Customer doesn't have any items to checkout with, redirect back to cart
            location.href = 'https://www.thegametree.io/shop/cart'
        }
    })
}



function buildCartItem(purchaseID, GTIN) {

    database.collection('catalog').doc(GTIN).get().then(function(doc) {

        var itemData = doc.data()

        const itemConditionDict = {
            'new' : 'New',
            'usedFantastic' : 'Used - Excellent',
            'usedGood' : 'Used - Good',
            'usedAcceptable' : 'Used - Acceptable'
        }

        //Check if item is still in stock
        if( itemData.availability.hasOwnProperty(purchaseID) ) {
            checkoutDict.checkoutItems[`${purchaseID}`] = GTIN

            var itemCondition = itemData.availability[purchaseID]

            const orderSummaryItemDiv = createDOMElement('div', 'order-summary-item-div', 'none', orderSummaryItemsContainer)
            const orderSummaryImage = createDOMElement('img', 'order-summary-image', 'none', orderSummaryItemDiv)
            orderSummaryImage.src = itemData.productImage
            createDOMElement('div', 'order-summary-item-title', itemData.general.productName, orderSummaryItemDiv)

            const orderSummaryPriceDiv = createDOMElement('div', 'order-summary-price-div', 'none', orderSummaryItemDiv)
            const itemPrice = '$' + itemData.salePrices[itemCondition]
            createDOMElement('div', 'order-summary-item-price', itemPrice, orderSummaryPriceDiv)
            createDOMElement('div', 'order-summary-item-quantity', 'Qty 1', orderSummaryPriceDiv)
            const removeItem = createDOMElement('div', 'order-summary-remove-item', 'Remove', orderSummaryPriceDiv)
            removeItem.setAttribute('onClick', `removeItemFromOrder("${purchaseID}")`)

        } else {
            //TODO: Notify customer the item is no longer in stock, remove from cart
        }
    })
}


function updateOrderTotal(cartItems) {

    var subtotalAmount = 0.00
    var taxAmount = 0.00
    var totalAmount = 0.00

    for (let item in cartItems) {
        if (cartItems.hasOwnProperty(item)) {
            database.collection('catalog').doc(cartItems[item]).get().then(function(doc) {
                var itemData = doc.data()
                var itemCondition = itemData.availability[item]
                var itemPrice = itemData.salePrices[itemCondition]

                subtotalAmount += parseFloat(itemPrice)
                //TODO: Calculate Sales Tax
                totalAmount = subtotalAmount + taxAmount

                orderSubtotal.innerHTML = '$' + subtotalAmount
                orderTax.innerHTML = '$' + taxAmount
                orderTotal.innerHTML = '$' + totalAmount

                checkoutDict.itemSubtotal = subtotalAmount
                checkoutDict.tax = taxAmount
                checkoutDict.checkoutTotal = totalAmount

            })
        }
    }
}
function removeItemFromOrder(purchaseID) {
    var cartUpdateDict = {}
    cartUpdateDict[`cart.${purchaseID}`] = firebase.firestore.FieldValue.delete()
  
    var userID = firebase.auth().currentUser.uid
    database.collection("users").doc(userID).update(cartUpdateDict).then(function() {
        console.log('Removed Item')
        updateOrderTotal(false)

    }).catch(function(error) {
        console.log(error)
    })
}





//Helper Functions
function checkValidEmail(emailStr) {
    console.log(emailStr)
    if( emailStr.includes("@") && emailStr.includes(".")) {
        return true
    } else { 
        return false
    }
}

function checkValidPhone(phoneStr) {
    var strippedStr = phoneStr.replace(/\D/g, '')
    console.log(strippedStr)
    console.log(strippedStr.length)
    if (strippedStr.length == 10 || strippedStr.length == 11) {
        return true
    } else {
        return false
    }
}


function resetDeliveryInfoErrorFields() {
    let errorMessagesArray = [shippingFirstNameError, shippingLastNameError, shippingAddressError, shippingCityError, shippingStateError, shippingZipError, contactEmailError, contactPhoneError,]
    let inputFieldsArray = [shippingFirstNameField, shippingLastNameField, shippingAddressField, shippingCityField, shippingZipField, contactEmailField, contactPhoneField]

    errorMessagesArray.forEach( (errorElement) => {
        errorElement.style.display = 'none'
    })

    inputFieldsArray.forEach( (inputElement) => { 
        inputElement.className = 'checkout-input-field w-input'
    })
}


function resetBillingInfoErrorFields() {
    let errorMessagesArray = [creditCardFieldError, expirationMonthError, expirationYearError, cvcFieldError, billingFirstError, billingLastError, billingAddressError, billingCityError, billingStateError, billingZipError]
    let inputFieldsArray = [creditCardField, cvcField, billingFirstField, billingLastField, billingAddressField, billingCityField, billingZipField]

    errorMessagesArray.forEach( (errorElement) => {
        errorElement.style.display = 'none'
    })

    inputFieldsArray.forEach( (inputElement) => { 
        inputElement.className = 'checkout-input-field w-input'
    })
}


function displayAndUpdateBillingAddress() {

    if(useShippingAddressForBilling) {
        checkoutDict.billingAddress.firstName = checkoutDict.shippingAddress.firstName
        checkoutDict.billingAddress.lastName = checkoutDict.shippingAddress.lastName
        checkoutDict.billingAddress.address1 = checkoutDict.shippingAddress.address1
        checkoutDict.billingAddress.address2 = checkoutDict.shippingAddress.address2
        checkoutDict.billingAddress.city = checkoutDict.shippingAddress.city
        checkoutDict.billingAddress.state = checkoutDict.shippingAddress.state
        checkoutDict.billingAddress.zipCode = checkoutDict.shippingAddress.zipCode

        billingPrefilledName.innerHTML = checkoutDict.billingAddress.firstName + ' ' + checkoutDict.billingAddress.lastName
        billingPrefilledAddress.innerHTML = checkoutDict.billingAddress.address1
        if(checkoutDict.billingAddress.address2 != '' ) {
            billingPrefilledAddress2.innerHTML = checkoutDict.billingAddress.address2
        } else {
            billingPrefilledAddress2.style.display = 'none'
        }
        billingPrefilledCity.innerHTML = `${checkoutDict.billingAddress.city}, ${checkoutDict.billingAddress.state} ${checkoutDict.billingAddress.zipCode}`

        prefilledBillingAddressContainer.style.display = 'block'
        billingAddressContainer.style.display = 'none'

    } else {
        prefilledBillingAddressContainer.style.display = 'none'
        billingAddressContainer.style.display = 'block'
    }
}
