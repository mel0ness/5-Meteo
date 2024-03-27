const APIKEY = "877dafadaa2a6e53cd076de43a0dd27e";


const currentDateToSet = new Date();
const currentDate = (new Date()/1000).toFixed(0);
const nextDay = (new Date().getTime() + (24 * 60 * 60 * 1000));
const nextDayToSet = new Date(nextDay);
// const nextDayToDisplay = new Date(nextDay).toString();
const nine = currentDateToSet.setHours(9,0,0,0) / 1000;
const noon = currentDateToSet.setHours(12,0,0,0) / 1000;
const fiveteen = currentDateToSet.setHours(15,0,0,0) / 1000;
const eighteen = currentDateToSet.setHours(18,0,0,0) / 1000;
const twentyone = currentDateToSet.setHours(21,0,0,0) / 1000;
const midnight = nextDayToSet.setHours(0,0,0,0) / 1000;
const three = nextDayToSet.setHours(3,0,0,0) / 1000;
const arrayByHour = [nine, noon, fiveteen, eighteen, twentyone, midnight, three];
const arrayByHourNames = ["nine", "noon", "fiveteen", "eighteen", "twentyone", "midnight", "three"];


if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        fetchCurrent(lat, lng);
        fetchByHour(lat, lng, arrayByHour, arrayByHourNames);
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }

async function fetchCurrent(e, f) {
    try {
const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${e}&lon=${f}&lang=fr&units=metric&appid=${APIKEY}`);
const Results = await response.json();
displayCurrent(Results.timezone, Results.current.temp, Results.current.weather[0].icon);
    }
    catch (error) {
const Results = error;
console.log(Results);
    }
}

const displayCurrent = (e, f, g) => {
  const displayCurrentElements = document.getElementsByClassName("P5-current");
  const loader = document.getElementById("loader");
  const temp = f.toFixed(0);
  if(g.substring(2) === "d") {
    displayCurrentElements[0].src=`./ressources/jour/${g}.svg`
  }
  else{
    displayCurrentElements[0].src=`./ressources/nuit/${g}.svg`
  }
  displayCurrentElements[2].textContent = e;
  displayCurrentElements[1].textContent = `${temp}°`;

setTimeout( function() {
  loader.classList.add("P5-hidden");
  displayCurrentElements[0].classList.remove("P5-hidden");
  displayCurrentElements[1].classList.remove("P5-hidden");
  displayCurrentElements[2].classList.remove("P5-hidden");
}
, 1500)  

}

async function fetchByHour(e, f, g, h) {

for(let i = 0; i<g.length; i++){  
  try {
const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${e}&lon=${f}&lang=fr&units=metric&dt=${g[i]}&appid=${APIKEY}`);
const Results = await response.json();
displayByHour(Results.data[0].temp, h[i])
  }
  catch (error) {
const Results = error;
console.log(Results);
  }}
}

const displayByHour=(e, f) => {
const toChange = document.getElementById(f);
setTimeout( function() {
  toChange.innerText = e.toFixed(0);
}
, 1500)  

}
