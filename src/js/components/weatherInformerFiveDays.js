import fiveDaysTemp from '../../templates/weatherInformerFiveDay.hbs';

export default function renderWeatherInformerFiveDays(ref, weather) {
  ref.wrapper.innerHTML = fiveDaysTemp(weather);
}

