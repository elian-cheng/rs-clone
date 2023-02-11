import { checkIsNaN } from '../../../../utils/helpers';
import { IGameStats } from '../../StatisticsPage';
import { GameTotalQuestions, GameType } from './GameSection';

export interface IGameCardProps {
  game?: IGameStats;
  type: GameType;
  total: GameTotalQuestions;
}

export const GameCard = ({ game, type, total }: IGameCardProps) => {
  return (
    <article className="game-card">
      <h2 className="game-title">{type}</h2>
      <ul>
        <li className="game-row">Tasks quantity: {total}</li>
        <li className="game-row">Questions Answered: {game!.answered}</li>
        <li>Correct Answers: {(checkIsNaN(game!.correct / game!.answered) * 100).toFixed(0)}%</li>
        <li>Longest successful series: {game!.streak}</li>
      </ul>
    </article>
  );
};
