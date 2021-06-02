const ctx = document.querySelector('#myChart').getContext('2d');
// ctx.height = 500;
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

// let chart;

const chartShowBtn = document.querySelector('.chart-show-link');
const chartCloseBtn = document.querySelector('.chart-hide-link');
const chartContainer = document.querySelector('.chart-main-container');

function chartDisplay() {
  chartShowBtn.classList.toggle('is-closed');
  chartContainer.classList.toggle('is-closed');
}

chartShowBtn.addEventListener('click', chartDisplay);
chartCloseBtn.addEventListener('click', chartDisplay);

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
          hidden: true,
          label: ' —  Humidity, %    ',
          backgroundColor: 'rgb(10, 6, 234)',
          borderColor: 'rgb(10, 6, 234)',
          data: chartData.humidity,
          fill: false,
        },
        {
          hidden: true,
          label: '—  Speed, m/s',
          backgroundColor: 'rgb(235, 155, 5)',
          borderColor: 'rgb(235, 155, 5)',
          data: chartData.speed,
          fill: false,
        },
        {
          hidden: true,
          label: ' —  Pressure, m/m',
          backgroundColor: 'rgb(5, 120, 6)',
          borderColor: 'rgb(5, 120, 6)',
          data: chartData.pressure,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'AVERAGE:',
          color: 'rgba(255, 255, 255, 0.54)',
        },
        legend: {
          align: 'center',

          labels: {
            boxWidth: 12,
            boxHeight: 12,
            padding: 10,
            font: {
              size: 15,
            },
          },
        },
      },

      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: '',
            color: '#911',
            font: {
              family: 'Comic Sans MS',
              size: 20,
              style: '',
              lineHeight: 1.2,
            },
            padding: { top: 20, left: 0, right: 0, bottom: 0 },
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.54)',
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.54)',
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Value of indicators',
            color: 'rgba(255, 255, 255, 0.54)',
            font: {
              family: 'Lato',
              size: 14,
              style: 'normal',
              lineHeight: 1.2,
            },
            padding: { top: 30, left: 0, right: 0, bottom: 0 },
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.54)',
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.54)',
          },
        },
      },
    },
  };

  return chartMain;
}

let weatherChart;

export default function renderChart(weather) {
  if (weatherChart) {
    // если график уже существует, то обновляем ему данные
    weatherChart.data.datasets = getChartData(weather).data.datasets; // просто дадим чарту новые датасеты, все остальные параметры не меняем
    weatherChart.update(); // обновляем график
  } else {
    // если график не существует (например, первая загрузка), то создадим его
    let chartData = getChartData(weather);
    weatherChart = new Chart(ctx, chartData); // передаем канвас и полный объект параметров
  }
  return weatherChart;
}
