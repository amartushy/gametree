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




//Helper functions
function downloadProductsCSV() {
    const rows = [
        ["ProductID", "Product Name", "Platform(s)", "URL"]
    ];
    database.collection('catalog').get().then( (querySelector) => {
        querySelector.forEach ( (doc) => {
            var data = doc.data()
            var productRow = [doc.id, data.general.productName, data.platform, doc.id]
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
