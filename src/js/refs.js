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
  addFavoriteBtn: document.querySelector('.input-icon-star'),
  geoBtn: document.querySelector('.input-icon-location'),
  favCitiesList: document.querySelector('.favorite-list'),
};

const weatherInformerOneDayRefs = {
  wrapper: document.querySelector('.wheather-main-container'),
};

const weatherInformerFiveDaysRefs = {
  wheatherMain: document.querySelector('.wheather-main-container'),
  wrapper: document.querySelector('.weather-output-wrapper-five-days'),
  containerFiveDays: document.querySelector('.weather-container-five-days-total'),
  btnFifeDays: document.querySelector('.five-days-btn'),
  btnOneDay: document.querySelector('.today-btn'),
  dataSection: document.querySelector('.current-date-section'),
  quoteSection: document.querySelector('.quote-section'),
  chartShowBtn: document.querySelector('.chart-show-button-container'),
  chartShowLink: document.querySelector('.chart-show-link'),
  chartContainer: document.querySelector('.chart-main-container'),

  // ulContainerRef: document.querySelector('.daily-temperature'),
  // containerMoreInfoRef: document.querySelector('.wheather-main-more-info-container'),
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
    addFavoriteBtn: document.querySelector('.input-icon-star'),
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
