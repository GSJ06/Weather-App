// Define an object named 'api' containing API key and base URL.
const api = {
  key: "", // Your API key goes here
  base: "https://api.openweathermap.org/data/2.5/"
};

// Select the search input element with the class 'search-box'.
const searchbox = document.querySelector(".search-box");

// Add an event listener to the search input for keypress events.
searchbox.addEventListener("keypress", setQuery);

// Function to handle setting the query when Enter key is pressed.
function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

// Function to fetch weather data based on the query and display the results.
function getResults(query) {
  // Fetch weather data from the API using the provided query and units (metric).
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

// Function to display the weather results.
function displayResults(weather) {
  console.log(weather);

  // Select elements to display weather information.
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${weather.main.temp_min}°C / ${weather.main.temp_max}°C`;
}

// Function to build and format the date.
function dateBuilder(d) {
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
    "December"
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}