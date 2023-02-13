import { IGameStats } from '../../StatisticsPage';
import { GameCard } from './GameCard';

import QUIZ_ICON from '../../../../assets/images/games/quiz.png';
import MISSING_TYPE_ICON from '../../../../assets/images/games/missing-word.png';

export enum GameType {
  QUIZ = 'Quiz',
  MISSING_TYPE = 'Missing Type',
}
export interface IGameStatsProps {
  games: {
    quiz?: IGameStats;
    missingType?: IGameStats;
  };
}

export const GameSection = ({ games }: IGameStatsProps) => {
  return (
    <div className="games__wrapper games__wrapper_statistics">
      <GameCard game={games!.quiz} type={GameType.QUIZ} img={QUIZ_ICON} />
      <GameCard game={games!.missingType} type={GameType.MISSING_TYPE} img={MISSING_TYPE_ICON} />
    </div>
  );
};
