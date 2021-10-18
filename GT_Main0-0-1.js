
//Load Cart Button and Total
var cartButton = document.getElementById('main-cart-button')
cartButton.addEventListener('click', () => {
  location.href = 'https://www.thegametree.io/shop/cart'
})


//Check if user is an admin, load admin header option
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    console.log('user found')
        firebase.firestore().collection('users').doc(user.uid).get().then(function(doc) {
            let data = doc.data()
            var isAdmin = data.isAdmin
            if(isAdmin) {
                console.log('user is an admin')

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
    console.log('No user logged in')
    }
})


//Disable header form
$('#header-search-form').submit(function() {
    return false;
});


//Header Search Field
const headerAutocompleteResults = document.getElementById('header-autocomplete-results')
headerAutocompleteResults.style.display = 'none'


//Algolia
  
const search = instantsearch({
    indexName: 'products_gametree',
    searchClient,
    getSearchParams() {
        return {
          hitsPerPage: 10,
        }
    }
});

function createStoreSearchResults(results) {
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
const renderAutocomplete = (renderOptions, isFirstRender) => {
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
    .map(createStoreSearchResults)
    .join('');
};

// Create the custom widget
const customAutocomplete = instantsearch.connectors.connectAutocomplete(
  renderAutocomplete
);

// Instantiate the custom widget
search.addWidgets([
    
  customAutocomplete({
    container: document.querySelector('#header-autocomplete-results'),
  })
  
]);

search.start()


function openProductPage(productID) {

    var lowerCaseID = productID.toLowerCase()
  
    location.href = `https://www.thegametree.io/products/${lowerCaseID}`
  
}
