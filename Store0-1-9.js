//HTML Elements

//Product Page
const productPage = document.getElementById('product-page')
const productPageBack = document.getElementById('product-page-back')

const ppNewPriceText = document.getElementById('pp-new-price')
const ppExcellentPriceText = document.getElementById('pp-excellent-price')
const ppGoodPriceText = document.getElementById('pp-good-price')
const ppAcceptablePriceText = document.getElementById('pp-acceptable-price')

const ppNewButton = document.getElementById('pp-new-button')
const ppExcellentButton = document.getElementById('pp-excellent-button')
const ppGoodButton = document.getElementById('pp-good-button')
const ppAcceptableButton = document.getElementById('pp-acceptable-button')

const ppProductTitle = document.getElementById('pp-product-title')
const ppProductDescription = document.getElementById('pp-product-description')
const ppKeySpecsContainer = document.getElementById('pp-key-specs-container')
const ppSubsectionContainer = document.getElementById('pp-subsection-container')


//Cart Modal
const storeCartCloseModal = document.getElementById('store-cart-close-modal')
const storeCartItemArea = document.getElementById('store-cart-item-area')
const storeCartNumItems = document.getElementById('store-cart-num-items')
const storeCartSubtotal = document.getElementById('store-cart-subtotal')
const storeCartCheckoutButton = document.getElementById('store-cart-checkout-button')
const storeCartContinueButton = document.getElementById('store-cart-continue-button')


//Global Variables
var database = firebase.firestore()
var globalProductData
var globalUserId


window.onload = () => {
  loadShopPage()

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

function loadShopPage() {


  //Navigation and Event Listeners
  productPageBack.addEventListener('click', () => {
    $('#product-page').fadeOut(200, () => {
      $('#store-page').fadeIn()
    })
  })



  storeCartCloseModal.addEventListener('click', () => {
    $('#cart-modal').fadeOut()
  })

  storeCartContinueButton.addEventListener('click', () => {
    $('#product-page').fadeOut()
    $('#cart-modal').fadeOut(400, () => {
      $('#store-page').fadeIn()
    })
  })

  storeCartCheckoutButton.addEventListener('click', () => {
    location.href = 'https://www.thegametree.io/shop/cart'
  })


}


//Algolia
const searchClient = algoliasearch('EXJJGW7VTC', '6253027161abf2af452a4c3551a7d6ab');
  
const search = instantsearch({
    indexName: 'products_gametree',
    searchClient,
});

function createStoreSearchResults(results) {
    let hitsContainer = document.createElement('div')
    hitsContainer.className = 'store-results'
    console.log(results.hits)

    results.hits.forEach(function(hit, hitIndex) {
        let storeProductDiv = document.createElement('div')
        storeProductDiv.className = 'store-product-div'
        storeProductDiv.setAttribute('onClick', `openProductPage("${hit.objectID}")`)
        hitsContainer.appendChild(storeProductDiv)

        let storeProductBackground = document.createElement('div')
        storeProductBackground.className = 'store-product-background'
        storeProductDiv.appendChild(storeProductBackground)

        let storeProductImage = document.createElement('img')
        storeProductImage.className = 'store-product-image'
        storeProductImage.src = hit.productImage
        storeProductBackground.appendChild(storeProductImage)

        let storeProductInfo = document.createElement('div')
        storeProductInfo.className = 'store-product-info'
        storeProductBackground.appendChild(storeProductInfo)

        let storeProductTitle = document.createElement('div')
        storeProductTitle.className = 'store-product-title'
        storeProductTitle.innerHTML = instantsearch.highlight({ attribute: `general.productName`, hit })
        storeProductInfo.appendChild(storeProductTitle)

        let storeProductPrice = document.createElement('div')
        storeProductPrice.className = 'store-product-price'
        storeProductPrice.innerHTML = '$' + hit.salePrices.new
        storeProductInfo.appendChild(storeProductPrice)

        let storeButtonWrapper = document.createElement('div')
        storeButtonWrapper.className = 'store-button-wrapper'
        storeProductBackground.appendChild(storeButtonWrapper)

        let storeProductButton = document.createElement('div')
        storeProductButton.className = 'store-product-button'
        storeProductButton.innerHTML = 'Details'
        storeButtonWrapper.appendChild(storeProductButton)

        let storeQuickViewWrapper = document.createElement('div')
        storeQuickViewWrapper.className = 'store-quick-view-wrapper'
        storeProductBackground.appendChild(storeQuickViewWrapper)

        let storeQuickViewButton = document.createElement('div')
        storeQuickViewButton.className = 'store-quick-view-button'
        storeQuickViewButton.innerHTML = ''
        storeQuickViewWrapper.appendChild(storeQuickViewButton)
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

  location.href = `https/www.thegametree.io/products/${lowerCaseID}`

}
