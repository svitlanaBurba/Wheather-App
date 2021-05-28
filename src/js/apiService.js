// Weather service
import axios from 'axios';
// export data
export { fetchWeather, fetchImages, fetchWeatherFive, fetchLocalWeather, fetchLocationCityName };

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
    timezone: rawWeather.timezone,
    sunrise: getTime(rawWeather.sys.sunrise),
    sunset: getTime(rawWeather.sys.sunset),
    icon: iconURL + rawWeather.weather[0].icon + '.png',
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

// GeoLocation Service 2.0

const fetchLocationCityName = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 3000 });
  }).then(position => {
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    return axios
      .get(
        `${BASE_URL_WEATHER}lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKeyWeather}`,
      )
      .then(res => {
        console.log(res);
        return res.data.name + ', ' + res.data.sys.country;
      });
  });
};

// конвертер для 5 дней и more info (одна структура)
const convertFiveDayWeather = rawWeather => {
  // получаем массив из 5 дат путем удаления дубликатов и shift
  const dates = rawWeather.list
    .map(element => getDate(element).getDate())
    .filter((v, i, a) => a.indexOf(v) === i);

  if (dates[5]) {
    dates.shift();
  }

  // из исходного "плоского" массива детальных прогнозов list делаем 2 уровневый массив:
  // для каждого дня будет отдельный вложенный массив детальных прогнозов
  // было: [{прогноз на 27 на 00},
  //        { прогноз на 27 на 03},
  //        { прогноз на 28 на 00},
  //        { прогноз на 28 на 03}
  //       ]
  // стало: [
  //              [{ прогноз на 27 на 00}, { прогноз на 27 на 03}],
  //              [{ прогноз на 28 на 00}, { прогноз на 28 на 03}]
  //          ]
  const list = dates.map(date => rawWeather.list.filter(elem => getDate(elem).getDate() === date));
  console.log('5days:');
  console.log(rawWeather);

  return {
    city: {
      name: rawWeather.city.name,
      country: rawWeather.city.country,
    },
    // daysData - массив из конвертированных данных для каждого дня (см. конвертер ниже)
    daysData: list.map(convertFiveDayListElements),
  };
};

// эта функция принимает массив детальных прогнозов для 1 дня (т.е. примерно 7 элементов)
// возвращает структуру, которая будет содержать прогноз для дня в целом + вложенный исходный массив детальных прогнозов
// массив детальных прогнозов будет использоваться в more info
function convertFiveDayListElements(forecasts) {
  let rootForecast = forecasts[0]; // берем первый детальный прогноз для этого дня - чаще всего это прогноз на 00:00
  // с него мы возьмем дату(она все равно одинакова для всех прогнозов)
  // также мы возьмем иконку (т.е. иконка всегда будет для прогноза на ночь)
  let fullDate = getDate(rootForecast);

  return {
    weather: {
      icon: iconURL + rootForecast.weather[0].icon + '.png',
    },
    date: {
      dt: rootForecast.dt,
      date: fullDate,
      day: fullDate.getDate(),
      dayName: new Intl.DateTimeFormat('en', { weekday: 'long' }).format(fullDate),
      month: new Intl.DateTimeFormat('en', { month: 'short' }).format(fullDate),
      year: new Intl.DateTimeFormat('en', { year: 'numeric' }).format(fullDate),
    },
    // считаем минимальную и максимальную температуры по всем детальным прогнозам для этого дня
    temperature: {
      min: Math.round(Math.min(...forecasts.map(x => x.main.temp_min))), // здесь мы создаем массив из temp_min для этого дня и при помощи spread считаем минимальное значение
      max: Math.round(Math.max(...forecasts.map(x => x.main.temp_max))),
    },
    rawForecasts: forecasts,
    forecasts: forecasts.map(forecast => ({
      time: getTime(forecast.dt),
      temperature: Math.round(forecast.main.temp),
      pressure: forecast.main.pressure,
      humidity: forecast.main.humidity,
      windSpeed: roundTo1digit(forecast.wind.speed),
      icon: iconURL + forecast.weather[0].icon + '.png',
    })),
  };
  //dt;
  //main.temp_min;
  //main.temp_max;
  //main.pressure;
  //main.humidity;
  //wind.speed;
  //weather[0].icon;
}

const getDate = rawDate => new Date(rawDate.dt * 1000);

const roundTo1digit = x => Math.round(x * 10) / 10;

const getTime = data => {
  const dt = new Date(data * 1000);
  return (
    (dt.getHours() < 10 ? '0' : '') +
    dt.getHours() +
    ':' +
    (dt.getMinutes() < 10 ? '0' : '') +
    dt.getMinutes()
  );
};
