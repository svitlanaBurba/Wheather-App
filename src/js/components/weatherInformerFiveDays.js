import fiveDaysTemp from '../../templates/weatherInformerFiveDay.hbs';

export default function renderWeatherInformerFiveDays(ref, weather) {
  console.log(weather);
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
}
