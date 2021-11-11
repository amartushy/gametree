//HTML Elements
const sellSearchPage = document.getElementById('sell-search-page')
const scsSection = document.getElementById('scs-section')
const requestPickupScreen = document.getElementById('request-pickup-screen')

const showMoreBrands = document.getElementById('show-more-brands')
const searchCancel = document.getElementById('search-cancel')
const searchField = document.getElementById('store-search-field')

//Event Listeners and Initial States
showMoreBrands.style.display = 'none'

searchCancel.addEventListener('click', () => {
    searchField.value = ''
})

//Global Variables
var database = firebase.firestore()
var globalProductData
var globalUserId


window.onload = () => {

    loadInitialState()

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

function loadInitialState() {
    sellSearchPage.style.display = 'flex'
    scsSection.style.display = 'none'
    requestPickupScreen.style.display = 'none'
}


//Algolia  
const search = instantsearch({
    indexName: 'products_gametree',
    searchClient
});


function createSellSearchResults(results) {
    let hitsContainer = document.createElement('div')
    hitsContainer.className = 'sell-results'

    results.hits.forEach(function(hit, hitIndex) {

        let productDiv = createDOMElement('div', 'sell-product-div', 'none', hitsContainer)
        productDiv.setAttribute('onClick', `openConfirmationScreen("${hit.objectID}")`)

        let productBackground = createDOMElement('div', 'sell-product-background', 'none', productDiv)

        let productImage = createDOMElement('img', 'store-product-image', 'none', productBackground)
        productImage.src = hit.productImage

        let productInfo = createDOMElement('div', 'store-product-info', 'none', productBackground)
        createDOMElement('div', 'store-product-title', instantsearch.highlight({ attribute: `general.productName`, hit }), productInfo)
        createDOMElement('div', 'store-product-brand', hit.brand, productInfo)
    })

    return hitsContainer.outerHTML
}

// Create the render functions
const renderAutocomplete = (renderOptions, isFirstRender) => {
  const { indices, currentRefinement, refine, widgetParams } = renderOptions;

  if (isFirstRender) {

    searchField.addEventListener('input', event => {
      refine(event.currentTarget.value);
    });
  }

  searchField.value = currentRefinement;
  widgetParams.container.innerHTML = indices
    .map(createSellSearchResults)
    .join('');
};


const renderCategoryMenu = (renderOptions, isFirstRender) => {
  const { items, refine, widgetParams } = renderOptions;

  while(widgetParams.container.firstChild) {
    widgetParams.container.removeChild(widgetParams.container.firstChild)
  }

  items.forEach( item => {
    var storeFilterDiv = createDOMElement('div', 'store-filter-div', 'none', widgetParams.container)

    if(item.isRefined) {
      createDOMElement('div', 'store-filter-text-selected', `${item.label}`, storeFilterDiv)
    } else {
      createDOMElement('div', 'store-filter-text', `${item.label}`, storeFilterDiv)
    }

    storeFilterDiv.addEventListener('click', event => {
      event.preventDefault();
      refine(item.value);
    });
  })

};


const renderRefinementList = (renderOptions, isFirstRender) => {
  const { items, refine, isShowingMore, canShowMore, toggleShowMore, widgetParams } = renderOptions;

  while(widgetParams.container.firstChild) {
    widgetParams.container.removeChild(widgetParams.container.firstChild)
  }

  items.forEach( item => {
    var storeFilterDiv = createDOMElement('div', 'store-filter-div', 'none', widgetParams.container)

    if(item.isRefined) {
      createDOMElement('div', 'store-filter-checkbox-selected', '', storeFilterDiv)
    } else {
      createDOMElement('div', 'store-filter-checkbox', '', storeFilterDiv)
    }
    createDOMElement('div', 'store-filter-text', item.label, storeFilterDiv)

    storeFilterDiv.addEventListener('click', event => {
      event.preventDefault();
      refine(item.value);
    });
  })

  if (isFirstRender) {

    showMoreBrands.style.display = 'flex'
    showMoreBrands.addEventListener('click', () => {
      toggleShowMore()
      if(showMoreBrands.innerHTML = 'Show More') {
        showMoreBrands.innerHTML = 'Show Less'
      } else {
        showMoreBrands.innerHTML = 'Show More'
      }
    })
  }
};



const renderCurrentRefinements = (renderOptions, isFirstRender) => {
  const { items, refine, widgetParams } = renderOptions

  while(widgetParams.container.firstChild) {
    widgetParams.container.removeChild(widgetParams.container.firstChild)
  }

  if(items.length > 0) {
    widgetParams.container.style.display = 'flex'
  } else {
    widgetParams.container.style.display = 'none'
  }

  items.forEach( item => {
    console.log(item.refinements)
    item.refinements.forEach( (refinement, index) => {
        var refinementDiv = createDOMElement('div', 'refinement-div', 'none', widgetParams.container)

        createDOMElement('div', 'refinement-text', refinement.label, refinementDiv)
        
        const removeRefinement = createDOMElement('div', 'refinement-delete', '', refinementDiv)

        removeRefinement.addEventListener('click', () => {

        refine(refinement);
      })
    })
  })
};


// Create the custom widgets
const customAutocomplete = instantsearch.connectors.connectAutocomplete( renderAutocomplete );
const customCategoryMenu = instantsearch.connectors.connectMenu( renderCategoryMenu );
const customBrandRefinements = instantsearch.connectors.connectRefinementList( renderRefinementList );
const customCurrentRefinements = instantsearch.connectors.connectCurrentRefinements( renderCurrentRefinements );


// Instantiate the custom widgets
search.addWidgets([
    
  customAutocomplete({
    container: document.querySelector('#store-search-results'),
  }),

  customCategoryMenu({
    container: document.querySelector('#category-menu'),
    attribute: 'category',
    sortBy : ['name:asc']
  }),

  customBrandRefinements({
    container: document.querySelector('#brands-container'),
    attribute: 'brand',
    showMore: true,
    limit : 10,
    showMoreLimit : 40,
    limit : 10,
    sortBy : ['name:asc']
  }),

  customCurrentRefinements({
    container: document.querySelector('#refinements-container'),
  })
  
]);

search.start()



function openConfirmationScreen(productID) {
    console.log(productID)

    loadSaleConfirmationScreen(productID)
}
