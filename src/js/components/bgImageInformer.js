import { fetchImages } from '../apiService';
const body = document.body;
/* должен содержать функции:
- renderBgImage

функция renderBgImage, который 
принимает:
- объект с референсами (в данном случае только фоновая картинка)
- объект с данными (в данном случае url картинки)
и делает:
- обновляет фоновую картинку согласно переданного url
 */

function randomImg(min = 0, max = 20) {
  return Math.floor(Math.random() * (max - min) + min);
}
export default function renderBgImg(cityName) {
  fetchImages(cityName)
    .then(res => res.hits[randomImg(0, res.hits.length)].largeImageURL)
    .then(res => (body.style.backgroundImage = `url(${res})`));
}
