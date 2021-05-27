import timeTemp from '../../templates/timeInformer.hbs';

console.log('+');

// import currentDate from '../../templates/time-informer.hbs';
import daylightsTime from '../apiService';

// const timeInformer = document.querySelector('.current-date-section');

const dayNowRef = document.querySelector('.current-day');
const monthNowRef = document.querySelector('.current-month');
const timeNowRef = document.querySelector('.current-time');

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

const intervalId = setInterval(() => {
  const date = new Date();
  // const changeDate = moment(date).utcOffset(api.oneDayData.timezone / 60);
  const changeDate = api.oneDayData.timezone
    ? moment(date).utcOffset(api.oneDayData.timezone / 60)
    : moment(date);
  const dayNow = date.getDate();

  const weekDayNow = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date);

  dayNowRef.innerHTML = `${dayNow}<sup class="date__day--nth">${nth(dayNow)}</sup> ${weekDayNow}`;

  monthNowRef.textContent = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);

  timeNowRef.textContent =
    pad(changeDate.hours()) + ':' + pad(changeDate.minutes()) + ':' + pad(changeDate.seconds());
}, 1000);

function pad(value) {
  return String(value).padStart(2, '0');
}

// let year = Data.getFullYear();
// let month = Data.getMonth();
// let day = Data.getDate();
// let weekday = Data.getDay();
// let hour = Data.getHours();
// let minutes = Data.getMinutes();
// let seconds = Data.getSeconds();

// console.log(year);
// console.log(month);
// console.log(day);
// console.log(weekday);
// console.log(hour);
// console.log(minutes);
// console.log(seconds);

// const dataFormat = {
//   weekday: 'short',
//   year: 'numeric',
//   month: 'long',
//   day: 'numeric',
//   hour: '2-digit',
//   minute: '2-digit',
// };

// document.querySelector('.current-day').innerHTML = day;
// document.querySelector('.current-weekday').innerHTML = weekday;
// document.querySelector('.current-month').innerHTML = month;
// document.querySelector('.current-time').innerHTML = hours + ':' + minutes + ':' + seconds;

export default function renderTimeInformer(ref, weather) {
  console.log(weather);
  ref.wrapper.innerHTML = timeTemp(weather);
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
