const APIKEY = "877dafadaa2a6e53cd076de43a0dd27e";

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log(`Latitude: ${lat}, longitude: ${lng}`);
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }

const currentDateToSet = new Date();
const currentDate = (new Date()/1000).toFixed(0);
const nextDay = (new Date().getTime() + (24 * 60 * 60 * 1000));
const nextDayToSet = new Date(nextDay);
const nextDayToDisplay = new Date(nextDay).toString();
const nine = currentDateToSet.setHours(9,0,0,0) / 1000;
const noon = currentDateToSet.setHours(12,0,0,0) / 1000;
const fiveteen = currentDateToSet.setHours(15,0,0,0) / 1000;
const eighteen = currentDateToSet.setHours(18,0,0,0) / 1000;
const twentyone = currentDateToSet.setHours(21,0,0,0) / 1000;
const midnight = nextDayToSet.setHours(0,0,0,0) / 1000;
const three = nextDayToSet.setHours(3,0,0,0) / 1000;
// console.log(new Date(midnight * 1000).toString());
// console.log(new Date(fiveteen * 1000).toString());
console.log(currentDate);
console.log(nextDayToSet);
// console.log(midnight);
console.log(new Date(three * 1000).toString());
// api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lng}&lang=fr
// api.openweathermap.org/data/3.0/onecall/timemachine?lat={lat}&lon={lng}&lang=fr&dt={time}

// 1 Fetch global suivi d'une boucle de fetch pour les températures à certaines heures.