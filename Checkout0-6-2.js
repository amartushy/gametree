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
const cardNameField = document.getElementById('card-name-field')
const cardNameFieldError = document.getElementById('card-name-field-error')
const creditCardField = document.getElementById('credit-card-field')
const creditCardFieldError = document.getElementById('credit-card-field-error')
const expirationField = document.getElementById('credit-card-field')
const expirationFieldError = document.getElementById('expiration-field-error')
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

//Processing Screen
const checkoutProcessingScreen = document.getElementById('checkout-processing-screen')
const checkoutCheckMark = document.getElementById('checkout-check-mark')
const checkoutProcessingText = document.getElementById('checkout-processing-text')
const checkoutCompleteDiv = document.getElementById('checkout-complete-div')
const checkoutTrackOrderButton = document.getElementById('checkout-track-order-button')
const checkoutCompleteAccountDiv = document.getElementById('checkout-complete-account-div')
const checkoutAccountCreateButton = document.getElementById('checkout-account-create-button')


//Global Variables
var database = firebase.firestore()
var userHasShippingAddress = false
var useShippingAddressForBilling = true
var globalUserId
var isUserTemporaryAccount = false

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
        'customerID' : '',
        'checkoutItems' : {},
        'itemSubtotal' : 0.0,
        'shippingFees' : 0.0,
        'tax' : 0.0,
        'checkoutTotal' : 0.0,
        'paymentMethod' : '',
        'orderStatus' : 'processing',
        'orderDate' : new Date().getTime() 
}





window.onload = () => {
    loadInitialCheckoutState()


    //TODO: Check if user is logged in
    firebase.auth().onAuthStateChanged(function(user) {

        if (user) {
            globalUserId = user.uid
            loadOrderSummary(globalUserId)
            checkoutDict.customerID = globalUserId
            
            firebase.firestore().collection('users').doc(user.uid).get().then(function(doc) {
                let data = doc.data()

                //Check if user is an anonymous account
                if(data.isAnonymous) {
                    isUserTemporaryAccount = true

                    checkoutLoginScreen.style.display = 'flex'
                    checkoutScreen.style.display = 'none'
                
                    guestLoginButton.addEventListener('click', () => {

                        $('#checkout-login-screen').fadeOut(200, () => {
                            $('#checkout-screen').fadeIn().css('display', 'flex')
                        })
                    })

                } else {
                    checkoutLoginScreen.style.display = 'none'
                    checkoutScreen.style.display = 'flex'

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
                }
            })

        } else {
            //Redirect if no user is authenticated
            location.href = 'https://www.thegametree.io/create-account'
        }
    })
}

function loadInitialCheckoutState() {
    //TODO: Add payment options
    document.getElementById('payment-options-block').style.display = 'none'

    backToCartButton.addEventListener('click', () => {
        location.href = 'https://www.thegametree.io/shop/cart'
    })

    loadDropdownInitialStates()
    resetDeliveryInfoErrorFields()
    resetBillingInfoErrorFields()

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

    checkoutTrackOrderButton.addEventListener('click', () => {
        location.href = 'https://www.thegametree.io/track-delivery'
    })

    checkoutAccountCreateButton.addEventListener('click', () => {
        location.href = 'https://www.thegametree.io/account-creation'
    })
}



