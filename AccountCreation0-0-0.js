//User Account Creation Screen

window.onload = function() {
    loadUserAccountInitialState()
};


let userFieldsScreen = document.getElementById('user-fields-screen')
let userNameField = document.getElementById('user-name-field')
let userEmailField = document.getElementById('user-email-field')
let userPasswordField = document.getElementById('user-password-field')
let userConfirmField = document.getElementById('user-confirm-field')
let userContinueButton = document.getElementById('user-continue-button')

let userProcessingScreen = document.getElementById('user-processing-screen')
let userProcessingText = document.getElementById('user-processing-text')
let userConfirmationText = document.getElementById('user-confirmation-text')
let userConfirmationCheck = document.getElementById('user-confirmation-check')

var userAccountDict = {
    'name' : '',
    'email' : '',
    'dateCreated' : 0,
    'referralCode' : '',
    'isAdmin' : false
}


userContinueButton.addEventListener('click', () => {
    if ( userNameField.value == '' ) {
        showErrorMessage('Please enter your name')

    } else if ( userEmailField.value == '' ) {
        showErrorMessage('Please enter an email for your account')

    } else if ( userPasswordField.value == '' ) {
        showErrorMessage('Please enter a valid password')

    } else if ( userConfirmField.value == '' ) {
        showErrorMessage('Please confirm your password') 

    } else if ( userPasswordField.value != userConfirmField.value ) {
        showErrorMessage('Your passwords do not match')

    } else {
        createUserAccount()
    }
})

function loadUserAccountInitialState() {
    userFieldsScreen.style.display = 'flex'

    userProcessingScreen.style.display = 'none'
    userProcessingText.style.display = 'flex'
    userConfirmationText.style.display = 'none'
    userConfirmationCheck.style.display = 'none'
}
function loadUserAccountConfirmationState() {
    userFieldsScreen.style.display = 'none'

    userProcessingScreen.style.display = 'flex'
    userProcessingText.style.display = 'none'
    userConfirmationText.style.display = 'flex'
    userConfirmationCheck.style.display = 'flex'
}

function createUserAccount() {

    userAccountDict['name'] = userNameField.value
    userAccountDict['email'] = userEmailField.value
    
    var database = firebase.firestore()

    userAccountDict['referralCode'] = getFirstName(userNameField.value) + appendRandomLetters()

    firebase.auth().createUserWithEmailAndPassword(userEmailField.value, userPasswordField.value).then(function(data) {
        //Create User Account
        var newUserID = data.user.uid
        database.collection("users").doc(newUserID).set(userAccountDict)
            .then(function() {
                console.log("User doc written")

                loadUserAccountConfirmationState()
                setTimeout(function () {
                    location.href = "https://thegametree.io/proof-of-purchase"
                 }, 1500)

            }).catch(function(error) {
                showErrorMessage(error.message)
        })
    })
    .catch(function(error) {
        loadUserAccountInitialState()
        showErrorMessage(error.message)
        console.log(error)
    });
}


//Helper functions

function showErrorMessage(message) {
    var errorMessageDiv = document.getElementById('user-error-message')
    errorMessageDiv.innerHTML = message

    $('#user-error-message').fadeIn().delay(10000).fadeOut("slow")
}


function appendRandomLetters() {
    var result =''
    var characters = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
    var charactersLength = characters.length
    
    for (i = 0; i < 3; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

function getFirstName(fullName) {
    let nameArray = fullName.split(" ")
    let firstName = nameArray[0]
    return firstName
}
