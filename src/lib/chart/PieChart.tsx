import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['React', 'NodeJS', 'JavaScript', 'TypeScript', 'MongoDB', 'Redis'],
  datasets: [
    {
      label: '# of Topic',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const options: ChartOptions<'pie'> = {
  plugins: {
    tooltip: {
      callbacks: {
        label: (context) => {
          const dataset = context.dataset;
          const dataIndex = context.dataIndex;
          const value = dataset.data[dataIndex] as number;
          const total = dataset.data.reduce((acc, cur) => acc + cur, 0);
          const percentage = ((value / total) * 100).toFixed(2);
          return `${dataset.label}: ${value} (${percentage}%)`;
        },
      },
    },
    legend: {
      title: {
        display: true,
        text: 'Biểu đồ thống kê số lượng bài đăng thuộc Topic',
      },
      labels: {
        textAlign: 'left',
      },
    },
  },
};

const PieChart: React.FC = () => {
  return <Pie data={data} options={options} className='p-4' />;
};

export default PieChart;
