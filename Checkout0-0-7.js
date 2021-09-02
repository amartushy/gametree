


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
const guestCheckoutScreen = document.getElementById('guest-checkout-screen')
const orderSummaryItemsContainer = document.getElementById('order-summary-items-container')
const orderSubtotal = document.getElementById('order-subtotal')
const orderShippingPrice = document.getElementById('order-shipping-price')
const orderTax = document.getElementById('order-tax')
const orderTotal = document.getElementById('order-total')

//Delivery Screen
const orderDeliveryFormBlock = document.getElementById('order-delivery-form-block')
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
var useShippingAddressForBilling = true

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
        'paymentMethod' : ''
}





window.onload = () => {

    //TODO: Check if user is logged in
    checkoutLoginScreen.style.display = 'flex'
    guestCheckoutScreen.style.display = 'none'

    guestLoginButton.addEventListener('click', () => {
        console.log('called')
        loadGuestCheckoutInitialState()
    })
}

function loadGuestCheckoutInitialState() {
    loadDropdownInitialStates()
    resetDeliveryInfoErrorFields()
    resetBillingInfoErrorFields()

    //TODO: Load order summary from cart

    $('#checkout-login-screen').fadeOut(200, () => {
        $('#guest-checkout-screen').fadeIn()
    })

    orderDeliveryFormBlock.style.display = 'block'
    orderPaymentFormBlock.style.display = 'none'
    
    paymentOptionsContainer.style.display = 'none'
    shippingAddressSecondField.style.display = 'none'
    biillingAddressSecond.style.display = 'none'


    //Navigation and onClicks
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
            checkoutDict.shippingAddress.firstName = shippingFirstNameField.value
            checkoutDict.shippingAddress.lastName = shippingLastNameField.value
            checkoutDict.shippingAddress.address1 = shippingAddressField.value
            checkoutDict.shippingAddress.address2 = shippingAddressSecondField.value
            checkoutDict.shippingAddress.city = shippingCityField.value
            checkoutDict.shippingAddress.state = shippingStateDropdownText.innerHTML
            checkoutDict.shippingAddress.zipCode = shippingZipField.value
            checkoutDict.emailAddress = contactEmailField.value
            checkoutDict.phoneNumber = contactPhoneField.value

            displayAndUpdateBillingAddress()

            $('#order-delivery-form-block').fadeOut(200, () => {
                $('#order-payment-form-block').fadeIn()
            })

        } else {
            showErrorMessage('Error with delivery information')
        }
    })

    orderPaymentBack.addEventListener('click', () => {
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
        if (billingAddressContainer.style.display == 'none') {
            $('#billing-address-container').fadeIn()
        } else {
            $('#billing-address-container').fadeOut()
        }
    })

    billingAddressAddSecond.addEventListener('click', () => {
        $('#billing-address-add-second').fadeOut(200, () => {
            $('#billing-address-second').fadeIn()
        })
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

