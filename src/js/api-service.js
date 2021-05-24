const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = 'd01e7beda7c1dcab67ea99635e4fb4bc';

const fetchData = request =>
  fetch(`${BASE_URL}${request}&appid=${apiKey}`).then(res => {
    return res.json();
  });
export { fetchData };
