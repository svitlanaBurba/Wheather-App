// Weather service
import axios from 'axios';

const BASE_URL_WEATHER = 'https://api.openweathermap.org/data/2.5/';
const BASE_URL_IMG = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=';
const apiKeyWeather = 'd01e7beda7c1dcab67ea99635e4fb4bc';
const apiKeyImg = '21715456-94146d2128778e129cf5897fe';
const iconURL = 'http://openweathermap.org/img/wn/';

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

// функции обработки полученных данных для отправки объекта необходимых данных
// конвертируем полученный 'сырой' объект погоды в объект с температурой в цельсиях
// имена атрибутов будут те, которые будем использовать в шаблонах
// для одного дня
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
    sunrise: getTime(rawWeather.sys.sunrise),
    sunset: getTime(rawWeather.sys.sunset),
    icon: iconURL + rawWeather.weather[0].icon + '.png',
  };
};

// для пяти дней (прогноз)
const convertFiveDayWeather = rawWeather => {
  // получаем массив из 5 дат путем удаления дубликатов и слайса
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

  return {
    city: {
      name: rawWeather.city.name,
      country: rawWeather.city.country,
    },
    // daysData - массив из конвертированных данных для каждого дня (см. конвертер ниже)
    daysData: list.map(convertFiveDayListElements),
  };
};
// для пяти дней (отдельниые элементы)
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
      date: fullDate,
      day: fullDate.getDate(),
      dayName: new Intl.DateTimeFormat('en', { weekday: 'long' }).format(fullDate),
      month: new Intl.DateTimeFormat('en', { month: 'short' }).format(fullDate),
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

// вспомогательные функции
// приводит юникс-время к конкретному дню месяца
const getDate = rawDate => new Date(rawDate.dt * 1000);

// функция округления
const roundTo1digit = x => Math.round(x * 10) / 10;

// функция получения времени в формате "12:00"
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

// непосредственно запрос погоды с последующей его обработкой для получения необходимых данных
// на один день
const fetchWeather = city =>
  axios
    .get(`${BASE_URL_WEATHER}weather?q=${city}&units=metric&appid=${apiKeyWeather}`)
    .then(res => {
      return convertOneDayWeather(res.data);
    });

// на пять дней (прогноз)
const fetchWeatherFive = city =>
  axios
    .get(`${BASE_URL_WEATHER}forecast?q=${city}&units=metric&appid=${apiKeyWeather}`)
    .then(res => {
      return convertFiveDayWeather(res.data);
    });

// запрос погоды по координатам (на 1 день)
const fetchLocalWeather = () =>
  axios
    .get(
      `${BASE_URL_WEATHER}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKeyWeather}`,
    )
    .then(res => {
      return convertOneDayWeather(res.data);
    });

// запрос погоды по координатам (на 5 дней)
const fetchLocalWeatherFive = () =>
  axios
    .get(
      `${BASE_URL_WEATHER}forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKeyWeather}`,
    )
    .then(res => {
      return convertFiveDayWeather(res.data);
    });

// получение рандомной картинки по названию города
const fetchImages = city =>
  fetch(`${BASE_URL_IMG}${city}&page=1&per_page=10&key=${apiKeyImg}`).then(res => {
    return res.json();
  });

// export data
export { fetchWeather, fetchImages, fetchWeatherFive, fetchLocalWeather, fetchLocalWeatherFive };

// конвертер для 5 дней и more info (одна структура)
