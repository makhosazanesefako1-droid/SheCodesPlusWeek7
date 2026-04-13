let now = new Date();

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

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

let month = months[now.getMonth()];

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDateElement = document.getElementById("current-date");
if (currentDateElement) {
  currentDateElement.innerHTML = `${day} ${date} ${month} ${year}, ${hours}:${minutes}`;
}

let form = document.querySelector(".search-form");
let input = document.querySelector(".search-input");
let cityElement = document.querySelector(".current-city");

function searchCity(event) {
  event.preventDefault();

  let cityValue = input.value;
  cityElement.innerHTML = cityValue;

  getWeather(cityValue);
}

async function getWeather(city) {
  const apiKey = "fbca7tb4b1d378eb34aeb0001483874o";
  const url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    document.querySelector(".current-city").innerHTML = data.city;

    document.getElementById("temperature").innerHTML = Math.round(
      data.temperature.current
    );

    document.getElementById("weather-description").innerHTML =
      data.condition.description;

    document.getElementById("humidity").innerHTML =
      data.temperature.humidity + "%";

    document.getElementById("wind").innerHTML = data.wind.speed + " km/h";
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}

if (form) {
  form.addEventListener("submit", searchCity);
}
