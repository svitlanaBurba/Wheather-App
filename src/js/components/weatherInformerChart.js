const ctx = document.querySelector('#myChart').getContext('2d');
import Chart from 'chart.js/auto';
import { selectedCityWeatherFiveDays } from '../../index.js';
const moment = require('moment-timezone');

// let chart;

const average = values => {
  const sum = values.reduce((previous, current) => (current += previous));
  const avg = sum / values.length;
  return Number(avg.toFixed(1));
};

function getChartData(weather) {
  let chartData = {};

  chartData.days = weather.daysData.map(e => e.date.month + ' ' + e.date.day + ', ' + e.date.year);
  chartData.humidity = weather.daysData
    .map(e => e.forecasts.map(i => i.humidity))
    .map(j => average(j));
  chartData.pressure = weather.daysData
    .map(e => e.forecasts.map(i => i.pressure))
    .map(j => average(j));
  chartData.temperature = weather.daysData
    .map(e => e.forecasts.map(i => i.temperature))
    .map(j => average(j));
  chartData.speed = weather.daysData
    .map(e => e.forecasts.map(i => i.windSpeed))
    .map(j => average(j));

  let chartMain = {
    type: 'line',
    data: {
      labels: chartData.days,
      datasets: [
        {
          label: ' — Temperature, C°',
          backgroundColor: 'rgb(255, 107, 8)',
          borderColor: 'rgb(255, 107, 8)',
          data: chartData.temperature,
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
    options: {
      title: {
        display: true,
        text: 'Value of indicators',
        position: 'left',
      },
    },
  };

  // console.log(chartMain);
  return chartMain;
}

let weatherChart;

  export default function renderChart(weather) {
    if (!weatherChart) {
      weatherChart = new Chart(ctx, getChartData(weather));
      return weatherChart;
    } else {
      weatherChart.destroy();
      weatherChart = new Chart(ctx, getChartData(weather));
      return weatherChart;
    }
  }

