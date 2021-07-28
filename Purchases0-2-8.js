//Initialize database
var database = firebase.firestore()

//FILTERS
var tabFilters = ["in transit", "processing", "listed", "needs repair", "sold", "itemized"]
var purchaseFilters = "All prices"

//______________________

//Tab filters
var allTab = document.getElementById('purchase-filter-all')
var inTransitTab = document.getElementById('purchase-filter-in-transit')
var processingTab = document.getElementById('purchase-filter-processing')
var listedTab = document.getElementById('purchase-filter-listed')
var repairsTab = document.getElementById('purchase-filter-repairs')
var soldTab = document.getElementById('purchase-filter-sold')
var itemizedTab = document.getElementById('purchase-filter-itemized')

//Tab filter onclick listeners
allTab.addEventListener('click', allPurchases)
inTransitTab.addEventListener('click', inTransitPurchases)
processingTab.addEventListener('click', processingPurchases)
listedTab.addEventListener('click', listedPurchases)
repairsTab.addEventListener('click', repairsPurchases)
soldTab.addEventListener('click', soldPurchases)
itemizedTab.addEventListener('click', itemizedPurchases)


//Tab filter functions
function allPurchases() {
	tabFilters = ["in transit", "processing", "listed", "needs repair", "sold", "itemized"]
	showPurchases()
	
	allTab.className = 'purchase-filters-selected'
	inTransitTab.className = 'purchase-filter'
	processingTab.className = 'purchase-filter'
	listedTab.className = 'purchase-filter'
	repairsTab.className = 'purchase-filter'
	soldTab.className = 'purchase-filter'
	itemizedTab.className = 'purchase-filter'
}

function inTransitPurchases() {
	tabFilters = ["in transit"]
	showPurchases()
	
	allTab.className = 'purchase-filter'
	inTransitTab.className = 'purchase-filters-selected'
	processingTab.className = 'purchase-filter'
	listedTab.className = 'purchase-filter'
	repairsTab.className = 'purchase-filter'
	soldTab.className = 'purchase-filter'
	itemizedTab.className = 'purchase-filter'
}

function processingPurchases() {
	tabFilters = ["processing"]
	showPurchases()
	
	allTab.className = 'purchase-filter'
	inTransitTab.className = 'purchase-filter'
	processingTab.className = 'purchase-filters-selected'
	listedTab.className = 'purchase-filter'
	repairsTab.className = 'purchase-filter'
	soldTab.className = 'purchase-filter'
	itemizedTab.className = 'purchase-filter'
}

function listedPurchases() {
	tabFilters = ["listed"]
	showPurchases()
	
	allTab.className = 'purchase-filter'
	inTransitTab.className = 'purchase-filter'
	processingTab.className = 'purchase-filter'
	listedTab.className = 'purchase-filters-selected'
	repairsTab.className = 'purchase-filter'
	soldTab.className = 'purchase-filter'
	itemizedTab.className = 'purchase-filter'
}

function repairsPurchases() {
	tabFilters = ["needs repair"]
	showPurchases()
	
	allTab.className = 'purchase-filter'
	inTransitTab.className = 'purchase-filter'
	processingTab.className = 'purchase-filter'
	listedTab.className = 'purchase-filter'
	repairsTab.className = 'purchase-filters-selected'
	soldTab.className = 'purchase-filter'
	itemizedTab.className = 'purchase-filter'
}

function soldPurchases() {
	tabFilters = ["sold"]
	showPurchases()
	
	allTab.className = 'purchase-filter'
	inTransitTab.className = 'purchase-filter'
	processingTab.className = 'purchase-filter'
	listedTab.className = 'purchase-filter'
	repairsTab.className = 'purchase-filter'
	soldTab.className = 'purchase-filters-selected'
	itemizedTab.className = 'purchase-filter'
}
function itemizedPurchases() {
	tabFilters = ["itemized"]
	showPurchases()
	
	allTab.className = 'purchase-filter'
	inTransitTab.className = 'purchase-filter'
	processingTab.className = 'purchase-filter'
	listedTab.className = 'purchase-filter'
	repairsTab.className = 'purchase-filter'
	soldTab.className = 'purchase-filters-filter'
	itemizedTab.className = 'purchase-filters-selected'
}







