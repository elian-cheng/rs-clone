import { checkIsNaN } from '../../../../utils/helpers';
import { IGameStats } from '../../StatisticsPage';
import { GameType } from './GameSection';

export interface IGameCardProps {
  game?: IGameStats;
  type: GameType;
}

export const GameCard = ({ game, type }: IGameCardProps) => {
  return (
    <article className="game-card">
      <h2 className="game-title">{type}</h2>
      <ul>
        <li className="game-row">Questions Answered: {game?.answered || 0}</li>
        <li>
          Correct Answers: {(checkIsNaN(game!.correct / game!.answered) * 100).toFixed(0) || 0}%
        </li>
        <li>Longest successful series: {game?.strike || 0}</li>
      </ul>
    </article>
  );
};
