import { fetchWeatherFive } from '../apiService';
const ctx = document.querySelector('#myChart').getContext('2d');
import Chart from 'chart.js/auto';
import { selectedCityWeatherFiveDays } from '../../index.js';
const moment = require('moment-timezone');

const average = (req, data) => {
  const values = data.map(e => e[req]);

  const sum = values.reduce((previous, current) => (current += previous));
  const avg = sum / values.length;
  return Number(avg.toFixed(1));
};

function getChartData(weather) {
  let chartData = {};

  chartData.days = weather.daysData.map(e => e.date.month + ' ' + e.date.day + ', ' + e.date.year);
  chartData.temp = weather.daysData.map(e => average('temperature', e.forecasts));
  chartData.humidity = weather.daysData.map(e => average('humidity', e.forecasts));
  chartData.pressure = weather.daysData.map(e => average('pressure', e.forecasts));
  chartData.speed = weather.daysData.map(e => average('windSpeed', e.forecasts));

  let chartMain = {
    type: 'line',
    data: {
      labels: chartData.days,
      datasets: [
        {
          label: ' — Temperature, C°',
          backgroundColor: 'rgb(255, 107, 8)',
          borderColor: 'rgb(255, 107, 8)',
          data: chartData.temp,
          fill: false,
        },
        {
          label: ' —  Humidity, %',
          backgroundColor: 'rgb(10, 6, 234)',
          borderColor: 'rgb(10, 6, 234)',
          data: chartData.humidity,
          fill: false,
        },
        {
          label: ' —  Speed, m/s',
          backgroundColor: 'rgb(235, 155, 5)',
          borderColor: 'rgb(235, 155, 5)',
          data: chartData.speed,
          fill: false,
        },
        {
          label: ' —  Pressure, m/m',
          backgroundColor: 'rgb(5, 120, 6)',
          borderColor: 'rgb(5, 120, 6)',
          data: chartData.pressure,
          fill: false,
        },
      ],
    },
  };

  console.log(chartMain);
  return chartMain;
}

export default function renderChart(weather) {
  console.log(weather);
  new Chart(ctx, getChartData(weather));
}
