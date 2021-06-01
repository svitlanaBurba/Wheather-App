import { fetchWeather, fetchWeatherFive } from './js/apiService';
import './sass/main.scss';
import {
  citySelectorRefs,
  weatherInformerOneDayRefs,
  weatherInformerFiveDaysRefs,
  weatherInformerMoreInfoRefs,
  timeInformerRefs,
} from './js/refs';
import CitySelector from './js/components/citySelector';
import renderWeatherInformerOneDay from './js/components/weatherInformerOneDay';
import renderWeatherInformerFiveDays from './js/components/weatherInformerFiveDays';
import renderTimeInformer from './js/components/timeInformer';
import renderChart from './js/components/weatherInformerChart';
import renderQuoteInformer from './js/components/quoteInformer';
import renderBgImg from './js/components/bgImageInformer';
import favCityTemp from './templates/citySelectorFavCity.hbs';

import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

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

  citySelector = new CitySelector( // класс для работы с компонентом - формой выбора города, кнопки любимых городов и т.п.
    citySelectorRefs, //передаем референсы
    onCitySelected, // передаем коллбек-функцию, которую компонент будет вызывать каждый раз, когда в нем выберут город
    favCityTemp,
  );

  // определяем город для первой загрузки: сначала первый любимый город, а если нет то Киев
  let defaultCity = citySelector.getDefaultCity('Kyiv');

  // вызываем главную функцию onCitySelected - отвечает за загрузку и отображение данных по выбранному городу
  onCitySelected(defaultCity);
  // рисуем цитату
  renderQuoteInformer();
}

// эту функцию будут вызывать любые события выбора города
// как правило это делает CitySelector когда в нем выбирают город - мы передаем ему эту функцию и он сам ее вызывает
function onCitySelected(city) {
  selectedCity = city; // пользователь выбрал город. сохраняем в глобальную переменную

  // renderBgImg(selectedCity); // устанавливаем фоновое изображение

  // загружаем погоду на 1 день из апи. когда загрузится - вызовется функция onWeatherOneDayLoad
  // onWeatherOneDayLoad обработает полученные результаты и запустит обновление компонент которым нужна погода за 1 день: главный информер и время
  fetchWeather(selectedCity)
    .then(weather => {
      selectedCityWeatherOneDay = weather; // когда получим погоду, сохраняем ее в глобальную переменную
      onWeatherOneDayLoad(); // и вызываем функцию, которая наконец будет рисовать
    })
    .catch(err =>
      alert({
        text: `There is no such city. Please, try again`,
      }),
    );

  // загружаем погоду на 5 дней из апи. когда загрузится - вызовется функция onWeatherFiveDaysLoad
  // onWeatherFiveDaysLoad обработает полученные результаты и запустит обновление компонент с погодой за 5 дней: информер 5 дней, мор инфо и чарт
  fetchWeatherFive(selectedCity)
    .then(weatherFive => {
      selectedCityWeatherFiveDays = weatherFive;
      onWeatherFiveDaysLoad();
    })
    .catch(err => console.log('No such city'));
}

// эта функция будет вызываться когда мы будем получать данные о погоде за 1 день
// соответственно в ней мы будем рендерить (обновлять) наши компоненты
function onWeatherOneDayLoad() {
  renderBgImg(selectedCity); // устанавливаем фоновое изображение

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

// эта функция будет вызываться когда мы будем получать данные о погоде за 5
// соответственно в ней мы будем рендерить (обновлять) наши компоненты
function onWeatherFiveDaysLoad() {
  // рендерим погоду на 5 дней (которая в свою очередь рендерит и мор инфо)
  renderWeatherInformerFiveDays(weatherInformerFiveDaysRefs, selectedCityWeatherFiveDays);

  // рендерим чарт (по хорошему его лучше рендерить в 5 дней)
  renderChart(selectedCityWeatherFiveDays);
}

/* export default function logTime(str) {
  let t = new Date();
  console.log(t.toTimeString().split(' ')[0] + ':' + t.getMilliseconds() + ':   ' + str);
}
 */
