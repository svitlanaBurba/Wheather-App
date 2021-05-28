import { fetchWeatherFive } from '../apiService';
const ctx = document.querySelector('#myChart').getContext('2d');
import Chart from 'chart.js/auto';
import { selectedCityWeatherFiveDays } from '../../index.js';
// console.log(Chart);

let chartData = {};
const average = (req, daysData) => {
  const values = daysData.map(e => e[req]);

  const sum = values.reduce((previous, current) => (current += previous));
  const avg = sum / values.length;
  return Number(avg.toFixed(1));
};

const getChartData = () => {
  let daysData = selectedCityWeatherFiveDays;
  chartData.days = daysData.map(e => moment(e.date * 1000).format('ll'));
  chartData.temp = daysData.map(e => average('temp', e.forecast));
  chartData.humidity = daysData.map(e => average('humidity', e.forecast));
  chartData.pressure = daysData.map(e => average('pressure', e.forecast));
  chartData.speed = daysData.map(e => average('speed', e.forecast));
};



let chartMain = {
  type: 'line',
  data: {
    labels: chartData.days,
    datasets: [
      {
        label: ' — Temperature, C°',
        backgroundColor: 'rgb(255, 107, 8)',
        borderColor: 'rgb(255, 107, 8)',
        data: [0, 10, 5, 2, 20, 30, 45],
        fill: false,
      },
      {
        label: ' —  Humidity, %',
        backgroundColor: 'rgb(10, 6, 234)',
        borderColor: 'rgb(10, 6, 234)',
        data: [0, 10, 5, 2, 20, 30, 45],
        fill: false,
      },
      {
        label: ' —  Speed, m/s',
        backgroundColor: 'rgb(235, 155, 5)',
        borderColor: 'rgb(235, 155, 5)',
        data: [0, 10, 5, 2, 20, 30, 45],
        fill: false,
      },
      {
        label: ' —  Pressure, m/m',
        backgroundColor: 'rgb(5, 120, 6)',
        borderColor: 'rgb(5, 120, 6)',
        data: [0, 10, 5, 2, 20, 30, 45],
        fill: false,
      },
    ],
  },
};

export default function renderChart() {
    //getChartData();
    new Chart(ctx, chartMain);
  
}
