import moreInfoTemp from '../../templates/load-more.hbs';

export default function renderWeatherInformerMoreInfo(ref, weather) {
  ref.wrapper.innerHTML = moreInfoTemp(weather);
}
