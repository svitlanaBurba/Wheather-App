export {
  citySelectorRefs,
  weatherInformerOneDayRefs,
  weatherInformerFiveDaysRefs,
  weatherInformerMoreInfoRefs,
  timeInformerRefs,
  quoteInformerRefs,
};

const citySelectorRefs = {
  searchInputForm: document.querySelector('.input-form'),
  searchInputField: document.querySelector('.input-field'),
  addFavoriteBtn: document.querySelector('.input-form-addfavorite'),
  geoBtn: document.querySelector('.input-icon-location'),
  favCitiesList: document.querySelector('.favorite-list'),
};

const weatherInformerOneDayRefs = {
  wrapper: document.querySelector('.wheather-main-container'),
};

const weatherInformerFiveDaysRefs = {
  wrapper: document.querySelector('.weather-output-wrapper-five-days'),
};

const weatherInformerMoreInfoRefs = {
  wrapper: document.querySelector('.wheather-main-more-info-container'),
};

const timeInformerRefs = {
  wrapper: document.querySelector('.current-date-section'),
};

const quoteInformerRefs = {
  wrapper: document.querySelector('.quote-section'),
};
