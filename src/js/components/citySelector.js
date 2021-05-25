export default class CitySelector {
  refs = {
    searchInputForm: '',
    searchInputField: '',
  };

  onCitySelected;

  onSearchInputSubmit(e) {
    e.preventDefault();
    const formData = new FormData(event.currentTarget);
    const city = formData.get(this.refs.searchInputField.name);

    this.onCitySelected(city);
  }

  addListeners() {
    this.refs.searchInputForm.addEventListener('submit', this.onSearchInputSubmit.bind(this));
  }

  constructor(refs, onCitySelected) {
    this.refs = refs;
    this.onCitySelected = onCitySelected;

    this.addListeners();
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