import timeTemp from '../../templates/timeInformer.hbs';
const moment = require('moment-timezone');

// const timeInformer = document.querySelector('.current-date-section');

const nth = function (d) {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

function pad(value) {
  return String(value).padStart(2, '0');
}

export default function renderTimeInformer(ref, weather) {
  ref.wrapper.innerHTML = timeTemp(weather);

  const dayNowRef = document.querySelector('.current-day');
  const monthNowRef = document.querySelector('.current-month');
  const timeNowRef = document.querySelector('.current-time');

  const intervalId = setInterval(() => {
    const date = new Date();

    const changeDate = weather.timezone
      ? moment(date).utcOffset(weather.timezone / 60)
      : moment(date);
    const dayNow = date.getDate();

    const weekDayNow = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date);

    dayNowRef.innerHTML = `${dayNow}<sup class="date__day--nth">${nth(dayNow)}</sup> ${weekDayNow}`;

    monthNowRef.textContent = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);

    timeNowRef.textContent =
      pad(changeDate.hours()) + ':' + pad(changeDate.minutes()) + ':' + pad(changeDate.seconds());
  }, 1000);
}

/*
Отвечает за обновление времени восхода и заката для выбранного города

должен содержать функции:
- renderTimeInformer

функция renderTimeInformer:
принимает:
- объект с референсами
- объект с данными для отображения: время восхода, время заката
и делает:
- обновляет время восхода, время заката

пример объекта референсов:
const timeInformerRefs = {
 dateSunriseTime = document.querySelector('.date__sunrise--time');
 dateSunsetTime = document.querySelector('.date__sunset--time');
};
 */
