import favCityTmpl from '../../templates/citySelectorFavCity.hbs';
export default class CitySelector {
  // атрибуты класса (свойства)
  refs = {
    searchInputForm: '',
    searchInputField: '',
    favCitiesList: '',
  };
  favCities = []; // массив любимых городов
  onCitySelected; // функция, которая будет вызываться при выборе пользователем города - передается в конструкторе
  favCityTemplate; // шаблон для генерации кнопок любимых городов

  // методы

  // обработчик сабмита формы - когда город вводят руками
  onSearchInputSubmit(e) {
    e.preventDefault();
    const formData = new FormData(event.currentTarget);
    const city = formData.get(this.refs.searchInputField.name);

    this.onCitySelected(city);
  }

  // обработчик нажатия на кнопку любимого города
  // пока что не поддерживает удаление щелчком по крестику
  onFavCityClick(e) {
    const clickedCity = e.srcElement.innerText;
    console.log('user selected' + clickedCity);
    // пользователь выбрал новый город - так что вызываем onCitySelected
    // доделать опционально - делать звезду желтой, в поле ввода ставить имя вібранного города
    this.onCitySelected(clickedCity);
  }

  addListeners() {
    // при сабмите формы
    this.refs.searchInputForm.addEventListener('submit', this.onSearchInputSubmit.bind(this));
    // при нажатии на кнопку любимого города
    this.refs.favCitiesList.addEventListener('click', this.onFavCityClick.bind(this));
  }

  render() {
    this.refs.favCitiesList.innerHTML = '';
    this.favCities.forEach(x => {
      this.refs.favCitiesList.insertAdjacentHTML('afterbegin', this.favCityTemplate({ city: x }));
    });
  }

  // конструктор
  constructor(refs, onCitySelected) {
    this.refs = refs;
    this.onCitySelected = onCitySelected;
    this.favCityTemplate = favCityTmpl; // переделать, должно быть параметром конструктора

    this.favCities = ['London', 'Berlin']; // переделать, должно быть параметром конструктора

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
