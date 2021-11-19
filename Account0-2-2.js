

//HTML Elements
const accountHeaderMain = document.getElementById('account-header-main')
const accountSignOutButton = document.getElementById('sign-out-button')

const upcomingOrdersArea = document.getElementById('upcoming-orders-area')
const usersProductsArea = document.getElementById('users-products-area')

const settingsName = document.getElementById('settings-name')
const settingsNumber = document.getElementById('settings-number')
const settingsPassword = document.getElementById('settings-password')
const settingsNameChange = document.getElementById('settings-name-change')
const settingsNumberChange = document.getElementById('settings-number-change')
const settingsPasswordChange = document.getElementById('settings-password-change')
const deliveryAddressesContainer = document.getElementById('delivery-addresses-container')
const addAddressButton = document.getElementById('add-address-button')
const deliveryCheckbox = document.getElementById('delivery-checkbox')
const promotionsCheckbox = document.getElementById('promotions-checkbox')

//Account Settings Modal
const closeSettingsModal = document.getElementById('close-settings-modal')
const settingsNameField = document.getElementById('settings-name-field')
const settingsNameButton = document.getElementById('settings-name-button')
const settingsNumberField = document.getElementById('settings-number-field')
const settingsNumberButton = document.getElementById('settings-number-button')
const changePasswordToggle = document.getElementById('change-password-toggle')
const changePasswordChevron = document.getElementById('change-password-chevron')
const changePasswordContainer = document.getElementById('change-password-container')
const currentPasswordField = document.getElementById('current-password-field')
const newPasswordField = document.getElementById('new-password-field')
const confirmNewPasswordField = document.getElementById('confirm-new-password-field')
const changePasswordButton = document.getElementById('change-password-button')
const passwordErrorBlock = document.getElementById('password-error-block')
const passwordErrorText = document.getElementById('password-error-text')

//Address Modal
const closeAddressModal = document.getElementById('close-address-modal')
const addressTitleField = document.getElementById('address-title-field')
const addressTitleError = document.getElementById('address-title-error')
const addressFirstField =  document.getElementById('address-first-field')
const addressLastField = document.getElementById('address-last-field')
const address1Field = document.getElementById('address-1-field')
const addressAddSecond = document.getElementById('address-add-second')
const address2Field = document.getElementById('address-2-field')
const addressCityField = document.getElementById('address-city-field')
const addressStateDropdown = document.getElementById('address-state-dropdown')
const addressStateDropdownText = document.getElementById('address-state-dropdown-text')
const addressStateDropdownChevron = document.getElementById('address-state-dropdown-chevron')
const addressStateDropdownOptions = document.getElementById('address-state-dropdown-options')
const addressZipcodeField = document.getElementById('address-zipcode-field')

const addressFirstError = document.getElementById('address-first-error')
const addressLastError = document.getElementById('address-last-error')
const address1Error = document.getElementById('address-1-error')
const addressCityError = document.getElementById('address-city-error')
const addressStateError = document.getElementById('address-state-error')
const addressZipcodeError = document.getElementById('address-zipcode-error')

const submitAddressButton = document.getElementById('submit-address-button')


//Customer Support and Referrals
const contactSupportButton = document.getElementById('contact-support-button')
const orderingTopicButton = document.getElementById('ordering-topic-button')
const billingTopicButton = document.getElementById('billing-topic-button')
const guaranteeTopicButton = document.getElementById('guarantee-topic-button')


//Event Listeners


//Global Variables
var database = firebase.firestore()

//Onload
window.onload = () => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            database.collection('users').doc(user.uid).get().then(function(doc) {
                let data = doc.data()

                loadAccountPage(user.uid, data)

                accountHeaderMain.innerHTML = `Welcome back, ${getFirstName(data.name)}`

                accountSignOutButton.addEventListener('click', () => {
                    firebase.auth().signOut().then(() => {
                        // Sign-out successful.
                      }).catch((error) => {
                        // An error happened.
                        console.log(error.message)
                      });
                })
            })
        } else {
            location.href = 'https://www.thegametree.io/login'
        }
    })
}



