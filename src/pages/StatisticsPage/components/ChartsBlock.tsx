import { LessonsChart } from './Chart';

export default function chartsBlock() {
  return (
    <section className="statistic__charts">
      <div style={{ width: 300, height: 300 }}>
        <h2 className="statistic__charts-title">Lessons</h2>
        <LessonsChart />
      </div>
      <div style={{ width: 300, height: 300 }}>
        <h2 className="statistic__charts-title">Practice</h2>
        <LessonsChart />
      </div>
      <div style={{ width: 300, height: 300 }}>
        <h2 className="statistic__charts-title">Games</h2>
        <LessonsChart />
      </div>
    </section>
  );
}
