import favCityTmpl from '../../templates/citySelectorFavCity.hbs';
import $ from 'jquery';
import slick from 'slick-carousel';

window.$ = $;

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

  // методы

  // обработчик сабмита формы - когда город вводят руками
  onSearchInputSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const city = formData.get(this.refs.searchInputField.name);

    this.onCitySelected(city);
  }

  onAddFavoriteBtnClick(e) {
    // e.preventDefault();
    const formData = new FormData(e.target.parentElement);
    const city = formData.get(this.refs.searchInputField.name);

    this.favCityManager.addFavCity(city);
    this.favCities = this.favCityManager.getFavCities();
    this.render();
  }

  removeFavCity(city) {
    this.favCityManager.delFavCity(city);
    this.favCities = this.favCityManager.getFavCities();

    this.render();
  }

  // обработчик нажатия на кнопку любимого города
  // пока что не поддерживает удаление щелчком по крестику
  onFavCityClick(e) {
    if (e.target.nodeName === 'I') {
      const clickedCity = e.target.parentElement.innerText;
      this.removeFavCity(clickedCity); // вызов этой функции удаляет город из стораджа и перерисовывает список
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

  addListeners() {
    // при сабмите формы
    this.refs.searchInputForm.addEventListener('submit', this.onSearchInputSubmit.bind(this));
    // при нажатии на кнопку любимого города

    this.refs.favCitiesList.addEventListener('click', this.onFavCityClick.bind(this));
    // при нажатии на кнопку добавления любимого города
    this.refs.addFavoriteBtn.addEventListener('click', this.onAddFavoriteBtnClick.bind(this));
  }

  // перерисовывает список любимых городов
  render() {
    this.refs.favCitiesList.innerHTML = ''; // очищаем список
    // для каждого любимого города добавляем кнопку из шаблона
    this.favCities.forEach(x => {
      this.refs.favCitiesList.insertAdjacentHTML('beforeend', this.favCityTemplate({ city: x }));
      //console.log($('.slider').slick);
      //$('.slider').slick('slickAdd', '<div><h3>' + x + '</h3></div>');
    });
  }

  // конструктор
  constructor(refs, onCitySelected, favCityManager) {
    this.refs = refs;
    this.onCitySelected = onCitySelected;
    this.favCityTemplate = favCityTmpl; // переделать, должно быть параметром конструктора

    this.favCityManager = favCityManager;
    this.favCities = this.favCityManager.getFavCities();

    this.addListeners();
    this.render();
  }
}

/* должен содержать функции:
- renderCitySelector

функция renderCitySelector: 
принимает:
- объект с референсами (поле ввода города, див для кнопок любимых городов, звездочка )
- объект с данными для отображения: имя выбранного города, массив любимых городов, флаг isFavoriteCitySelected
- шаблон кнопки любимого города
и делает:
- устанавливает название выбранного города в поле ввода
- пересоздает список любимых городов 
- делает звездочку желтой если был выбран любимый город (isFavoriteCitySelected===true)

пример объекта референсов:
const citySelectorRefs = {
 searchForm = document.querySelector('.search-form');
 searchInput = document.querySelector('.search-location__form');
 addFavoriteBtn = document.querySelector('.search-location__form-btn');
 favoritesListBtns = document.querySelector('.search-location__slider-list');
 btnPrev = document.querySelector('.search-location__slider-btnPrev');
 btnNext = document.querySelector('.search-location__slider-btnNext');
};
 */
