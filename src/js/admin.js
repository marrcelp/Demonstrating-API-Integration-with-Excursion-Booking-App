import './../css/admin.css';

import ExcursionsAPI from './ExcursionsAPI';

console.log('admin');

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

const ulEl = document.querySelector('.panel__excursions');
const liEl = document.querySelector('.excursions__item--prototype')

function renderTripDetails(liElement, ulElement, excursion){
        
    liElement.remove()
    //TODO: zmienic w style display: none dla prototypu.
    const liElCopy = liElement.cloneNode(true);
    liElCopy.classList.remove('excursions__item--prototype');

    const tripTitle = liElCopy.querySelector('.excursions__title');
    const tripDescription = liElCopy.querySelector('.excursions__description');
    const tripPriceAdult = liElCopy.querySelector('.excursions__price--adult');
    const tripPriceChildren = liElCopy.querySelector('.excursions__price--children');
    const btnRemove = liElCopy.querySelector('.excursions__field-input--remove');

    tripTitle.textContent = excursion.city;
    tripDescription.textContent = excursion.description;
    tripPriceAdult.textContent = excursion.priceForAdult;
    tripPriceChildren.textContent = excursion.priceForChild;

    ulElement.appendChild(liElCopy);
    
    deleteExcursion(btnRemove, excursion, liElCopy);
}

function deleteExcursion(btn, excursion, li){

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const excursionApi = new ExcursionsAPI;

        excursionApi.deleteExcursion(excursion.id);
        li.remove();
    })
}

const formExcursion = document.querySelector('.form');

formExcursion.addEventListener('submit', (e) => {
    e.preventDefault();

    const newExcursionData = [
        {
            name: 'city',
            label: 'Nazwa',
            type: 'text'
        },
        {
            name: 'description',
            label: 'Opis',
            type: 'text'
        },
        {
            name: 'priceForAdult',
            label: 'Cena dorosły',
            type: 'number'
        },
        {
            name: 'priceForChild',
            label: 'Cena dziecko',
            type: 'number'
        },
    ]
    
    const excursionData = {};
    
    
    for (const field of newExcursionData) {
        const {name, label, type, required = true} = field;
        const value = formExcursion.elements[name].value;
        
    
        if (required && value.length === 0){
            alert(`Dane w polu ${label} są wymagane!`)
            return
        } else {
            
            excursionData[name] = value;
            
    
        }
    };
    
    const sendToAPI = new ExcursionsAPI;
            sendToAPI.addExcursion(excursionData);
            console.log(excursionData);
            alert(`Pomyślnie dodano wycieczkę!`)
            location.reload();

})



