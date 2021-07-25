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
