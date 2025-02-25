class ExcursionsAPI {
    
    constructor(){
        this.apiUrl = 'http://localhost:3000/excursions'
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
        return this.fetchExcursions(this.apiUrl)
            .then(data => {
                console.log(data);
                return data;
            })
            .catch(err => console.error(err))
            .finally(() => console.log('Zakonczono pobieranie wycieczek z API'));
    }

}



export default ExcursionsAPI;