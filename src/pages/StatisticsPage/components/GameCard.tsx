import { checkIsNaN } from '../../../utils/helpers';
import { IGameStats } from '../StatisticsPage';
import { GameType } from './GameSection';

export interface IGameCardProps {
  game: IGameStats;
  type: GameType;
}

// export interface IStat {
//   id?: string;
//   learnedWords: number;
//   optional: {
//     words: string; // массив id всех изученных слов
//     date: string;
//     games: {
//       sprint: IGameStat;
//       audioCall: IGameStat;
//     };
//     longStat: string; // если последний элемент в массиве прошлого дня дата - пушишь новый, нет - добавляешь/обновляешь элемент с датой сегодня
//   };
// }

export const GameCard = ({ game, type }: IGameCardProps) => {
  return (
    <article className="game-card">
      <h2 className="game-title">{type}</h2>
      <ul>
        <li className="game-row">Tasks quantity: {game.all}</li>
        <li className="game-row">Questions Answered: {game.answered}</li>
        <li>Correct Answers: {(checkIsNaN(game.correct / game.answered) * 100).toFixed(0)}%</li>
        <li>Longest successful series: {game.streak}</li>
      </ul>
    </article>
  );
};