function loadAccountPage(userID, userData) {
    loadProductsAndOrders(userID, userData)
    loadAccountDetailsAndSettings(userID)

    loadSettingsModal(userID, userData)
    loadAddressModal(userID)
}




function loadProductsAndOrders(userID, userData) {
    while(upcomingOrdersArea.firstChild) {
        upcomingOrdersArea.removeChild(upcomingOrdersArea.firstChild)
    }
    
    while(usersProductsArea.firstChild) {
        usersProductsArea.removeChild(usersProductsArea.firstChild)
    }

    var hasUpcomingOrders = false
    var hasPastOrders = false

    database.collection('users').doc(userID).collection('orders').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            hasPastOrders = true

            var orderID = doc.id 
            var orderData = doc.data()

            if(orderData.orderStatus != 'delivered') {
                hasUpcomingOrders = true
                buildUpcomingOrder(orderID, orderData)
            }

            var orderItems = orderData.checkoutItems

            for (let item in orderItems) {
                if(orderItems.hasOwnProperty(item)) {
                    buildUsersProducts(orderID, orderItems[item], orderData.deliveredDate)
                }
            }
        })
    }).catch((error) => {
        //TODO: display no orders/products
        console.log("Error getting documents: ", error);
    });
}



function buildUpcomingOrder(orderID, orderData) {

    var firstProduct = orderData.checkoutItems[Object.keys(orderData.checkoutItems)[0]]
    const conditionDict = {
        'usedAcceptable' : 'Used - Acceptable',
        'usedGood' : 'Used - Good',
        'usedFantastic' : 'Used - Excellent',
        'new' : 'New'
    }


    const upcomingOrderContainer = createDOMElement('div', 'upcoming-order-container', 'none', upcomingOrdersArea)
    createDOMElement('div', 'account-order-header', `ORDER NUMBER: ${orderID}`, upcomingOrderContainer)
    createDOMElement('div', 'account-order-header', 'DELIVERY STATUS:', upcomingOrderContainer)
    switch (orderData.orderStatus) {
        case 'processing' :
            createDOMElement('div', 'order-processing-text', 'PROCESSING', upcomingOrderContainer)
            break;

        case 'in-transit' :
            createDOMElement('div', 'order-in-transit-text', 'IN TRANSIT', upcomingOrderContainer)
            break;

        case 'shipped' :
            createDOMElement('div', 'order-in-transit-text', 'SHIPPED', upcomingOrderContainer)
            break;

        case 'delivered' :
            createDOMElement('div', 'order-delivered-text', 'DELIVERED', upcomingOrderContainer)
            break
    }

    const upcomingOrderItemHeader = createDOMElement('div', 'upcoming-order-item-header', 'none', upcomingOrderContainer)
    createDOMElement('div', 'account-order-header', `item 1 of ${Object.keys(orderData.checkoutItems).length}`, upcomingOrderItemHeader)
    const showAllButton = createDOMElement('div', 'account-button-text', 'Show all', upcomingOrderItemHeader)
    showAllButton.setAttribute('onClick', `showAllItemsInOrder("${orderID}")`)

    const upcomingOrderItemBlock = createDOMElement('div', 'upcoming-order-item-block', 'none', upcomingOrderContainer)
    const upcomingOrderImage = createDOMElement('img', 'upcoming-order-image', 'none', upcomingOrderItemBlock)
    upcomingOrderImage.src = firstProduct.productImage
    const upcomingOrderItemTextContainer = createDOMElement('div', 'upcoming-order-item-text-container', 'none', upcomingOrderItemBlock)
    createDOMElement('div', 'account-order-product-title', firstProduct.productName, upcomingOrderItemTextContainer)
    createDOMElement('div', 'account-text-small', conditionDict[firstProduct.condition], upcomingOrderItemTextContainer)
    createDOMElement('div', 'account-text-small', `$${firstProduct.price}`, upcomingOrderItemTextContainer)

    const trackOrderButton = createDOMElement('div', 'track-order-button', 'TRACK ORDER', upcomingOrderContainer)
    if(orderData.status == 'shipped') {
        trackOrderButton.setAttribute('onClick', `showOrderTracking("${orderID}", "${orderData.shippingInfo.trackingProvider}")`)
    } else {
        trackOrderButton.setAttribute('onClick', `showOrderTracking("${orderID}")`)
    }

}

