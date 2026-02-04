const apiKey = "0103f818358516b88f4a1036474bc7a3";

async function checkWeather(cityname) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityname}&appid=${apiKey}`;

  let statusText = document.querySelector(".statusText");
  let errorBox = document.querySelector(".error");
  let weatherBox = document.querySelector(".weather");

  // show loading
  statusText.style.display = "block";
  statusText.innerHTML = "Loading weather...";
  errorBox.style.display = "none";
  weatherBox.style.display = "none";

  const response = await fetch(apiUrl);

  if (response.status == 404) {
    statusText.style.display = "none";
    errorBox.style.display = "block";
    weatherBox.style.display = "none";
    return;
  }

  const data = await response.json();

  //  hide loading after the data arrives
  statusText.style.display = "none";

  let temp = document.querySelector(".temp");
  let humidity = document.querySelector(".humidity");
  let wind = document.querySelector(".wind");
  let city = document.querySelector(".city");
  let weatherIcon = document.querySelector(".weatherIcon");

  // show data
  city.innerHTML = data.name;
  temp.innerHTML = Math.round(data.main.temp) + "℃";
  humidity.innerHTML = data.main.humidity + "%";
  wind.innerHTML = data.wind.speed + " Km/h";

  //  Temperature color effect
  temp.classList.remove("hot", "cold", "normal");

  if (data.main.temp >= 30) temp.classList.add("hot");
  else if (data.main.temp <= 15) temp.classList.add("cold");
  else temp.classList.add("normal");

  //  Weather icon change
  let condition = data.weather[0].main;

  if (condition == "Clouds") weatherIcon.src = "images/clouds.png";
  else if (condition == "Clear") weatherIcon.src = "images/clear.png";
  else if (condition == "Rain") weatherIcon.src = "images/rain.png";
  else if (condition == "Drizzle") weatherIcon.src = "images/drizzle.png";
  else if (condition == "Mist") weatherIcon.src = "images/mist.png";
  else weatherIcon.src = "images/clouds.png";

  // show weather box
  weatherBox.style.display = "block";
}

let search = document.querySelector(".searchButton");
let cityInput = document.querySelector(".cityname");

// Button click
search.addEventListener("click", () => {
  if (cityInput.value.trim() === "") return;
  checkWeather(cityInput.value);
});

// Enter key support
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (cityInput.value.trim() === "") return;
    checkWeather(cityInput.value);
  }
});
