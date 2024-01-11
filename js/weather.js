const weatherBox = document.querySelector("#weather");
const weather = document.querySelector("#weatherBox span");
const city = document.querySelector("#city");
const weatherIcon = document.querySelector("#weather i");
const API_KEY = "b970f8b01c01f2ef979416ac54d53a97";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  console.log("You live in", lat, lon);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      city.innerText = data.name;
      const temperature = Math.round(data.main.temp);
      if (data.weather[0].main == "Clear") {
        weatherIcon.className = "fa-solid fa-sun fa-2xl";
      } else {
        weatherIcon.className = "fa-solid fa-sun fa-2xl";
      }
      weather.innerHTML = `${temperature}&deg;`;
    });
}
function onGeoError() {
  weather.innerText = "Can't find you.\nNo weather for you.";
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);