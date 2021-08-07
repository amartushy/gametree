var database = firebase.firestore()

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
        itemGridBlock.id = `item-grid-block-${hit.objectID}`
        itemGridBlock.setAttribute('item-condition', hit.condition)
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

        let statusDropdownContainer = document.createElement('div')
        statusDropdownContainer.className = 'item-dropdown-container'
        itemGridBlock.appendChild(statusDropdownContainer)

        let statusDropdownButton = document.createElement('div')
        switch(`${hit.status}`) {
            case 'processing' :
                statusDropdownButton.className = 'dropdown-button-processing'
                break;

            case 'active' :
                statusDropdownButton.className = 'dropdown-button-active'
                break;

            case 'sold' :
                statusDropdownButton.className = 'dropdown-button-sold'
                break;

            case 'repairs' :
                statusDropdownButton.className = 'dropdown-button-repairs'
                break;
        }
        statusDropdownButton.id = `dropdown-button-${hit.objectID}`
        statusDropdownButton.setAttribute('onClick', `displayDropdownOptions("status", "${hit.objectID}")`)
        statusDropdownContainer.appendChild(statusDropdownButton)

        let statusDropdownText = document.createElement('div')
        statusDropdownText.className = 'dropdown-button-text'
        statusDropdownText.innerHTML = hit.status
        statusDropdownText.id = `status-dropdown-text-${hit.objectID}`
        statusDropdownButton.appendChild(statusDropdownText)

        let statusDropdownChevron = document.createElement('div')
        statusDropdownChevron.className = 'dropdown-button-chevron'
        statusDropdownChevron.innerHTML = ''
        statusDropdownButton.appendChild(statusDropdownChevron)

        let statusDropdownOptionsContainer = document.createElement('div')
        statusDropdownOptionsContainer.className = 'dropdown-options-container'
        statusDropdownOptionsContainer.style.display = 'none'
        statusDropdownOptionsContainer.id = `status-dropdown-options-container-${hit.objectID}`
        statusDropdownContainer.appendChild(statusDropdownOptionsContainer)

        for (const status of statusOptions) {
            var option = document.createElement('div')
            option.className = 'dropdown-option'
            option.innerHTML = status
            option.setAttribute('onClick', `changeItemStatus("${hit.GTIN}", "${hit.objectID}", "${status}")`)
            statusDropdownOptionsContainer.appendChild(option)
        }

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
        const platformOptions = ['eBay', 'Amazon', 'GAMETREE', 'Facebook', 'OfferUp']


        let platformDropdownContainer = document.createElement('div')
        platformDropdownContainer.className = 'item-dropdown-container'
        itemGridBlock.appendChild(platformDropdownContainer)

        let platformDropdownButton = document.createElement('div')
        platformDropdownButton.className = 'dropdown-button'
        platformDropdownButton.id = `platform-dropdown-button-${hit.objectID}`
        platformDropdownButton.setAttribute('onClick', `displayDropdownOptions("platform", "${hit.objectID}")`)
        platformDropdownContainer.appendChild(platformDropdownButton)

        let platformDropdownText = document.createElement('div')
        platformDropdownText.className = 'dropdown-button-text'
        if(hit.platformSold != "") {
            platformDropdownText.innerHTML = hit.platformSold
        } else {
            platformDropdownText.innerHTML = 'Select One..'
        }
        platformDropdownText.id = `platform-dropdown-text-${hit.objectID}`
        platformDropdownButton.appendChild(platformDropdownText)

        let platformDropdownChevron = document.createElement('div')
        platformDropdownChevron.className = 'dropdown-button-chevron'
        platformDropdownChevron.innerHTML = ''
        platformDropdownButton.appendChild(platformDropdownChevron)

        let platformDropdownOptionsContainer = document.createElement('div')
        platformDropdownOptionsContainer.className = 'dropdown-options-container'
        platformDropdownOptionsContainer.style.display = 'none'
        platformDropdownOptionsContainer.id = `platform-dropdown-options-container-${hit.objectID}`
        platformDropdownContainer.appendChild(platformDropdownOptionsContainer)

        for (const platform of platformOptions) {
            var option = document.createElement('div')
            option.className = 'dropdown-option'
            option.innerHTML = platform
            option.setAttribute('onClick', `changeItemPlatform("${hit.objectID}", "${platform}")`)
            platformDropdownOptionsContainer.appendChild(option)
        }



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










