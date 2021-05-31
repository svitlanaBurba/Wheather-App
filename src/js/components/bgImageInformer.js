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

function getCountry(cityAndCountry) {
  return countryNames[cityAndCountry.split(', ')[1]];
}

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
  let requestCity;
  let requestCountry;
  const imgStorage = [];
  if (cityName.includes(',')) {
    requestCountry = stringSpaceEraze(getCountry(cityName));
    requestCity = stringSpaceEraze(cityName.split(', ')[0]);
    fetchImages(requestCity).then(res =>
      res.hits.forEach(el => {
        imgStorage.push(el.largeImageURL);
      }),
    );
    fetchImages(requestCountry)
      .then(res =>
        res.hits.forEach(el => {
          imgStorage.push(el.largeImageURL);
        }),
      )
      .then(res => {
        const img = new Image();
        img.onload = addBackground(imgStorage[randomImg(0, imgStorage.length)]);
      });
    // {
    //   var img = new Image();
    //   img.src = res;
    //   img.onload = addBackground(res);
    // }

    // console.log('res', res.hits));

    // res.hits.foreach(i => imgStorage.push(i.largeImageURL)));

    // fetchImages(requestCountry).then(res =>
    //   res.hits.foreach(i => imgStorage.push(i.largeImageURL)),
    // );
    // console.log('hmmmm', imgStorage);
    // addBackground(imgStorage[randomImg(0, imgStorage.length)]);
    //   res.hits[randomImg(0, res.hits.length)].largeImageURL)
    // .then(res => {
    //   var img = new Image();
    //   img.src = res;
    //   img.onload = addBackground(res);
    // });
  } else {
    requestCity = stringSpaceEraze(cityName.trim());
    fetchImages(requestCity)
      .then(res => res.hits[randomImg(0, res.hits.length)].largeImageURL)
      .then(res => {
        var img = new Image();
        img.src = res;
        img.onload = addBackground(res);
      });
  }
  console.log('qweqwe', requestCountry, 'ewqeqw', requestCity);
  // requestCity = stringSpaceEraze(cityName.trim());
  // console.log('check', cityName);
  // stringSpaceEraze(cityName.trim());
  // console.log('2 check', stringSpaceEraze(cityName.trim()));

  // ?????????
  // fetchImages(requestCity)
  //   .then(res => res.hits[randomImg(0, res.hits.length)].largeImageURL)
  //   .then(res => {
  //     var img = new Image();
  //     img.src = res;
  //     img.onload = addBackground(res);
  //   });
}
