//HTML Elements
const accountButton = document.getElementById('account-button')
const shippingButton = document.getElementById('shipping-button')
const returnsButton = document.getElementById('returns-button')
const billingButton = document.getElementById('billing-button')
const sellingButton = document.getElementById('selling-button')
const supportButton = document.getElementById('support-button')

const accountSection = document.getElementById('account-section')
const shippingSection = document.getElementById('shipping-section')
const returnsSection = document.getElementById('returns-section')
const billingSection = document.getElementById('billing-section')
const sellingSection = document.getElementById('selling-section')
const supportSection = document.getElementById('support-section')


//Event Listeners
accountButton.addEventListener('click', () => {
    accountSection.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
})

shippingButton.addEventListener('click', () => {
    shippingSection.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
})

returnsButton.addEventListener('click', () => {
    returnsSection.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
})

billingButton.addEventListener('click', () => {
    billingSection.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
})

sellingButton.addEventListener('click', () => {
    sellingSection.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
})

supportButton.addEventListener('click', () => {
    supportSection.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
})






for (i = 1; i < 19; i++ ) {
    var toggle = document.getElementById(`topic-${i}-toggle`)
    var text = document.getElementById(`topic-${i}-text`)
    text.style.display = 'none'

    toggle.setAttribute('onClick', `toggleText("${i}")`)
}

function toggleText(index) {

    var icon = document.getElementById(`topic-${index}-icon`)
    var text = document.getElementById(`topic-${index}-text`)

    if(text.style.display == 'none') {
        $(`#topic-${index}-text`).fadeIn()
        document.getElementById(`topic-${index}-icon`).innerHTML = ''
    } else {
        $(`#topic-${index}-text`).fadeOut(200, () => {
            text.style.display = 'none'
            icon.innerHTML = ''
        })
    }
}
