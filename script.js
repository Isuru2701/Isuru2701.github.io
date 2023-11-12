import { database, ref, onValue } from "./firebase.js";

const fetchBtn = document.getElementById('fetchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const smokeLevel = document.getElementById('smoke-level');
const flameLevel = document.getElementById('flame-level');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function fetchLoraxPrediction(temperature, humidity) { //Function which fetch the firebase data to Lorax ml model
    const loraxApiUrl = "https://lorax.azurewebsites.net/predict";
    const loraxRequestBody = {
      "region": "Colombo",
      "date": new Date().toISOString().split('T')[0],
      "temp": temperature,
      "humidity": humidity
    };
  
    try {
      const response = await fetch(loraxApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loraxRequestBody),
      });
  
      if (!response.ok) {
        throw new Error(`Lorax API request failed with status ${response.status}`);
      }
  
      const loraxData = await response.json();
  
      // Update the UI with Lorax prediction values
      const loraxContainer = document.querySelector(".additional-container");
      loraxContainer.innerHTML = `
        <p>Prediction: ${loraxData.prediction}</p>
        <p>Likelihood: ${loraxData.likelihood}</p>
      `;
    } catch (error) {
      console.error("Error fetching Lorax prediction:", error.message);
    }
  }
  

  async function checkWeather() { //Function which retrieves data values from Firebase
    console.log('run');
    location_not_found.style.display = 'none';
    weather_body.style.display = 'flex';
  
    let currentTemperature;
    let currentHumidity;
  
    const temperatureRef = ref(database, 'Temperature');
    const humidityRef = ref(database, 'Humidity');
    const windSpeedRef = ref(database, 'SoilMoisture');
    const smokeLevelRef = ref(database, 'Smoke');
    const flameLevelRef = ref(database, 'Flame');
  
    onValue(temperatureRef, (snapshot) => {
      currentTemperature = snapshot.val();  
      console.log('Temperature:', currentTemperature);
      temperature.innerHTML = `${currentTemperature} <sup>°C</sup>`;
      updateLoraxPrediction();
    });
  
    onValue(humidityRef, (snapshot) => {
      currentHumidity = snapshot.val();  
      console.log('Humidity:', currentHumidity);
      humidity.innerHTML = `${currentHumidity}%`;
      updateLoraxPrediction();
    });
  
    onValue(windSpeedRef, (snapshot) => {
      wind_speed.innerHTML = `${snapshot.val()}%`;
    });
  
    onValue(smokeLevelRef, (snapshot) => {
        const smokeValue = snapshot.val();
        smokeLevel.innerHTML = getSmokeLevelText(smokeValue);
    });
    
    onValue(flameLevelRef, (snapshot) => {
        const flameValue = snapshot.val();
        flameLevel.innerHTML = getFlameLevelText(flameValue);
    });

    function getSmokeLevelText(value) {
        const text = value === 1 ? "High" : "Low";
        const color = value === 1 ? "red" : "green";
        return `<span style="color: ${color};">${text}</span>`;
    }
    
    function getFlameLevelText(value) {
        const text = value === 1 ? "High" : "Low";
        const color = value === 1 ? "red" : "green";
        return `<span style="color: ${color};">${text}</span>`;
    }
    
  
    function updateLoraxPrediction() {
      //Checking if both temperature and humidity are available
      if (currentTemperature !== undefined && currentHumidity !== undefined) {
        //Fetching Lorax prediction when both temperature and humidity are available
        fetchLoraxPrediction(currentTemperature, currentHumidity);
      }
    }
  }
  

//Function for refreshing the UI page for every 2 secs
document.addEventListener('DOMContentLoaded', () => {
  checkWeather("YourDefaultLocation"); // Provide a default location if needed

  setInterval(() => {
    checkWeather();
  }, 2000);
});



// EventAction function for Search button
// searchBtn.addEventListener('click', () => {
//   checkWeather(inputBox.value);
// });

//Click event listener for fetchBtn
fetchBtn.addEventListener('click', () => {
    const inputBox = document.querySelector('.input-box');
    const location_not_found = document.querySelector('.location-not-found');
    const weather_body = document.querySelector('.weather-body');
  
    //Clear the previous Lorax model values
    const loraxContainer = document.querySelector(".additional-container");
    loraxContainer.innerHTML = `<p></p>`;
  
    //Check weather for the specified location
    checkWeather(inputBox.value);
  
    //Show or hide elements based on weather data
    location_not_found.style.display = 'none';
    weather_body.style.display = 'flex';
  });