import fiveDaysTemp from '../../templates/weatherInformerFiveDay.hbs';
import renderWeatherInformerMoreInfo from '../components/weatherInformerMoreInfo';
import { weatherInformerMoreInfoRefs } from '../refs';

export default function renderWeatherInformerFiveDays(ref, weather) {
  ref.wrapper.innerHTML = fiveDaysTemp(weather);

  const btnsScrollRef = document.querySelector('.btn-scroll');
  const ulContainerRef = document.querySelector('.daily-temperature');
  btnsScrollRef.addEventListener('click', scroolBtn);
  function scroolBtn(event) {
    if (event.target.tagName !== 'BUTTON') return;
    if (event.target.dataset.action === 'next') {
      ulContainerRef.scroll({
        left: 160,
        behavior: 'smooth',
      });
    }
    if (event.target.dataset.action === 'prev') {
      ulContainerRef.scroll({
        left: -160,
        behavior: 'smooth',
      });
    }
  }

  // обработчик нажатия на more info
  const btnMoreInfoRef = document.querySelector('.weather-container-five-days-total');
  const containerMoreInfoRef = document.querySelector('.wheather-main-more-info-container');
  btnMoreInfoRef.addEventListener('click', openMoreInfo);
  function openMoreInfo(event) {
    if (event.target.tagName !== 'BUTTON') return;
    containerMoreInfoRef.classList.remove('is-closed');

    onMoreInfoClicked(event.target.dataset.index, weather);
  }
  // обработчик нажатия на openFiveDays и openOneDay
  const containerFiveDaysRenderRef = document.querySelector('.weather-container-five-days-total');
  const btnFifeDaysRef = document.querySelector('.five-days-btn');
  const btnOneDayRef = document.querySelector('.today-btn');
  const dataSectionRef = document.querySelector('.current-date-section');
  const wheatherMainRef = document.querySelector('.wheather-main-container');
  const quoteSectionRef = document.querySelector('.quote-section');
  const chartShowBtnRef = document.querySelector('.chart-show-button-container');
  const chartShowBtn = document.querySelector('.chart-show-link');
  const chartContainer = document.querySelector('.chart-main-container');

  btnFifeDaysRef.addEventListener('click', openFiveDays);
  function openFiveDays(event) {
    containerFiveDaysRenderRef.classList.remove('is-closed');
    dataSectionRef.classList.add('is-closed');
    wheatherMainRef.classList.add('is-closed');
    quoteSectionRef.classList.add('is-closed');
    chartShowBtnRef.classList.remove('is-closed');
    chartShowBtn.classList.remove('is-closed');

    if (btnOneDayRef.disabled) {
      btnFifeDaysRef.disabled = true;
      btnOneDayRef.disabled = false;
    }
    document.querySelector('.switch-btn-wrapper').classList.add('buttons-five-days-desktop');
  }

  btnOneDayRef.addEventListener('click', openOneDay);
  function openOneDay(event) {
    containerFiveDaysRenderRef.classList.add('is-closed');
    dataSectionRef.classList.remove('is-closed');
    wheatherMainRef.classList.remove('is-closed');
    quoteSectionRef.classList.remove('is-closed');
    containerMoreInfoRef.classList.add('is-closed');
    chartShowBtnRef.classList.add('is-closed');
    chartContainer.classList.add('is-closed');

    if (btnFifeDaysRef.disabled) {
      btnFifeDaysRef.disabled = false;
      btnOneDayRef.disabled = true;
    }

    document.querySelector('.switch-btn-wrapper').classList.remove('buttons-five-days-desktop');
  }
}

//  функция, которая будет выполнять поиск индекса при нажатии moreInfo кнопки, и рендерить погоду по времени для выбранного дня.
function onMoreInfoClicked(dayIndex, weather) {
  renderWeatherInformerMoreInfo(weatherInformerMoreInfoRefs, weather.daysData[dayIndex]);
}
