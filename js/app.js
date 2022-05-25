const directory = document.querySelector('#directory');
const personInfo = {};
const popUpWindow = document.querySelector('.modal-window');
const container = document.querySelector('.container');
const closeButton = document.querySelector('.close');
const employeeWindow = document.querySelector('.employee-info');
/************  Fetch functions  **********/

//Create fetch function and error handler
function fetchData(url){
  return fetch(url)
         .then(res => res.json())
         .catch(error => console.error('fail to fetch', error))
}

//iterate fetch function to generate data
function generateEmployees(url) {
  let employees = [];
  for(let i = 0; i < 12; i++){
    employees.push(fetchData(url))
  }
  Promise.all(employees)
  .then( arr => {
    arr.map(data => {
      generateHTML(data);
      storeData(data);
    })
  })
  .then(addPopUp)
  .catch(error => console.log('fail to generate html', error))
}

/*********** Helper functions ************/

//Create function to genarate HTML
function generateHTML(response) {
  const card = document.createElement('div');
  card.className = 'card';

  const person = response.results[0];
  const imgUrl = person.picture.large;
  const name = person.name.first + ' ' + person.name.last;
  const email = person.email;
  const location = person.location.city + ', ' +person.location.state;

  card.innerHTML = `
  <img src="${imgUrl}" alt="photo of employee"/>
  <div class="info" data-id='${email}'>
  <p class="name">${name}</p>
  <p class="email">${email}</p>
  <p class="location">${location}</p>
  </div>
  `;

  directory.appendChild(card);
}






//Store data from response

function storeData(data){
  const person = data.results[0];
  const personId = person.email;
  personInfo[personId] = person;
}

//Format data

function replacePopUpHTML(idNum) {
  const person = personInfo[idNum];
  const imgUrl = person.picture.large;
  const name = person.name.first + ' ' + person.name.last;
  const email = person.email;
  const location = person.location.city + ', ' +person.location.state;

  const phoneString = person.phone.replace(/\D/g, '');
  const phone = `(${phoneString.substring(0,3)}) ${phoneString.substring(3,6)}-${phoneString.substring(6)}`;

  const address = `
    ${person.location.street.number} ${person.location.street.name},
    ${person.location.city}, ${person.location.state},
    ${person.location.postcode}
    `;
  const bday = `
    ${person.dob.date.substring(5,7)}/${person.dob.date.substring(8,10)}/${person.dob.date.substring(0,4)}
    `;
  const newHTML = `
    <img src="${imgUrl}" alt="picture of employee">
    <p id='name'>${name}</p>
    <p id='email'>${email}</p>
    <p id='location'>${location}</p>
    <p id='phone'>${phone}</p>
    <p id='address'>${address}</p>
    <p id='bday'>${bday}</p>
  `
  employeeWindow.innerHTML = newHTML;

}


// Create a funtion to show modal window


function popUp() {
  container.style.display = 'block';
}

//Create a funtion to hide modal window

function hide() {
  container.style.display = 'none';
}




/*********** Call Functions ************/

generateEmployees('https://randomuser.me/api/');




/*********** Event Listners ************/
function addPopUp() {
  const cardList = document.querySelectorAll('.card');

  for(let i = 0; i < cardList.length; i++){
    cardList[i].addEventListener('click', () => {
    const employeeId = cardList[i].querySelector('.info').getAttribute('data-id');
    replacePopUpHTML(employeeId);
    popUp();
  })
 }
}


closeButton.addEventListener('click', () => {
  hide();
});
