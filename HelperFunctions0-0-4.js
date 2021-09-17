function showErrorMessage(message) {
    var errorMessageDiv = document.getElementById('error-message')
    errorMessageDiv.innerHTML = message

    $('#error-message').fadeIn().delay(5000).fadeOut("slow")
}

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

function getFirstName(name) {
    let nameArray = name.split(' ')
    return(nameArray[0])
}

function getCurrentMonthAndYear() {
    var currentDate = new Date()
    var currentMonth = currentDate.getMonth()
    var currentYear = currentDate.getFullYear()
    return [currentYear, currentMonth]
}

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate()
}

function firstDayOfMonth(year, month) {
    var firstDate = new Date(year, month, 1)
    return firstDate.getDay()
}

//Notification Functions
function sendSMSTo(number, message) {
	var xhttp = new XMLHttpRequest();
    
    if (number.substring(0,2) == '+1'){
        var herokuURL = "https://gametree-web.herokuapp.com/sendSMSTo/"+number+"/"+message
    } else {
        var herokuURL = "https://gametree-web.herokuapp.com/sendSMSTo/+1"+number+"/"+message
    }

	xhttp.open("GET", herokuURL, true);
	xhttp.send();
}
