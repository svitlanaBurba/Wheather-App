import { fetchImages } from '../apiService';
import countryNames from '../../json/countryNames.json';

/* должен содержать функции:
- renderBgImage

функция renderBgImage, который 
принимает:
- объект с референсами (в данном случае только фоновая картинка)
- объект с данными (в данном случае url картинки)
и делает:
- обновляет фоновую картинку согласно переданного url
 */

// Проверка страны по первым двум буквам
function getCountry(cityAndCountry) {
  return countryNames[cityAndCountry.split(', ')[1]];
}

// Обработка строки запроса(обрезка, форматирование)
function stringSpaceEraze(string) {
  return string.split(' ').join('%20').split('-').join('%20');
}

// Получение рандомной картинки
function randomImg(min = 0, max = 40) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Добавление картинки в бэкграунт body
function addBackground(url) {
  document.body.style.backgroundImage = `linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.05) 100%), url(${url})`;
}

// Рендер картинки
function renderBG(arr) {
  const img = new Image();
  img.onload = addBackground(arr[randomImg(0, arr.length - 1)]);
}

// Обработка запроса и рендер рандомной картинки по городу/стране на сайт
export default async function renderBgImg(cityName) {
  let requestCity;
  let requestCountry;
  const imgStorage = [];
  if (cityName.includes(',')) {
    requestCountry = stringSpaceEraze(getCountry(cityName));
    requestCity = stringSpaceEraze(cityName.split(', ')[0]);

    let listImg = await fetchImages(requestCity);
    if (listImg.hits.length === 0) {
      listImg = await fetchImages(requestCountry);
    }
    if (listImg.hits.length === 0) {
      renderBG([
        'https://blog.way.com/wp-content/uploads/2020/11/holiday-travel-safety-1024x687.jpg',
      ]);
      return;
    }
    listImg.hits.forEach(el => imgStorage.push(el.largeImageURL));
    renderBG(imgStorage);
  } else {
    requestCity = stringSpaceEraze(cityName.trim());

    let listImg = await fetchImages(requestCity);
    if (listImg.hits.length === 0) {
      renderBG([
        'https://blog.way.com/wp-content/uploads/2020/11/holiday-travel-safety-1024x687.jpg',
      ]);
      return;
    }
    listImg.hits.forEach(el => imgStorage.push(el.largeImageURL));
    renderBG(imgStorage);
  }
}
