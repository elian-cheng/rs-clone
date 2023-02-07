import { DoughnutChart } from './DoughnutChart';

export default function chartsBlock() {
  return (
    <section className="statistic__charts">
      <ul className="statistic__charts-list">
        <li className="statistic__charts-list-item">
          <h2 className="statistic__charts-title">Lessons</h2>
          <DoughnutChart />
        </li>
        <li className="statistic__charts-list-item">
          <h2 className="statistic__charts-title">Practice</h2>
          <DoughnutChart />
        </li>
        <li className="statistic__charts-list-item">
          <h2 className="statistic__charts-title">Games</h2>
          <DoughnutChart />
        </li>
      </ul>
    </section>
  );
}
