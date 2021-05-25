// Weather service

const BASE_URL_WEATHER = 'https://api.openweathermap.org/data/2.5/weather?q=';
const BASE_URL_IMG = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=';
const apiKeyWether = 'd01e7beda7c1dcab67ea99635e4fb4bc';
const apiKeyImg = '21715456-94146d2128778e129cf5897fe';

const fetchWether = city =>
  fetch(`${BASE_URL_WEATHER}${city}&appid=${apiKeyWether}`).then(res => {
    return res.json();
  });

const fetchImages = city =>
  fetch(`${BASE_URL_IMG}${city}&page=1&per_page=12&key=${apiKeyImg}`).then(res => {
    return res.json();
  });

export { fetchWether, fetchImages };

// Geolocation service

// Bg Image Service
