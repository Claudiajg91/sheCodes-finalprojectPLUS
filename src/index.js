function getForecast(coordinates) {
    let apiKey = "adb7ae5bb76c11b5c643833eb2dfec01";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(displayForecast);
  }
  function showTemperature(response) {
    currentTime();
    celsius.classList.add("active");
    fahrenheit.classList.remove("active");
    celsiusTemp = response.data.main.temp;
    let temperature = Math.round(celsiusTemp);
    let feelsLike = Math.round(response.data.main.feels_like);
    let currentHumidity = response.data.main.humidity;
    let currentWind = response.data.wind.speed;
    let airPressure = Math.round(response.data.main.pressure);
    let currentIcon = document.querySelector("#icon");
    let currentDescription = document.querySelector("#description");
  
    cityName.innerHTML = `${response.data.name}`;
    currentDescription.innerHTML = `${response.data.weather[0].description}`;
    feelsLikeTemp.innerHTML = `${feelsLike}`;
    currentTemp.innerHTML = `${temperature}`;
    hum.innerHTML = `${currentHumidity}`;
    win.innerHTML = `${currentWind}`;
    pressure.innerHTML = `${airPressure}hPa`;
    currentIcon.setAttribute(
      "src", `src/images/${response.data.weather[0].icon}.svg`
    );
    currentIcon.setAttribute("alt", response.data.weather[0].description);
  
    getForecast(response.data.coord);
  }
  function showPosition(position) {
    axios
      .get(
        `${apiUrl}lon=${position.coords.longitude}&lat=${position.coords.latitude}&appid=${apiKey}&units=metric`
      )
      .then(showTemperature);
  }
  
  function search(event) {
    event.preventDefault();
  
    axios
      .get(`${apiUrl}q=${searchName.value}&appid=${apiKey}&units=metric`)
      .then(showTemperature);
  }
  function current(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  function searchCityName(city) {
    let apiKey = "eeeee4830be9e8880a8a4aae8fde3ac8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
  }
  
  function currentTime() {
    /*navigator.geolocation.getCurrentPosition(showPosition);*/
    let now = new Date();
    let currentDay = now.getDay();
    let Days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
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
    /*cityName.innerHTML = `${searchName.value}`;*/
    let day = Days[currentDay];
    let currentMonth = months[now.getMonth()];
    let currentMinute = `${now.getMinutes()}`.padStart(2, "0");
    let currentDate = now.getDate();
    let currentHour = now.getHours();
    dateTime.innerHTML = `Last updated: ${day}, ${currentMonth} ${currentDate}, ${currentHour}:${currentMinute}`;
  }
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[day];
  }
  function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
  
    let forecastHTML = `<div class="row">`;
    let days = ["Thu", "Fri", "Sat", "Sun"];
    forecast.forEach(function (forecastDay, index) {
      if (index < 6) {
        forecastHTML =
          forecastHTML +
          `
              <div class="col-2">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                <img src="src/images/${forecastDay.weather[0].icon}.svg" alt="#" width="50" />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperatures-max"> ${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="weather-forecast-temperatures-min"> ${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>
          
            `;
      }
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }
  
  function convertFahrenheit(event) {
    event.addEventListener;
    celsius.classList.remove("active");
    fahrenheit.classList.add("active");
    let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
    currentTemp.innerHTML = `${fahrenheitTemp}`;
  }
  function convertCelsius(event) {
    event.addEventListener;
    celsius.classList.add("active");
    fahrenheit.classList.remove("active");
    currentTemp.innerHTML = `${Math.round(celsiusTemp)}`;
  }
  let cityName = document.querySelector("#city");
  let searchName = document.querySelector("#city-input");
  let feelsLikeTemp = document.querySelector("#feels-like-value");
  let hum = document.querySelector("#humidity");
  let win = document.querySelector("#wind");
  let pressure = document.querySelector("#pressure");
  let searchCity = document.querySelector("#search-form");
  let currentCity = document.querySelector("#current-button");
  let celsiusTemp = null;
  
  searchCity.addEventListener("submit", search);
  currentCity.addEventListener("click", current);
  fahrenheit.addEventListener("click", convertFahrenheit);
  celsius.addEventListener("click", convertCelsius);
  let dateTime = document.querySelector("#date");
  searchCityName("Houston");
  /*currentTime();*/
  let currentTemp = document.querySelector("#temperature");
  
  let apiKey = "eeeee4830be9e8880a8a4aae8fde3ac8";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";