//Section to append purchases
var purchasesSection = document.getElementById('purchases-section')

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		var userID = user.uid
		 
		//Check if user is admin, else redirect: TODO
		
		//Load all purchases with no filters applied
		showPurchases()
		
		while(purchasesSection.firstChild) {
			purchasesSection.removeChild(purchasesSection.firstChild)
		}
		
	//If user is not logged in (or an Admin) return them home
	} else {
		location.href = "https://www.thegametree.io/login"
	}
})

//Calls when a tab is clicked, builds applicant blocks for filters
function showPurchases() {
	
    database.collection("purchases").where("status", "in", tabFilters).get().then(async function(purchases) {
        //remove all items on update
        while(purchasesSection.firstChild) {
            purchasesSection.removeChild(purchasesSection.firstChild)
        }

        var purchasesArray = []

        purchases.forEach(function(doc)  {
            var data = doc.data(),
                purchaseID = doc.id,
                purchaseDate = data.time
            purchasesArray.push([purchaseDate, purchaseID, data])
        })

        buildPurchases(purchasesArray)
    })
}


function buildPurchases(array) {
    console.log(array)
	var sortedPurchases = array.sort(function(a, b) {
  		return b[0] - a[0];
	})
	
	sortedPurchases.forEach(function (element, index) {
		var ID = sortedPurchases[index][1],
			title = sortedPurchases[index][2].itemTitle
			buyer = sortedPurchases[index][2].purchaserName
			date = sortedPurchases[index][2].time
			price = sortedPurchases[index][2].purchasePrice
			status = sortedPurchases[index][2].status
		
		buildPurchaseBlock(ID, index, title, buyer, date, price, status)
	})
}



