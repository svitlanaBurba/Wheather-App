// Weather service
import axios from 'axios';

const BASE_URL_WEATHER = 'https://api.openweathermap.org/data/2.5/weather?';
const BASE_URL_IMG = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=';
const apiKeyWeather = 'd01e7beda7c1dcab67ea99635e4fb4bc';
const apiKeyImg = '21715456-94146d2128778e129cf5897fe';
const iconURL = 'http://openweathermap.org/img/wn/';

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
    temperature: {
      value: Math.floor(rawWeather.main.temp),
      min: Math.floor(rawWeather.main.temp_min),
      max: Math.floor(rawWeather.main.temp_max),
    },
    sunrise: rawWeather.sys.sunrise,
    sunset: rawWeather.sys.sunset,
    icon: iconURL + rawWeather.weather[0].icon + '.png',
  };
};

// переводим температуру из кельвинов в цельсии
// const convertToCel = data => Math.floor(data - 273.15);

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

// Weather service (5 days)

const BASE_URL_WEATHER_FIVE = 'https://api.openweathermap.org/data/2.5/forecast?q=';

const fetchWeatherFive = city =>
  axios.get(`${BASE_URL_WEATHER_FIVE}${city}&units=metric&appid=${apiKeyWeather}`).then(res => {
    return convertFiveDayWeather(res.data);
  });

function groupBy(key) {
  return function group(array) {
    return array.reduce((acc, obj) => {
      const property = obj[key];
      acc[property] = acc[property] || [];
      acc[property].push(obj);
      return acc;
    }, {});
  };
}

const convertFiveDayWeather = rawWeather => {
  const datesWithDay = rawWeather.list.map(element => {
    var xx = new Date();
    xx.setTime(element.dt * 1000);
    element.dayNumber = xx.getDate();
    return element;
  });

  const grouppedWeather = groupBy('dayNumber')(datesWithDay);

  for (let day in grouppedWeather) {
    grouppedWeather[day] = grouppedWeather[day].map(d => {
      return {
        date: d.dt,
        temperature: Math.floor(d.main.temp),
        tempMin: Math.floor(d.main.temp_min),
        tempMax: Math.floor(d.main.temp_max),
        pressure: d.main.pressure,
        humidity: d.main.humidity,
        wind: d.wind.speed,
        icon: d.weather[0].icon,
      };
    });
  }

  let result = {
    city: {
      name: rawWeather.city.name,
      country: rawWeather.city.country,
    },
    daysData: grouppedWeather,
  };

  return result;
};

// Данные которые подгружаются в объект для последующей выгрузки в шаблон
//dt;
//main.temp_min;
//main.temp_max;
//main.pressure;
//main.humidity;
//wind.speed;
//weather[0].icon;

// export data
export { fetchWeather, fetchImages, fetchWeatherFive, fetchLocalWeather };
