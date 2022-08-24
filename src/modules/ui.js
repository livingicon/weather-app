import weatherModule from "./data.js";

const uiModule = (() => {

  function toggleScale() {
    const togglePosition = document.getElementById('toggleSwitch');
    const cityName = document.getElementById('cityName').textContent;
    let tempScale = "imperial";

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