function buildPurchaseBlock(ID, index, title, buyer, date, price, status) {
	
	//Main block that holds all applicant elements
	var purchaseBlock = document.createElement('div')
	purchaseBlock.setAttribute('id', ID)

	//Alternate background colors from gray to black based on if index is even or odd
	if (index % 2 == 0) {
		purchaseBlock.setAttribute('class', 'purchase-block-gray')
	} else {
		purchaseBlock.setAttribute('class', 'purchase-block-black')
	}
	purchasesSection.appendChild(purchaseBlock)
	
	//ID Block
	var purchaseIDText = document.createElement('div')
	purchaseIDText.setAttribute('class', 'purchase-id')
	purchaseIDText.innerHTML = ID
	purchaseBlock.appendChild(purchaseIDText)
	
	//Title Block
	var purchaseTitle = document.createElement('div')
	purchaseTitle.setAttribute('class', 'purchase-title')
	purchaseTitle.innerHTML = title
	purchaseBlock.appendChild(purchaseTitle)

	//Buyer Block
	var purchaseBuyer = document.createElement('div')
	purchaseBuyer.setAttribute('class', 'purchase-buyer')
	purchaseBuyer.innerHTML = buyer
	purchaseBlock.appendChild(purchaseBuyer)
	
	//Date Block
	var purchaseDate = document.createElement('div')
	purchaseDate.setAttribute('class', 'purchase-date')
	purchaseDate.innerHTML = formatDate(date)
	purchaseBlock.appendChild(purchaseDate)
	
	//price Block
	var purchasePrice = document.createElement('div')
	purchasePrice.setAttribute('class', 'purchase-price')
	purchasePrice.innerHTML = '$' + price
	purchaseBlock.appendChild(purchasePrice)
	
	//Status Block
	var purchaseStatus = document.createElement('div')
	if (status == "in transit") {
		purchaseStatus.setAttribute('class', 'purchase-status-in-transit')
		purchaseStatus.innerHTML = "IN TRANSIT"
	} else if (status == "processing") {
		purchaseStatus.setAttribute('class', 'purchase-status-processing')
		purchaseStatus.innerHTML = "PROCESSING"
	} else if (status == "listed") {
		purchaseStatus.setAttribute('class', 'purchase-status-listed')
		purchaseStatus.innerHTML = "LISTED"
	} else if (status == "needs repair") {
		purchaseStatus.setAttribute('class', 'purchase-status-repair')
		purchaseStatus.innerHTML = "NEEDS REPAIR"
	} else if (status == "sold") {
		purchaseStatus.setAttribute('class', 'purchase-status-sold')
		purchaseStatus.innerHTML = "SOLD"
	} else if (status == 'itemized') {
		purchaseStatus.setAttribute('class', 'purchase-status-itemized')
		purchaseStatus.innerHTML = "ITEMIZED"
	}
	purchaseBlock.appendChild(purchaseStatus)

	//Actions Block
	var purchaseActions = document.createElement('div')
	purchaseActions.setAttribute('class', 'purchase-actions-div')
	purchaseBlock.appendChild(purchaseActions)

	var purchaseActionTransit = document.createElement('div')
	purchaseActionTransit.setAttribute('class', 'purchase-icon')
	purchaseActionTransit.setAttribute('onClick', `updatePurchaseStatus("${ID}", "in transit")`)
	purchaseActionTransit.innerHTML = ''
	purchaseActions.appendChild(purchaseActionTransit)

	var purchaseActionProcessing = document.createElement('div')
	purchaseActionProcessing.setAttribute('class', 'purchase-icon')
	purchaseActionProcessing.setAttribute('onClick', `updatePurchaseStatus("${ID}", "processing")`)
	purchaseActionProcessing.innerHTML = ''
	purchaseActions.appendChild(purchaseActionProcessing)

	var purchaseActionListed = document.createElement('div')
	purchaseActionListed.setAttribute('class', 'purchase-icon')
	purchaseActionListed.setAttribute('onClick', `updatePurchaseStatus("${ID}", "listed")`)
	purchaseActionListed.innerHTML = ''
	purchaseActions.appendChild(purchaseActionListed)

	var purchaseActionRepair = document.createElement('div')
	purchaseActionRepair.setAttribute('class', 'purchase-icon')
	purchaseActionRepair.setAttribute('onClick', `updatePurchaseStatus("${ID}", "needs repair")`)
	purchaseActionRepair.innerHTML = ''
	purchaseActions.appendChild(purchaseActionRepair)

    var purchaseActionSold = document.createElement('div')
	purchaseActionSold.setAttribute('class', 'purchase-icon')
	purchaseActionSold.setAttribute('onClick', `updatePurchaseStatus("${ID}", "sold")`)
	purchaseActionSold.innerHTML = ''
	purchaseActions.appendChild(purchaseActionSold)

	var purchaseActionItemized = document.createElement('div')
	purchaseActionItemized.setAttribute('class', 'purchase-icon')
	purchaseActionItemized.setAttribute('onClick', `updatePurchaseStatus("${ID}", "itemized")`)
	purchaseActionItemized.innerHTML = ''
	purchaseActions.appendChild(purchaseActionItemized)

    //Details Block
    var purchaseDetails = document.createElement('div')
	purchaseDetails.setAttribute('class', 'purchase-details-div')
	purchaseBlock.appendChild(purchaseDetails)
    purchaseDetails.addEventListener('click', () => {
        if(document.getElementById(`purchase-bottom-${ID}`)) {
            $(`#purchase-bottom-${ID}`).toggle()
            let chevron = document.getElementById(`purchase-details-chevron-${ID}`)
            if(document.getElementById(`purchase-bottom-${ID}`).style.display == 'none') {
                chevron.setAttribute('class', 'purchase-chevron')
            } else {
                chevron.setAttribute('class', 'purchase-chevron-down')
            }
        } else {
            buildInfoBlock(ID, index)
        }
    })

    var purchaseDetailsText = document.createElement('div')
	purchaseDetailsText.setAttribute('class', 'purchase-details-text')
    purchaseDetailsText.innerHTML = 'Details'
	purchaseDetails.appendChild(purchaseDetailsText)

    var purchaseDetailsChevron = document.createElement('div')
	purchaseDetailsChevron.setAttribute('class', 'purchase-chevron')
    purchaseDetailsChevron.innerHTML = ''
    purchaseDetailsChevron.setAttribute('id', `purchase-details-chevron-${ID}`)
	purchaseDetails.appendChild(purchaseDetailsChevron)
}


