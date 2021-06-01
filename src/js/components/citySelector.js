import { fetchLocationCityName } from '../apiService';
import FavCityManager from '../favCityManager';
import jquery from 'jquery';
import slick from 'slick-carousel';

let $ = jquery;

export default class CitySelector {
  // атрибуты класса (свойства)
  refs = {
    searchInputForm: '',
    searchInputField: '',
    addFavoriteBtn: '',
    favCitiesList: '',
  };
  favCities = []; // массив любимых городов
  favCityManager; // класс-API для получения-сохранения-удаления из localstorage
  onCitySelected; // функция, которая будет вызываться при выборе пользователем города - передается в конструкторе
  favCityTemplate; // шаблон для генерации кнопок любимых городов

  // обработчик сабмита формы - когда город вводят руками
  onSearchInputSubmit(e) {
    // получаем город
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const city = formData.get(this.refs.searchInputField.name).trim();
    if (!city) {
      return;
    }
    // вызываем коллбек функцию с именем введенного города
    this.onCitySelected(city);
  }

  sliderInit() {
    // рисуем слайдер - добавляем по кнопке из шаблона для каждого города из массива
    this.refs.favCitiesList.innerHTML = this.favCities
      .map(city => this.favCityTemplate(city)) // для каждого города из массива создаем кнопку из шаблона и объединяем их все в один html
      .join();

    // инициализируем slick-сarousel на нарисованном нами слайдере
    $('.slider').slick({
      waitForAnimate: false,
      infinite: false,
      variableWidth: true,
    });
  }

  // функция удаления кнопки из слайдера - нужно знать ее индекс
  sliderRemoveSlideByIndex(slideIndex) {
    // здесь мы просим сликер удалить кнопки с указаннім индексом
    $('.slider').slick('slickRemove', slideIndex);

    // принудительно обновляем индексы на кнопках после удаления - слик не делает это автоматически
    var j = 0;
    $('.slick-slide').each(function () {
      $(this).attr('data-slick-index', j);
      j++;
    });
  }

  // === публичные методы по работе со строкой поиска ==
  // setDisplayedCity - установить в строке поиска имя города
  setDisplayedCity(city) {
    if (city) {
      this.refs.searchInputField.value = city;
    } else {
      this.refs.searchInputField.value = '';
    }
  }
  // получить имя города из строки поиска
  getDisplayedCity() {
    return this.refs.searchInputField.value;
  }

  // получить город для первой загрузки, параметр - город по умолчанию
  // - сначала пытаемся получить первый город из локалстораджа
  // - если такого нет, то возвращаем город по умолчанию из параметров
  getDefaultCity(city) {
    let defaultCity = this.favCityManager.getFavCities()[0];
    if (!defaultCity) {
      defaultCity = city;
    }
    return defaultCity;
  }

  // обработчик нажатия на "звездочку" - добавить любимый город
  onAddFavoriteBtnClick(e) {
    e.preventDefault();
    // получаем имя города из формы
    const formData = new FormData(e.target.closest('form'));
    const city = formData.get(this.refs.searchInputField.name);

    if (!this.favCities.includes(city)) {
      // сохраняем в локалсторадж (не сохраняет если уже есть) и вычитываем из него обратно
      this.favCityManager.addFavCity(city);
      this.favCities = this.favCityManager.getFavCities();

      // добавляем новую кнопку на слайдер
      let self = this;
      $(document).ready(function () {
        let rez = $('.slider').slick('slickAdd', self.favCityTemplate(city)); // здесь мы просим сликер добавить новый элемент
        console.log(rez);
      });
    }
  }

  // удалить город из слайдера и локалстораджа
  // нужны параметры - имя города и индекс слайда (кнопки) в слайдере
  removeFavCity(city, sliderIndex) {
    // удаляем из локал стораджа по имени
    this.favCityManager.delFavCity(city);
    this.favCities = this.favCityManager.getFavCities();

    // удаляем слайд из слайдера по индексу
    $(document).ready(this.sliderRemoveSlideByIndex(sliderIndex));
  }

  // обработчик нажатия на кнопку любимого города на слайдере (два вида событий: показать погоду и удалить)
  onFavCityClick(e) {
    if (e.target.nodeName === 'I') {
      // клик по крестику удаления - нужно удалить
      const clickedCity = e.target.parentElement.innerText;
      const sliderIndex = e.target.closest('.slick-slide').dataset.slickIndex;
      this.removeFavCity(clickedCity, sliderIndex); // вызов этой функции удаляет город из стораджа и перерисовывает список
    } else if (
      !e.target.parentElement.className.includes('slider') &&
      e.target.nodeName === 'BUTTON' // клик по кнопке с именем - нужно показать погоду
    ) {
      const clickedCity = e.target.innerText;
      // пользователь выбрал новый город - так что вызываем onCitySelected
      // доделать опционально - делать звезду желтой, в поле ввода ставить имя выбранного города
      this.onCitySelected(clickedCity);
    }
  }

  onGeoBtnClick() {
    fetchLocationCityName().then(city => {
      if (city) {
        this.setDisplayedCity(city);
        this.onCitySelected(city);
      } else {
        alert('Geolocation refused or failed, default city displayed');
        // inform user geolocation was denied or had not worked
      }
    });
  }

  addListeners() {
    // при сабмите формы
    this.refs.searchInputForm.addEventListener('submit', this.onSearchInputSubmit.bind(this));
    // при нажатии на кнопку любимого города
    this.refs.favCitiesList.addEventListener('click', this.onFavCityClick.bind(this));
    // при нажатии на кнопку-"звездочку" добавления любимого города
    this.refs.addFavoriteBtn.addEventListener('click', this.onAddFavoriteBtnClick.bind(this));
    // при нажатии на кнопку геолокации
    this.refs.geoBtn.addEventListener('click', this.onGeoBtnClick.bind(this));
  }

  // конструктор
  constructor(refs, onCitySelectedFunc, favCityTemp) {
    // сохраняем свойства переданные в параметрах конструктора
    this.refs = refs;
    this.onCitySelected = onCitySelectedFunc;
    this.favCityTemplate = favCityTemp; // переделать, должно быть параметром конструктора

    // вычисляем свойства - экземпляр FavCityManager и сразу запрашиваем у него список любимых городов из локал стораджа
    this.favCityManager = new FavCityManager();
    this.favCities = this.favCityManager.getFavCities();

    // и сразу выполним некоторые методы
    this.addListeners(); // создадим все слушатели на элементы формы
    this.sliderInit(); // инициализируем (рисуем) слайдер любимых городов
  }
}
