import fiveDaysTemp from '../../templates/weatherInformerFiveDay.hbs';

export default function renderWeatherInformerFiveDays(ref, weather) {
  ref.wrapper.innerHTML = fiveDaysTemp(weather);

  const btnsScrollRef = document.querySelector('.btn-scroll');
  const ul = document.querySelector('.daily-temperature');
  btnsScrollRef.addEventListener('click', scroolBtn);
  function scroolBtn(event) {
    if (event.target.tagName !== 'BUTTON') return;
    if (event.target.dataset.action === 'next') {
      ul.scroll({
        left: 60,
        behavior: 'smooth',
      });
    }
    if (event.target.dataset.action === 'prev') {
      ul.scroll({
        left: -100,
        behavior: 'smooth',
      });
    }
  }

  const btnMoreInfoRef = document.querySelector('.weather-container-five-days-total');
  const containerMoreInfoRef = document.querySelector('.wheather-main-more-info-container');
  btnMoreInfoRef.addEventListener('click', openMoreInfo);
  function openMoreInfo(event) {
    if (event.target.tagName !== 'BUTTON') return;
    containerMoreInfoRef.classList.toggle('is-closed');
  }
}

const containerFiveDaysRenderRef = document.querySelector('.weather-container-five-days-total');
const btnFifeDaysRef = document.querySelector('.five-days-btn');
const btnOneDayRef = document.querySelector('.today-btn');
const dataSectionRef = document.querySelector('.current-date-section');
const wheatherMainRef = document.querySelector('.wheather-main-container');
const quoteSectionRef = document.querySelector('.quote-section');

btnFifeDaysRef.addEventListener('click', openFiveDays);
function openFiveDays(event) {
  containerFiveDaysRenderRef.classList.remove('is-closed');
  dataSectionRef.classList.add('is-closed');
  wheatherMainRef.classList.add('is-closed');
  quoteSectionRef.classList.add('is-closed');
}

btnOneDayRef.addEventListener('click', openOneDay);
function openOneDay(event) {
  containerFiveDaysRenderRef.classList.add('is-closed');
  dataSectionRef.classList.remove('is-closed');
  wheatherMainRef.classList.remove('is-closed');
  quoteSectionRef.classList.remove('is-closed');
}
