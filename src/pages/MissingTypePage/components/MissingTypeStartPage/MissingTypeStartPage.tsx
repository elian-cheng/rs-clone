import { Dispatch, SetStateAction } from 'react';
import { GameStatus } from '../../../QuizPage/QuizPage';

export default function MissingTypeStartPage({
  setStatus,
}: {
  setStatus: Dispatch<SetStateAction<number>>;
}) {
  return (
    <section className="missing-type__start">
      <h2 className="missing-type__start-title title">Missing-Type</h2>
      <p className="missing-type__start-subtitle subtitle">
        Test for the correct use of data types
      </p>
      <ul className="missing-type__start-descr">
        <li className="missing-type__start-descr-item">
          You are given a code example with one missing data type
        </li>
        <li className="missing-type__start-descr-item">
          Your task is to drag the correct type from the top row into the block with the code
        </li>
        <li className="missing-type__start-descr-item">
          After dragging in the cell, the empty line will be filled with your answer
        </li>
        <li className="missing-type__start-descr-item">
          After filling, a button will light up, which will check the task and switch you to the
          next task
        </li>
      </ul>
      <button className="button" onClick={() => setStatus(GameStatus.GAME)}>
        Start
      </button>
    </section>
  );
}
