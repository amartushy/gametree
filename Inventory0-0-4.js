

window.onload = () => {
    // const inventoryItemsContainer = document.getElementById('inventory-grid-form')

    // while(inventoryItemsContainer.firstChild) {
    //     inventoryItemsContainer.removeChild(inventoryItemsContainer.firstChild) 
    // }

    buildCalendar()
}



//HTML Elements

const inventoryAllTab = document.getElementById('inventory-all-tab')
const inventoryProcessingTab = document.getElementById('inventory-processing-tab')
const inventoryActiveTab = document.getElementById('inventory-active-tab')
const inventorySoldTab = document.getElementById('inventory-sold-tab')
const inventoryRepairsTab = document.getElementById('inventory-repairs-tab')

inventoryAllTab.addEventListener('click', () => {
    displayPurchases('all')
})
inventoryProcessingTab.addEventListener('click', () => {
    displayPurchases('processing')
})
inventoryActiveTab.addEventListener('click', () => {
    displayPurchases('active')
})
inventorySoldTab.addEventListener('click', () => {
    displayPurchases('repairs')
})
inventoryRepairsTab.addEventListener('click', () => {
    displayPurchases('sold')
})

$('#inventory-grid-form').removeClass('w-form')
$('#inventory-grid-container').removeClass('w-form')

//Filters
var tabFilters = ["all", "processing", "active", "repairs", "sold"]

function displayPurchases(status) {
	tabFilters = ["all", "processing", "active", "repairs", "sold"]
    var tabs = [inventoryAllTab, inventoryProcessingTab, inventoryActiveTab, inventoryRepairsTab, inventorySoldTab]

    resetTabFilterClasses()
    console.log(status)
    console.log(tabs[tabFilters.indexOf(status)])

    tabs[tabFilters.indexOf(status)].className = 'inventory-tab-selected'

    tabFilters = [`${status}`]

	showInventory()
}

function resetTabFilterClasses() {
    inventoryAllTab.className = 'inventory-tab'
    inventoryProcessingTab.className = 'inventory-tab'
    inventoryActiveTab.className = 'inventory-tab'
    inventorySoldTab.className = 'inventory-tab'
    inventoryRepairsTab.className = 'inventory-tab'
}



function showInventory() {

}


//Algolia
const searchClient = algoliasearch('EXJJGW7VTC', '6253027161abf2af452a4c3551a7d6ab');
  
const search = instantsearch({
    indexName: 'inventory_gametree',
    searchClient,
});

