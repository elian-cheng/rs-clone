import { checkIsNaN } from '../../../../utils/helpers';
import { IGameStats } from '../../StatisticsPage';
import { GameType } from './GameSection';

export interface IGameCardProps {
  game?: IGameStats;
  type: GameType;
  img: string;
}

export const GameCard = ({ game, type, img }: IGameCardProps) => {
  return (
    <div className="game">
      <div className="game__card">
        <div className="game__top">
          <div className="game__image-block game__image-block_image-statistics">
            <div className="game__image">
              <img alt={type} src={img} className="" />
            </div>
          </div>
          <div className="game__title">
            <p className="game__name name-title">{type}</p>
          </div>
        </div>
        <div className="game__info">
          <p className="game__description game__description_description-statistics description">
            Questions answered: {game?.answered || 0}
          </p>
        </div>
        <div className="game__info">
          <p className="game__description game__description_description-statistics description">
            Correct answers: {(checkIsNaN(game!.correct / game!.answered) * 100).toFixed(0) || 0}%
          </p>
        </div>
        <div className="game__info">
          <p className="game__description game__description_description-statistics description">
            Longest successful series: {game?.strike || 0}
          </p>
        </div>
      </div>
    </div>
  );
};
