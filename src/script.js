function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day} ${hour}:${minute}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function weatherConditions(response) {
  document.querySelector("#current-city").innerHTML = `${response.data.name}`;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )} °C`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity} %`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector(
    "#weather_conditions"
  ).innerHTML = `${response.data.weather[0].description}`;
  document.querySelector(".daytime").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "b68955b53e53008eb9772143fe4d18a1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(weatherConditions);
}
function handleSubmit(event) {
  event.preventDefault();
  function handlePosition(position) {
    let cityName = document.querySelector("#search-text-input");
    let city = cityName.value;
    search(city);
  }
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function currentTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    celsiusTemperature
  )} °C`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity} %`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector(
    "#weather_conditions"
  ).innerHTML = `${response.data.weather[0].description}`;
}
function currentPosition(response) {
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data[0].name;
}
function showCurrentPosition(event) {
  event.preventDefault();
  function handlePosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "b68955b53e53008eb9772143fe4d18a1";
    let limit = 1;
    let apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=${limit}&appid=${apiKey}`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(currentPosition);
  }

  function handleWeather(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "b68955b53e53008eb9772143fe4d18a1";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(currentTemperature);
  }
  navigator.geolocation.getCurrentPosition(handlePosition);
  navigator.geolocation.getCurrentPosition(handleWeather);
}

let Positioning = document.querySelector("#location");
Positioning.addEventListener("click", showCurrentPosition);

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitConvert = document.querySelector("#fahrenheit");
fahrenheitConvert.addEventListener("click", showFahrenheit);
let celsiusConvert = document.querySelector("#celsius");
celsiusConvert.addEventListener("click", showCelsius);

search("Munich");