function updatePurchaseStatus(ID, status) {
	database.collection('purchases').doc(ID).update( {'status' : status} )
	
	showPurchases()
}


//Helper Functions

function formatDate(epochDate) {
	var date = new Date(epochDate)
	var formattedDate = date.toLocaleDateString("en-US", {month:'long', day: 'numeric',
			hour: 'numeric', minute:'numeric'})
	return formattedDate
}



//Build bottom block

function buildInfoBlock(purchaseID, index) {

    database.collection("purchases").doc(purchaseID).get().then(function(doc) {
        let data = doc.data()

        let purchaseBlockNode = document.getElementById(purchaseID)
        console.log(index)
        //Main Area
        let purchaseBlockBottom = document.createElement('div')
        if (index % 2 == 0) {
            purchaseBlockBottom.setAttribute('class', 'purchase-block-bottom-gray')
        } else {
            purchaseBlockBottom.setAttribute('class', 'purchase-block-bottom-black')
        }
        purchaseBlockBottom.setAttribute('id', `purchase-bottom-${purchaseID}`)
        purchaseBlockNode.insertAdjacentElement('afterend', purchaseBlockBottom)

        //Left Container
        let purchaseBlockBottomLeft = document.createElement('div')
        purchaseBlockBottomLeft.setAttribute('class', 'purchase-block-bottom-left')
        purchaseBlockBottom.appendChild(purchaseBlockBottomLeft)
    
        let purchaseHeaderLeft = document.createElement('div')
        purchaseHeaderLeft.setAttribute('class', 'purchase-header-left')
        purchaseHeaderLeft.innerHTML = 'Photos'
        purchaseBlockBottomLeft.appendChild(purchaseHeaderLeft)

        let photos = data.photos
        for (var photo in photos) {
            if(photos.hasOwnProperty(photo)) {
                let purchaseImage = document.createElement('img')
                purchaseImage.setAttribute('class', 'purchase-image')
                purchaseImage.src = photos[photo]
                purchaseBlockBottomLeft.appendChild(purchaseImage)
            }
        }

        //Middle Container
        let purchaseBlockBottomMiddle = document.createElement('div')
        purchaseBlockBottomMiddle.setAttribute('class', 'purchase-block-bottom-middle')
        purchaseBlockBottom.appendChild(purchaseBlockBottomMiddle)

        let purchaseDividerMiddle = document.createElement('div')
        purchaseDividerMiddle.setAttribute('class', 'purchase-divider-middle')
        purchaseBlockBottomMiddle.appendChild(purchaseDividerMiddle)

        let purchaseInfoNotesDiv = document.createElement('div')
        purchaseInfoNotesDiv.setAttribute('class', 'purchase-info-div')
        purchaseBlockBottomMiddle.appendChild(purchaseInfoNotesDiv)

        let purchaseInfoNotesHeader = document.createElement('div')
        purchaseInfoNotesHeader.setAttribute('class', 'purchase-bottom-subheader')
        purchaseInfoNotesHeader.innerHTML = 'Notes'
        purchaseInfoNotesDiv.appendChild(purchaseInfoNotesHeader)

        let purchaseInfoNotes = document.createElement('div')
        purchaseInfoNotes.setAttribute('class', 'purchase-info')
        purchaseInfoNotes.innerHTML = data.notes
        purchaseInfoNotesDiv.appendChild(purchaseInfoNotes)


        let purchaseInfoLocationDiv = document.createElement('div')
        purchaseInfoLocationDiv.setAttribute('class', 'purchase-info-div')
        purchaseBlockBottomMiddle.appendChild(purchaseInfoLocationDiv)

        let purchaseInfoLocationHeader = document.createElement('div')
        purchaseInfoLocationHeader.setAttribute('class', 'purchase-bottom-subheader')
        purchaseInfoLocationHeader.innerHTML = 'Location Bought'
        purchaseInfoLocationDiv.appendChild(purchaseInfoLocationHeader)

        let purchaseInfoLocation = document.createElement('div')
        purchaseInfoLocation.setAttribute('class', 'purchase-info')
        purchaseInfoLocation.innerHTML = data.location['formatted_address']
        purchaseInfoLocationDiv.appendChild(purchaseInfoLocation)

        let addItemContainer = document.createElement('div')
        addItemContainer.setAttribute('class', 'add-item-container')
        purchaseBlockBottomMiddle.appendChild(addItemContainer)

        let addItemPlus = document.createElement('div')
        addItemPlus.setAttribute('class', 'add-item-plus')
        addItemPlus.innerHTML = ''
        addItemContainer.appendChild(addItemPlus)

        let addItemText = document.createElement('div')
        addItemText.setAttribute('class', 'add-item-text')
        addItemText.innerHTML = 'Add Item'
        //TODO: Onclick
		addItemContainer.setAttribute('onClick', `showAITPModal("${purchaseID}", "${data.time}")`)
        addItemContainer.appendChild(addItemText)

        //Right Container
        let purchaseBlockBottomRight = document.createElement('div')
        purchaseBlockBottomRight.setAttribute('class', 'purchase-block-bottom-right')
        purchaseBlockBottom.appendChild(purchaseBlockBottomRight)
        
        let itemizationHeaderDiv = document.createElement('div')
        itemizationHeaderDiv.setAttribute('class', 'itemization-header-div')
        purchaseBlockBottomRight.appendChild(itemizationHeaderDiv)

        let headerTextArray = ['Item ID', 'Product Title', 'Purchase Price', 'Status', 'Revenue']
        for (i = 0; i < 5; i++) {
            let letItemizationHeader = document.createElement('div')
            letItemizationHeader.setAttribute('class', 'itemization-header')
            letItemizationHeader.innerHTML = headerTextArray[i]
            itemizationHeaderDiv.appendChild(letItemizationHeader)
        }

        let itemizationArea = document.createElement('div')
        itemizationArea.setAttribute('class', 'itemization-area')
		itemizationArea.id = `sub-purchases-area-${purchaseID}`
        purchaseBlockBottomRight.appendChild(itemizationArea)

        buildSubPurchases(purchaseID, itemizationArea)
    })
}

