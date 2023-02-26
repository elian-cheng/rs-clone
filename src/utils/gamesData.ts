import QUIZ_ICON from '../assets/images/games/quiz.png';
import MISSING_TYPE_ICON from '../assets/images/games/missing-word.png';

export const URL_GAME_QUIZ = '/games/quiz';
export const URL_GAME_MISSING_TYPE = '/games/missing-type';

export const gamesData = [
  {
    id: 1,
    name: 'Quiz',
    img: QUIZ_ICON,
    link: URL_GAME_QUIZ,
    description:
      'A theory test, designed to check your knowledge of TypeScript according to the learning material in the lessons section',
  },
  {
    id: 2,
    name: 'Missing Type',
    img: MISSING_TYPE_ICON,
    link: URL_GAME_MISSING_TYPE,
    description:
      'Practice your knowledge of the TypeScript types variety by writing a missing word in the different given examples.',
  },
];
