// Select necessary DOM elements
const cityInput = document.querySelector(".city-input"); // Input field for the city name
const searchBtn = document.querySelector(".search-btn"); // Search button

// Sections for displaying weather information or error messages
const WeatherInfoSection = document.querySelector(".weather-info");
const notFoundSection = document.querySelector(".not-found");
const searchCitySection = document.querySelector(".search-city");

// DOM elements to display weather data
const CountryTxt = document.querySelector(".country-txt");
const tempTxt = document.querySelector(".temp-txt");
const conditionTxt = document.querySelector(".condition-txt");
const humidityValueTxt = document.querySelector(".humidity-value-txt");
const windValueTxt = document.querySelector(".wind-value-txt");
const weatherSummaryImg = document.querySelector(".weather-summary-img");
const currentDateText = document.querySelector(".current-date-text");
const forecastItemContainer = document.querySelector(
  ".forecast-item-container"
);

// OpenWeatherMap API key (replace with your own)
const apiKey = "e93ab323e3440daebd0b6b4b7d0b3cb5";

// Event listener for the search button click event
searchBtn.addEventListener("click", () => {
  // Ensure that the input is not empty before making a request
  if (cityInput.value.trim() != "") {
    updateWeatherInfo(cityInput.value); // Fetch and update the weather info
    cityInput.value = ""; // Clear the input field
    cityInput.blur(); // Remove focus from the input field
  }
});

// Event listener for pressing the 'Enter' key in the input field
cityInput.addEventListener("keydown", (event) => {
  if (event.key == "Enter" && cityInput.value.trim() != "") {
    updateWeatherInfo(cityInput.value); // Fetch and update the weather info
    cityInput.value = ""; // Clear the input field
    cityInput.blur(); // Remove focus from the input field
  }
});

// Function to fetch weather data from OpenWeatherMap API
async function getFeatchData(endPoint, city) {
  // Construct the API URL based on the city and endpoint (weather or forecast)
  const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(apiUrl); // Fetch data from the API
  return response.json(); // Return the data as JSON
}

// Function to return weather icon based on weather condition ID
function getWeatherIcon(id) {
  if (id <= 232) return `thunderstorm.svg`;
  if (id <= 321) return `drizzle.svg`;
  if (id <= 531) return `rain.svg`;
  if (id <= 622) return `snow.svg`;
  if (id <= 781) return `atmosphere.svg`;
  if (id <= 800) return `clear.svg`;
  else return `clouds.svg`;
}

// Function to get the current date formatted as a string
function getCurrentdate() {
  const currentDate = new Date(); // Get the current date
  const options = {
    weekday: "short", // Display the short weekday name
    day: "2-digit", // Display the day with two digits
    month: "short", // Display the short month name
  };

  return currentDate.toLocaleDateString("en-GB", options); // Format and return the date
}

// Function to update the weather information on the UI
async function updateWeatherInfo(city) {
  const weatherData = await getFeatchData("weather", city); // Fetch current weather data for the city

  // If city is not found or an error occurred
  if (weatherData.cod != 200) {
    showDisplaySection(notFoundSection); // Show error section
    return;
  }

  // Destructure necessary weather data
  const {
    name: country, // City name
    main: { temp, humidity }, // Temperature and humidity
    weather: [{ id, main }], // Weather condition ID and description
    wind: { speed }, // Wind speed
  } = weatherData;

  // Update the UI with weather data
  CountryTxt.textContent = country;
  tempTxt.textContent = Math.round(temp) + "°C"; // Round off temperature
  conditionTxt.textContent = main;
  humidityValueTxt.textContent = humidity + " %"; // Humidity in percentage
  windValueTxt.textContent = speed + " M/S"; // Wind speed in meters per second

  currentDateText.textContent = getCurrentdate(); // Display the current date
  weatherSummaryImg.src = `assets/weather/${getWeatherIcon(id)}`; // Display appropriate weather icon

  await updateForecastsInfo(city); // Fetch and display forecast data
  showDisplaySection(WeatherInfoSection); // Show weather info section
}

// Function to fetch and display forecast information
async function updateForecastsInfo(city) {
  const forecastsData = await getFeatchData("forecast", city); // Fetch forecast data

  const timeTaken = "12:00:00"; // Time of day to filter forecast (midday)
  const todayDate = new Date().toISOString().split("T")[0]; // Get today's date in 'YYYY-MM-DD' format

  forecastItemContainer.innerHTML = ""; // Clear previous forecast items

  // Iterate over each forecast entry
  forecastsData.list.forEach((forecastWeather) => {
    // Filter forecast entries that match the specific time and exclude today's date
    if (
      forecastWeather.dt_txt.includes(timeTaken) &&
      !forecastWeather.dt_txt.includes(todayDate)
    ) {
      updateForecastsItems(forecastWeather); // Update the UI with forecast item
    }
  });
}

// Function to update the forecast items on the UI
function updateForecastsItems(weatherData) {
  console.log(weatherData); // Log forecast data for debugging

  // Destructure necessary forecast data
  const {
    dt_txt: date, // Forecast date
    weather: [{ id }], // Weather condition ID
    main: { temp }, // Temperature
  } = weatherData;

  // Convert forecast date to a more readable format
  const dateTaken = new Date(date);
  const deteOption = {
    day: "2-digit", // Display day with two digits
    month: "short", // Display the short month name
  };
  const dateResult = dateTaken.toLocaleDateString("en-US", deteOption); // Format date

  // Create forecast item HTML template
  const forecastItem = `
  <div class="forecast-item">
            <h5 class="forecast-item-date regular-txt">${dateResult}</h5>
            <img
              class="forecast-item-img"
              src="assets/weather/${getWeatherIcon(id)}"
            />
            <h5 class="forecast-item-temp">${Math.round(temp)} °C</h5>
          </div>
  `;

  forecastItemContainer.insertAdjacentHTML("beforeend", forecastItem); // Append the forecast item to the container
}

// Function to show a specific section and hide others
function showDisplaySection(section) {
  // Hide all sections first
  [WeatherInfoSection, searchCitySection, notFoundSection].forEach(
    (section) => (section.style.display = "none")
  );

  // Display the chosen section
  section.style.display = "flex";
}
