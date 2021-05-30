import favCityTmpl from '../../templates/citySelectorFavCity.hbs';
import { fetchLocationCityName } from '../apiService';
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
  onRender;

  // обработчик сабмита формы - когда город вводят руками
  onSearchInputSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const city = formData.get(this.refs.searchInputField.name);

    this.onCitySelected(city);
  }

  sliderInit() {
    this.refs.favCitiesList.innerHTML = this.favCities
      .map(city => this.favCityTemplate(city))
      .join();

    $(document).ready(function () {
      $('.slider').slick({
        waitForAnimate: false,
        infinite: false,
        variableWidth: true,
      });
    });
  }

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

  setDisplayedCity(city) {
    if (city) {
      this.refs.searchInputField.value = city;
    } else {
      this.refs.searchInputField.value = '';
    }
  }

  getDisplayedCity() {
    return this.refs.searchInputField.value;
  }

  onAddFavoriteBtnClick(e) {
    e.preventDefault();
    // получаем имя города из формы
    const formData = new FormData(e.target.parentElement);
    const city = formData.get(this.refs.searchInputField.name);

    // сохраняем в локалсторадж
    this.favCityManager.addFavCity(city);
    this.favCities = this.favCityManager.getFavCities();

    let self = this;
    $(document).ready(function () {
      let rez = $('.slider').slick('slickAdd', self.favCityTemplate(city)); // здесь мы просим сликер добавить новый элемент
      console.log(rez);
    });
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

  // обработчик нажатия на кнопку любимого города (два вида событий: показать погоду и удалить)
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

  onGeoBtnClick(e) {
    fetchLocationCityName().then(city => this.onCitySelected(city));
  }

  addListeners() {
    // при сабмите формы
    this.refs.searchInputForm.addEventListener('submit', this.onSearchInputSubmit.bind(this));
    // при нажатии на кнопку любимого города

    this.refs.favCitiesList.addEventListener('click', this.onFavCityClick.bind(this));
    // при нажатии на кнопку добавления любимого города
    this.refs.addFavoriteBtn.addEventListener('click', this.onAddFavoriteBtnClick.bind(this));

    this.refs.geoBtn.addEventListener('click', this.onGeoBtnClick.bind(this));
  }

  // конструктор
  constructor(refs, onCitySelectedFunc, favCityManager) {
    this.refs = refs;
    this.onCitySelected = onCitySelectedFunc;
    this.favCityTemplate = favCityTmpl; // переделать, должно быть параметром конструктора

    this.favCityManager = favCityManager;
    this.favCities = this.favCityManager.getFavCities();

    this.addListeners();
    this.sliderInit();
  }
}
