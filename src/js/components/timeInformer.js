import timeTemp from '../../templates/timeInformer.hbs';

export default function renderTimeInformer(ref, weather) {
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
