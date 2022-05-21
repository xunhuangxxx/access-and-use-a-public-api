const directory = document.querySelector('#directory');


/************  Fetch functions  **********/

function fetchData(url){
  return fetch(url)
         .then(res => res.json())
         .catch(error => console.error('fail to fetch', error))
}

function genarateEmployees(url) {
  for(let i = 0; i < 12; i++){
    fetchData(url)
    .then(generateHTML)
    .catch(error => console.error('fail to generate', error));
  }

}



/*********** Helper functions ************/

const card = document.createElement('div');
card.className = 'card';

//Create function to genarate HTML
function generateHTML(response) {
  const person = response.results[0];
  const imgUrl = person.picture.thumbnail;
  const name = person.name.first + person.name.last;
  const email = person.email;
  const location = person.location.city + person.location.city;

  card.innerHTML += `
  <img src="${imgUrl}"/>
  <div id="info">
  <p id="name">${name}</p>
  <p id="email">${email}</p>
  <p id="location">${location}</p>
  </div>
  `;

  directory.appendChild(card);
}


genarateEmployees('https://randomuser.me/api/')
/*********** Event Listners ************/