function buildUsersProducts(orderID, productData, deliveredDate) {

    const usersProductBlock = createDOMElement('div', 'users-product-block', 'none', usersProductsArea)
    const usersProductImage = createDOMElement('img', 'users-product-image', 'none', usersProductBlock)
    usersProductImage.src = productData.productImage 
    createDOMElement('div', 'users-product-title', productData.productName, usersProductBlock)

    if(deliveredDate) {
        const formattedDateObject = getFormattedDate(deliveredDate)
        const formattedDateStr = `Delivered on ${formattedDateObject[0]} ${formattedDateObject[1]}, ${formattedDateObject[2]}`
        createDOMElement('div', 'users-product-pending-text', formattedDateStr, usersProductBlock)
    } else {
        createDOMElement('div', 'users-product-pending-text', 'Pending Delivery', usersProductBlock)
    }

    usersProductBlock.setAttribute('onClick', `showUsersProductDetails("${orderID}")`)
}


function showOrderTracking(orderID, trackingURL) {
    //TODO: All of it
    if(orderStatus == 'shipped') {
        location.href = trackingURL
    } else {
        location.href = 'https://www.thegametree.io/track-delivery'
    }
}


function showAllItemsInOrder(orderID) {
    //TODO: All of it
    console.log(`Showing all items for order ${orderID}`)
}


function showUsersProductDetails(orderID) {
    //TODO: All of it
    console.log(`Showing product details ${orderID}`)
}




function loadAccountDetailsAndSettings(userID) {

    database.collection('users').doc(userID).onSnapshot( (doc) => {
        var userData = doc.data()

        settingsName.innerHTML = userData.name
        if (userData.phoneNumber) {
            settingsNumber.innerHTML = userData.phoneNumber
            settingsNumberField.value = userData.phoneNumber
        } else {
            settingsNumber.innerHTML = 'No number yet'
            settingsNumberField.value = 'No number yet'
        }
        settingsPassword.innerHTML = '***********'

        settingsNameField.value = userData.name

        buildUsersDeliveryAddresses(userID, userData)

        if(userData.isReceivingDeliveryUpdates) {
            deliveryCheckbox.innerHTML = ''
        } else {
            deliveryCheckbox.innerHTML = ''
        }

        if(userData.isReceivingPromotions) {
            promotionsCheckbox.innerHTML = ''
        } else {
            promotionsCheckbox.innerHTML = ''
        }
    })

    settingsNameChange.addEventListener('click', () => {
        $('#settings-modal').fadeIn().css('display', 'flex')
        resetChangePasswordFields()
    })

    settingsNumberChange.addEventListener('click', () => {
        $('#settings-modal').fadeIn().css('display', 'flex')
        resetChangePasswordFields()
    })

    settingsPasswordChange.addEventListener('click', () => {
        $('#settings-modal').fadeIn().css('display', 'flex')
        resetChangePasswordFields()
    })

    addAddressButton.addEventListener('click', () => {
        displayAddressModal(userID)
    })

    deliveryCheckbox.addEventListener('click', () => {
        database.collection('users').doc(userID).get().then( (doc) => {
            if (doc.data().isReceivingDeliveryUpdates) {
                return doc.ref.update( {'isReceivingDeliveryUpdates' : !doc.data().isReceivingDeliveryUpdates})
            } else {
                return doc.ref.update( {'isReceivingDeliveryUpdates' : true})
            }
        })
    })

    promotionsCheckbox.addEventListener('click', () => {
        database.collection('users').doc(userID).get().then( (doc) => {
            if (doc.data().isReceivingPromotions) {
                return doc.ref.update( {'isReceivingPromotions' : !doc.data().isReceivingPromotions})
            } else {
                return doc.ref.update( {'isReceivingPromotions' : true})
            }
        })
    })
}








