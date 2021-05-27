import favCityTmpl from '../../templates/citySelectorFavCity.hbs';
import fetchLocationCityName from '../apiService';
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

  // методы

  // обработчик сабмита формы - когда город вводят руками
  onSearchInputSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const city = formData.get(this.refs.searchInputField.name);

    this.onCitySelected(city);
  }

  sliderInit() {
    let self = this;

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

  removeFavCity(city, sliderIndex) {
    this.favCityManager.delFavCity(city);
    this.favCities = this.favCityManager.getFavCities();

    console.log('Delete slide number = ' + sliderIndex);

    let self = this;

    $(document).ready(function () {
      $('.slider').slick('slickRemove', sliderIndex); // здесь мы просим сликер удалить карточку с указаннім индексом
    });

    //this.render();
  }

  // обработчик нажатия на кнопку любимого города
  onFavCityClick(e) {
    if (e.target.nodeName === 'I') {
      const clickedCity = e.target.parentElement.innerText;
      const sliderIndex = e.target.closest('.slick-slide').dataset.slickIndex;
      console.log('Trying to remove btn');
      console.dir(e.target);
      this.removeFavCity(clickedCity, sliderIndex); // вызов этой функции удаляет город из стораджа и перерисовывает список
    } else if (
      !e.target.parentElement.className.includes('slider') &&
      e.target.nodeName === 'BUTTON'
    ) {
      const clickedCity = e.target.innerText;
      // пользователь выбрал новый город - так что вызываем onCitySelected
      // доделать опционально - делать звезду желтой, в поле ввода ставить имя выбранного города
      this.onCitySelected(clickedCity);
    }
  }

  onGeoBtnClick(e) {
    console.log(fetchLocationCityName);
    fetchLocationCityName.then(city => alert(city));
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

  // перерисовывает список любимых городов
  render() {
    /*
    this.refs.favCitiesList.innerHTML = ''; // очищаем список
    this.refs.favCitiesList.innerHTML = this.favCities
      .map(city => this.favCityTemplate(city))
      .join();
      */
    this.favCities.forEach(city => this.sliderAddCity(city));

    //this.sliderRefresh();
    this.onRender();
  }

  // конструктор
  constructor(refs, onCitySelectedFunc, favCityManager, onRenderFunc) {
    this.refs = refs;
    this.onCitySelected = onCitySelectedFunc;
    this.favCityTemplate = favCityTmpl; // переделать, должно быть параметром конструктора
    this.onRender = onRenderFunc;

    this.favCityManager = favCityManager;
    this.favCities = this.favCityManager.getFavCities();

    this.addListeners();
    this.sliderInit();
  }
}
