(()=>{"use strict";const e=(()=>{let e="",t="";return{displayResult:function(n){const i=document.getElementById("toggleSwitch"),r=document.getElementById("displayCard");let a="",c="",o=n.windDirection,d=n.currentWeather;var m;i.checked?(a="°F",c="mph"):(a="°C",c="kph"),e=(m=o)>337.5?"N":m>292.5?"NW":m>247.5?"W":m>202.5?"SW":m>157.5?"S":m>122.5?"SE":m>67.5?"E":m>22.5?"NE":"N",function(e){const n=e.split(" ");for(let e=0;e<n.length;e++)n[e]=n[e][0].toUpperCase()+n[e].substr(1);t=n.join(" ")}(d);const l=document.getElementById("cityName"),u=document.getElementById("currentWeather"),s=document.getElementById("currentTemp"),h=document.getElementById("feelsLike"),y=document.getElementById("humidity"),g=document.getElementById("wind");l.textContent=`${n.city}`,u.textContent=`Weather: ${t}`,h.textContent=`Feels Like: ${n.feelsLike} ${a}`,y.textContent=`Humidity: ${n.humidity}%`,s.textContent=`Temperature: ${n.temperature} ${a}`,g.textContent=`Wind: ${e} ${n.windSpeed} ${c}`,r.style.display="grid"}}})(),t=(()=>{let t={};const n=function(e){return t={city:e.name,currentWeather:e.weather[0].description,icon:e.weather[0].icon,temperature:e.main.temp,feelsLike:e.main.feels_like,humidity:e.main.humidity,windSpeed:e.wind.speed,windDirection:e.wind.deg},t};return{getWeatherData:async function(i,r){r=document.getElementById("toggleSwitch").checked?"imperial":"metric";try{const a=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${i}&units=${r}&APPID=f59db8f3e672caf010ea9eef7f1433a6`,{mode:"cors"});if(!a.ok)throw new Error(`${i} not found.\n      Search must be in the form of "City", "City, State" or "City, Country".`);const c=await a.json();n(c),e.displayResult(t)}catch(e){console.error(e),alert(e)}},weatherData:n}})(),n=t,i=function(){const e=document.getElementById("toggleSwitch"),t=document.getElementById("cityName").textContent;let i="imperial";e.checked&&(i="metric",n.getWeatherData(t,i)),e.checked||(i="imperial",n.getWeatherData(t,i))},r=document.getElementById("search");r.addEventListener("keydown",(e=>{"Enter"===e.code&&(e.preventDefault(),n.getWeatherData(r.value),r.value="")})),toggleSwitch.addEventListener("change",(e=>{const t=document.getElementById("cityName").textContent;e.preventDefault(),""!==t&&i()}))})();