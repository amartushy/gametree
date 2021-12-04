
   
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
        ["Product Name", "GTIN", 'Pricecharting ID', "Platform", "Category", "Webflow URL", 'Product Image', 'Product Price']
    ];
    database.collection('catalog').get().then( (querySelector) => {
        querySelector.forEach ( (doc) => {
            var data = doc.data()
            var productRow = [data.productName, doc.id, data.priceChartingID, data.platform, data.category, doc.id, data.productImage, data.salePrices.usedExcellent]
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






document.getElementById('update-purchases').addEventListener('click', () => {
    uploadCSV.click()
})


let uploadCSV = document.getElementById('csvUpload');
uploadCSV.addEventListener('change', function() {

    if (this.files && this.files[0]) {
  
        var myFile = this.files[0];
        var reader = new FileReader();
        
        reader.addEventListener('load', function (e) {
            
            let csvdata = e.target.result; 
            readCSV(csvdata); // calling function for parse csv data 
        });
        
        reader.readAsBinaryString(myFile);
    }
})



/*------- Method for parse csv data and display --------------*/
function readCSV(data) {

    let newLinebrk = data.split("\n");

    var purchaseUpdateDict = {}
    var inventoryUpdateDict = {}

    //Loop through all rows in csv
    for(let i = 1; i < newLinebrk.length; i++) {
        var itemArray = newLinebrk[i].split(",")

        //Add item to purchase dict
        var purchaseID = String(itemArray[1]).substring(0,8)
        var subID = createID(4)
        var itemID = purchaseID + '-' + subID

        var purchaseData = {
            'GTIN' : itemArray[2],
            'condition' : itemArray[4],
            'productTitle' : itemArray[0],
            'purchasePrice' : 0,
            'revenue' : 0,
            'status' : 'active'
        }

        if (purchaseID in purchaseUpdateDict) {
            purchaseUpdateDict[purchaseID][itemID] = purchaseData
        } else {
            purchaseUpdateDict[purchaseID] = {}
            purchaseUpdateDict[purchaseID][itemID] = purchaseData
        }



        //Add item to inventory dict
        var inventoryData = {
            'GTIN' : itemArray[2],
            'condition' : itemArray[4],
            'platformSold' : '',
            'productImage' : '',
            'productTitle' : itemArray[0],
            'purchaseDate' : 'UNKNOWN',
            'purchaseID' : 'UNKNOWN',
            'purchasePrice' : 0,
            'revenue' : 0,
            'sellingFees' : 0,
            'shippingFees' : 0,
            'sold' : 0,
            'status' : 'active',
            'taxes' : 0
        }
    
        inventoryUpdateDict[itemID] = inventoryData 
    }

    //Loop through all keys in purchaseDict and update purchase collection, if applicable
    for (var purchaseID in purchaseUpdateDict) {
        if (purchaseUpdateDict.hasOwnProperty(purchaseID)) {

            if(purchaseID != 'NO LABEL') {
                var itemsArray = purchaseUpdateDict[purchaseID]


                for (var itemID in itemsArray) {
                    if (itemsArray.hasOwnProperty(itemID)) {
            
                        var itemData = itemsArray[itemID]

                        database.collection('purchases').doc(purchaseID).collection('items').doc(itemID).set(itemData).catch((error) => {

                            console.error("Error updating document: ", error);
                            console.log('No Purchase ID: ', purchaseID)
                        })
                    }
                }
            }
        }
    }



    //Loop through all keys in inventoryDict and update inventory collection + catalog availability
    for (var itemID in inventoryUpdateDict) {
        if (inventoryUpdateDict.hasOwnProperty(itemID)) {

            var itemUpdateDict = inventoryUpdateDict[itemID]

            //Update Inventory Collection with inventoryData
            database.collection('inventory').doc(itemID).set(itemUpdateDict).catch((error) => {

                console.error("Error updating document: ", error);
                console.log('No Purchase ID: ', purchaseID)
            });

            var condition = itemUpdateDict.condition
            var updateDict = {}
            updateDict[`availability.${itemID}`] = condition

            //Update Catalog with item availability/condition
            database.collection('catalog').doc(itemUpdateDict.GTIN).update(updateDict).catch( function(error) {
                console.log(error)
            })
        }
    }
}


// const updateInventoryButton = document.getElementById('update-inventory')
// updateInventoryButton.addEventListener('click', () => {
//     updateInventory()
// })

function updateInventory() {
    database.collection("purchases").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            var purchaseDate = doc.data().time

            database.collection("purchases").doc(doc.id).collection('items').get().then((query) => {
                query.forEach((item) => {
                    var data = item.data()

                    var inventoryData = {
                        'GTIN' : data.GTIN,
                        'condition' : data.condition,
                        'platformSold' : '',
                        'productImage' : '',
                        'productTitle' : data.productTitle,
                        'purchaseDate' : purchaseDate,
                        'purchaseID' : doc.id,
                        'purchasePrice' : data.purchasePrice,
                        'revenue' : 0,
                        'sellingFees' : 0,
                        'shippingFees' : 0,
                        'sold' : 0,
                        'status' : 'active',
                        'taxes' : 0
                    }

                    database.collection('inventory').doc(item.id).set(inventoryData)

                });
            })
        });
    });
}




var updateAvailabilityButton = document.getElementById('update-catalog')
updateAvailabilityButton.addEventListener('click', () => {
    updateAvailability()
})


function updateAvailability() {
    // database.collection('inventory').get().then((querySnapshot) => {
    //     querySnapshot.forEach( (item) => {

    //         var condition = item.data().condition
    //         var updateDict = {}
    //         updateDict[`availability.${item.id}`] = condition


    //         database.collection('catalog').doc(item.data().GTIN).update(updateDict).catch( function(error) {
    //             console.log(error)
    //         })
    //     })
    // })

    database.collection('catalog').get().then((querySnapshot) => {
        querySnapshot.forEach( (item) => {

            checkAndUpdateProductAvailability(item.id)

            // var updateDict = {}
            // updateDict[`availability`] = {}

            // database.collection('catalog').doc(item.id).update(updateDict).catch( function(error) {
            //     console.log(error)
            // })
        })
    })
}
