import { fetchWether } from './js/apiService';
import './sass/main.scss';
import CitySelector from './js/components/citySelector';

let selectedCity;
let selectedCityWeather;
let citySelectorRefs = {
  searchInputForm: document.querySelector('.input-form'),
  searchInputField: document.querySelector('.input-field'),
};
startApp();

function startApp() {
  // init components
  let citySelector = new CitySelector(citySelectorRefs, onCitySelected);

  // on load
  selectedCity = 'Kyiv'; //getCityOnload();
}

function onWeatherOneDayLoad(weather) {
  console.log(weather);
}

function onCitySelected(city) {
  // здесь мы будем перерисовывать все компоненты после выбора (нового) города
  console.log(city);
  selectedCity = city;
}
