//Initialize database
var database = firebase.firestore()

//FILTERS
var tabFilters = ["in transit", "processing", "listed", "repairs", "sold"]
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
	tabFilters = ["in transit", "processing", "listed", "repairs", "sold"]
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
	tabFilters = ["repairs"]
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
