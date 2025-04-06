![demo gif](./src/css/assets/demo-proj7.gif)


# Find your perfect trip

See the live version of this project - [Find your perfect trip](https://marrcelp.github.io/Demonstrating-API-Integration-with-Excursion-Booking-App/).

The goal of this project is to showcase my understanding of REST API through an application that allows users to find the perfect weekend excursion. The excursion data is fetched from an API hosted on a self-configured server on AWS and displayed on the main page. Each trip includes a detailed description, as well as pricing for both adults and children.
Users can place an order by selecting the number of participants (adults and children), adding excursions to the cart, and then providing their contact information – name, surname, and email address. The submitted order, along with the entered details, is sent to the API, where the administrator can view all received orders.
The project also includes an admin panel that allows managing excursions – adding new ones and editing existing entries.

**Main features**:
- Displaying available excursions to the user by fetching data from the API (http://16.170.252.49:3000/excursions) – managing the excursion list.
- Allowing users to place an order by adding excursions to the cart and filling out all required, validated fields. The submitted order is then sent to the API (http://16.170.252.49:3000/orders) – managing orders.
- An admin panel that allows adding and editing excursions.


&nbsp;
 
## 💡 Technologies
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![REST API](https://img.shields.io/badge/REST%20API-%23000000.svg?style=for-the-badge&logo=api&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)




&nbsp;
 
## 🔗 See also

Are you interested in **RWD** and **CSS**? See my other project [Responsive Layout Showcase](https://github.com/marrcelp/RWD_project-html-css).

&nbsp;
 
## 💿 Installation

The project uses [npm](https://www.npmjs.com/). To install it, type into the terminal: `npm install`. To run the project, use the command: `npm start`.

If you want to launch the client version, simply open http://localhost:8080/index.html in your browser.
The admin panel is available at: http://localhost:8080/admin.html.

To start the backend, you don't need to run anything locally. The API is already live and running on a server I configured myself on AWS, using json-server. You can access the backend directly at: `http://16.170.252.49:3000/excursions` and `http://16.170.252.49:3000/orders`.


&nbsp;

## 🛠️ AWS Server Configuration (short overview)

I manually set up an Ubuntu-based EC2 instance on AWS. After configuring the firewall and opening port 3000, I installed Node.js and globally installed json-server. Then I deployed the excursions.json file and ran the backend with:
`json-server --watch excursions.json --port 3000`

To keep the server running in the background after closing the terminal, I used pm2:
```
pm2 start json-server --name json-api -- \
  --watch /home/ubuntu/excursions_app/excursions.json --port 3000
pm2 save
```

&nbsp;
 
## 🤔 Solutions provided in the project

- Fetching data from API:
To load excursions, I used the Fetch API to request data from the backend and display it dynamically on the webpage.
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