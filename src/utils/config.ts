// import { GameTypeOption, IAddWordStatProps, IPutStatPromiseProps } from '../components/games/types';
// import { IGotUserWord, Tokens, WordDifficulties } from './types';
// import { sameDay } from './utils';

import { getRefreshToken } from '../API/authorization';
// import { GameType } from '../pages/StatisticsPage/types';
import { sameDay } from './helpers';
import { getNewToken, postWordPromise, putWordPromise } from './services';
import {
  Errors,
  GameTypeOption,
  IAddWordStatProps,
  IGotUserWord,
  IPostWordProps,
  IPutStatPromiseProps,
  IPutWordProps,
  IStat,
  Tokens,
  WordDifficulties,
} from './types';

// const BASE = 'https://react-rslang-api.herokuapp.com/'
const BASE = 'http://localhost:5000/';

const WORDS = `${BASE}words`;

export const USERS = `${BASE}users`;
export const SIGN_IN = `${BASE}signin`;

export const USER = `${USERS}/${localStorage.getItem('userId')}`;
export const USER_WORDS = `${USERS}/${localStorage.getItem('userId')}/words`;
export const USER_TOKEN = `${USER}/tokens`;
export const USER_STAT = `${USER}/statistics`;

export const getWordsResponse = (group: number, page: number) =>
  `${WORDS}?group=${group}&page=${page}`;

export const getFileResponse = (filepath: string) => `${BASE}${filepath}`;

