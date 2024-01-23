
const baseUrl = `https://swapi2.azurewebsites.net/api/planets`;
let planetNameH1;
let climateSpan;
let surfaceWaterSpan;


// Runs on page load
addEventListener('DOMContentLoaded', () => {
  planetNameH1 = document.querySelector('h1#name');
  climateSpan = document.querySelector('span#climate')
  surfaceWaterSpan = document.querySelector('span#surface_water')
  diameter = document.querySelector('span#diameter')
  ratationPeriod = document.querySelector('span#rotation_period')
  terrain = document.querySelector('span#terrain')
  gravity = document.querySelector('span#gravity')
  orbitalPeriod = document.querySelector('span#orbital_period')
  population = document.querySelector('span#orbital_population')
  filmsUl = document.querySelector('#films>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getPlanet(id)
});

async function getPlanet(id) {
    let planet;
    try {
      planet = await fetchPlanet(id)
      planet.films = await fetchFilms(planet)
    }
    catch (ex) {
      console.error(`Error reading planet ${id} data.`, ex.message);
    }
    renderPlanet(planet);
  
  }
  async function fetchPlanet(id) {
    let planetUrl = `${baseUrl}/${id}`;
    return await fetch(planetUrl)
      .then(res => res.json())
  }
  
  async function fetchFilms(planet) {
    const url = `${baseUrl}/${planet?.id}/films`;
    const films = await fetch(url)
      .then(res => res.json())
    return films;
  }
  
  const renderPlanet = planet => {
    document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
    planetNameH1.textContent = planet?.name;
    climateSpan.textContent = planet?.climate;
    surfaceWaterSpan.textContent = planet?.surface_water;
    // homeworldSpan.innerHTML = `<a href="/planet.html?id=${character?.homeworld.id}">${character?.homeworld.name}</a>`;
    const filmsLis = planet.films.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
    console.log("filmsLis", filmsLis)
    filmsUl.innerHTML = filmsLis.join("");
  }
  