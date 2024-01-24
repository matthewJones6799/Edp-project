let nameH1;

//let filmsDiv;
//let planetDiv;

let producerSpan;
//let titleSpan;
let directorSpan;
let releasedateSpan;
let episodeidSpan
let openingcrawlSpan
let planetsDiv
let characterDiv

const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  nameH1 = document.querySelector('h1#title');
  producerSpan = document.querySelector('span#producer');
  //titleSpan = document.querySelector('span#title');
  directorSpan = document.querySelector('span#director');
  episodeidSpan = document.querySelector('span#episode_id');
  releasedateSpan = document.querySelector('span#release_date');
  openingcrawlSpan = document.querySelector('span#opening_crawl')
  planetsSpan = document.querySelector('span#planets')
  //homeworldSpan = document.querySelector('span#homeworld');
  //filmsUl = document.querySelector('#films>ul');
  //charactersUl = document.querySelector("#characters>ul")
  charactersUl = document.querySelector('#characters>ul')
  planetsUl = document.querySelector('#planets>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getFilm(id)
});

async function getFilm(id) {
  let film;
  try {
    film = await fetchFilm(id)
    film.planets = await fetchPlanets(film) //change this to planets
    film.characters = await fetchCharacters(film)  //change this to characters
  }
  catch (ex) {
    console.error(`Error reading character ${id} data.`, ex.message);
  }
  renderFilm(film);

}
async function fetchFilm(id) {
  let filmUrl = `${baseUrl}/films/${id}`;
  return await fetch(filmUrl)
    .then(res => res.json())
}

async function fetchPlanets(film) { //NEEDS TO BECOME FETCH PLANETS
  const url = `${baseUrl}/films/${film?.id}/planets`;
  const planet = await fetch(url)
    .then(res => res.json())
  return planet;
}

async function fetchCharacters(film) { //NEEDS TO BECOME FETCH CHARACTERS
  const url = `${baseUrl}/films/${film?.id}/characters`;
  const characters = await fetch(url)
    .then(res => res.json())
  return characters;
}

const renderFilm = film => {
  document.title = `SWAPI - ${film?.name}`;  // Just to make the browser tab say their name
  nameH1.textContent = film?.title;
  //heightSpan.textContent = film?.height;
  //massSpan.textContent = film?.mass;
  //birthYearSpan.textContent = film?.birth_year;
  //homeworldSpan.innerHTML = `<a href="/planet.html?id=${character?.homeworld.id}">${character?.homeworld.name}</a>`;
  producerSpan.textContent = film?.producer;
  //titleSpan.textContent = film?.title;
  directorSpan.textContent = film?.director;
  releasedateSpan.textContent = film?.release_date;
  episodeidSpan.textContent = film?.episode_id;
  openingcrawlSpan.textContent = film?.opening_crawl;

  const charactersLis = film.characters.map(characters => `<li><a href="/planet.html?id=${characters.id}">${characters.name}</li>`)
  charactersUl.innerHTML = charactersLis.join("");

  const planetsLis = film.planets.map(planets => `<li><a href="/planet.html?id=${planets.id}">${planets.name}</li>`)
  console.log("planetslis", planetsLis)
  planetsUl.innerHTML = planetsLis.join("");
}
