import viewModule from "./display.js";
import weatherModule from "./data.js";

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

export default uiModule;