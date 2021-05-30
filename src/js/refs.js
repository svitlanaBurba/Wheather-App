export {
  citySelectorRefs,
  weatherInformerOneDayRefs,
  weatherInformerFiveDaysRefs,
  weatherInformerMoreInfoRefs,
  timeInformerRefs,
  quoteInformerRefs,
  refs,
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

const refs = {
  citySelector: {
    searchInputForm: document.querySelector('.input-form'),
    searchInputField: document.querySelector('.input-field'),
    addFavoriteBtn: document.querySelector('.input-form-addfavorite'),
    geoBtn: document.querySelector('.input-icon-location'),
    favCitiesList: document.querySelector('.favorite-list'),
  },

  weatherInformerOneDay: {
    wrapper: document.querySelector('.wheather-main-container'),
  },

  weatherInformerFiveDays: {
    wrapper: document.querySelector('.weather-output-wrapper-five-days'),
  },

  weatherInformerMoreInfo: {
    wrapper: document.querySelector('.wheather-main-more-info-container'),
  },

  timeInformer: {
    wrapper: document.querySelector('.current-date-section'),
  },

  quoteInformer: {
    wrapper: document.querySelector('.quote-section'),
  },
};
