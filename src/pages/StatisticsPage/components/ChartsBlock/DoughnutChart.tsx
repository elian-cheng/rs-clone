import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({ done, total }: { done: number; total: number }) {
  const data = {
    labels: ['Done', 'Total'],
    datasets: [
      {
        label: 'Tasks',
        data: [done, total - done],
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

  return (
    <div>
      <p className="statistic__charts-inner">{Math.floor((done * 100) / total)}%</p>
      <Doughnut data={data} options={options} />
    </div>
  );
}
