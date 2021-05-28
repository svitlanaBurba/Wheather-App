import moreInfoTemp from '../../templates/load-more.hbs';

export default function renderWeatherInformerMoreInfo(ref, weather) {
  console.log('=======');
  console.log(weather);
  ref.wrapper.innerHTML = moreInfoTemp(weather);
}
