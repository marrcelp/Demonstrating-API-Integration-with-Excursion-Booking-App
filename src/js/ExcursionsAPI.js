class ExcursionsAPI {

    constructor(){
        this.apiExcursions = 'http://16.170.252.49:3000/excursions';
        this.apiOrders = 'http://16.170.252.49:3000/orders'
    }

    fetchExcursions(url){

        return fetch(url)
            .then(resp => {
                if(resp.ok){
                    return resp.json();
                }

                return Promise.reject(resp);
            })
    }

    loadExcursions(){
        return this.fetchExcursions(this.apiExcursions)
            .then(data => {
                console.log(data);
                return data;
            })
            .catch(err => console.error(err))
            .finally(() => console.log('Zakonczono pobieranie wycieczek z API'));
    }

    sendOrder(basket){

        const options = {
            method: 'POST',
            body: JSON.stringify(basket),
            headers: {'Content-Type': 'application/json'}
        }

        this.fetchData(this.apiOrders, options)
    }

    deleteExcursion(id){

        const options = {
            method: 'DELETE'
        }

        this.fetchData(`${this.apiExcursions}/${id}`, options, true)
    }

    addExcursion(data){

        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        }

        this.fetchData(this.apiExcursions, options, true);
    }

    updateExcursion(data, id){

        const options = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        }

        this.fetchData(`${this.apiExcursions}/${id}`, options, true)
    }

    fetchData(apiUrl, options, shouldReload = false) {
        fetch(apiUrl, options)
            .then(resp => console.log(resp))
            .catch(err => console.error(err))
            .finally(() => {
                console.log('Zakończono operację fetch');
                if (shouldReload) {
                    this.loadExcursions();
                }
            })
    }

}

export default ExcursionsAPI;




