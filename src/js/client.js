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
const summaryList = document.querySelector('.summary');

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
        total.textContent = `SUMA: ${Number((element.adults * element.priceForAdult) + (element.children * element.priceForChild))} PLN`;
        prices.innerHTML = `dorośli: ${element.adults} x ${element.priceForAdult}PLN<br>dzieci: ${element.children} x ${element.priceForChild}PLN`
        btnRemove.textContent = '(usuń z koszyka)';

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


const orderForm = document.querySelector('.order');
const nameInput = orderForm.querySelector('input[name="name"]');
const emailInput = orderForm.querySelector('input[name="email"]')
const errorList = orderForm.querySelector('.order__errors')


if (orderForm){
    orderForm.addEventListener('submit', validateForm);
}

function validateForm(e){
    e.preventDefault();
    errorList.innerHTML = '';

    const errorMessages = [];
    const fields = [
        {
            name: 'name',
            label: 'Imię i Nazwisko',
            required: true,
            type: 'text'
        },
        {
            name: 'email',
            label: 'E-mail',
            required: true,
            type: 'email',
            pattern: '@'
        },
    ]

    fields.forEach((field) => {
        const {name, label, required, type, pattern = null} = field;
        const value = orderForm.elements[name].value;

        if (required){
            if(value.length === 0 ){
                errorMessages.push(`Dane w polu ${label} są wymagane!`);
            }
        }

        if (pattern){
            const reg = new RegExp(pattern);
            if(!reg.test(value)){
                errorMessages.push(`Dane w polu ${label} mają niepoprawny format!`)
            }
        }

    })

    if (errorMessages.length == 0){
        const newOrder = new ExcursionsAPI;

        const orderData = {
            ...basket,
            name: nameInput.value,
            email: emailInput.value,
            order_date: new Date(),
        }

        newOrder.sendOrder(orderData);
        basket.length = 0;
        createSummary(basket);

        alert (`Dziękujemy za złożenie zamówienia o wartości ${totalPrice.textContent}. Szczegóły zamówienia zostały wysłane na adres e-mail: ${emailInput.value}`);

        nameInput.value = '';
        emailInput.value = '';

    } else {
        errorMessages.forEach((error) => {
            const newLi = document.createElement('li');
            newLi.innerText = error;
            errorList.appendChild(newLi);
        })
    }

}