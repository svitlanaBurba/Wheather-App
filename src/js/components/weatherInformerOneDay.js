import oneDayTemp from '../../templates/weatherInformerOneDay.hbs';

export default function renderWeatherInformerOneDay(ref, weather) {
  ref.wrapper.innerHTML = oneDayTemp(weather);
}
