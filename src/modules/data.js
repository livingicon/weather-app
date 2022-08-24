import viewModule from "./display.js";

const weatherModule = (() => {
  let localWeather = {};

  const weatherData = function(info) {
    localWeather =  {
      city: info.name,
      currentWeather: info.weather[0].description,
      icon: info.weather[0].icon,
      temperature: info.main.temp,
      feelsLike: info.main.feels_like,
      humidity: info.main.humidity,
      windSpeed: info.wind.speed,
      windDirection: info.wind.deg
    };
    return localWeather;
  };

  async function getWeatherData(location, tempScale){
    const togglePosition = document.getElementById('toggleSwitch');

    togglePosition.checked ? (tempScale = "imperial") : (tempScale = "metric");
    try {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=${tempScale}&APPID=f59db8f3e672caf010ea9eef7f1433a6`, 
      {mode: 'cors'});
      if (!response.ok) throw new Error(`${location} not found.
      Search must be in the form of "City", "City, State" or "City, Country".`);
      const data = await response.json();
      weatherData(data);
      viewModule.displayResult(localWeather);
    } catch (err) {
      console.error(err); // logs errors
      alert(err);
      // return null;
    }
  };

  return { getWeatherData, weatherData };
})();

export default weatherModule;