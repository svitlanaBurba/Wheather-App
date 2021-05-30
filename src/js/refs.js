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

  // btnsScrollRef: document.querySelector('.btn-scroll'),
  // ulContainerRef: document.querySelector('.daily-temperature'),
  // btnMoreInfoRef: document.querySelector('.weather-container-five-days-total'),
  // containerMoreInfoRef: document.querySelector('.wheather-main-more-info-container'),
  // containerFiveDaysRenderRef: document.querySelector('.weather-container-five-days-total'),
  // btnFifeDaysRef: document.querySelector('.five-days-btn'),
  // btnOneDayRef: document.querySelector('.today-btn'),
  // dataSectionRef: document.querySelector('.current-date-section'),
  // wheatherMainRef: document.querySelector('.wheather-main-container'),
  // quoteSectionRef: document.querySelector('.quote-section'),
  // chartShowBtnRef: document.querySelector('.chart-show-button-container'),
  // chartShowBtn: document.querySelector('.chart-show-link'),
  // chartContainer: document.querySelector('.chart-main-container'),
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
