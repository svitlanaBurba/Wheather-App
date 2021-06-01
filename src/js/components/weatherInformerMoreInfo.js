import arrowLeftPng from '../../images/left-arrow.png';
import arrowRightPng from '../../images/right-arrow.png';
import moreInfoTemp from '../../templates/load-more.hbs';

export default function renderWeatherInformerMoreInfo(ref, weather) {
  //console.dir(arrowLeftPng);
  //console.dir(arrowRightPng);
  weather.arrowLeftIcon = arrowLeftPng;
  weather.arrowRightIcon = arrowRightPng;
  
  ref.wrapper.innerHTML = moreInfoTemp(weather);

  const arrowLeftRef = document.querySelector('#left-button-more-info');
  const arrowRightRef = document.querySelector('#right-button-more-info');
  const loadMoreInfoToScrollRef = document.querySelector(
    '.wheather-whole-data-more-info-container',
  );

  arrowLeftRef.addEventListener('click', rightScroll);
  arrowRightRef.addEventListener('click', leftScroll);

  function leftScroll() {
    arrowRightRef.classList.add('button-more-info-arrow-hiden');
    arrowLeftRef.classList.remove('button-more-info-arrow-hiden');
    loadMoreInfoToScrollRef.scroll({
      left: 570,
      behavior: 'smooth',
    });
  }

  function rightScroll() {
    arrowLeftRef.classList.add('button-more-info-arrow-hiden');
    arrowRightRef.classList.remove('button-more-info-arrow-hiden');
    loadMoreInfoToScrollRef.scroll({
      left: -570,
      behavior: 'smooth',
    });
  }
}
