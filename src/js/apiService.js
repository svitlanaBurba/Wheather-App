// Weather service
import axios from 'axios';

const BASE_URL_WEATHER = 'https://api.openweathermap.org/data/2.5/weather?q=';
const BASE_URL_IMG = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=';
const apiKeyWether = 'd01e7beda7c1dcab67ea99635e4fb4bc';
const apiKeyImg = '21715456-94146d2128778e129cf5897fe';

const fetchWether = city =>
  axios.get(`${BASE_URL_WEATHER}${city}&appid=${apiKeyWether}`).then(res => {
    return convertOneDayWeather(res.data);
  });

// конвертируем полученный 'сырой' объект погоды в объект с температурой в цельсиях
// имена атрибутов будут те, которые будем использовать в шаблонах
const convertOneDayWeather = rawWeather => {
  console.log(rawWeather);
  return {
    city: {
      name: rawWeather.name,
      country: rawWeather.sys.country,
    },
    temperature: {
      value: convertToCel(rawWeather.main.temp),
      min: convertToCel(rawWeather.main.temp_min),
      max: convertToCel(rawWeather.main.temp_max),
    },
    icon: 'http://openweathermap.org/img/wn/' + rawWeather.weather[0].icon + '.png',
  };
};

// переводим температуру из кельвинов в цельсии
const convertToCel = data => Math.floor(data - 273.15);

// Weather service (5 days)

const BASE_URL_WEATHER_FIVE = 'https://api.openweathermap.org/data/2.5/forecast?q=';

const fetchWetherFive = city =>
  fetch(`${BASE_URL_WEATHER_FIVE}${city}&units=metric&appid=${apiKeyWethere}`).then(res => {
    return res.json();
  });

// Bg Image Service
const fetchImages = city =>
  fetch(`${BASE_URL_IMG}${city}&page=1&per_page=12&key=${apiKeyImg}`).then(res => {
    return res.json();
  });

export { fetchWether, fetchImages };

// Geolocation service

// Geolocation service

// var x = document.getElementById('demo');

// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else {
//     x.innerHTML = 'Geolocation is not supported by this browser.';
//   }
// }

// function showPosition(position) {
//   x.innerHTML =
//     'Latitude: ' + position.coords.latitude + '<br>Longitude: ' + position.coords.longitude;
// }
