import { fetchWeather, fetchWeatherFive } from './js/apiService';
import './sass/main.scss';
//import jquery from 'jquery';
//import slick from 'slick-carousel';

import CitySelector from './js/components/citySelector';
import FavCityManager from './js/favCityManager';
import renderWeatherInformerOneDay from './js/components/weatherInformerOneDay';
import renderWeatherInformerFiveDays from './js/components/weatherInformerFiveDays';
import renderWeatherInformerMoreInfo from './js/components/weatherInformerMoreInfo';
import renderTimeInformer from './js/components/timeInformer';
import renderChart from './js/components/weatherInformerChart';
import renderQuoteInformer from './js/components/quoteInformer';

// референсы - вынести в файл
let citySelectorRefs = {
  searchInputForm: document.querySelector('.input-form'),
  searchInputField: document.querySelector('.input-field'),
  addFavoriteBtn: document.querySelector('.input-form-addfavorite'),
  geoBtn: document.querySelector('.input-icon-location'),
  favCitiesList: document.querySelector('.favorite-list'),
};

let weatherInformerOneDayRefs = {
  wrapper: document.querySelector('.wheather-main-container'),
};

let weatherInformerFiveDaysRefs = {
  wrapper: document.querySelector('.weather-output-wrapper-five-days'),
};

let weatherInformerMoreInfoRefs = {
  wrapper: document.querySelector('.wheather-main-more-info-container'),
};

let timeInformerRefs = {
  wrapper: document.querySelector('.current-date-section'),
};

// глобальные переменные - хранят состояние программы, в т.ч. загруженную погоду
let selectedCity;
let selectedCityWeatherOneDay;
let selectedCityWeatherFiveDays;

let citySelector;

startApp();

function startApp() {
  // init components

  let favCityManager = new FavCityManager();
  //favCityManager.addFavCity('Berlin');
  //favCityManager.addFavCity('Moscow');

  citySelector = new CitySelector(
    citySelectorRefs, //
    onCitySelected,
    favCityManager,
    x => ({}), // функция которую вызывать после отрисовки компонента.
  );

  // переделать в функцию выбора даты по умолчанию
  let defaultCity = favCityManager.getFavCities()[0];
  if (!defaultCity) {
    defaultCity = 'Kyiv';
  }

  onCitySelected(defaultCity);
  renderQuoteInformer();
  citySelector.setDisplayedCity();
}

// загружает погоду на 1 день по selectedCity, сохраняет ее в selectedCityWeatherOneDay
// и вызывает функцию onWeatherOneDayLoad которую передают как аргумент
// (эта функция будет обновлять нужные компоненты)
function weatherOneDayLoad(onWeatherOneDayLoad) {
  // вызываем наш апи, передаем ему город

  fetchWeather(selectedCity).then(w => {
    selectedCityWeatherOneDay = w;
    onWeatherOneDayLoad(); // погоду в параметрах не передаем, т.к. она уже лежит в глобальной переменной
  });
}

// загружает погоду на 5 день по selectedCity, сохраняет ее в selectedCityWeatherFiveDays
// и вызывает функцию onWeatherFiveDaysLoad которую передают как аргумент
// (эта функция будет обновлять нужные компоненты)
function weatherFiveDaysLoad(onWeatherFiveDaysLoad) {
  // вызываем наш апи, передаем ему город
  fetchWeatherFive(selectedCity).then(w => {
    selectedCityWeatherFiveDays = w;
    onWeatherFiveDaysLoad(); // погоду в параметрах не передаем, т.к. она уже лежит в глобальной переменной
  });
}

// эта функция будет вызываться когда мы будем получать данные о погоде за 1 день
// соответственно в ней мы будем рендерить (обновлять) наши компоненты
function onWeatherOneDayLoad() {
  //
  selectedCity =
    selectedCityWeatherOneDay.city.name + ', ' + selectedCityWeatherOneDay.city.country;
  // рендерим погоду на 1 день
  renderWeatherInformerOneDay(weatherInformerOneDayRefs, selectedCityWeatherOneDay);
  // рендерим время (с новым восходом и закатом)
  renderTimeInformer(timeInformerRefs, selectedCityWeatherOneDay);
}

// эта функция будет вызываться когда мы будем получать данные о погоде за 5
// соответственно в ней мы будем рендерить (обновлять) наши компоненты
function onWeatherFiveDaysLoad() {
  // рендерим погоду на 5 дней
  renderWeatherInformerFiveDays(weatherInformerFiveDaysRefs, selectedCityWeatherFiveDays);
  // рендерим more info для первого дня из 1 (ПЕРЕДЕЛАТЬ - будет показываться для того дня, который выбрал пользователь )
  renderWeatherInformerMoreInfo(
    weatherInformerMoreInfoRefs,
    selectedCityWeatherFiveDays.daysData[0],
  );
  renderChart(selectedCityWeatherFiveDays);
}

// эту функцию будут вызывать любые события выбора города
// как правило это делает CitySelector - мы передадим ему эту функцию
function onCitySelected(city) {
  // пользователь выбрал город. сохраняем в глобальную переменную
  selectedCity = city;
  citySelector.setDisplayedCity(city);

  // теперь нам нужно :
  // 1. Получить данные погоды (и восходов-закатов) по этому городу
  // 2. Когда данные будут получены - сохранить полученную погоду в глобальные переменнные
  //    и начать обновлять все компоненты этой новой погодой
  // для начала будем поддерживать только погоду на 1 день
  weatherOneDayLoad(onWeatherOneDayLoad);
  // время
  // погода на 5 дней и тп
  weatherFiveDaysLoad(onWeatherFiveDaysLoad);
}
export { selectedCityWeatherFiveDays };

