const viewModule = (() => {
  let direction = "";
  let weatherDescription = "";

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
    weatherDescription = words.join(" ");
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

export default viewModule;
