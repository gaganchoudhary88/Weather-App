let city = document.getElementById("city");
let type = document.getElementById("type");
let temp = document.getElementById("temp");
let image = document.getElementById("img");
let input = document.getElementById("inp");
let API_key = "6d83156e4e40ca97d0c6924b832fe00c";

const data = async function(search) {
   let getData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_key}&units=metric`);
   let jsonData = await getData.json();
   
   if (jsonData.cod == 400) {
       alert("Please Enter Location");
       image.src = "error1.png";
       city.innerHTML = "";
       temp.innerHTML = "";
       type.innerHTML = "";
   } else if (jsonData.cod == 404) {
       alert("Please Enter Correct Location");
       image.src = "error2.png";
       city.innerHTML = search;
       temp.innerHTML = "";
       type.innerHTML = "";
   } else {
       city.innerHTML = search;
       temp.innerHTML = Math.floor(jsonData.main.temp) + "°C";
       type.innerHTML = jsonData.weather[0].main;

       // Weather icon logic
       if (type.innerHTML == "Clouds") {
           image.src = "images/cloud.png";
       } else if (type.innerHTML == "Clear") {
           image.src = "images/clear.png";
       } else if (type.innerHTML == "Rain") {
           image.src = "images/rain.png";
       } else if (type.innerHTML == "Snow") {
           image.src = "images/snow.png";
       } else if (type.innerHTML == "Haze") {
           image.src = "images/haze.png";
       } else if (type.innerHTML == "Storm") {
           image.src = "images/storm.png";
       }
   }
   input.value = "";
}

const forecastData = async function(search) {
   let getData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${API_key}&units=metric`);
   let jsonData = await getData.json();
   let forecastList = jsonData.list;

   // Clear previous forecast data
   document.getElementById("forecast").innerHTML = '';

   // Loop through the data to show forecasts every 24 hours
   for (let i = 0; i < forecastList.length; i += 8) { // 8 intervals per day
       let forecast = forecastList[i];
       let date = new Date(forecast.dt * 1000).toLocaleDateString();
       let temp = Math.floor(forecast.main.temp) + "°C";
       let weatherType = forecast.weather[0].main;
       let icon = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;

       // Create a forecast day card
       let forecastDiv = document.createElement("div");
       forecastDiv.className = "forecast-day";
       forecastDiv.innerHTML = `
           <h4>${date}</h4>
           <img src="${icon}" alt="${weatherType}">
           <p>${temp}</p>
           <p>${weatherType}</p>
       `;

       // Append the forecast day to the forecast container
       document.getElementById("forecast").appendChild(forecastDiv);
   }
}

function myFun() {
   search = input.value;
   data(search); // Current weather
   forecastData(search); // 5-day forecast
}
