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

  return { getWeatherData };
})();

const viewModule = (() => {
  let direction = "";

  const degToDirection = function(degree) {
    if (degree > 337.5) {
      direction = 'N';
    } else if (degree > 292.5) {
      direction = 'NW';
    } else if (degree > 247.5) {
      direction = 'W';
    } else if (degree > 202.5) {
      direction = 'SW';
    } else if (degree > 157.5) {
      direction = 'S';
    } else if (degree > 122.5) {
      direction = 'SE';
    } else if (degree > 67.5) {
      direction = 'E';
    } else if (degree > 22.5) {
      direction = 'NE';
    } else {
      direction = 'N';
    }
  };

  const capitalize = function(string) {
    const words = string.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    weatherDescription =  words.join(" ");
  };

  const displayResult = function(info){
    const togglePosition = document.getElementById('toggleSwitch');
    const displayCard = document.getElementById('displayCard');
    let scaleSymbol = "";
    let speed = "";
    let deg = info.windDirection;
    let weather = info.currentWeather;

    togglePosition.checked ? (scaleSymbol = "°F", speed = "mph") : 
    (scaleSymbol = "°C", speed = "kph");
    degToDirection(deg);
    capitalize(weather);

    const cityName = document.getElementById('cityName');
    const currentWeather = document.getElementById('currentWeather');
    const currentTemp = document.getElementById('currentTemp');
    const feelsLike = document.getElementById('feelsLike');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');

    cityName.textContent = `${info.city}`;
    currentWeather.textContent = `Weather: ${weatherDescription}`;
    feelsLike.textContent = `Feels Like: ${info.feelsLike} ${scaleSymbol}`;
    humidity.textContent = `Humidity: ${info.humidity}%`;
    currentTemp.textContent = `Temperature: ${info.temperature} ${scaleSymbol}`;
    wind.textContent = `Wind: ${direction} ${info.windSpeed} ${speed}`;
    
    displayCard.style.display = "grid";
  };

  return { displayResult };
})();




const uiModule = (() => {
  const search = document.getElementById('search');
  const toggleSwitch = document.getElementById('toggleSwitch');
  let tempScale = "imperial";

  search.addEventListener('keydown', (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      weatherModule.getWeatherData(search.value);
      search.value = "";
    }
  });

  toggleSwitch.addEventListener('change', (e) => {
    const cityName = document.getElementById('cityName').textContent;
    e.preventDefault();
    cityName === "" ? (null) : (toggleScale());
  });

  function toggleScale() { // HERE!!!
    const togglePosition = document.getElementById('toggleSwitch');
    const cityName = document.getElementById('cityName').textContent;

    if (togglePosition.checked) {
      tempScale = "metric";
      weatherModule.getWeatherData(cityName, tempScale);
    } 
    if (!togglePosition.checked) {
      tempScale = "imperial";
      weatherModule.getWeatherData(cityName, tempScale);
    }
  }

    return { toggleScale };
})();