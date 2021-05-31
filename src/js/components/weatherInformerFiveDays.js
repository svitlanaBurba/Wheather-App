import fiveDaysTemp from '../../templates/weatherInformerFiveDay.hbs';
import renderWeatherInformerMoreInfo from '../components/weatherInformerMoreInfo';
import { refs } from '../refs';

export default function renderWeatherInformerFiveDays(ref, weather) {
  ref.wrapper.innerHTML = fiveDaysTemp(weather);

  // скрол дней на мобильной версии
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

  let moreInfoDisplayedDayIndex; // хранит индекс показываемого в мор инфо дня - для обработки повторного нажатия на ту же кнопку мор инфо

  // обработчик нажатия на more info
  const btnMoreInfoRef = document.querySelector('.weather-container-five-days-total');

  btnMoreInfoRef.addEventListener('click', openMoreInfo);
  function openMoreInfo(event) {
    if (event.target.name !== 'btn') return;

    const activeElem = document.querySelector('.is-active');

    let newDayIndexToDisplay = event.target.dataset.index;

    if (newDayIndexToDisplay === moreInfoDisplayedDayIndex) {
      // если щелкнули на тот же день, то просто тогл, сбросить стиль и выйти
      refs.weatherInformerMoreInfo.wrapper.classList.toggle('is-closed');

      if (activeElem) {
        activeElem.classList.remove('is-active');
      }
      return;
    }

    // выделяет выбранный день при нажатия на more info

    // выполняется если выбрали другой день или было скрыто
    moreInfoDisplayedDayIndex = newDayIndexToDisplay;
    refs.weatherInformerMoreInfo.wrapper.classList.remove('is-closed');
    onMoreInfoClicked(newDayIndexToDisplay, weather);

    const temperatureDay = event.target.closest('li');

    if (temperatureDay.classList.contains('is-active')) return;
    temperatureDay.classList.add('is-active');

    if (activeElem) {
      activeElem.classList.remove('is-active');
    }
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
  function openFiveDays() {
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
  function openOneDay() {
    containerFiveDaysRenderRef.classList.add('is-closed');
    dataSectionRef.classList.remove('is-closed');
    wheatherMainRef.classList.remove('is-closed');
    quoteSectionRef.classList.remove('is-closed');
    refs.weatherInformerMoreInfo.wrapper.classList.add('is-closed');
    chartShowBtnRef.classList.add('is-closed');
    chartContainer.classList.add('is-closed');

    if (btnFifeDaysRef.disabled) {
      btnFifeDaysRef.disabled = false;
      btnOneDayRef.disabled = true;
    }

    document.querySelector('.switch-btn-wrapper').classList.remove('buttons-five-days-desktop');
  }
}
// let selectedMoreInfoDay;
//  функция, которая будет выполнять поиск индекса при нажатии moreInfo кнопки, и рендерить погоду по времени для выбранного дня.
function onMoreInfoClicked(dayIndex, weather) {
  renderWeatherInformerMoreInfo(refs.weatherInformerMoreInfo, weather.daysData[dayIndex]);

  /*   if (dayIndex === selectedMoreInfoDay) {
    alert('uzhe vybral');
  } else {
    selectedMoreInfoDay = dayIndex;
    renderWeatherInformerMoreInfo(refs.weatherInformerMoreInfo, weather.daysData[dayIndex]);
  } */
}
