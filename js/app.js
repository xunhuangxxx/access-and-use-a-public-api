const directory = document.querySelector('#directory');


/************  Fetch functions  **********/

function fetchData(url){
  return fetch(url)
         .then(res => res.json())
         .catch(error => console.error('fail to fetch', error))
}

function generateEmployees(url) {
  let employees = [];
  for(let i = 0; i < 12; i++){
    employees.push(fetchData(url))
  }
  Promise.all(employees)
  .then( arr => arr.map(generateHTML))
  .catch(error => console.error('fail to generate html', error))
}



/*********** Helper functions ************/

//Create function to genarate HTML
function generateHTML(response) {
  const card = document.createElement('div');
  card.className = 'card';

  const person = response.results[0];
  const imgUrl = person.picture.thumbnail;
  const name = person.name.first + person.name.last;
  const email = person.email;
  const location = person.location.city + ', ' +person.location.state;

  card.innerHTML = `
  <img src="${imgUrl}"/>
  <div id="info">
  <p id="name">${name}</p>
  <p id="email">${email}</p>
  <p id="location">${location}</p>
  </div>
  `;
  directory.appendChild(card);
}


generateEmployees('https://randomuser.me/api/');
/*********** Event Listners ************/
