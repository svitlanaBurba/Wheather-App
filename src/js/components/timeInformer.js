import timeTemp from '../../templates/timeInformer.hbs';
const moment = require('moment-timezone');
let intervalTimer;

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
  updateFormattedWeather(weather.timezone);

  clearInterval(intervalTimer);
  intervalTimer = setInterval(() => {
    updateFormattedWeather(weather.timezone);
  }, 1000);
}

function updateFormattedWeather(timezone) {
  const dayNowRef = document.querySelector('.current-day');
  const monthNowRef = document.querySelector('.current-month');
  const timeNowRef = document.querySelector('.current-time');

  const date = new Date();
  const dayNow = date.getDate();
  const weekDayNow = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date);
  const changeDate = timezone ? moment(date).utcOffset(timezone / 60) : moment(date);

  dayNowRef.innerHTML = `${dayNow}<sup class="current-day-sup">${nth(dayNow)}</sup> ${weekDayNow}`;
  monthNowRef.textContent = new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date());
  timeNowRef.textContent =
    pad(changeDate.hours()) + ':' + pad(changeDate.minutes()) + ':' + pad(changeDate.seconds());
}
