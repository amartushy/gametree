

window.onload = () => {
    const inventoryItemsContainer = document.getElementById('inventory-grid-form')

    while(inventoryItemsContainer.firstChild) {
        inventoryItemsContainer.removeChild(inventoryItemsContainer.firstChild) 
    }

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
