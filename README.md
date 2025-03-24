<!-- 
> ⭐ ***README** to coś więcej niż opis. Poprzez nie **pokazujesz swoje mocne strony** – swoją dokładność, sposób myślenia i podejście do rozwiązywania problemów. Niech Twoje README pokaże, że masz **świetne predyspozycje do rozwoju!***
> 
> 🎁 *Zacznij od razu. Skorzystaj z **[szablonu README i wskazówek](https://github.com/devmentor-pl/readme-template)**.* 

&nbsp;


# JavaScript: API oraz FETCH

## Wprowadzenie

Wracamy do naszego zlecenia związanego z wycieczkami. Chcemy przebudować kod, wykorzystując nowo poznane informacje.

Dzielimy naszą aplikację na dwie części. 

### Client

To część związana z tym, co może zrobić użytkownik:
* wybrać wycieczkę przez wprowadzenie ilości zamawianych biletów w odpowiednie pola formularza i kliknięcie `dodaj do zamówienia`. Wiąże się to z:
    * walidacją danych
    * dodawaniem zamówienia do panelu z prawej strony, tj. do koszyka
    * aktualizowaniem ceny za całość
* potwierdzić zamówienie poprzez wprowadzenie imienia, nazwiska oraz adresu email do pola zamówienia i kliknięcie `zamawiam`. Wiąże się to z:
    * walidacją danych
    * wysłaniem zamówienia do bazy danych (u nas to będzie API uruchomione dzięki JSON Server)
    * wyczyszczeniem koszyka.

Pliki powiązane:
* `./src/index.html`
* `./src/js/client.js`
* `./src/css/client.css`

### Admin    
Panel zarządzania wycieczkami zapisanymi w bazie danych. Jego funkcjonalności to: 
* dodawanie wycieczek
* usuwanie wycieczek
* modyfikowanie wycieczek.

Pliki powiązane:
* `./src/admin.html`
* `./src/js/admin.js`
* `./src/css/admin.css`

## Implementacja

### Webpack

W tym zadaniu wykorzystamy webpacka, którego omawialiśmy w materiale dotyczącym ES2015+. 

Zauważ, że posiada on dodatkową konfigurację, która obsługuje podział aplikacji na dwie części. Zwróć szczególną uwagę na tzw. [chunki](https://webpack.js.org/glossary/#c).

Webpack zajmuje się również wczytaniem plików CSS (zobacz importy w `client.js` oraz `admin.js`) – dzieje się to dzięki odpowiednim loaderom dla plików o rozszerzeniu `.css` w `webpack.config.js`. Style są wczytywane do `<head>`, więc nie zdziw się, że pliki CSS nie są generowane.

Pamiętaj, aby przed uruchomieniem webpacka zainstalować wszystkie zależności komendą
```
npm install
```
Potem dopiero możesz go uruchomić poprzez `npm start`.

Jeśli chcesz odpalić wersję `client`, to wystarczy wpisać w przeglądarkę `http://localhost:8080/index.html`. Natomiast `admin` jest dostępny pod adresem: `http://localhost:8080/admin.html`.

> **Uwaga!** Jeśli nie widzisz poprawnych numerów linii kodu dla błędów w konsoli, to prawdopodobnie nie masz włączonej obsługi source maps dla plików JavaScript. Możesz to zmienić w [ustawieniach przeglądarki Chrome](https://developers.google.com/web/tools/chrome-devtools/javascript/source-maps).

### JSON Server

Podczas przerabiania materiałów zainstalowaliśmy globalnie JSON Server, dlatego teraz wystarczy, że go uruchomimy. Pamiętaj, że bez tego nasze API nie będzie działać. 

Odpalamy kolejny terminal (webpack już jest uruchomiony w jednym) i przechodzimy do katalogu głównego z zadaniem. Następnie wpisujemy do terminala:
```
json-server --watch ./data/excursions.json
```

Od teraz API będzie dostępne pod adresem: http://localhost:3000. Zauważ jednak, że w pliku mamy dwa różne zasoby, czyli:
* excursions
* orders.

W zależności od tego, na jakich danych będziesz chciał pracować, do `fetch()` przekażesz inny URL, tj.:
* http://localhost:3000/excursions – zarządzanie wycieczkami
* http://localhost:3000/orders – zarządzanie zamówieniami.

### Fetch

Nasza komunikacja z uruchomionym API będzie się odbywać przy pomocy `fetch()`, który został opisany w materiałach tego modułu.

Choć `fetch()` jest [wspierany przez najnowsze przeglądarki](https://caniuse.com/#feat=fetch), to nie powinniśmy zapominać o wsparciu dla tych starszych.

W takim przypadku możemy wykorzystać tzw. [polyfill](https://pl.wikipedia.org/wiki/Polyfill), który doda niewspieraną przez przeglądarkę funkcjonalność.

Możesz do tego wykorzystać [whatwg-fetch](https://github.com/github/fetch).

### ExcursionsAPI

W katalogu `./src/js` znajdziesz plik `ExcursionsAPI.js`, który zawiera klasę o tej samej nazwie.

Został on stworzony, aby przechowywać w jednym miejscu całą komunikację z API.

To tutaj powinny być zdefiniowane metody, które odpytują API, np. pozwalają pobrać wycieczki z bazy lub je do niej dodać.

Ta klasa będzie używana zarówno po stronie `client`, jak i `admin`, dlatego też została już zaimportowana do obu plików JS odpowiedzialnych za każdą z części.

### Prototypy

Zauważ, że w kodzie występują prototypy (`.*--prototype`). Są one używane tylko po to, aby ułatwić prezentację danych.

Docelowo mają być one niewidoczne – możesz je ukryć przy pomocy CSS (`display: none`). Warto je jednak wykorzystać do skopiowania struktury kodu HTML, aby nie musieć budować jej od podstaw w kodzie JS.

## Podsumowanie

Postaraj się wykonać to zadanie w taki sposób, aby zarządzanie wycieczkami było wygodne, a ich zamawianie intuicyjnie. 

Miej cały czas z tyłu głowy, że może kiedyś nasz kod znów będzie trzeba przebudować lub wykorzystać w innym projekcie, dlatego powinien on być jak najbardziej elastyczny (zasada pojedynczej odpowiedzialności), a nazwy plików, klas i metod – dopasowane do zawartości i logiki działania tych elementów (tzw. [samodokumentujący się kod](https://en.wikipedia.org/wiki/Self-documenting_code)).

Jeśli uznasz to za słuszne, możesz zmodyfikować kod HTML i CSS, aby zwiększyć funkcjonalność całego rozwiązania. -->



![screen or GIF of your app](https://via.placeholder.com/1000x300)


# Find your perfect trip

See the live version of this project - [Find your perfect trip](https://devmentor.pl).

The goal of this project is to showcase my understanding of REST API through an application that allows users to find the perfect weekend excursion. The excursion data is fetched from a fake API and displayed on the main page. Each trip includes a detailed description, as well as pricing for both adults and children.
Users can place an order by selecting the number of participants (adults and children), adding excursions to the cart, and then providing their contact information – name, surname, and email address. The submitted order, along with the entered details, is sent to the API, where the administrator can view all received orders.
The project also includes an admin panel that allows managing excursions – adding new ones and editing existing entries.

**Main features**:
- Displaying available excursions to the user by fetching data from the API (http://localhost:3000/excursions) – managing the excursion list.
- Allowing users to place an order by adding excursions to the cart and filling out all required, validated fields. The submitted order is then sent to the API (http://localhost:3000/orders) – managing orders.
- An admin panel that allows adding and editing excursions.


&nbsp;
 
## 💡 Technologies
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![REST API](https://img.shields.io/badge/REST%20API-%23000000.svg?style=for-the-badge&logo=api&logoColor=white)



&nbsp;
 
## 🔗 See also

Are you interested in **RWD** and **CSS**? See my other project [Responsive Layout Showcase](https://github.com/marrcelp/RWD_project-html-css).

&nbsp;
 
## 💿 Installation

The project uses [npm](https://www.npmjs.com/). To install it, type into the terminal: `npm install`. To run the project, use the command: `npm start`. Start the fake API using json-server: `json-server --watch ./data/excursions.json`.

If you want to launch the client version, simply open http://localhost:8080/index.html in your browser.
The admin panel is available at: http://localhost:8080/admin.html.


&nbsp;
 
## 🤔 Solutions provided in the project

- Fetching data from API:
To load excursions, I used the Fetch API to request data from a fake server and display it dynamically on the webpage.
The API requests are handled in the ExcursionsAPI class, ensuring a separation of concerns and making the code more modular and easier to maintain.
```
fetch(this.apiExcursions)
    .then(resp => resp.json())
    .then(data => { renderExcursions(data); })
    .catch(err => console.error(err));
```

 &nbsp;

- Handling the cart system:
A cart system was implemented to allow users to add excursions to the cart, specify the number of adults and children, and calculate the total price.
The data is stored in an array (basket) and dynamically updated in the UI.
```
basket.push({
    "id": excursion.id,
    "city": excursion.city,
    "priceForAdult": excursion.priceForAdult,
    "priceForChild": excursion.priceForChild,
    "adults": tripAdults,
    "children": tripChildren
});
```
 &nbsp;

- Admin Panel for CRUD Operations:
The admin panel allows adding, editing, and deleting excursions. Data is sent and updated via POST and PUT methods, and all excursions are reloaded after any change to ensure the UI is updated.
```
fetch(this.apiExcursions, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
});
```


| Issue                     | Solution                       |   Example Code  |
| ------------------------- | -----------------------------  | --- |
| Fetching and handling API data                       | Using the Fetch API for asynchronous data fetching         |  `fetch(url).then(resp => resp.json())`   |
| Adding and updating the cart                     | Dynamically updating the cart with user input        | `basket.push({ id, city, priceForAdult, adults, children })`    |
| Admin panel functionality                    | Providing CRUD operations with real-time UI updates         | `fetch(this.apiExcursions, { method: 'POST' })`    |

&nbsp;

- Client-side form validation:
I implemented basic client-side validation for the order form to ensure the user fills out all required fields before submitting. If validation fails, the user is alerted with the specific error.
```
if (required && value.length === 0) {
    alert(`Field ${label} is required!`);
}
```

&nbsp;

- Cloning prototype HTML elements:
To dynamically generate excursion list items and summary entries, I used a hidden HTML prototype element (with a --prototype class). This element is cloned, updated with specific data, and then appended to the DOM. This approach simplifies rendering, keeps the UI consistent, and avoids manually creating elements in JavaScript.
```
const liElCopy = liElement.cloneNode(true);
liElCopy.classList.remove('excursions__item--prototype');
tripTitle.textContent = excursion.city;
ulElement.appendChild(liElCopy);
```

&nbsp;

## 💭 Conclusions for future projects

I would like to improve:

#### Handling API Errors More Gracefully:
Currently, errors from the API are logged in the console, but it would be better to display user-friendly error messages directly in the UI to guide users in case of issues like server downtime.
```
.catch(err => alert('There was an error fetching the data. Please try again later.'));
```

#### Optimizing State Management:
While the current approach of managing the cart system works, it would be beneficial to look into more advanced state management techniques such as Redux or React Context to improve scalability and maintainability of the application.


&nbsp;

## 🙋‍♂️ Feel free to contact me
Write sth nice ;) Find me on:

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/marcel-piaszczyk-200ba8181/)
[![Gmail](https://img.shields.io/badge/Gmail-%23D14836.svg?style=for-the-badge&logo=gmail&logoColor=white)](mailto:marcel.piaszczyk@gmail.com)


&nbsp;

## 👏 Special thanks
Thanks to my [Mentor - devmentor.pl](https://devmentor.pl/) – for providing me with this task and for code review.