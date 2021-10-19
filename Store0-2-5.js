//HTML Elements

//Global Variables
var database = firebase.firestore()
var globalProductData
var globalUserId


window.onload = () => {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // Customer is logged in.
        globalUserId = user.uid

    } else {
        // No user is logged in.
        console.log('No authenticated user')
    }
  })
}



//Algolia  
const search = instantsearch({
    indexName: 'products_gametree',
    searchClient,
});

function createStoreSearchResults(results) {
    let hitsContainer = document.createElement('div')
    hitsContainer.className = 'store-results'

    results.hits.forEach(function(hit, hitIndex) {
        let storeProductDiv = createDOMElement('div', 'store-product-div', 'none', hitsContainer)
        storeProductDiv.setAttribute('onClick', `openProductPage("${hit.objectID}")`)

        let storeProductBackground = createDOMElement('div', 'store-product-background', 'none', storeProductDiv)

        let storeProductImage = createDOMElement('img', 'store-product-image', 'none', storeProductBackground)
        storeProductImage.src = hit.productImage

        let storeProductInfo = createDOMElement('div', 'store-product-info', 'none', storeProductBackground)
        createDOMElement('div', 'store-product-title', instantsearch.highlight({ attribute: `general.productName`, hit }), storeProductInfo)
        createDOMElement('div', 'store-product-brand', hit.brand, storeProductInfo)
        createDOMElement('div', 'store-product-price', '$' + hit.salePrices.new, storeProductInfo)


        let storeButtonWrapper = createDOMElement('div', 'store-product-wrapper', 'none', storeProductBackground)
        createDOMElement('div', 'store-product-button', 'Details', storeButtonWrapper)

        let storeQuickViewWrapper = createDOMElement('div', 'store-product-view-wrapper', 'none', storeProductBackground)
        createDOMElement('div', 'store-product-view-button', '', storeQuickViewWrapper)
    })

    return hitsContainer.outerHTML
}

// Create the render function
const renderAutocomplete = (renderOptions, isFirstRender) => {
  const { indices, currentRefinement, refine, widgetParams } = renderOptions;

  if (isFirstRender) {
    const input = document.querySelector('#store-search-field');

    input.addEventListener('input', event => {
      refine(event.currentTarget.value);
    });
  }

  document.querySelector('#store-search-field').value = currentRefinement;
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
    container: document.querySelector('#store-search-results'),
  })
  
]);

search.start()






function openProductPage(productID) {

  var lowerCaseID = productID.toLowerCase()

  location.href = `https://www.thegametree.io/products/${lowerCaseID}`

}
