
var search = document.getElementById("search");
var btnFind = document.getElementById("btnFind");
var dayDiv1 = document.getElementById("dayDiv1");
var temperatureDiv1 = document.getElementById("temperatureDiv1");
var weatherIconDiv1 = document.getElementById("weatherIconDiv1");
var weatherInfo1 = document.getElementById("weatherInfo1");
var nextDayHolder1 = document.getElementById("nextDayHolder1");
var temperatureDiv2 = document.getElementById("temperatureDiv2");
var weatherIconDiv2 = document.getElementById("weatherIconDiv2");
var weatherInfo2 = document.getElementById("weatherInfo2");
var temperatureDiv3 = document.getElementById("temperatureDiv3");
var weatherIconDiv3 = document.getElementById("weatherIconDiv3");
var weatherInfo3 = document.getElementById("weatherInfo3");
var nextDayHolder2 = document.getElementById("nextDayHolder2");
var custom = document.getElementById("custom");
var custom2 = document.getElementById("custom2");
var custom3 = document.getElementById("custom3");


async function getWeather() {
  // API key for weather API
  var apiKey = "7d77b96c972b4d119a3151101212704";
  // Get the city from the search input
  var city = search.value;

  // Check if the city is empty
  if (!city) {
    alert("Please enter a city");
    return;
  }

  // Construct the URLs for current weather and forecast
  var currentWeatherUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  var forecastUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;

  // Fetch the current weather data
  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      // Display the current weather
      displayCurrentDay(data);
    })
    .catch((error) => {
      console.error("Error fetching current weather data:", error);
      alert("Error fetching current weather data. Please try again.");
    });

  // Fetch the forecast data
  fetch(forecastUrl)
    .then((response) => response.json())
    .then((forecastData) => {

      displayHourlyForecast(forecastData.forecast.forecastday); 
      displayDaythree(forecastData.forecast.forecastday);
    })
    .catch((error) => {
      console.error("Error fetching current weather data:", error);
      alert("Error fetching current weather data. Please try again.");
    });
}

function displayCurrentDay(data) {
  var weatherObj = {
    time:data.location.localtime,
    cityName: data.location.name, 
    temperature: data.current.temp_c,
    disruption: data.current.condition.text,
    imgIcon: data.current.condition.icon,
    raining:data.current.wind_degree,
    wind: data.current.wind_kph,
    direction:data.current.wind_dir
  }
  dayDiv1.innerHTML=`<p class="fs-5 fw-bold">${weatherObj.time}</p>`
  mainCity.innerHTML = `<p class="fs-5 fw-bold">${weatherObj.cityName}</p>`;
  temperatureDiv1.innerHTML = `<p class="fs-3 fw-bold">${weatherObj.temperature}°C</p>`;
  weatherInfo1.innerHTML = `<p class="fs-5 fw-bold">${weatherObj.disruption}</p>`;
  weatherIconDiv1.innerHTML = `<img src="${weatherObj.imgIcon}" alt="Weather Icon" width="100">  `;
  custom.innerHTML = ` 
  <div class=" d-flex">
    <span class="me-4"><img src="img/icon-umberella.png"alt="">${weatherObj.raining}</span>
    <span class="me-4"><img src="img/icon-wind.png"  alt="">${weatherObj.wind}</span>
    <span class="me-4"><img src="img/icon-compass.png"  alt="">${weatherObj.direction}</span>
  </div>`

}


function displayHourlyForecast(forecastData) {
    var x = forecastData[1]; 
    var dayObj = {
      date: x.date,
      temperature:x.day.maxtemp_c,
      icon: x.day.condition.icon,
      disruption: x.day.condition.text,
      wind: x.day.maxwind_kph,
      direction:x.hour[0].wind_dir
    };

    nextDayHolder1.innerHTML = ` <p class="fs-5 fw-bold ">Date: ${dayObj.date}</p>`;
    weatherIconDiv2.innerHTML=` <img class="img-fluid  mt-3" src="${dayObj.icon}" alt="" width="100">`
    temperatureDiv2.innerHTML = `<p class="fs-5 fw-bold mt-3">${dayObj.temperature}oC</p>`
    weatherInfo2.innerHTML = `  <p class="text-primary fs-5 fw-bold" >${dayObj.disruption}</p>`
    custom2.innerHTML =`
    <div class=" d-flex mx-auto">
        <span class="me-4 "><img src="img/icon-wind.png"class="me-2 "  alt="">${dayObj.wind}</span>
        <span class="me-4 "><img src="img/icon-compass.png"  class="me-2 " alt="">${dayObj.direction}</span>
    </div>`
  }




function displayDaythree(forecastData){
    var x = forecastData[2]; 
    var dayObj = {
      date: x.date,
      temperature:x.day.maxtemp_c,
      icon: x.day.condition.icon,
      disruption: x.day.condition.text,
      wind: x.day.maxwind_kph,
      direction:x.hour[0].wind_dir
    };
    nextDayHolder2.innerHTML = ` <p class="fs-5 fw-bold ">Date: ${dayObj.date}</p>`;
    weatherIconDiv3.innerHTML=` <img class="img-fluid  mt-3" src="${dayObj.icon}" alt="" width="100">`
    temperatureDiv3.innerHTML = `<p class="fs-5 fw-bold mt-3">${dayObj.temperature}oC</p>`
    weatherInfo3.innerHTML = `  <p class="text-primary fs-5 fw-bold" >${dayObj.disruption}</p>`
    custom3.innerHTML =`
    <div class=" d-flex mx-auto">
        <span class="me-4 "><img src="img/icon-wind.png"class="me-2 "  alt="">${dayObj.wind}</span>
        <span class="me-4 "><img src="img/icon-compass.png"  class="me-2 " alt="">${dayObj.direction}</span>
    </div>`
  }
