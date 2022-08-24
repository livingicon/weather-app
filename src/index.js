import weatherModule from "./modules/data.js";
import uiModule from "./modules/ui.js";

const search = document.getElementById('search');

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
  cityName === "" ? (null) : (uiModule.toggleScale());
});