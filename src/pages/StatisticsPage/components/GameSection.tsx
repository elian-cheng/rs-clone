import { IGameStats } from '../StatisticsPage';
import { GameCard } from './GameCard';

export enum GameType {
  QUIZ = 'Quiz',
  MISSING_TYPE = 'Missing Type',
}

export enum GameTotalQuestions {
  QUIZ_TOTAL = 30,
  MISSING_TYPE_TOTAL = 40,
}

export interface IGameStatsProps {
  games: {
    quiz?: IGameStats;
    missingType?: IGameStats;
  };
}

export const GameSection = ({ games }: IGameStatsProps) => {
  return (
    <section className="game-section">
      <GameCard game={games!.quiz} type={GameType.QUIZ} total={GameTotalQuestions.QUIZ_TOTAL} />
      <GameCard
        game={games!.missingType}
        type={GameType.MISSING_TYPE}
        total={GameTotalQuestions.MISSING_TYPE_TOTAL}
      />
    </section>
  );
};
