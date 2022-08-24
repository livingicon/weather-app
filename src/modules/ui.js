import weatherModule from "./data.js";

const uiModule = (() => {
  const toggleSwitch = document.getElementById('toggleSwitch');
  let tempScale = "imperial";

  toggleSwitch.addEventListener('change', (e) => {
    const cityName = document.getElementById('cityName').textContent;
    e.preventDefault();
    cityName === "" ? (null) : (toggleScale());
  });

  function toggleScale() {
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