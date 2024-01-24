
const baseUrl = `https://swapi2.azurewebsites.net/api/planets`;
let planetNameH1;
let climateSpan;
let surfaceWaterSpan;
let diameterSpan;
let rotationPeriodSpan;
let terrainSpan;
let gravitySpan;
let orbitalPeriodSpan;
let populationSpan;
let charsUl;
let filmsUl;

let planetCharacterSpan;


// Runs on page load
addEventListener('DOMContentLoaded', () => {
  planetNameH1 = document.querySelector('h1#name');
  climateSpan = document.querySelector('span#climate');
  surfaceWaterSpan = document.querySelector('span#surface_water');
  diameterSpan = document.querySelector('span#diameter');
  rotationPeriodSpan = document.querySelector('span#rotation_period');
  terrainSpan = document.querySelector('span#terrain');
  gravitySpan = document.querySelector('span#gravity');
  orbitalPeriodSpan = document.querySelector('span#orbital_period');
  populationSpan = document.querySelector('span#population');
  filmsUl = document.querySelector('#films>ul');
  charsUl = document.querySelector('#chars>ul');
  planetCharacterSpan = document.querySelector('span#homeworld')
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getPlanet(id)
});

async function getPlanet(id) {
    let planet;
    try {
      planet = await fetchPlanet(id)
      planet.films = await fetchFilms(planet)
      planet.characters = await fetchHomeworld(planet)
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

  async function fetchHomeworld(planet) {
    const url = `${baseUrl}/${planet?.id}/characters`;
    const characters = await fetch(url)
      .then(res => res.json())
    return characters;
  }
  
  const renderPlanet = planet => {
    document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
    planetNameH1.textContent = planet?.name;
    climateSpan.textContent = planet?.climate;
    surfaceWaterSpan.textContent = planet?.surface_water;
    diameterSpan.textContent = planet?.diameter
    rotationPeriodSpan.textContent = planet?.rotation_period;
    terrainSpan.textContent = planet?.terrain;
    gravitySpan.textContent = planet?.gravity;
    orbitalPeriodSpan.textContent = planet?.orbital_period;
    populationSpan.textContent = planet?.population;
    // planetCharacterSpan.textContent = planet?.characters;
    console.log(planet?.characters)
    const filmsLis = planet.films.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
    filmsUl.innerHTML = filmsLis.join("");
    const charsLis = planet.characters.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    charsUl.innerHTML = charsLis.join("");
    console.log(charsLis)
  }
  