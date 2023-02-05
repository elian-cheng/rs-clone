import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['All', 'Done'],
  datasets: [
    {
      label: 'Tasks',
      data: [12, 5],
      backgroundColor: ['rgba(229, 57, 57, 0.5)', 'rgba(59, 173, 105, 0.5)'],
      borderColor: ['rgba(229, 57, 57, 1)', 'rgba(59, 173, 105, 1)'],
      borderWidth: 1,
    },
  ],
};

export function LessonsChart() {
  return <Doughnut data={data} />;
}
