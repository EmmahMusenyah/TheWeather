function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  return `${day} ${hours}: ${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
        
          <div class="col-2">
            <button>
              <ul>
                <li class="forecast-date">${formatDay(forecastDay.dt)}</li>
                <li class="forecast-icon">
                  <img
                    src= "https://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    alt=""
                    width="42px"
                  />
                </li>
                <li class="forecast-high">${Math.round(
                  forecastDay.temp.max
                )}°</li>
                <li class="forecast-low">${Math.round(
                  forecastDay.temp.min
                )}°</li>
              </ul>
            </button>
          </div>
       
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&APPID=3ba4ba419c4c391e4a4ac38b121708bc&units=metric`;
  console.log(url);
  axios.get(url).then(displayForecast);
}

function displayTemperature(response) {
  let degreesElement = document.querySelector("#degrees");
  let descriptionElement = document.querySelector("#description");
  let comparisonElement = document.querySelector("#comparison");
  let comparison = Math.round(response.data.main.feels_like);
  let pressureElement = document.querySelector("#pressure");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  degreesElement.innerHTML = `${Math.round(response.data.main.temp)}°`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  comparisonElement.innerHTML = `Feels like ${comparison}°C`;
  pressureElement.innerHTML = `${response.data.main.pressure}Hg`;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed} Km/hr`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "3ba4ba419c4c391e4a4ac38b121708bc";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=3ba4ba419c4c391e4a4ac38b121708bc&units=metric`;
  axios.get(url).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
  let city = document.querySelector("#city");
  city.innerHTML = `${cityInputElement.value}`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
