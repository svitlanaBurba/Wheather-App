// Weather service
import axios from 'axios';

const BASE_URL_WEATHER = 'https://api.openweathermap.org/data/2.5/weather?';
const BASE_URL_IMG = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=';
const apiKeyWeather = 'd01e7beda7c1dcab67ea99635e4fb4bc';
const apiKeyImg = '21715456-94146d2128778e129cf5897fe';

const fetchWeather = city =>
  axios.get(`${BASE_URL_WEATHER}q=${city}&units=metric&appid=${apiKeyWeather}`).then(res => {
    return convertOneDayWeather(res.data);
  });

// конвертируем полученный 'сырой' объект погоды в объект с температурой в цельсиях
// имена атрибутов будут те, которые будем использовать в шаблонах
const convertOneDayWeather = rawWeather => {
  return {
    city: {
      name: rawWeather.name,
      country: rawWeather.sys.country,
    },
    // temperature: {
    //   value: convertToCel(rawWeather.main.temp),
    //   min: convertToCel(rawWeather.main.temp_min),
    //   max: convertToCel(rawWeather.main.temp_max),
    // },
    temperature: {
      value: Math.floor(rawWeather.main.temp),
      min: Math.floor(rawWeather.main.temp_min),
      max: Math.floor(rawWeather.main.temp_max),
    },
    sunrise: rawWeather.sys.sunrise,
    sunset: rawWeather.sys.sunset,
    icon: 'http://openweathermap.org/img/wn/' + rawWeather.weather[0].icon + '.png',
  };
};

// переводим температуру из кельвинов в цельсии
// const convertToCel = data => Math.floor(data - 273.15);

// Weather service (5 days)

const BASE_URL_WEATHER_FIVE = 'https://api.openweathermap.org/data/2.5/forecast?q=';

const fetchWeatherFive = city =>
  axios.get(`${BASE_URL_WEATHER_FIVE}${city}&units=metric&appid=${apiKeyWeather}`).then(res => {
    return convertFiveDayWeather(res.data);
  });


// Bg Image Service
const fetchImages = city =>
  fetch(`${BASE_URL_IMG}${city}&page=1&per_page=12&key=${apiKeyImg}`).then(res => {
    return res.json();
  });

// Geolocation service

let latitude = '';
let longitude = '';

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(saveCoordinates);
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
}

function saveCoordinates(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  console.log(latitude, longitude);
}

getLocation();

const fetchLocalWeather = () =>
  axios
    .get(`${BASE_URL_WEATHER}lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKeyWeather}`)
    .then(res => {
      return convertOneDayWeather(res.data);
    });

// export data
export { fetchWeather, fetchImages, fetchWeatherFive, fetchLocalWeather };

const convertFiveDayWeather = rawWeather => {
  console.log(rawWeather);
  return {
    city: {
      name: rawWeather.city.name,
      country: rawWeather.city.country,
    },
    arr: rawWeather.list,
    //dt;
    //main.temp_min;
    //main.temp_max;
    //main.pressure;
    //main.humidity;
    //wind.speed;
    //weather[0].icon;
  };
};
