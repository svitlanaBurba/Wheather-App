import { fetchWether } from './js/apiService';
import './sass/main.scss';

import CitySelector from './js/components/citySelector';
import renderWeatherInformerOneDay from './js/components/weatherInformerOneDay';

// референсы - вынести в файл
let citySelectorRefs = {
  searchInputForm: document.querySelector('.input-form'),
  searchInputField: document.querySelector('.input-field'),
  favCitiesList: document.querySelector('.favorite-list'),
};

let weatherInformerOneDayRefs = {
  wrapper: document.querySelector('.wheather-main-container'),
};

let weatherInformerFiveDayRefs = {
  wrapper: document.querySelector('.wheather-main-container'),
};

// глобальные переменные - хранят состояние программы, в т.ч. загруженную погоду
let selectedCity;
let selectedCityWeatherOneDay;
let selectedCityWeatherFiveDays = {
  list: [
    {
      date: {
        dayName: 'Monday',
        day: '1',
        month: 'May',
      },
      temperature: {
        min: 10,
        max: 20,
      },
    },
    {
      date: {
        dayName: 'Tuesday',
        day: '2',
        month: 'May',
      },
      temperature: {
        min: 11,
        max: 21,
      },
    },
  ],
};

startApp();

function startApp() {
  // init components
  let citySelector = new CitySelector(citySelectorRefs, onCitySelected);

  //
  onCitySelected('Kyiv');
}

// загружает погоду на 1 день по selectedCity, сохраняет ее в selectedCityWeatherOneDay
// и вызывает функцию onWeatherOneDayLoad которую передают как аргумент
// (эта функция будет обновлять нужные компоненты)
function weatherOneDayLoad(onWeatherOneDayLoad) {
  // вызываем наш апи, передаем ему город

  fetchWether(selectedCity).then(w => {
    selectedCityWeatherOneDay = w;
    console.log(w);
    onWeatherOneDayLoad(); // погоду в параметрах не передаем, т.к. она уже лежит в глобальной переменной
  });
}

// эта функция будет вызываться когда мы будем получать данные о погоде за 1 день
// соответственно в ней мы будем рендерить (обновлять) наши компоненты
function onWeatherOneDayLoad() {
  // рендерим погоду на 1 день
  renderWeatherInformerOneDay(weatherInformerOneDayRefs, selectedCityWeatherOneDay);
}

// эту функцию будут вызывать любые события выбора города
// как правило это делает CitySelector - мы передадим ему эту функцию
function onCitySelected(city) {
  // пользователь выбрал город. сохраняем в глобальную переменную
  console.log(city);
  selectedCity = city;

  // теперь нам нужно :
  // 1. Получить данные погоды (и восходов-закатов) по этому городу
  // 2. Когда данные будут получены - сохранить полученную погоду в глобальные переменнные
  //    и начать обновлять все компоненты этой новой погодой
  // для начала будем поддерживать только погоду на 1 день
  weatherOneDayLoad(onWeatherOneDayLoad);
  // время
  // погода на 5 дней и тп
}
