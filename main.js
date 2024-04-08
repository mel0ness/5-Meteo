let APIKEY = "";

const nextDay1 = new Date((new Date().getTime() + (24 * 60 * 60 * 1000))).toLocaleDateString("fr-FR", {weekday: "long"})
const nextDay2 = new Date((new Date().getTime() + (48 * 60 * 60 * 1000))).toLocaleDateString("fr-FR", {weekday: "long"})
const nextDay3 = new Date((new Date().getTime() + (72 * 60 * 60 * 1000))).toLocaleDateString("fr-FR", {weekday: "long"})
const currentHour = new Date().getHours();
const Previsions = document.getElementsByClassName("P5-day")
const modaleBack = document.getElementById("modaleBack")
const modaleAPI = document.getElementById("modaleAPI")
const information = document.getElementById("information")
const APIkey = document.getElementById("APIKEY");
const APIbutton = document.getElementById("buttonAPI")
const hour = document.getElementById("hour");
const future = document.getElementById("future");
const hourByHour = document.getElementById("hourByHour");
const dayByDay = document.getElementById("dayByDay");
const tomorrow = document.getElementById("tomorrow");
const dayPlusOne = document.getElementById("dayPlusOne");
const dayPlusTwo = document.getElementById("dayPlusTwo");

APIbutton.addEventListener("click", () => {
  if(APIkey.value === "") {
    information.classList.add("P5-error")
  }
  else {
    APIKEY = APIkey.value;
modaleAPI.classList.add("P5-hidden")
modaleBack.classList.add("P5-hidden")

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          fetchCurrent(lat, lng);
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

  if(Results.cod) {
    switch (Results.cod) {
      case 401:
        modaleAPI.classList.remove("P5-hidden")
        modaleBack.classList.remove("P5-hidden")
        information.classList.add("P5-error")
        information.innerText = "Votre API n'est pas correcte, veuillez en entrer une valide"
        APIkey.value = "";
        break;
      case 429:
        modaleAPI.classList.remove("P5-hidden")
        modaleBack.classList.remove("P5-hidden")
        information.classList.add("P5-error")
        information.innerText = "Votre plan ne vous permet pas autant de requêtes, veuillez réessayer plus tard!"
        APIkey.value = "";
        break;
    }
  }
  else {
  displayCurrent(Results.timezone, Results.current.temp, Results.current.weather[0].icon);
  displayByHour(Results.hourly);
  displayNamePrevisions();
  displayPrevisions(tomorrow, 1, Results.daily)
  displayPrevisions(dayPlusOne, 2, Results.daily)
  displayPrevisions(dayPlusTwo, 3, Results.daily)}
      }
      catch (error) {
  const Results = error;
  console.log(Results);
      }
  }
  }

})

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

const displayPrevisions = (e, f, g) => {
e.innerHTML = `<img class="P5-dayTempIMG" src="./ressources/jour/${g[f].weather[0].icon}.svg" alt="Kind of day prevision"> ${g[f].temp.day.toFixed(0)}°`
}

const displayNamePrevisions = () => {
Previsions[0].innerText = nextDay1.substring(0, 3)
Previsions[1].innerText = nextDay2.substring(0, 3)
Previsions[2].innerText = nextDay3.substring(0, 3)
}

const displayByHour=(e) => {
const toChangeTemp = document.getElementsByClassName("P5-time");
const toChangeHour = document.getElementsByClassName("P5-hourPrev");
for(let i=0; i<7; i++) {
  const calcul = i*3 +3 + currentHour;
  if(calcul >= 24) {
    toChangeTemp[i].innerText = `${calcul - 24}h`
    toChangeHour[i].innerText = `${e[(i+1)*3].temp.toFixed()}°`
  }
  else {
    toChangeTemp[i].innerText = `${calcul}h`
    toChangeHour[i].innerText = `${e[(i+1)*3].temp.toFixed()}°`
  }
}
}

hour.addEventListener("click", () => {
hourByHour.classList.remove("P5-hidden");
dayByDay.classList.add("P5-hidden");
hour.classList.add("P5-active");
future.classList.remove("P5-active");
} )

future.addEventListener("click", () => {
  hourByHour.classList.add("P5-hidden");
dayByDay.classList.remove("P5-hidden");
hour.classList.remove("P5-active");
future.classList.add("P5-active");
})
