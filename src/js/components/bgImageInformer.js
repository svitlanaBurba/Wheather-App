import { fetchImages } from '../apiService';
/* должен содержать функции:
- renderBgImage

функция renderBgImage, который 
принимает:
- объект с референсами (в данном случае только фоновая картинка)
- объект с данными (в данном случае url картинки)
и делает:
- обновляет фоновую картинку согласно переданного url
 */
function stringSpaceEraze(string) {
  return string.split(' ').join('%20').split('-').join('%20');
}

function randomImg(min = 0, max = 40) {
  return Math.floor(Math.random() * (max - min) + min);
}

function addBackground(url) {
  document.body.style.backgroundImage = `linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.05) 100%), url(${url})`;
}

export default function renderBgImg(cityName) {
  let requestCity = stringSpaceEraze(cityName.trim());
  console.log('check', cityName);
  // stringSpaceEraze(cityName.trim());
  console.log('2 check', stringSpaceEraze(cityName.trim()));
  fetchImages(requestCity)
    .then(res => res.hits[randomImg(0, res.hits.length)].largeImageURL)
    .then(res => {
      var img = new Image();
      img.src = res;
      img.onload = function () {
        body.style.backgroundImage = `url(${res})`;
      };
    });
}
