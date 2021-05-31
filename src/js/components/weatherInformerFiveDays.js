import fiveDaysTemp from '../../templates/weatherInformerFiveDay.hbs';
import renderWeatherInformerMoreInfo from '../components/weatherInformerMoreInfo';
import { refs, weatherInformerFiveDaysRefs } from '../refs';

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
  weatherInformerFiveDaysRefs.containerFiveDays.addEventListener('click', openMoreInfo);
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

    // выполняется если выбрали другой день или было скрыто more info
    moreInfoDisplayedDayIndex = newDayIndexToDisplay;
    refs.weatherInformerMoreInfo.wrapper.classList.remove('is-closed');
    onMoreInfoClicked(newDayIndexToDisplay, weather);

    // выделяет выбранный день при нажатия на more info
    const temperatureDay = event.target.closest('li');

    if (temperatureDay.classList.contains('is-active')) return;
    temperatureDay.classList.add('is-active');

    if (activeElem) {
      activeElem.classList.remove('is-active');
    }
  }
  // обработчик нажатия на openFiveDays и openOneDay

  weatherInformerFiveDaysRefs.btnFifeDays.addEventListener('click', openFiveDays);
  function openFiveDays() {
    weatherInformerFiveDaysRefs.containerFiveDays.classList.remove('is-closed');
    weatherInformerFiveDaysRefs.dataSection.classList.add('is-closed');
    weatherInformerFiveDaysRefs.wheatherMain.classList.add('is-closed');
    weatherInformerFiveDaysRefs.quoteSection.classList.add('is-closed');
    weatherInformerFiveDaysRefs.chartShowBtn.classList.remove('is-closed');
    weatherInformerFiveDaysRefs.chartShowLink.classList.remove('is-closed');

    if (weatherInformerFiveDaysRefs.btnOneDay.disabled) {
      weatherInformerFiveDaysRefs.btnFifeDays.disabled = true;
      weatherInformerFiveDaysRefs.btnOneDay.disabled = false;
    }
    document.querySelector('.switch-btn-wrapper').classList.add('buttons-five-days-desktop');
  }

  weatherInformerFiveDaysRefs.btnOneDay.addEventListener('click', openOneDay);
  function openOneDay() {
    weatherInformerFiveDaysRefs.containerFiveDays.classList.add('is-closed');
    weatherInformerFiveDaysRefs.dataSection.classList.remove('is-closed');
    weatherInformerFiveDaysRefs.wheatherMain.classList.remove('is-closed');
    weatherInformerFiveDaysRefs.quoteSection.classList.remove('is-closed');
    refs.weatherInformerMoreInfo.wrapper.classList.add('is-closed');
    weatherInformerFiveDaysRefs.chartShowBtn.classList.add('is-closed');
    weatherInformerFiveDaysRefs.chartContainer.classList.add('is-closed');

    if (weatherInformerFiveDaysRefs.btnFifeDays.disabled) {
      weatherInformerFiveDaysRefs.btnFifeDays.disabled = false;
      weatherInformerFiveDaysRefs.btnOneDay.disabled = true;
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