function buildUsersDeliveryAddresses(userID, userData) {
    while(deliveryAddressesContainer.firstChild) {
        deliveryAddressesContainer.removeChild(deliveryAddressesContainer.firstChild)
    }

    var usersAddresses = userData.shippingAddress

    for (let address in usersAddresses) {
        if (usersAddresses.hasOwnProperty(address)) {
            var addressData = usersAddresses[address]

            var deliveryAddressBlock = createDOMElement('div', 'delivery-address-block', 'none', deliveryAddressesContainer)
            var deliveryAddressBlockLeft = createDOMElement('div', 'delivery-address-block-left', 'none', deliveryAddressBlock)
            createDOMElement('div', 'delivery-address-title', `${address}`, deliveryAddressBlockLeft)
            createDOMElement('div', 'account-text-small', `${addressData.firstName} ${addressData.lastName}`, deliveryAddressBlockLeft)
            if (addressData.address2 != "") {
                createDOMElement('div', 'account-text-small', `${addressData.address1}, ${addressData.address2}`, deliveryAddressBlockLeft)
            } else {
                createDOMElement('div', 'account-text-small', addressData.address1, deliveryAddressBlockLeft)
            }
            createDOMElement('div', 'account-text-small', `${addressData.city}, ${addressData.state} ${addressData.zipCode}`, deliveryAddressBlockLeft)

            var deliveryAddressBlockRight = createDOMElement('div', 'delivery-address-block-right', 'none', deliveryAddressBlock)
            var editAddressButton = createDOMElement('div', 'account-button-text', 'Edit', deliveryAddressBlockRight)
            editAddressButton.setAttribute('onClick', `displayAddressModal("${userID}", "${address}")`)
            var deleteAddressButton = createDOMElement('div', 'account-button-text', 'Delete', deliveryAddressBlockRight)
            deleteAddressButton.setAttribute('id', `${address}-delete-text`)
            deleteAddressButton.setAttribute('onClick', `toggleDeleteAddressDiv("${address}")`)

            var deleteAddressDiv = createDOMElement('div', 'account-delete-address-div', 'none', deliveryAddressBlockRight)
            deleteAddressDiv.style.display = 'none'
            deleteAddressDiv.setAttribute('id', `${address}-delete-address-div`)
            createDOMElement('div', 'account-address-delete-text', 'Are you sure?', deleteAddressDiv)
            var deleteAddressButtons = createDOMElement('div', 'account-delete-address-buttons', 'none', deleteAddressDiv)
            var cancelDeleteAddress = createDOMElement('div', 'account-address-delete-cancel', 'Cancel', deleteAddressButtons)
            cancelDeleteAddress.setAttribute('onClick', `toggleDeleteAddressDiv("${address}")`)
            var accountAddressDeleteButton = createDOMElement('div', 'account-address-delete-button', 'Delete', deleteAddressButtons)
            accountAddressDeleteButton.setAttribute('onClick', `deleteUsersAddress("${userID}", "${address}")`)
        }
    }
}




