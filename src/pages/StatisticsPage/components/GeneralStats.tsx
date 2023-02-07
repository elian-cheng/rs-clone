import { checkIsNaN } from '../../../utils/helpers';

export interface IWordStatProps {
  finishedKatas: number;
  learnedLessons: number;
  correctAnswers: number;
}

export const GeneralStats = ({ learnedLessons, finishedKatas, correctAnswers }: IWordStatProps) => {
  return (
    <section className="general-section">
      <h2 className="stats-title">Daily statistics</h2>
      <div className="stats-wrapper">
        <h3 className="stats-titles">
          <b>{finishedKatas}</b> katas submitted
        </h3>
        <h3 className="stats-titles">
          <b>{(checkIsNaN(correctAnswers) * 100).toFixed(0)}%</b> correct answers
        </h3>
        <h3 className="stats-titles">
          <b>{learnedLessons}</b> lessons finished
        </h3>
      </div>
    </section>
  );
};
