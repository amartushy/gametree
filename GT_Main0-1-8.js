//Load Cart Button and Total
var cartButton = document.getElementById('main-cart-button')
var cartTotal = document.getElementById('cart-total')
cartTotal.style.display = 'none'

cartButton.addEventListener('click', () => {
  location.href = 'https://www.thegametree.io/shop/cart'
})


//Check if user is an admin, load admin header option
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

        beginListeningForUpdates(user.uid)

        firebase.firestore().collection('users').doc(user.uid).get().then( (doc) => {
            var isAdmin = doc.data().isAdmin
            if(isAdmin) {
    
                var adminNavElement = document.getElementById("admin-nav-element");
                console.log(adminNavElement)
                if(adminNavElement) {
                    adminNavElement.style.display = 'flex'
                } else {
                    console.log('no element')
                }
            }
        })

    } else {
        //No authenticated user, hide cart items icon
        console.log('No user logged in')
    }
})

function beginListeningForUpdates(userID) {
    console.log('listening')
    console.log(userID)
    
    firebase.firestore().collection('users').doc(userID).onSnapshot( (doc) => {
        let data = doc.data()

        //Update Cart Icon
        var cartItems = data.cart
        console.log(cartItems)
        if(cartItems.length > 0 ) {
            cartTotal.style.display = 'flex'
            cartTotal.innerHTML = cartItems.length
        } else {
            cartTotal.style.display = 'none'
        }

    })
}


//Disable header form
$('#header-search-form').submit(function() {
    return false;
});


//Header Search Field
const headerAutocompleteResults = document.getElementById('header-autocomplete-results')
headerAutocompleteResults.style.display = 'none'

//Algolia  
const searchClient = algoliasearch('EXJJGW7VTC', '6253027161abf2af452a4c3551a7d6ab');

const headerSearch = instantsearch({
    indexName: 'products_gametree',
    searchClient,
    getSearchParams() {
        return {
          hitsPerPage: 10,
        }
    }
});

function createAutocompleteResults(results) {
    console.log(results)

    let hitsContainer = document.createElement('div')
    hitsContainer.className = 'header-autocomplete-results'

    if(results.hits.length != 0) {
        for (i = 0; i < (results.hits.length < 5 ? results.hits.length : 5); i++) {

            var hit = results.hits[i]
    
            let headerAutocompleteResult = document.createElement('div')
            headerAutocompleteResult.className = 'header-autocomplete-result'
            headerAutocompleteResult.setAttribute('onClick', `openProductPage("${hit.objectID}")`)
            hitsContainer.appendChild(headerAutocompleteResult)
    
            let headerResultImage = createDOMElement('img', 'header-result-image', 'none', headerAutocompleteResult)
            headerResultImage.src = hit.productImage
    
            let headerResultInfoDiv = createDOMElement('div', 'header-result-info-div', 'none', headerAutocompleteResult)
            createDOMElement('div', 'header-result-title', hit.general.productName, headerResultInfoDiv)
            createDOMElement('div', 'header-result-price','$' + hit.salePrices.usedFantastic, headerResultInfoDiv)
    
            if (i != 4) {
                createDOMElement('div', 'header-autocomplete-divider', 'none', hitsContainer)
            }
        }
    } else {
        headerAutocompleteResults.style.display = 'none'
    }

    return hitsContainer.outerHTML
}

// Create the render function
const headerRenderAutocomplete = (renderOptions, isFirstRender) => {
  const { indices, currentRefinement, refine, widgetParams } = renderOptions;

  if (isFirstRender) {
    const input = document.querySelector('#product-search-field');

    input.addEventListener('input', event => {
        refine(event.currentTarget.value);

        if(headerAutocompleteResults.style.display == 'none') {
            $('#header-autocomplete-results').fadeIn(200).css('display', 'block')
        }

        if(event.currentTarget.value == '') {
            $('#header-autocomplete-results').fadeOut(200)
        }
    });
  }

  document.querySelector('#product-search-field').value = currentRefinement;
  widgetParams.container.innerHTML = indices
    .map(createAutocompleteResults)
    .join('');
};

// Create the custom widget
const headerCustomAutocomplete = instantsearch.connectors.connectAutocomplete(
    headerRenderAutocomplete
);

// Instantiate the custom widget
headerSearch.addWidgets([
    
    headerCustomAutocomplete({
    container: document.querySelector('#header-autocomplete-results'),
  })
  
]);

headerSearch.start()


function headerOpenProductPage(productID) {

    var lowerCaseID = productID.toLowerCase()
  
    location.href = `https://www.thegametree.io/products/${lowerCaseID}`
  
}
