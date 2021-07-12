//Initialize database
var database = firebase.firestore()

//FILTERS
var tabFilters = ["in transit", "processing", "listed", "needs repair", "sold"]
var purchaseFilters = "All prices"

//______________________

//Tab filters
var allTab = document.getElementById('purchase-filter-all')
var inTransitTab = document.getElementById('purchase-filter-in-transit')
var processingTab = document.getElementById('purchase-filter-processing')
var listedTab = document.getElementById('purchase-filter-listed')
var repairsTab = document.getElementById('purchase-filter-repairs')
var soldTab = document.getElementById('purchase-filter-sold')

//Tab filter onclick listeners
allTab.addEventListener('click', allPurchases)
inTransitTab.addEventListener('click', inTransitPurchases)
processingTab.addEventListener('click', processingPurchases)
listedTab.addEventListener('click', listedPurchases)
repairsTab.addEventListener('click', repairsPurchases)
soldTab.addEventListener('click', soldPurchases)

//Tab filter functions
function allPurchases() {
	tabFilters = ["in transit", "processing", "listed", "needs repair", "sold"]
	showPurchases()
	
	allTab.className = 'purchase-filters-selected'
	inTransitTab.className = 'purchase-filter'
	processingTab.className = 'purchase-filter'
	listedTab.className = 'purchase-filter'
	repairsTab.className = 'purchase-filter'
	soldTab.className = 'purchase-filter'
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

    //Details Block
    var purchaseDetails = document.createElement('div')
	purchaseDetails.setAttribute('class', 'purchase-details-div')
	purchaseBlock.appendChild(purchaseDetails)
    purchaseDetails.addEventListener('click', () => {
        if(document.getElementById(`purchase-bottom-${ID}`)) {
            $(`#purchase-bottom-${ID}`).toggle()
            let chevron = document.getElementById(`purchase-details-chevron-${ID}`)
            chevron.get.style.transform = 'rotate(90deg)'
        } else {
            buildInfoBlock(ID)
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
