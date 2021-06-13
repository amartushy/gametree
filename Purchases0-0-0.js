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
	
	allTab.classtitle = 'purchase-filters-selected'
	inTransitTab.classtitle = 'purchase-filters'
	processingTab.classtitle = 'purchase-filter'
	listedTab.classtitle = 'purchase-filter'
	repairsTab.classtitle = 'purchase-filter'
	soldTab.classtitle = 'purchase-filter'
}

function inTransitPurchases() {
	tabFilters = ["in transit"]
	showPurchases()
	
	allTab.classtitle = 'purchase-filter'
	inTransitTab.classtitle = 'purchase-filter'
	processingTab.classtitle = 'purchase-filter'
	listedTab.classtitle = 'purchase-filter'
	repairsTab.classtitle = 'purchase-filter'
	soldTab.classtitle = 'purchase-filter'
}

function processingPurchases() {
	tabFilters = ["processing"]
	showPurchases()
	
	allTab.classtitle = 'purchase-filter'
	inTransitTab.classtitle = 'purchase-filter'
	processingTab.classtitle = 'purchase-filter'
	listedTab.classtitle = 'purchase-filter'
	repairsTab.classtitle = 'purchase-filter'
	soldTab.classtitle = 'purchase-filter'
}

function listedPurchases() {
	tabFilters = ["listed"]
	showPurchases()
	
	allTab.classtitle = 'purchase-filter'
	inTransitTab.classtitle = 'purchase-filter'
	processingTab.classtitle = 'purchase-filter'
	listedTab.classtitle = 'purchase-filter'
	repairsTab.classtitle = 'purchase-filter'
	soldTab.classtitle = 'purchase-filter'
}

function repairsPurchases() {
	tabFilters = ["repairs"]
	showPurchases()
	
	allTab.classtitle = 'purchase-filter'
	inTransitTab.classtitle = 'purchase-filter'
	processingTab.classtitle = 'purchase-filter'
	listedTab.classtitle = 'purchase-filter'
	repairsTab.classtitle = 'purchase-filter'
	soldTab.classtitle = 'purchase-filter'
}

function soldPurchases() {
	tabFilters = ["sold"]
	showPurchases()
	
	allTab.classtitle = 'purchase-filter'
	inTransitTab.classtitle = 'purchase-filter'
	processingTab.classtitle = 'purchase-filter'
	listedTab.classtitle = 'purchase-filter'
	repairsTab.classtitle = 'purchase-filter'
	soldTab.classtitle = 'purchase-filter'
}
