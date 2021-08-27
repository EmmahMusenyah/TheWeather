function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${minutes}`;
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
function displayTemperature(response) {
  console.log(response.data);

  let degreesElement = document.querySelector("#degrees");
  degreesElement.innerHTML = Math.round(response.data.main.temp);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let comparisonElement = document.querySelector("#comparison");
  let comparison = Math.round(response.data.main.feels_like);
  comparisonElement.innerHTML = `Feels like ${comparison}°C`;
  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = `${response.data.main.pressure}Hg`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${response.data.wind.speed} Km/hr`;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

let city = "Nairobi";
let apiKey = "3ba4ba419c4c391e4a4ac38b121708bc";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=3ba4ba419c4c391e4a4ac38b121708bc&units=metric`;
axios.get(url).then(displayTemperature);
