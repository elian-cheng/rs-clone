import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);
const data = {
  labels: ['Done', 'All'],
  datasets: [
    {
      label: 'Tasks',
      data: [5, 12],
      backgroundColor: ['rgba(251, 232, 166, 1)', 'rgba(58, 87, 168, 1)'],
      borderColor: ['rgba(251, 232, 166, 1)', 'rgba(58, 87, 168, 1)'],
      borderWidth: 1,
    },
  ],
};

const options = {
  plugins: {
    legend: {
      labels: {
        color: '#fffff',
        font: {
          size: 16,
          weight: '600',
        },
      },
    },
  },
};

export function DoughnutChart() {
  return (
    <div>
      <p className="statistic__charts-inner">30%</p>
      <Doughnut data={data} options={options} />
    </div>
  );
}