//Modals____________________________________________________________________________________________________________________________________________
function loadAddressModal(userID) {
    resetAddressErrorFields()

    //Set Intial State
    addressAddSecond.addEventListener('click', () => {
        $('#address-add-second').fadeOut(200, () => {
            $('#address-2-field').fadeIn()
        })
    })

    closeAddressModal.addEventListener('click', () => {
        $('#address-modal').fadeOut()
    })

    //Instantiate State Dropdown
    const stateOptions = [ "AK","AL","AR","AS","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID","IL",
    "IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM",
    "NV","NY","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"]

    addressStateDropdownOptions.style.display = 'none'

    while(addressStateDropdownOptions.firstChild) {
        addressStateDropdownOptions.removeChild(addressStateDropdownOptions.firstChild)
    }
    addressStateDropdown.addEventListener('click', () => {
        if(addressStateDropdownOptions.style.display == 'none') {
            $('#address-state-dropdown-options').fadeIn()
        } else {
            $('#address-state-dropdown-options').fadeOut(200, () => {
                addressStateDropdownOptions.style.display = 'none'
            })
        }
    })

    stateOptions.forEach( (state) => {
        let shippingStateOption = document.createElement('div')
        shippingStateOption.className = 'dropdown-option'
        shippingStateOption.innerHTML = state
        shippingStateOption.addEventListener('click', () => {
            addressStateDropdownText.innerHTML = state
            $('#address-state-dropdown-options').fadeOut()
            addressStateDropdownChevron.className = 'dropdown-button-chevron-right'
        })
        addressStateDropdownOptions.appendChild(shippingStateOption)
    })

    //Submit changes

    submitAddressButton.addEventListener('click', () => {
        if(checkForAddressErrors()) {

            var addressUpdateDict = {
                'firstName' : addressFirstField.value,
                'lastName' : addressLastField.value,
                'address1' : address1Field.value,
                'address2' : address2Field.value,
                'city' : addressCityField.value,
                'state' : addressStateDropdownText.innerHTML,
                'zipCode' : addressZipcodeField.value
            }

            var updateDict = {}
            updateDict[`shippingAddress.${addressTitleField.value}`] = addressUpdateDict

            database.collection('users').doc(userID).update(updateDict).then( () => {
                $('#address-modal').fadeOut()
            })
        }
    })
}

function displayAddressModal(userID, address) {
    $('#address-modal').fadeIn().css('display', 'flex')

    if(address) {
        database.collection('users').doc(userID).get().then( (doc) => {
            var addressData = doc.data().shippingAddress[address]

            addressTitleField.value = address
            addressFirstField.value = addressData.firstName 
            addressLastField.value = addressData.lastName 
            address1Field.value = addressData.address1 
            if(addressData.address2) {
                address2Field.style.display = 'block'
                address2Field.value = addressData.address2
            } else {
                address2Field.style.display = 'none'
                address2Field.value = ''
            }
            addressCityField.value = addressData.city 
            addressStateDropdownText.innerHTML = addressData.state 
            addressZipcodeField.value = addressData.zipCode 
        })

    } else {
        addressFirstField.value = '' 
        addressLastField.value = ''
        address1Field.value = ''
        address2Field.style.display = 'none'
        address2Field.value = ''
        addressCityField.value = ''
        addressStateDropdownText.innerHTML = '--'
        addressZipcodeField.value = ''
    }

}




//Helper functions
function checkForAddressErrors() {
    resetAddressErrorFields()

    if (addressTitleField.value == '') {
        addressTitleField.className = 'checkout-input-field-error w-input'
        addressTitleError.style.display = 'flex'
        return false

    } else if (addressFirstField.value == '') {
        addressFirstField.className = 'checkout-input-field-error w-input'
        addressFirstError.style.display = 'flex'
        return false

    } else if (addressLastField.value == '') {
        addressLastField.className = 'checkout-input-field-error w-input'
        addressLastError.style.display = 'flex'
        return false

    } else if (address1Field.value == '') {
        address1Field.className = 'checkout-input-field-error w-input'
        address1Error.style.display = 'flex'
        return false

    } else if (addressCityField.value == '') {
        addressCityField.className = 'checkout-input-field-error w-input'
        addressCityError.style.display = 'flex'
        return false

    } else if (addressStateDropdownText.innerHTML == '--') {
        addressStateDropdown.className = 'checkout-state-dropdown-error'
        addressStateError.style.display = 'flex'
        return false

    } else if (addressZipcodeField.value == '') {
        addressZipcodeField.className = 'checkout-input-field-error w-input'
        addressZipcodeError.style.display = 'flex'
        return false
    } else {
        return true
    }   
}


function resetAddressErrorFields() {
    const errorMessages = [addressTitleError, addressFirstError, addressLastError, address1Error, addressCityError, addressStateError, addressZipcodeError]
    const inputFields = [addressTitleField, addressFirstField, addressLastField, address1Field, addressCityField, addressZipcodeField]

    errorMessages.forEach( (errorMessage) => {
        errorMessage.style.display = 'none'
    })

    inputFields.forEach( (inputElement) => { 
        inputElement.className = 'checkout-input-field w-input'
    })

    addressStateError.style.display = 'none'
    addressStateDropdown.className = 'checkout-state-dropdown'

}


