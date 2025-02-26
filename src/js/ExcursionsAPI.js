class ExcursionsAPI {

    constructor(){
        this.apiExcursions = 'http://localhost:3000/excursions';
        this.apiOrders = 'http://localhost:3000/orders'
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

        fetch(this.apiOrders, options)
            .then(resp => console.log(resp))
            .catch(err => console.error(err))
            .finally(() => console.log('Zakonczono wysylanie zamowienia'))
    }

}



export default ExcursionsAPI;