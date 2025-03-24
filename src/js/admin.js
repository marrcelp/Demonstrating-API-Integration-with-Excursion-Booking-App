import './../css/admin.css';

import ExcursionsAPI from './ExcursionsAPI';
import newExcursionData from './formFields';

console.log('admin');

document.addEventListener('DOMContentLoaded', init);

let isEditing = false; 
let currentEditingId = null; 

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
    const btnEdit = liElCopy.querySelector('.excursions__field-input--update');

    tripTitle.textContent = excursion.city;
    tripDescription.textContent = excursion.description;
    tripPriceAdult.textContent = excursion.priceForAdult;
    tripPriceChildren.textContent = excursion.priceForChild;

    ulElement.appendChild(liElCopy);
    
    deleteExcursion(btnRemove, excursion, liElCopy);
    editExcursion(btnEdit, excursion)
}

function deleteExcursion(btn, excursion, li){

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const excursionApi = new ExcursionsAPI;

        excursionApi.deleteExcursion(excursion.id);
        li.remove();
    })
}

function editExcursion(btnEdit, excursion) {
    btnEdit.addEventListener('click', (e) => {
        e.preventDefault();

        isEditing = true; 
        currentEditingId = excursion.id; 

        formExcursion.elements['city'].value = excursion.city;
        formExcursion.elements['description'].value = excursion.description;
        formExcursion.elements['priceForAdult'].value = excursion.priceForAdult;
        formExcursion.elements['priceForChild'].value = excursion.priceForChild;
    });
}


const formExcursion = document.querySelector('.form');

formExcursion.addEventListener('submit', (e) => {
    e.preventDefault();

    
    
    const excursionData = {};
    
    for (const field of newExcursionData) {
        const {name, label, type, required = true} = field;
        const value = formExcursion.elements[name].value;
        
        if (required && value.length === 0) {
            alert(`Dane w polu ${label} są wymagane!`);
            return;
        } else {
            excursionData[name] = value;
        }
    }

    const api = new ExcursionsAPI();

    if (isEditing) {
    
        excursionData.id = currentEditingId;
        api.updateExcursion(excursionData, currentEditingId) 
        alert('Pomyślnie zmieniono dane wycieczki!');
        location.reload();   
            
        isEditing = false;
        currentEditingId = null;
        
    } else {
        
        api.addExcursion(excursionData)
        alert('Pomyślnie dodano wycieczkę!');
        location.reload();
            
    }
});