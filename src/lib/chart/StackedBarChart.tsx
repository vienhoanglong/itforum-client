import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const data = {
  labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
  datasets: [
    {
      label: 'React',
      data: [10, 15, 12],
      backgroundColor: 'rgba(255, 99, 132, 0.3)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      barPercentage: 0.6,
      categoryPercentage: 0.8,
      barThickness: 30
    },
    {
      label: 'NodeJS',
      data: [1, 78, 0, 15, 9, 7],
      backgroundColor: 'rgba(54, 162, 235, 0.3)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      barPercentage: 0.6,
      categoryPercentage: 0.8,
      barThickness: 30
    },
    {
      label: 'Mongodb',
      data: [20, 1, 8, 10, 0, 7],
      backgroundColor: 'rgba(255, 206, 86, 0.3)',
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 1,
      barPercentage: 0.6,
      categoryPercentage: 0.8,
      barThickness: 30
    },
    {
      label: 'JavaScript',
      data: [8, 6, 1, 5, 20, 7],
      backgroundColor: 'rgba(75, 192, 192, 0.3)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      barPercentage: 0.6,
      categoryPercentage: 0.8,
      barThickness: 30
    },
    {
      label: 'Typescript',
      data: [8, 5, 8, 8, 8, 8],
      backgroundColor: 'rgba(153, 102, 255, 0.3)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
      barPercentage: 0.6,
      categoryPercentage: 0.8,
      barThickness: 30
    },
  ],
};

const options:ChartOptions<'bar'> = {
  indexAxis: 'y',
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false,
      },
    },
    y: {
      stacked: true,
      beginAtZero: true,
      ticks: {
        precision: 0,
      },
    },
  },
  plugins: {
    legend: {
      title: {
        display: true,
        text: 'Biểu đồ thống kê số bài viết theo Topic',
      },
      labels: {
        textAlign: 'left'
      }
    },
  },
};

const StackedBarChart: React.FC = () => {
  return <Bar data={data} options={options} className='p-4'/>;
};

export default StackedBarChart;
