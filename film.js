let nameH1;
let birthYearSpan;
let heightSpan;
let massSpan;
let filmsDiv;
let planetDiv;

let producerSpan
let titleSpan
let directorSpan
let releasedateSpan

const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  nameH1 = document.querySelector('h1#name');
  producerSpan = document.querySelector('span#producer');
  titleSpan = document.querySelector('span#title');
  directorSpan = document.querySelector('span#director');
  releasedateSpan = document.querySelector('span#birth_year');
  //homeworldSpan = document.querySelector('span#homeworld');
  //filmsUl = document.querySelector('#films>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getFilm(id)
});

async function getFilm(id) {
  let film;
  try {
    film = await fetchFilm(id)
    film.homeworld = await fetchHomeworld(film)
    film.films = await fetchFilms(film)
  }
  catch (ex) {
    console.error(`Error reading character ${id} data.`, ex.message);
  }
  renderCharacter(film);

}
async function fetchFilm(id) {
  let filmUrl = `${baseUrl}/films/${id}`;
  return await fetch(filmUrl)
    .then(res => res.json())
}

async function fetchHomeworld(character) { //NEEDS TO BECOME FETCH PLANETS
  const url = `${baseUrl}/planets/${character?.homeworld}`;
  const planet = await fetch(url)
    .then(res => res.json())
  return planet;
}

async function fetchFilms(character) { //NEEDS TO BECOME FETCH CHARACTERS
  const url = `${baseUrl}/characters/${character?.id}/films`;
  const films = await fetch(url)
    .then(res => res.json())
  return films;
}

const renderFilm = film => {
  document.title = `SWAPI - ${film?.name}`;  // Just to make the browser tab say their name
  //nameH1.textContent = film?.name;
  //heightSpan.textContent = film?.height;
  //massSpan.textContent = film?.mass;
  //birthYearSpan.textContent = film?.birth_year;
  //homeworldSpan.innerHTML = `<a href="/planet.html?id=${character?.homeworld.id}">${character?.homeworld.name}</a>`;
  producerSpan.textContent = film?.producer;
  titleSpan.textContent = film?.title;
  directorSpan.textContent = film?.director;
  releasedateSpan.textContent = film?.releasedate;

  const filmsLis = character?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
  filmsUl.innerHTML = filmsLis.join("");
}
