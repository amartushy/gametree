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
    'dateCreated' : new Date() / 1000,
    'referralCode' : '',
    'isAdmin' : false,
    'isReceivingDeliveryUpdates' : false,
    'isReceivingPromotions' : false,
    'availableBalance' : 0
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

    userAccountDict['referralCode'] = getFirstName(userNameField.value) + appendRandomLetters()

    var database = firebase.firestore()

    //Check if user is anonymous
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in
            var userID = user.uid;
            database.collection('users').doc(userID).get().then( (doc) => {
                var data = doc.data()

                
                if(data.isAnonymous) {
                    //User is anonymous, convert to permanent account
                    var credential = firebase.auth.EmailAuthProvider.credential(userAccountDict.email, userPasswordField.value);

                    firebase.auth().currentUser.linkWithCredential(credential).then((usercred) => {
                        var user = usercred.user;

                        database.collection("users").doc(user.uid).set(userAccountDict, { 'merge' : true }).then(function() {
                            console.log("Anonymous account created")
            
                            loadUserAccountConfirmationState()
                            setTimeout(function () { location.href = "https://thegametree.io/account" }, 1500)
        
                        }).catch(function(error) {
                            showErrorMessage(error.message)
                        })

                    }).catch((error) => {
                        console.log("Error upgrading anonymous account", error);
                    });

                } else {
                    //User has account and is signed in, redirect to account page
                    location.href = 'https://thegametree.io/account'
                }
            })

        } else {

            //User is not logged in and not anonymous, do regular account creation
            firebase.auth().createUserWithEmailAndPassword(userEmailField.value, userPasswordField.value).then(function(data) {

                var newUserID = data.user.uid
                database.collection("users").doc(newUserID).set(userAccountDict)
                    .then(function() {
                        console.log("User doc written")
        
                        loadUserAccountConfirmationState()
                        setTimeout(function () { location.href = "https://thegametree.io/account" }, 1500)

        
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