function toggleDeleteAddressDiv(address) {
    var deleteAddressDiv = document.getElementById(`${address}-delete-address-div`)

    if(deleteAddressDiv.style.display == 'none') {
        $(`#${address}-delete-text`).fadeOut(200, () => {
            $(`#${address}-delete-address-div`).fadeIn()
        })
    } else {
        $(`#${address}-delete-address-div`).fadeOut(200, () => {
            $(`#${address}-delete-text`).fadeIn()
            deleteAddressDiv.style.display = 'none'
        })
    }
}

function deleteUsersAddress(userID, address) {
    var updateDict = {}
    updateDict[`shippingAddress.${address}`] = firebase.firestore.FieldValue.delete()

    database.collection('users').doc(userID).update(updateDict)
}














function loadSettingsModal(userID) {
    resetChangePasswordFields()

    closeSettingsModal.addEventListener('click', () => {
        $('#settings-modal').fadeOut()
    })

    settingsNameButton.style.display = 'none'
    settingsNameField.onfocus = () => {
        $('#settings-name-button').fadeIn()
    }

    settingsNameButton.addEventListener('click', () => {
        database.collection('users').doc(userID).update({'name' : settingsNameField.value})
        $('#settings-name-button').fadeOut()
        $('#settings-modal').fadeOut()
    })

    settingsNumberButton.style.display = 'none'
    settingsNumberField.onfocus = () => {
        $('#settings-number-button').fadeIn()
    }

    settingsNumberButton.addEventListener('click', () => {
        database.collection('users').doc(userID).update({'phoneNumber' : settingsNumberField.value})
        $('#settings-number-button').fadeOut()
        $('#settings-modal').fadeOut()
    })

    changePasswordContainer.style.display = 'none'
    changePasswordToggle.addEventListener('click', () => {
        if(changePasswordContainer.style.display == 'none') {
            $('#change-password-container').fadeIn()
        } else {
            $('#change-password-container').fadeOut(200, () => {
                changePasswordContainer.style.display = 'none'
            })
        }
    })

    changePasswordButton.addEventListener('click', () => {
        if(verifyPasswordFields()) {
            //Reauthenticate user
            var user = firebase.auth().currentUser
            var credential = firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, currentPasswordField.value )

            user.reauthenticateWithCredential(credential).then(function() {
                // User re-authenticated.
                console.log('successfully reauthenticated')

                user.updatePassword(newPasswordField.value).then(() => {
                    // Update successful.
                    $('#settings-modal').fadeOut()
                    resetChangePasswordFields()

                  }).catch((error) => {
                    passwordErrorText.innerHTML = "Something went wrong. Please try again later or contact support"
                  });

            }).catch(function(error) {
                console.log(error)
                console.log(error.message)
                $('#password-error-block').fadeIn()
                passwordErrorText.innerHTML = "Your current password is incorrect"
            });
        }
    })
}

function resetChangePasswordFields() {
    changePasswordContainer.style.display = 'none'
    
    passwordErrorBlock.style.display = 'none'

    currentPasswordField.value = ''
    newPasswordField.value = ''
    confirmNewPasswordField.value = ''
}


function verifyPasswordFields() {
    if (currentPasswordField.value == '') {
        $('#password-error-block').fadeIn()
        passwordErrorText.innerHTML = "Please verify your current password"
        return false
        
    } else if (newPasswordField.value == '') {
        $('#password-error-block').fadeIn()
        passwordErrorText.innerHTML = "Please enter a new password"
        return false

    } else  if (confirmNewPasswordField.value == '') {
        $('#password-error-block').fadeIn()
        passwordErrorText.innerHTML = "Please confirm your new password"
        return false

    } else if(newPasswordField.value != confirmNewPasswordField.value) {
        $('#password-error-block').fadeIn()
        passwordErrorText.innerHTML = "Your passwords don't match"
        return false
    } else {
        return true
    }
}