function createProductSearchResult(results) {
    let inventoryGridContainer = document.createElement('inventory-grid-container')
    inventoryGridContainer.className = 'inventory-grid-container'

    results.hits.forEach(function(hit, hitIndex) {
        let itemGridBlock = document.createElement('div')
        itemGridBlock.className = 'item-grid-block'
        inventoryGridContainer.appendChild(itemGridBlock)

        let itemGridPhotoContainer = document.createElement('div')
        itemGridPhotoContainer.className = 'item-grid-photo-container'
        itemGridBlock.appendChild(itemGridPhotoContainer)

        let itemGridPhoto = document.createElement('img')
        itemGridPhoto.className = 'item-grid-photo'
        itemGridPhoto.src = hit.productImage
        itemGridPhotoContainer.appendChild(itemGridPhoto)

        let itemPurchaseID = document.createElement('div')
        itemPurchaseID.className = 'item-grid-header'
        itemPurchaseID.innerHTML = hit.objectID
        itemGridBlock.appendChild(itemPurchaseID)

        let itemTitle = document.createElement('div')
        itemTitle.className = 'item-grid-item-title-header'
        itemTitle.innerHTML = instantsearch.highlight({ attribute: `productTitle`, hit })
        itemGridBlock.appendChild(itemTitle)


        //Status Dropdown Cell
        const statusOptions = ['processing', 'active', 'sold', 'repairs']

        let statusDropdown = document.createElement('select')
        switch(`${hit.status}`) {
            case 'processing' :
                statusDropdown.className = 'item-grid-status-processing'
                break;

            case 'active' :
                statusDropdown.className = 'item-grid-status-active'
                break;

            case 'sold' :
                statusDropdown.className = 'item-grid-status-sold'
                break;

            case 'repairs' :
                statusDropdown.className = 'item-grid-status-repairs'
                break;
        }
        statusDropdown.value = hit.status
        statusDropdown.id = `item-status-${hit.objectID}`
        for (const status of statusOptions) {
            var option = document.createElement('option')
            option.value = status
            option.text = status
            statusDropdown.appendChild(option)
        }
        statusDropdown.setAttribute('onchange', `changeItemStatus("${hit.objectID}")`)
        itemGridBlock.appendChild(statusDropdown)

        //Purchase Date Cell
        let itemPurchaseDate = document.createElement('div')
        itemPurchaseDate.className = 'item-grid-header'
        itemPurchaseDate.innerHTML = getFormattedDate(hit.purchaseDate)
        itemGridBlock.appendChild(itemPurchaseDate)

        //Sold Date Cell
        let itemSoldDate = document.createElement('div')
        if(hit.soldDate) {
            itemSoldDate.className = 'item-grid-header'
            itemSoldDate.innerHTML = getFormattedDate(hit.soldDate)
        } else {
            itemSoldDate.className = 'item-sold-date-button'
            itemSoldDate.innerHTML = 'Select Date'
            itemSoldDate.setAttribute('onClick', `displayCalendarModal("${hit.objectID}")`)
        }
        itemSoldDate.id = `item-sold-date-${hit.objectID}`
        itemGridBlock.appendChild(itemSoldDate)

        //Platform Sold Dropdown Cell
        const platformOptions = ['Select', 'eBay', 'Amazon', 'GAMETREE', 'FB Marketplace', 'OfferUp']

        let platformDropdown = document.createElement('select')
        platformDropdown.className = 'item-grid-platform-dropdown'
        if(hit.platformSold) {
            platformDropdown.value = hit.status
        }
        platformDropdown.id = `item-platform-sold-${hit.objectID}`
        for (const platform of platformOptions) {
            var option = document.createElement('option')
            option.value = platform
            option.text = platform
            platformDropdown.appendChild(option)
        }

        itemGridBlock.appendChild(platformDropdown)


        //Financial Cells
        let itemPurchasePrice = document.createElement('div')
        itemPurchasePrice.className = 'item-grid-input'
        var purchasePrice = hit.purchasePrice
        itemPurchasePrice.innerHTML = '$' + purchasePrice.toFixed(2)
        itemPurchasePrice.id = `item-purchase-price-${hit.objectID}`
        itemGridBlock.appendChild(itemPurchasePrice)

        let itemSoldInput = document.createElement('input')
        itemSoldInput.className = 'item-grid-input'
        var soldPrice = hit.sold
        itemSoldInput.placeholder = '$' + soldPrice.toFixed(2)
        itemSoldInput.id = `item-input-sold-${hit.objectID}`
        itemGridBlock.appendChild(itemSoldInput)

        let itemSellingFeesInput = document.createElement('input')
        itemSellingFeesInput.className = 'item-grid-input'
        var sellingFees = hit.sellingFees
        itemSellingFeesInput.placeholder = '$' + sellingFees.toFixed(2)
        itemSellingFeesInput.id = `item-input-fees-${hit.objectID}`
        itemGridBlock.appendChild(itemSellingFeesInput)

        let itemShippingFeesInput = document.createElement('input')
        itemShippingFeesInput.className = 'item-grid-input'
        var shippingFees = hit.shippingFees
        itemShippingFeesInput.placeholder = '$' + shippingFees.toFixed(2)
        itemShippingFeesInput.id = `item-input-shipping-${hit.objectID}`
        itemGridBlock.appendChild(itemShippingFeesInput)

        let itemTaxesInput = document.createElement('input')
        itemTaxesInput.className = 'item-grid-input'
        var taxes = hit.taxes
        itemTaxesInput.placeholder = '$' + taxes.toFixed(2)
        itemTaxesInput.id = `item-input-taxes-${hit.objectID}`
        itemGridBlock.appendChild(itemTaxesInput)

        let itemRevenue = document.createElement('div')
        if(hit.revenue >= 0) {
            itemRevenue.className = 'item-grid-revenue-positive'
        } else {
            itemRevenue.className = 'item-grid-revenue-negative'
        }
        var revenue = hit.revenue
        itemRevenue.innerHTML = '$' + revenue.toFixed(2)
        itemRevenue.id = `item-revenue-${hit.objectID}`
        itemGridBlock.appendChild(itemRevenue)
        })

    return inventoryGridContainer.outerHTML
}


// Create the render function
const renderAutocomplete = (renderOptions, isFirstRender) => {
  const { indices, currentRefinement, refine, widgetParams } = renderOptions;

  if (isFirstRender) {
    const input = document.querySelector('#inventory-search-field');

    input.addEventListener('input', event => {
      refine(event.currentTarget.value);
    });
  }

  document.querySelector('#inventory-search-field').value = currentRefinement;
  widgetParams.container.innerHTML = indices
    .map(createProductSearchResult)
    .join('');
};

// Create the custom widget
const customAutocomplete = instantsearch.connectors.connectAutocomplete(
  renderAutocomplete
);

// Instantiate the custom widget
search.addWidgets([
    
  customAutocomplete({
    container: document.querySelector('#inventory-grid-form'),
  })
  
]);

search.start()