function loadDropdownInitialStates() {
    shippingStateDropdown.className = 'checkout-state-dropdown'
    billingStateDropdown.className = 'checkout-state-dropdown'

    var dropdownIDs = ['shipping-state-dropdown', 'billing-state-dropdown']
    var dropdownOptionIDs = ['shipping-state-dropdown-options', 'billing-state-dropdown-options']

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
function loadOrderSummary(userID) {

    database.collection("users").doc(userID).get().then((doc) => {
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
            var itemCondition = itemData.availability[purchaseID]

            checkoutDict.checkoutItems[`${purchaseID}`] = {
                'GTIN' : GTIN,
                'productName' : itemData.general.productName,
                'productImage' : itemData.productImage,
                'condition' : itemData.availability[purchaseID],
                'price' : itemData.salePrices[itemCondition],
                'UPC' : itemData.other.UPC,
                'category' : itemData.category,
                'brand' : itemData.brand
            }

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
    var orderShipping = 0.00
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
                if(subtotalAmount >= 50 ) {
                    orderShippingPrice.innerHTML = 'FREE'
                } else {
                    orderShippingPrice.innerHTML = '$3.79'
                    orderShipping = 3.79
                }

                totalAmount = subtotalAmount + taxAmount + orderShipping

                orderSubtotal.innerHTML = '$' + subtotalAmount.toFixed(2)
                orderTax.innerHTML = '$' + taxAmount.toFixed(2)
                orderTotal.innerHTML = '$' + totalAmount.toFixed(2)

                checkoutDict.itemSubtotal = subtotalAmount.toFixed(2)
                checkoutDict.tax = taxAmount.toFixed(2)
                checkoutDict.checkoutTotal = totalAmount.toFixed(2)

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
        loadOrderSummary(globalUserId)

    }).catch(function(error) {
        console.log(error)
    })
}





//Helper Functions


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
    let errorMessagesArray = [cardNameFieldError, creditCardFieldError,expirationFieldError, cvcFieldError, billingFirstError, billingLastError, billingAddressError, billingCityError, billingStateError, billingZipError]
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







function submitOrderAndProcessPayment(braintreeID) {
    console.log(checkoutDict)
    console.log(globalUserId)

    sessionStorage.setItem('orderID', braintreeID)

    //Load Processing Screen
    checkoutCheckMark.style.display = 'none'
    checkoutCompleteDiv.style.display = 'none'
    checkoutCompleteAccountDiv.style.display = 'none'
    checkoutProcessingText.style.display = 'block'

    $('#checkout-screen').fadeOut(200, () => {
        $('#checkout-processing-screen').fadeIn().css('display', 'flex')
    })

    var promises = []

    var transactionID = braintreeID

    //Update Global Orders
    var usersPromise = database.collection('orders').doc(transactionID).set(checkoutDict).then(function() {
        console.log("Users orders updated");
    }).catch(function(error) {
        console.error("Error writing document: ", error);
    });

    //Clear Users Cart
    var usersCartPromise = database.collection('users').doc(globalUserId).update({
        'cart' : {}
    }).then(function() {
        console.log("Global orders updated");
    }).catch(function(error) {
        console.error("Error writing document: ", error);
    });

    //Update Users Orders
    var globalPromise = database.collection('users').doc(globalUserId).collection('orders').doc(transactionID).set(checkoutDict).then(function() {
        console.log("Global orders updated");
    }).catch(function(error) {
        console.error("Error writing document: ", error);
    });

    //Update Catalog Availability
    var cartData = checkoutDict.checkoutItems
    for (let item in cartData) {
        if (cartData.hasOwnProperty(item)) {

            var removeItemDict = {}
            removeItemDict[`availability.${item}`] = firebase.firestore.FieldValue.delete()
            
            checkAndUpdateProductAvailability(cartData[item]['GTIN'])

            var catalogPromise = database.collection('catalog').doc(cartData[item]['GTIN']).update(removeItemDict).then(function() {
                console.log(`Item: ${cartData[item]['GTIN']} removed with purchaseID: ${item}`)

            }).catch(function(error) {
                console.log(error.message)
            })

            promises.push(catalogPromise)

        }
    }


    promises.push(usersPromise, usersCartPromise, globalPromise)

    Promise.all(promises).then(results => {
        
        console.log('All documents written successfully')

        //Notify Admins
        var message = `New Order Placed %0D%0AOrder ID: ${transactionID} %0D%0AOrder Total: ${checkoutDict.checkoutTotal} %0D%0A%0D%0AItems: %0D%0A`
        var cartData = checkoutDict.checkoutItems
        for(var item in cartData) {
            if(cartData.hasOwnProperty(item)) {
                var itemString = `${cartData[item].productName} %0D%0APurchaseID: ${item} %0D%0A$${cartData[item].price} %0D%0A %0D%0A`
                message += itemString
            }
        }
        var customerInfoStr = `Customer Info:%0D%0A${checkoutDict.shippingAddress.firstName} ${checkoutDict.shippingAddress.lastName}%0D%0A${checkoutDict.shippingAddress.address1}`
        if(checkoutDict.shippingAddress.address2 != "") {
            customerInfoStr += `%0D%0A${checkoutDict.shippingAddress.address2}`
        }
        var customerInfoStr2 = `%0D%0A${checkoutDict.shippingAddress.city}, ${checkoutDict.shippingAddress.state} ${checkoutDict.shippingAddress.zipCode}`
        customerInfoStr += customerInfoStr2

        message += customerInfoStr

        sendSMSTo('4582108156', message)

        var orderDateObject = getFormattedDate(checkoutDict.orderDate)
        orderDateString = `${orderDateObject[0]} ${orderDateObject[1]}, ${orderDateObject[2]} `
        sendReceiptTo(transactionID, checkoutDict.billingAddress.firstName, checkoutDict.billingAddress.lastName, orderDateString, checkoutDict.checkoutTotal, checkoutDict.emailAddress)

        //Show conditional completion based on account status
        if(isUserTemporaryAccount) {
            $('#checkout-processing-text').fadeOut(200, () => {
                $('#checkout-complete-account-div').fadeIn().css('display', 'flex')
                checkoutCheckMark.style.display = 'block'
            })

        } else {
            $('#checkout-processing-text').fadeOut(200, () => {
                $('#checkout-complete-div').fadeIn().css('display', 'flex')
                checkoutCheckMark.style.display = 'block'
            })
        }
    })
}







//Braintree
braintree.client.create({
    authorization: 'production_bn2zwjst_yqykkqdtj5xvwh84'
    }, function (clientErr, clientInstance) {
    if (clientErr) {
        console.error(clientErr);
        return;
    }

    // This example shows Hosted Fields, but you can also use this
    // client instance to create additional components here, such as
    // PayPal or Data Collector.

    braintree.hostedFields.create({
        client: clientInstance,
        styles: {
            'input': {
                'font-size': '14px'
            },
            'input.invalid': {
                'color': '#ec7764'
            },
            'input.valid': {
                'color': '#addccb'
            }
        },
        fields: {
            cardholderName: {
                selector: '#card-name-field',
                placeholder: 'Name as it appears on your card'
            },
            number: {
                selector: '#credit-card-field',
                placeholder: '4111 1111 1111 1111'
            },
            cvv: {
                selector: '#cvc-field',
                placeholder: '###'
            },
            expirationDate: {
                selector: '#expiration-field',
                placeholder: 'MM/YYYY'
            }
        }
    }, function (hostedFieldsErr, hostedFieldsInstance) {
        if (hostedFieldsErr) {
            console.error(hostedFieldsErr);
            return;
        }

        placeOrderButton.addEventListener('click', function (event) {
            event.preventDefault();

            hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
                if (tokenizeErr) {
                    console.error(tokenizeErr);

                    return;
                } else {

                    if(checkForBillingInfoErrors()) {

                        var nonce = payload.nonce
                        var amount = checkoutDict.checkoutTotal
                        checkoutWithNonceAndAmount(nonce, amount)

                    } else {

                        showErrorMessage("There's an issue with your billing information")
                    }
                }
            });
        }, false);
    })
})

async function checkoutWithNonceAndAmount(nonce, amount) {
    var xhttp = new XMLHttpRequest();
    var herokuURL = "https://gametree-web.herokuapp.com/checkoutWithNonceAndAmount/"+nonce+"/"+amount
            
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
            var response = xhttp.responseText
            console.log(response)
            if(response == 'Declined') {
                showErrorMessage("Your financial institution declined your transaction")

            } else if(response.length != 8) {
                showErrorMessage("Something went wrong, please contact support")

            } else {
                console.log('Transaction Successful:' + response)
                submitOrderAndProcessPayment(response)
            }
        }
    }
    xhttp.open("GET", herokuURL, true);
    xhttp.send();

    return(xhttp.response)
}