export const getTokenConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${getRefreshToken()}`,
    },
  };
};

export const getUserWordResponse = (wordId: string) => `${USER_WORDS}/${wordId}`;

const MIN_FOR_NEW = 3;
const MIN_FOR_DIFFICULT = 5;

export const postWordConfig = ({
  isRight,
  gameType,
}: {
  isRight: boolean;
  gameType: GameTypeOption;
}) => {
  const gamesTemplate = {
    sprint: { right: 0, wrong: 0 },
    audioCall: { right: 0, wrong: 0 },
  };
  if (isRight) gamesTemplate[gameType].right = 1;
  else gamesTemplate[gameType].wrong = 1;
  return {
    difficulty: WordDifficulties.NEW,
    optional: {
      lastTime: new Date().toJSON(),
      allTry: 1,
      streak: isRight ? 1 : 0,
      games: { ...gamesTemplate },
    },
  };
};

export const putWordConfig = ({
  data,
  isRight,
  gameType,
}: {
  data: IGotUserWord;
  isRight: boolean;
  gameType: GameTypeOption;
}) => {
  delete data.id;
  delete data.wordId;
  if (isRight) {
    data.optional.streak += 1;
    if (data.difficulty === WordDifficulties.NEW && data.optional.streak >= MIN_FOR_NEW)
      data.difficulty = WordDifficulties.STUDIED;
    if (data.difficulty === WordDifficulties.DIFFICULT && data.optional.streak >= MIN_FOR_DIFFICULT)
      data.difficulty = WordDifficulties.STUDIED;
    data.optional.games[gameType].right += 1;
  } else {
    data.difficulty = WordDifficulties.DIFFICULT;
    data.optional.streak = 0;
    data.optional.games[gameType].wrong += 1;
  }
  data.optional.allTry += 1;
  data.optional.lastTime = new Date().toJSON();
  return data;
};

const newDayTemplate = {
  date: new Date().toJSON(),
  games: {
    sprint: { newWords: 0, allWords: 0, right: 0, streak: 0 },
    audioCall: { newWords: 0, allWords: 0, right: 0, streak: 0 },
  },
};

export const createStatConfig = ({ answers, gameType }: IAddWordStatProps) => {
  const { right, wrong, max } = answers;
  const newWords = right.length + wrong.length;
  const template = { ...newDayTemplate };
  template.games[gameType].newWords = newWords;
  template.games[gameType].allWords = newWords;
  template.games[gameType].right = right.length;
  template.games[gameType].streak = max;
  return {
    learnedWords: 0,
    optional: {
      words: JSON.stringify([...right, ...wrong].map((w) => w.id)),
      ...template,
      longStat: JSON.stringify([
        {
          date: template.date,
          newWords,
          learnedWords: 0,
        },
      ]),
    },
  };
};

export const updateStatConfig = ({
  data,
  answers,
  gameType,
  learnedWords,
}: IPutStatPromiseProps) => {
  delete data.id;
  const { words, games, date, longStat } = data.optional;
  const { right, wrong, max } = answers;
  const parsedWords = JSON.parse(words);
  const newWords = Array.from(new Set([...parsedWords, ...[...right, ...wrong].map((w) => w.id)]));
  const newWordsCount = newWords.length - parsedWords.length;
  const longStatArray = JSON.parse(longStat);
  if (sameDay(date)) {
    games[gameType].newWords += newWordsCount;
    games[gameType].allWords += right.length + wrong.length;
    games[gameType].right += right.length;
    if (max > games[gameType].streak) games[gameType].streak = max;
    longStatArray[longStatArray.length - 1].newWords += newWordsCount;
  } else {
    const template = { ...newDayTemplate };
    template.games[gameType].newWords = newWordsCount;
    template.games[gameType].allWords = right.length + wrong.length;
    template.games[gameType].right = right.length;
    template.games[gameType].streak = max;
    longStatArray.push({ date: template.date, newWords: newWordsCount });
    data.optional = { ...data.optional, ...template };
  }
  longStatArray[longStatArray.length - 1].learnedWords = learnedWords.all;
  data.learnedWords = learnedWords.today;
  data.optional.words = JSON.stringify(newWords);
  data.optional.longStat = JSON.stringify(longStatArray);
  return data;
};

const statTemplate = {
  learnedWords: 0,
  optional: {
    words: '',
    date: new Date().toJSON(),
    games: {
      sprint: { newWords: 0, allWords: 0, right: 0, streak: 0 },
      audioCall: { newWords: 0, allWords: 0, right: 0, streak: 0 },
    },
    longStat: '',
  },
};

export interface ICreateStatProps {
  learnedWords: { all: number; today: number };
}

export interface IUpdateStatProps extends ICreateStatProps {
  data: IStat;
}

// const createStatConfig = ({ learnedWords }: ICreateStatProps) => {
//   const template = { ...statTemplate }
//   template.learnedWords = learnedWords.today
//   template.optional.longStat = JSON.stringify([
//     {
//       date: template.optional.date,
//       newWords: 0,
//       learnedWords: learnedWords.all,
//     },
//   ])
//   return template
// }

// const updateStatConfig = ({ data, learnedWords }: IUpdateStatProps) => {
//   delete data.id
//   data.learnedWords = learnedWords.today
//   const parsedLongStat = JSON.parse(data.optional.longStat)
//   if (sameDay(data.optional.date))
//     parsedLongStat[parsedLongStat.length - 1].learnedWords = learnedWords.all
//   else {
//     data.optional.date = statTemplate.optional.date
//     data.optional.games = { ...statTemplate.optional.games }
//     parsedLongStat.push({
//       date: statTemplate.optional.date,
//       newWords: 0,
//       learnedWords: learnedWords.all,
//     })
//   }
//   data.optional.longStat = JSON.stringify(parsedLongStat)
//   return data
// }

// const createStatPromise = async (props: ICreateStatProps) =>
//   axios.put(USER_STAT, createStatConfig(props), getTokenConfig())

// const updateStatPromise = async (props: IUpdateStatProps) =>
//   axios.put(USER_STAT, updateStatConfig(props), getTokenConfig())

// const createStat = async (props: ICreateStatProps) =>
//   createStatPromise(props).catch(async ({ response }) => {
//     if (response.status === Errors.ERROR_401) {
//       await getNewToken()
//       createStatPromise(props)
//     }
//   })

// const updateStat = async (props: IUpdateStatProps) => {
//   updateStatPromise(props).catch(async ({ response }) => {
//     if (response.status === Errors.ERROR_401) {
//       await getNewToken()
//       updateStatPromise(props)
//     }
//   })
// }

// export const changeStats = async () => {
//   const learnedWords = { all: 0, today: 0 }
//   await getAllUserWordsPromise()
//     .then(({ data }) => setLearnedWordsLength({ learnedWords, data }))
//     .catch(async ({ response }) => {
//       if (response.status === Errors.ERROR_401) {
//         await getNewToken()
//         getAllUserWordsPromise().then(({ data }) =>
//           setLearnedWordsLength({ learnedWords, data })
//         )
//       }
//     })
//   getStatPromise()
//     .then(({ data }) => updateStat({ data, learnedWords }))
//     .catch(async ({ response }) => {
//       if (response.status === Errors.ERROR_401) {
//         await getNewToken()
//         getStatPromise()
//           .then(({ data }) => updateStat({ data, learnedWords }))
//           .catch((error) => {
//             if (error.response.status === Errors.ERROR_404)
//               createStat({ learnedWords })
//           })
//       }
//       if (response.status === Errors.ERROR_404) createStat({ learnedWords })
//     })
// }
