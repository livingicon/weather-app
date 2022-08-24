import weatherModule from "./modules/data.js";

const search = document.getElementById('search');

search.addEventListener('keydown', (e) => {
  if (e.code === "Enter") {
    e.preventDefault();
    weatherModule.getWeatherData(search.value);
    search.value = "";
  }
});