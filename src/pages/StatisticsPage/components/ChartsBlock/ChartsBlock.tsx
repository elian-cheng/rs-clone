import { codeWarsTasks } from '../../../../utils/codeWarsTasks';
import { UserStatistics } from '../../StatisticsPage';
import DoughnutChart from './DoughnutChart';
import ProgressBar from './ProgressBar';

export default function chartsBlock({
  stats,
  lessonsTotal,
  correctAnswers,
  totalAnswered,
}: {
  stats: UserStatistics;
  lessonsTotal: number;
  correctAnswers: number;
  totalAnswered: number;
}) {
  const totalKatas = Object.values(codeWarsTasks).reduce((sum, item) => (sum += item.length), 0);
  return (
    <section className="statistic__charts">
      <ProgressBar
        done={
          (stats?.lessons?.learnedLessons ? stats.lessons.learnedLessons : 0) +
          (stats?.katas?.finishedKatas ? stats.katas.finishedKatas : 0)
        }
        total={lessonsTotal + totalKatas}
      />
      <ul className="statistic__charts-list">
        <li className="statistic__charts-list-item">
          <h2 className="statistic__charts-title">Lessons</h2>
          <DoughnutChart
            done={stats?.lessons?.learnedLessons ? stats.lessons.learnedLessons : 0}
            total={lessonsTotal}
          />
        </li>
        <li className="statistic__charts-list-item">
          <h2 className="statistic__charts-title">Practice</h2>
          <DoughnutChart
            done={stats?.katas?.finishedKatas ? stats.katas.finishedKatas : 0}
            total={totalKatas}
          />
        </li>
        <li className="statistic__charts-list-item">
          <h2 className="statistic__charts-title">Correct answers</h2>
          <DoughnutChart
            done={correctAnswers ? correctAnswers : 0}
            total={totalAnswered ? totalAnswered : 1}
          />
        </li>
      </ul>
    </section>
  );
}