function buildSubPurchases(purchaseID, DOMElement) {
	while(DOMElement.firstChild) {
		DOMElement.removeChild(DOMElement.firstChild)
	}

    //TODO: Loop through sub purchase collection
    database.collection("purchases").doc(purchaseID).collection("subPurchases").get().then(function(subpurchases) {

        subpurchases.forEach(function(doc)  {
            var data = doc.data()
            let subPurchaseArray = [doc.id, data.productTitle, data.purchasePrice, data.status, data.revenue]
            let purchaseItemizationBlock = document.createElement('div')
            purchaseItemizationBlock.setAttribute('class', 'purchase-itemization-block')
            DOMElement.appendChild(purchaseItemizationBlock)

            for (i=0; i<5; i++) {
                let itemizationSubtext = document.createElement('div')
                itemizationSubtext.setAttribute('class', 'itemization-subtext')
                itemizationSubtext.innerHTML = subPurchaseArray[i]
                purchaseItemizationBlock.appendChild(itemizationSubtext)
            }
        })
    })
}





//HTML Elements
let globalAITPID, globalPurchaseDate

let aitpModal = document.getElementById('aitp-modal')
let aitpCloseModal = document.getElementById('aitp-close-modal')
let aitpSearchField = document.getElementById('aitp-search-field')
let aitpSearchEnter = document.getElementById('aitp-search-enter')
let aitpSearchResults = document.getElementById('aitp-search-results')

aitpCloseModal.addEventListener('click', () => {
    $('#aitp-modal').fadeOut()

    resetAITPSearchModal()
})

