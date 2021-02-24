function getDate(date) {
  let year = date.getFullYear();
  let day = date.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  return `${month} ${day}, ${year}`;
}

function getTime(time) {
  let hour = time.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = time.getMinutes();

  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${hour}:${minute}`;
}
let now = new Date();
let nowDate = document.querySelector("#today-date");
nowDate.innerHTML = getDate(now);

let nowTime = document.querySelector("#current-time");
nowTime.innerHTML = getTime(now);

function getWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "6b4aa4963a9fa2b5cecf2be8622f70ab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(getWeather);
  let searchInput = document.querySelector("#search-text");
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text").value;
  searchCity(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
searchCity("San Francisco");

function searchLocation(position) {
  position.preventDefault();
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "6b4aa4963a9fa2b5cecf2be8622f70ab";
  let apiUrl = `${apiEndPoint}?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(getWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationbtn = document.querySelector("#location");
currentLocationbtn.addEventListener("click", getCurrentLocation);
