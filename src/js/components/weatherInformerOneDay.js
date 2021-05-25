import oneDayTemp from '../../templates/weatherInformerOneDay.hbs';

export default function renderWeatherInformerOneDay(ref, weather) {
  ref.wrapper.innerHTML = oneDayTemp(weather);
  console.log(weather);
}

/*
Отвечает за обновление окна погоды на 1 день для выбранного города

должен содержать функции:
- renderWeatherInformerOneDay

функция renderWeatherInformerOneDay: 
принимает:
- объект с референсами 
- объект с данными для отображения
- шаблон
и делает:
- обновляет погоду на один день согласно параметров используя шаблон

список параметров для вызова функции и шаблона:
- city
- countryCode
- temp
- tempMin
- tempMax


пример объекта референсов:
const weatherInformerOneDay = {
  contentBox = document.querySelector();
};
 */

/* class WeatherInformerOneDay {
  refs = {
    wrapper: '', //reference to a wrapper ()
  };
  template; // template function to render component
  currentWeather = {};

  constructor(refs, template, weather, isHidden) {
    this.refs = refs;
    this.template = template;
  }
} */