aitpSearchEnter.addEventListener('click', () => {
    // only query string
    let queryString = aitpSearchField.value
    
    // index.search(queryString).then(({ hits }) => {
    //     console.log(hits);
    // })
})

function resetAITPSearchModal() {
    while(aitpSearchResults.firstChild) {
        aitpSearchResults.removeChild(aitpSearchResults.firstChild)
    }

    //Reset results?
}

resetAITPSearchModal()
$('#dumbass-w-form').removeClass('w-form')
$('#dumbass-w-form-2').removeClass('w-form')


function showAITPModal(purchaseID, purchaseDate) {
  $('#aitp-modal').fadeIn().css('display', 'flex')
  globalAITPID = purchaseID
  globalPurchaseDate = parseFloat(purchaseDate)
  console.log('Global Purchase ID: ' + globalAITPID)
  resetAITPSearchModal()
}


//Algolia
const searchClient = algoliasearch('EXJJGW7VTC', '6253027161abf2af452a4c3551a7d6ab');
  
const search = instantsearch({
    indexName: 'products_gametree',
    searchClient,
});

function createProductSearchResult(results) {
    let hitsContainer = document.createElement('div')
    hitsContainer.className = 'aitp-SearchResults'
    console.log(results.hits)

    results.hits.forEach(function(hit, hitIndex) {
        let aitpSearchResultDiv = document.createElement('div')
        aitpSearchResultDiv.className = 'aitp-search-result-div'
        hitsContainer.appendChild(aitpSearchResultDiv)

        let aitpImage = document.createElement('img')
        aitpImage.className = 'aitp-image'
        aitpImage.src = hit.productImage
        aitpSearchResultDiv.appendChild(aitpImage)

        let aitpProductInfoDiv = document.createElement('div')
        aitpProductInfoDiv.className = 'aitp-product-info-div'
        aitpSearchResultDiv.appendChild(aitpProductInfoDiv)
    
        let aitpProductTitle = document.createElement('div')
        aitpProductTitle.className = 'aitp-product-title'
        aitpProductTitle.innerHTML = instantsearch.highlight({ attribute: `general.productName`, hit })
        aitpProductInfoDiv.appendChild(aitpProductTitle)

        let aitpProductPlatform = document.createElement('div')
        aitpProductPlatform.className = 'aitp-product-subtitle'
        aitpProductPlatform.innerHTML = 'Platform: ' + instantsearch.highlight({ attribute: `brand`, hit, highlightedTagName: 'em', })
        aitpProductInfoDiv.appendChild(aitpProductPlatform)

        let aitpActionsWrapper = document.createElement('div')
        aitpActionsWrapper.className = 'aitp-actions-wrapper'
        aitpSearchResultDiv.appendChild(aitpActionsWrapper)

        let aitpPurchasePriceField = document.createElement('input')
        aitpPurchasePriceField.className = 'aitp-purchase-price-field w-input'
        aitpPurchasePriceField.id = `purchasePriceField-${hit.objectID}`
        aitpPurchasePriceField.placeholder = '$00.00'
        aitpActionsWrapper.appendChild(aitpPurchasePriceField)

        const conditionOptions = ['Acceptable', 'Good', 'Fantastic', 'New']
        const conditionPaths = ['usedAcceptable', 'usedGood', 'usedFantastic', 'new']

        let aitpDropdown = document.createElement('select')
        aitpDropdown.className = 'aitp-dropdown'
        aitpDropdown.placeholder = 'Condition'
        aitpDropdown.id = `item-condition-${hit.objectID}`
        for (const condition of conditionOptions) {
            var option = document.createElement('option')
            option.value = conditionPaths[conditionOptions.indexOf(condition)]
            option.text = condition
            aitpDropdown.appendChild(option)
        }
        aitpActionsWrapper.appendChild(aitpDropdown)

        let aitpButton = document.createElement('div')
        aitpButton.className = 'aitp-button'
        aitpButton.innerHTML = 'ADD ITEM'
        aitpButton.setAttribute('onClick', `addItemToPurchase("${hit.objectID}", "${hit.general.productName}")`)
        aitpActionsWrapper.appendChild(aitpButton)
    })

    return hitsContainer.outerHTML
}

