import { fetchWeather, fetchWeatherFive } from './js/apiService';
import './sass/main.scss';
//import jquery from 'jquery';
//import slick from 'slick-carousel';
import {
  citySelectorRefs,
  weatherInformerOneDayRefs,
  weatherInformerFiveDaysRefs,
  weatherInformerMoreInfoRefs,
  timeInformerRefs,
} from './js/refs';
import CitySelector from './js/components/citySelector';
import FavCityManager from './js/favCityManager';
import renderWeatherInformerOneDay from './js/components/weatherInformerOneDay';
import renderWeatherInformerFiveDays from './js/components/weatherInformerFiveDays';
import renderWeatherInformerMoreInfo from './js/components/weatherInformerMoreInfo';
import renderTimeInformer from './js/components/timeInformer';
import renderChart from './js/components/weatherInformerChart';
import renderQuoteInformer from './js/components/quoteInformer';
import renderBgImg from './js/components/bgImageInformer';

export { selectedCityWeatherFiveDays };

// референсы - вынести в файл

// глобальные переменные - хранят состояние программы, в т.ч. загруженную погоду
let selectedCity;
let selectedCityWeatherOneDay;
let selectedCityWeatherFiveDays;
let citySelector;

// запускам наше приложение
startApp();

// главная функция
function startApp() {
  // создаем экземпляры объектов-компонентов (увы, только 1 компонент создан как класс)
  let favCityManager = new FavCityManager(); // служебный класс для работы с локалсторадж

  citySelector = new CitySelector( // класс для работы с компонентом - формой выбора города, кнопки любимых городов и т.п.
    citySelectorRefs, //передаем референсы
    onCitySelected, // передаем функцию, которую компонент будет вызывать каждый раз, когда в нем выберут город
    favCityManager, // передаем служебный класс для работы с локалсторадж, компонент будет его использовать чтоб читать и сохранять города
  );

  // определяем город для первой загрузки: сначала первый любимый город, а если нет то Киев
  // вызов геолокации пока не поддерживается - ДОБАВИТЬ
  let defaultCity = favCityManager.getFavCities()[0];
  if (!defaultCity) {
    defaultCity = 'Kyiv';
  }

  // вызываем главную функцию onCitySelected - отвечает за загрузку и отображение данных по выбранному городу
  onCitySelected(defaultCity);
  // рисуем цитату
  renderQuoteInformer();
}

// эту функцию будут вызывать любые события выбора города
// как правило это делает CitySelector когда в нем выбирают город - мы передаем ему эту функцию и он сам ее вызывает
function onCitySelected(city) {
  selectedCity = city; // пользователь выбрал город. сохраняем в глобальную переменную

  renderBgImg(selectedCity.split(',')[0]); // устанавливаем фоновое изображение

  weatherOneDayLoad(onWeatherOneDayLoad); // загружаем погоду на 1 день. когда загрузится - вызовется функция onWeatherOneDayLoad
  // onWeatherOneDayLoad обработает полученные результаты и запустит обновление компонент которым нужна погода за 1 день: главный информер и время

  weatherFiveDaysLoad(onWeatherFiveDaysLoad); // загружаем погоду на 1 день. когда загрузится - вызовется функция onWeatherFiveDaysLoad
  // onWeatherFiveDaysLoad обработает полученные результаты и запустит обновление компонент с погодой за 5 дней: информер 5 дней, мор инфо и чарт
}

// загружает погоду на 1 день по selectedCity, сохраняет ее в selectedCityWeatherOneDay
// и вызывает функцию onWeatherOneDayLoad которую передают как аргумент
// (эта функция будет обновлять нужные компоненты)
function weatherOneDayLoad(onWeatherOneDayLoad) {
  // вызываем наш апи, передаем ему город
  fetchWeather(selectedCity).then(weather => {
    selectedCityWeatherOneDay = weather; // когда получим погоду, сохраняем ее в глобальную переменную
    onWeatherOneDayLoad(); // и вызываем функцию, которая наконец будет рисовать
  });
}

// эта функция будет вызываться когда мы будем получать данные о погоде за 1 день
// соответственно в ней мы будем рендерить (обновлять) наши компоненты
function onWeatherOneDayLoad() {
  // если в строке поиска не пусто (т.е. это не первая загрузка, а пользователь что-то ввел)
  // то напишем в строке поиска красивое полное имя города как нам его вернул АПИ
  if (citySelector.getDisplayedCity() !== '') {
    citySelector.setDisplayedCity(
      selectedCityWeatherOneDay.city.name + ', ' + selectedCityWeatherOneDay.city.country,
    );
  }
  // рендерим погоду на 1 день
  renderWeatherInformerOneDay(weatherInformerOneDayRefs, selectedCityWeatherOneDay);
  // рендерим время (с новым восходом и закатом)
  renderTimeInformer(timeInformerRefs, selectedCityWeatherOneDay);
}

// загружает погоду на 5 день по selectedCity, сохраняет ее в selectedCityWeatherFiveDays
// и вызывает функцию onWeatherFiveDaysLoad которую передают как аргумент
// (эта функция будет обновлять нужные компоненты)
function weatherFiveDaysLoad(onWeatherFiveDaysLoad) {
  // вызываем наш апи, передаем ему город
  fetchWeatherFive(selectedCity).then(weatherFive => {
    selectedCityWeatherFiveDays = weatherFive;
    onWeatherFiveDaysLoad();
  });
}
// эта функция будет вызываться когда мы будем получать данные о погоде за 5
// соответственно в ней мы будем рендерить (обновлять) наши компоненты
function onWeatherFiveDaysLoad() {
  // рендерим погоду на 5 дней
  renderWeatherInformerFiveDays(weatherInformerFiveDaysRefs, selectedCityWeatherFiveDays);

  // рендерим чарт
  renderChart(selectedCityWeatherFiveDays);
}

export default function logTime(str) {
  let t = new Date();
  console.log(t.toTimeString().split(' ')[0] + ':' + t.getMilliseconds() + ':   ' + str);
}