//Calendar Functions
const calendarModal = document.getElementById('calendar-modal')
const closeCalendarModal = document.getElementById('close-calendar-modal')
closeCalendarModal.addEventListener('click', () => {
    $('#calendar-modal').fadeOut()
})


const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var currentDate = getCurrentMonthAndYear()
var year = currentDate[0]
var month = currentDate[1]


function displayCalendarModal(itemID) {
    $('#calendar-modal').fadeIn().css('display', 'flex')
    document.getElementById('calendar-modal-item-id').innerHTML = itemID

    buildCalendarNav()
}

function buildCalendarNav() {

    var calendarBack = document.getElementById('calendar-back')
    var calendarBackClone = calendarBack.cloneNode(true)
    calendarBack.parentNode.replaceChild(calendarBackClone, calendarBack)
    calendarBackClone.addEventListener('click', () => {
        if (month==0) {
            year--
            month = 11
        } else {
            month--
        }
        buildCalendar()
    })

    var calendarForward = document.getElementById('calendar-forward')
    var calendarForwardClone = calendarForward.cloneNode(true)
    calendarForward.parentNode.replaceChild(calendarForwardClone, calendarForward)
    calendarForwardClone.addEventListener('click', () => {
        if (month==11) {
            year++
            month = 0
        } else {
            month++
        }
        buildCalendar()
    })
}

function buildCalendar() {
    var calendarHeader = document.getElementById('calendar-header')
    calendarHeader.innerHTML = months[month] + " " + year

    var dayRowContainer = document.getElementById('day-row-container')
    while(dayRowContainer.firstChild) {
        dayRowContainer.removeChild(dayRowContainer.firstChild)
    }
    var daysInMonth = getDaysInMonth(year, month+1)
    var firstDay = firstDayOfMonth(year, month)
    var counter = 0
    var dayCounter = 1
    for(i=0; i<6; i++) {
        var dayRow = document.createElement('div')
        dayRow.setAttribute('class', 'day-row')
        dayRowContainer.appendChild(dayRow)

        for(j=0; j<7; j++) {
            var dayDiv = document.createElement('div')
            if( counter >= firstDay && dayCounter <= daysInMonth){
                dayDiv.setAttribute('class', 'day-div')
                dayDiv.setAttribute('id', 'dayDiv-' + dayCounter)
                dayRow.appendChild(dayDiv)

                var dayNumber = document.createElement('div')
                dayNumber.setAttribute('class', 'day-number')
                dayNumber.innerHTML = dayCounter
                dayDiv.appendChild(dayNumber)
                dayDiv.setAttribute('onClick', `daySelected("${dayCounter}", "${month}", "${year}")`)

                dayCounter++
            } else {
                dayDiv.setAttribute('class', 'day-div-empty')
                dayRow.appendChild(dayDiv)
            }

            counter++
        }
    }
}


function daySelected(dayVal, monthVal, yearVal) {
    var dateObject = new Date(yearVal, monthVal, dayVal)
    var epochDate = dateObject.getTime() / 1000
    var formattedDate = getFormattedDate(epochDate * 1000)
    var itemID = document.getElementById('calendar-modal-item-id').innerHTML
    let soldDateElement = document.getElementById(`item-sold-date-${itemID}`)
    soldDateElement.innerHTML = formattedDate
    soldDateElement.setAttribute('epochDate', epochDate)
    $('#calendar-modal').fadeOut()
}
