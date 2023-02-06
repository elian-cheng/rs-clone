import { IGameStats } from '../StatisticsPage';
import { GameCard } from './GameCard';

export enum GameType {
  QUIZ = 'Quiz',
  MISSING_TYPE = 'Missing Type',
}

export interface IGameStatsProps {
  games: {
    quiz: IGameStats;
    missingType: IGameStats;
  };
}

export const GameSection = ({ games }: IGameStatsProps) => {
  return (
    <section className="game-section">
      <GameCard game={games.quiz} type={GameType.QUIZ} />
      <GameCard game={games.missingType} type={GameType.MISSING_TYPE} />
    </section>
  );
};
