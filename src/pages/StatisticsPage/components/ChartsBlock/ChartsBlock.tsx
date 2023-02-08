import { codeWarsTasks } from '../../../PracticePage/api/codeWarsTasks';
import { UserStatistics } from '../../StatisticsPage';
import DoughnutChart from './DoughnutChart';
import ProgressBar from './ProgressBar';

export default function chartsBlock({
  stats,
  lessonsTotal,
}: {
  stats: UserStatistics;
  lessonsTotal: number;
}) {
  const totalKatas = Object.values(codeWarsTasks).reduce((sum, item) => (sum += item.length), 0);
  return (
    <section className="statistic__charts">
      <ProgressBar
        done={
          (stats.learnedLessons ? stats.learnedLessons : 0) +
          (stats.finishedKatas ? stats.finishedKatas : 0)
        }
        total={lessonsTotal + totalKatas}
      />
      <ul className="statistic__charts-list">
        <li className="statistic__charts-list-item">
          <h2 className="statistic__charts-title">Lessons</h2>
          <DoughnutChart
            done={stats.learnedLessons ? stats.learnedLessons : 0}
            total={lessonsTotal}
          />
        </li>
        <li className="statistic__charts-list-item">
          <h2 className="statistic__charts-title">Practice</h2>
          <DoughnutChart done={stats.finishedKatas ? stats.finishedKatas : 0} total={totalKatas} />
        </li>
        <li className="statistic__charts-list-item">
          <h2 className="statistic__charts-title">Games</h2>
          <DoughnutChart done={stats.learnedLessons ? stats.learnedLessons : 0} total={30} />
        </li>
      </ul>
    </section>
  );
}
