//HTML Elements
var showMoreBrands = document.getElementById('show-more-brands')
var showMorePlatforms = document.getElementById('show-more-platforms')
var showMoreGenres = document.getElementById('show-more-genres')

showMoreBrands.style.display = 'none'
showMorePlatforms.style.display = 'none'
showMoreGenres.style.display = 'none'


//Global Variables
var database = firebase.firestore()
var globalProductData
var globalUserId
var globalBrand

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
    searchClient
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
        createDOMElement('div', 'store-product-brand', hit.platform, storeProductInfo)

        var storeAvailabilityDiv = createDOMElement('div', 'store-availability-div', 'none', storeProductBackground)
        createDOMElement('div', 'store-product-price', '$' + hit.salePrices.new, storeAvailabilityDiv)

        if(hit.isAvailable) {
          createDOMElement('div', 'store-product-available', 'Available', storeAvailabilityDiv)
        } else {
          createDOMElement('div', 'store-product-unavailable', 'Out of Stock', storeAvailabilityDiv)
        }

        let storeQuickViewWrapper = createDOMElement('div', 'store-quick-view-wrapper', 'none', storeProductBackground)
        createDOMElement('div', 'store-quick-view-button', '', storeQuickViewWrapper)
    })

    return hitsContainer.outerHTML
}

// Create the render functions
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


const renderAvailabilityMenu = (renderOptions, isFirstRender) => {
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
    createDOMElement('div', 'store-filter-text', `${item.label} (${item.count})`, storeFilterDiv)

    storeFilterDiv.addEventListener('click', event => {
      event.preventDefault();
      refine(item.value);
    });
  })

  if (isFirstRender) {

    switch (widgetParams.attribute) {

      case 'brand':
        globalBrand = sessionStorage.getItem("brand")
        console.log(globalBrand); 

        if(globalBrand) {
          refine(globalBrand)
          sessionStorage.removeItem('brand')
        }
        showMoreBrands.style.display = 'flex'
        showMoreBrands.addEventListener('click', () => {
          toggleShowMore()
          if(showMoreBrands.innerHTML = 'Show More') {
            showMoreBrands.innerHTML = 'Show Less'
          } else {
            showMoreBrands.innerHTML = 'Show More'
          }
          
        })
        break;

      case 'platform':
        showMorePlatforms.style.display = 'flex'
        showMorePlatforms.addEventListener('click', () => {
          toggleShowMore()
          if(showMorePlatforms.innerHTML = 'Show More') {
            showMorePlatforms.innerHTML = 'Show Less'
          } else {
            showMorePlatforms.innerHTML = 'Show More'
          }
        })
        break;

      case 'gameDetails.genre':
        showMoreGenres.style.display = 'flex'
        showMoreGenres.addEventListener('click', () => {
          toggleShowMore()
          if(showMoreGenres.innerHTML = 'Show More') {
            showMoreGenres.innerHTML = 'Show Less'
          } else {
            showMoreGenres.innerHTML = 'Show More'
          }
        })
        break;
    }

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

      if(refinement.label == '≥ 1') {
        createDOMElement('div', 'refinement-text', 'In Stock', refinementDiv)
      } else {
        createDOMElement('div', 'refinement-text', refinement.label, refinementDiv)
      }
      const removeRefinement = createDOMElement('div', 'refinement-delete', '', refinementDiv)

      removeRefinement.addEventListener('click', () => {

        refine(refinement);
      })
    })
  })


};


// Create the custom widgets
const customAutocomplete = instantsearch.connectors.connectAutocomplete( renderAutocomplete );
const customAvailabilityMenu = instantsearch.connectors.connectNumericMenu( renderAvailabilityMenu );
const customCategoryMenu = instantsearch.connectors.connectMenu( renderCategoryMenu );
const customBrandRefinements = instantsearch.connectors.connectRefinementList( renderRefinementList );
const customPlatformRefinements = instantsearch.connectors.connectRefinementList( renderRefinementList );
const customESRBRefinements = instantsearch.connectors.connectRefinementList( renderRefinementList );
const customGenreRefinements = instantsearch.connectors.connectRefinementList( renderRefinementList );
const customCurrentRefinements = instantsearch.connectors.connectCurrentRefinements( renderCurrentRefinements );


// Instantiate the custom widgets
search.addWidgets([
    
  customAutocomplete({
    container: document.querySelector('#store-search-results'),
  }),

  customAvailabilityMenu({
    container: document.querySelector('#availability-menu'),
    attribute: 'isAvailable',
    items : [
      { label : 'All'},
      { label : 'In Stock', start: 1}
    ]
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

  customPlatformRefinements({
    container: document.querySelector('#platform-refinements'),
    attribute: 'platform',
    showMore: true,
    limit : 10,
    showMoreLimit : 40,
    sortBy : ['name:asc']
  }),

  customESRBRefinements({
    container: document.querySelector('#esrb-refinements'),
    attribute: 'keySpecs.ESRBRating',
    sortBy : ['name:asc']
  }),


  customGenreRefinements({
    container: document.querySelector('#genre-refinements'),
    attribute: 'gameDetails.genre',
    showMore: true,
    limit : 10,
    showMoreLimit : 40,
    sortBy : ['name:asc']
  }),


  customCurrentRefinements({
    container: document.querySelector('#refinements-container'),
  })
  
]);

search.start()



function openProductPage(productID) {

  var lowerCaseID = productID.toLowerCase()

  window.open(`https://www.thegametree.io/products/${lowerCaseID}`)

}