// Create the render function
const renderAutocomplete = (renderOptions, isFirstRender) => {
  const { indices, currentRefinement, refine, widgetParams } = renderOptions;

  if (isFirstRender) {
    const input = document.querySelector('#aitp-search-field');

    input.addEventListener('input', event => {
      refine(event.currentTarget.value);
    });
  }

  document.querySelector('#aitp-search-field').value = currentRefinement;
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
    container: document.querySelector('#aitp-search-results'),
  })
  
]);

search.start()


function addItemToPurchase(GTIN, productTitle) {
    console.log(GTIN)
    let conditionDropdown = document.getElementById(`item-condition-${GTIN}`)
    let itemCondition = conditionDropdown.options[conditionDropdown.selectedIndex].value
    let purchasePrice = parseFloat(document.getElementById(`purchasePriceField-${GTIN}`).value)

    if (isNaN(purchasePrice)) {
      showErrorMessage('Please enter a valid purchase price.')

    } else if (itemCondition == '') {
      showErrorMessage('Please choose an item condiiton')
      
    } else {
      database.collection('purchases').doc(globalAITPID).get().then(function(doc) {
        var data = doc.data()
        var numItems = data.numItems + 1
        let newID = `${globalAITPID}-${numItems}`
  
        var promises = []
        //Update counter
        var numItemsUpdateDict = {}
        numItemsUpdateDict['numItems'] = firebase.firestore.FieldValue.increment(1)
        var numItemsPromise = database.collection('purchases').doc(globalAITPID).update(numItemsUpdateDict).then(function() {
          console.log('Num items successfully updated')
        }).catch(function(error) {
          showErrorMessage(error)
        })
  
        //Add to purchase sub collection
        var subPurchaseDict = {
          'GTIN' : GTIN,
          'purchasePrice' : parseFloat(document.getElementById(`purchasePriceField-${GTIN}`).value),
          'productTitle' : productTitle,
          'condition' : itemCondition,
          'revenue' : 0,
          'status' : 'processing'
        }
        var subPurchasePromise = database.collection('purchases').doc(globalAITPID).collection('subPurchases').doc(newID).set(subPurchaseDict).then(function() {
          console.log('Sub-Purchase successfully updated')
        }).catch(function(error) {
          showErrorMessage(error)
        })
  
        //Add item to inventory collection with sequential globalAITPID-# identifier
        var inventoryDict = {
          'GTIN' : GTIN,
          'purchasePrice' : parseFloat(document.getElementById(`purchasePriceField-${GTIN}`).value),
          'condition': itemCondition,
          'platformSold' : '',
          'productTitle' : productTitle,
          'purchaseDate' : globalPurchaseDate,
          'sellingFees' : 0,
          'shippingFees' : 0,
          'sold' : 0,
          'taxes' : 0,
          'status' : 'processing',
        }
        var inventoryPromise = database.collection('inventory').doc(newID).set(inventoryDict).then(function() {
          console.log('Inventory successfully updated')
        }).catch(function(error) {
          showErrorMessage(error)
        })
  
        //Update catalog availability for item condition
        let catalogUpdateDict = {}
        catalogUpdateDict[`availability.${newID}`] = itemCondition
        var availabilityPromise = database.collection('catalog').doc(GTIN).update(catalogUpdateDict).then(function() {
          console.log('Availability successfully updated')
        }).catch(function(error) {
          showErrorMessage(error)
        })
  
        promises.push(numItemsPromise, subPurchasePromise, inventoryPromise, availabilityPromise)
  
        Promise.all(promises).then(results => {
          showErrorMessage(`Item successfully added to purchase: ${globalAITPID}`)
          let subPurchasesArea = document.getElementById(`sub-purchases-area-${globalAITPID}`)
          buildSubPurchases(globalAITPID, subPurchasesArea)
        })
      })
    }
}
