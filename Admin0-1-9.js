//HTML Elements

//Global Variables
var database = firebase.firestore()


//Event listeners and onclicks

//Window onload


window.onload = function() {
	document.getElementById('pop-nav').addEventListener('click', () => {
        location.href = 'https://thegametree.io/admin/proof-of-purchase'
    })

    document.getElementById('purchases-nav').addEventListener('click', () => {
        location.href = 'https://thegametree.io/admin/purchases'
    })
    document.getElementById('orders-button').addEventListener('click', () => {
        location.href = 'https://thegametree.io/admin/orders'
    })
	
    document.getElementById('inventory-management').addEventListener('click', () => {
        location.href = 'https://thegametree.io/admin/inventory'
    })

    document.getElementById('add-to-cms-button').addEventListener('click', () => {
        downloadProductsCSV()
    })

    document.getElementById('logout-button').addEventListener('click', () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
            console.log(error.message)
          });
    })
	
    document.getElementById('account-button').addEventListener('click', () => {
        location.href = 'https://thegametree.io/account'
    })
	
	firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            firebase.firestore().collection('users').doc(user.uid).get().then(function(doc) {
                let data = doc.data()
                if(data.isAdmin) {    
                    console.log('User is an admin, loading page')
                    document.getElementById('admin-nav-main-header').innerHTML = 'Welcome Back, ' + getFirstName(data.name)
                } else {
                    location.href = 'https://wwww.thegametree.io/'
                }
            })
        } else {
            location.href = 'https://www.thegametree.io/login'
        }
    })
}


var updateSalePrices = document.getElementById('update-sale-prices')
updateSalePrices.addEventListener('click', () => {

    database.collection('catalog').get().then( (querySelector) => {
        querySelector.forEach ( (doc) => {
            var data = doc.data()
            var GTIN = doc.id
            var xhttp = new XMLHttpRequest();
            var priceChartingID = parseFloat(data.priceChartingID)
            var priceChartingURL = `https://www.pricecharting.com/api/product?t=bfbc03c208d61fe8f866557924aa5f0e9e05d3eb&id=${priceChartingID}`
        
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState == XMLHttpRequest.DONE) {
                    var response = JSON.parse(xhttp.responseText)

                    var baseSellPrice = roundToNearestCent( response['cib-price'] )

                    var purchaseMultiplier
                    if ( data.category == 'Consoles' ) {
                        //30% discount for consoles
                        purchaseMultiplier = 70
                    } else {

                        //45% discount for games, headsets, etc
                        purchaseMultiplier = 55
                    }

                    var basePurchasePrice = roundToNearestCent( baseSellPrice * purchaseMultiplier )

                    var pricingDict = {
                        'purchasePrices' : {
                            'new' : roundToNearestCent( response['new-price'] * purchaseMultiplier / 100 ),
                            'usedExcellent' : basePurchasePrice,
                            'usedGood' : roundToNearestCent( basePurchasePrice * 95 ),
                            'usedAcceptable' : roundToNearestCent( basePurchasePrice * 90 ),
                            'loose' : roundToNearestCent(response['loose-price'] * purchaseMultiplier / 100 ),
                        },

                        'salePrices' : {
                            'new' : roundToNearestCent(response['new-price'] ),
                            'usedExcellent' : baseSellPrice,
                            'usedGood' : roundToNearestCent( baseSellPrice * 95 ),
                            'usedAcceptable' : roundToNearestCent( baseSellPrice * 90 ),
                            'loose' : roundToNearestCent(response['loose-price'] ),
                        }
                    }
                    database.collection('catalog').doc(GTIN).update(pricingDict)
                }
            }
            xhttp.open("GET", priceChartingURL, true);
            xhttp.send();
        })
    })
})



//Helper functions
function downloadProductsCSV() {
    const rows = [
        ["Product Name", "GTIN", 'Pricecharting ID', "Platform", "Webflow URL", 'Product Image',]
    ];
    database.collection('catalog').get().then( (querySelector) => {
        querySelector.forEach ( (doc) => {
            var data = doc.data()
            var productRow = [data.productName, doc.id, data.priceChartingID, doc.platform, doc.id, data.productImage]
            rows.push(productRow)
        })

        let csvContent = "data:text/csv;charset=utf-8,";
    
        rows.forEach(function(rowArray) {
            let row = rowArray.join(",");
            csvContent += row + "\r\n";
        });

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "products.csv");
        document.body.appendChild(link); // Required for FF

        link.click(); // This will download the data file named "my_data.csv".
    })
}



function roundToNearestCent(price) {
    //Check if price is less than 25 Cents
    if(isNaN(price)) {
        return 'N/A'

    } else if (price < 25) {
        return 0.49

    //Price is valid, round to nearest .49 or .99
    } else {
        return Math.round( price / 100 * 2 )/2 - 0.01
    }
}








// let uploadCSV = document.getElementById('csvUpload');
// uploadCSV.addEventListener('change', function() {

//     if (this.files && this.files[0]) {
  
//         var myFile = this.files[0];
//         var reader = new FileReader();
        
//         reader.addEventListener('load', function (e) {
            
//             let csvdata = e.target.result; 
//             readCSV(csvdata); // calling function for parse csv data 
//         });
        
//         reader.readAsBinaryString(myFile);
//     }
// })


// document.getElementById('update-purchases').addEventListener('click', () => {
//     uploadCSV.click()
// })



// /*------- Method for parse csv data and display --------------*/
// function readCSV(data) {

//     let parsedata = [];

//     let newLinebrk = data.split("\n");
//     for(let i = 0; i < newLinebrk.length; i++) {
//         var itemArray = newLinebrk[i].split(",")

//         var purchaseID = String(itemArray[1]).substring(0,8)

//         var itemDict = {
//             'ebayTitle' : itemArray[0],
//             'status': 'active'
//         }
//         var updateDict = {}
//         updateDict[`items.${createID(4)}`] = itemDict
//         console.log(purchaseID)
//         if(purchaseID && purchaseID != 'NO LABEL') {
//             database.collection('purchases').doc(purchaseID).update(updateDict)
//         }
//     }
// }


  
// var updateDatabase = document.getElementById('update-database')
// updateDatabase.addEventListener('click', () => {
//     database.collection('purchases').get().then( (querySelectorAll) => {
//         querySelectorAll.forEach( (purchase) => {
//             var ID = purchase.id
//             database.collection('purchases').doc(ID).update( {'items' : {}})
//         })
//     })
// })
