import './../css/client.css';

import ExcursionsAPI from './ExcursionsAPI';

document.addEventListener('DOMContentLoaded', init);

function init() {

    const excursionsAPI = new ExcursionsAPI();

    excursionsAPI.loadExcursions()
    .then(excursions => {
        excursions.forEach((excursion) => {
            renderTripDetails(liEl, ulEl, excursion);
        })
    })
}

console.log('client');

const ulEl = document.querySelector('.panel__excursions');
const liEl = document.querySelector('.excursions__item--prototype')
const totalPrice = document.querySelector('.order__total-price-value');

const basket = [];

function renderTripDetails(liElement, ulElement, excursion){
        
    liElement.remove()
    //TODO: zmienic w style display: none dla prototypu.
    const liElCopy = liElement.cloneNode(true);
    liElCopy.classList.remove('excursions__item--prototype');

    const tripTitle = liElCopy.querySelector('.excursions__title');
    const tripDescription = liElCopy.querySelector('.excursions__description');
    const tripPriceAdult = liElCopy.querySelector('.excursions__price--adult');
    const tripPriceChildren = liElCopy.querySelector('.excursions__price--children');
    const tripBtn = liElCopy.querySelector('.excursions__field-input--submit');

    tripTitle.textContent = excursion.city;
    tripDescription.textContent = excursion.description;
    tripPriceAdult.textContent = excursion.priceForAdult;
    tripPriceChildren.textContent = excursion.priceForChild;

    ulElement.appendChild(liElCopy);

    addExcursionToBasket(tripBtn, excursion, liElCopy);
    
}

function addExcursionToBasket(btn, excursion, liElCopy){

    btn.addEventListener('click', (e) => {
    
        e.preventDefault();

        const tripAdultsInput = liElCopy.querySelector('input[name="adults"]');
        const tripChildrenInput = liElCopy.querySelector('input[name="children"]');
        const tripAdults = Number(tripAdultsInput.value) || 0;
        const tripChildren = Number(tripChildrenInput.value) || 0;

        if (tripAdults === 0 && tripChildren === 0) {
            alert("Musisz dodać przynajmniej jedną osobę.");
            return;
        }

        const existingTrip = basket.find(element => element.id === excursion.id);

        if (existingTrip) {
            existingTrip.adults += tripAdults;
            existingTrip.children += tripChildren;
            console.log(basket);

        } else {

            const excursionData = {
                
                "id": excursion.id,
                "country": excursion.country,
                "city": excursion.city,
                "priceForAdult": excursion.priceForAdult,
                "priceForChild": excursion.priceForChild,
                "adults": tripAdults,
                "children": tripChildren
            }

            basket.push(excursionData);
            console.log(basket);
        }

        totalPrice.textContent = `${calculateTotalPrice(basket)} PLN`;
        tripAdultsInput.value = '';
        tripChildrenInput.value = '';

        createSummary(basket);
    })

}

function calculateTotalPrice(basket){

    const total = basket.reduce((acc, trip) => {
        const priceForTrip = Number((trip.adults * trip.priceForAdult) + (trip.children * trip.priceForChild));
        return acc + priceForTrip;
    }, 0)
    
    return total;
}


const summaryList = document.querySelector('.summary');

function createSummary(basket){

    Array.from(summaryList.children).forEach(function(item) { // tworzę tablicę z "dzieci"
        if(!item.className.includes('--prototype')) { // sprawdzam czy nie jest to prototyp
            item.remove(); // usuwam element
        }
    })

    basket.forEach((element) => {   

        const summaryElement = document.querySelector('.summary__item--prototype');
        const summaryElementCopy = summaryElement.cloneNode(true);
        const name = summaryElementCopy.querySelector('.summary__name');
        const total = summaryElementCopy.querySelector('.summary__total-price');
        const prices = summaryElementCopy.querySelector('.summary__prices')
        const btnRemove = summaryElementCopy.querySelector('.summary__btn-remove');
        
        summaryElementCopy.classList.remove('summary__item--prototype');

        name.textContent = element.city;
        total.textContent = `${Number((element.adults * element.priceForAdult) + (element.children * element.priceForChild))} PLN`;
        prices.textContent = `dorośli: ${element.adults} x ${element.priceForAdult}PLN, dzieci: ${element.children} x ${element.priceForChild}PLN`
        btnRemove.textContent = '(X)';

        summaryList.appendChild(summaryElementCopy);

        btnRemove.addEventListener('click', function (e) {
            e.preventDefault();
            
            const item = e.target.closest('.summary__item'); 
            const tripName = item.querySelector('.summary__name').textContent;
            
            item.remove(); 
                
            const tripIndex = basket.findIndex((trip) => trip.city === tripName);
                
            if (tripIndex !== -1){
                basket.splice(tripIndex, 1);
            }
            
            totalPrice.textContent = `${calculateTotalPrice(basket)} PLN`;
                
        });
        
    })
    
}
