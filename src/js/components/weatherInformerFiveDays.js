import fiveDaysTemp from '../../templates/weatherInformerFiveDay.hbs';
import Siema from 'siema';

export default function renderWeatherInformerFiveDays(ref, weather) {
  ref.wrapper.innerHTML = fiveDaysTemp(weather);


  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  const btnScrollRef = document.querySelector('.btn-scroll');

  btnScrollRef.addEventListener('click', scroolBtn);
  const mySiema = new Siema();
  
  function scroolBtn(event) {
    if (event.target.tagName !== 'BUTTON') return;
    if (event.target.dataset.action === 'next') {
      mySiema.next();
    }
    if (event.target.dataset.action === 'prev') {
      mySiema.prev();
    }
    console.log('ok');
  }
  // ({
  //   selector: '.siema',
  //   duration: 200,
  //   easing: 'ease-out',
  //   perPage: 1,
  //   startIndex: 0,
  //   draggable: true,
  //   multipleDrag: true,
  //   threshold: 20,
  //   loop: false,
  //   rtl: false,
  //   onInit: () => {},
  //   onChange: () => {},
  // });
}


