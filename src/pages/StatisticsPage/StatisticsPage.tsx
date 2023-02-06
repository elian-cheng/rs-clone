// import React, { useCallback, useContext, useEffect, useState } from 'react';
// import { getUserStatistics, IStat, setUserStatistics } from '../../API/apiCalls';
// import { IGetUSer } from '../../API/authorization';
// import { getStats } from '../../API/statistics';
// // import { getStats, getUserStatistics, IStat, setUserStatistics } from '../../API/statistics';
// import storage from '../../utils/storage';
// import { GameSection } from './components/GameSection';
// import { GeneralStats } from './components/GeneralStats';

// const AuthNotification = () => {
//   return (
//     <div style={{ marginTop: 100, width: '99.5%' }}>
//       <div style={{ width: '100%' }}>
//         <h2>Страница недоступна</h2>
//         Извините данная страница для зарегистрированных пользователей —
//         <strong> Войдите под своей учетной записью!</strong>
//       </div>
//     </div>
//   );
// };

// export type UserStatistics = {
//   userId: string;
//   learnedLessons?: number;
//   finishedKatas?: number;
//   // learnedWords?: number;
//   optional?: GameStats;
// };

// export type GameStats = {
//   quiz?: {
//     totalQuestions: number;
//     correctAnswers: number;
//     wrongAnswers: number;
//     longestSeries: number;
//   };
//   missingType?: {
//     totalQuestions: number;
//     correctAnswers: number;
//     wrongAnswers: number;
//     longestSeries: number;
//   };
// };

// export default function StatisticsPage() {
//   const user = storage.getItem<IGetUSer>('userData');
//   if (!user) return <AuthNotification />;

//   const [stats, setStats] = useState<IStat>({
//     learnedWords: 0,
//     optional: {
//       words: '',
//       date: '',
//       games: {
//         sprint: { newWords: 0, allWords: 0, right: 0, streak: 0 },
//         audioCall: { newWords: 0, allWords: 0, right: 0, streak: 0 },
//       },
//       longStat: '',
//     },
//   });
//   const getStatsCallback = useCallback(() => {
//     getStats(setStats);
//   }, []);
//   useEffect(getStatsCallback, [getStatsCallback]);

//   console.log(stats);
//   const userId = '63e14e33e24a893e7279e62b';
//   const testStatistics = {
//     learnedWords: 50,
//   };

//   return (
//     <>
//       <GeneralStats
//         newWords={stats.optional.games.sprint.newWords + stats.optional.games.audioCall.newWords}
//         learnedWords={stats.learnedWords}
//         right={
//           (stats.optional.games.sprint.right + stats.optional.games.audioCall.right) /
//           (stats.optional.games.sprint.allWords + stats.optional.games.audioCall.allWords)
//         }
//       />
//       <GameSection games={stats.optional.games} />
//       <div className="buttons__container">
//         <button className="button" onClick={() => setUserStatistics(userId, testStatistics)}>
//           SetStats
//         </button>
//         <button className="button" onClick={() => getUserStatistics(userId)}>
//           GetStats
//         </button>
//       </div>
//       {/* <LongStats longStat={stats.optional.longStat} /> */}
//     </>
//   );
// }

import axios from 'axios';
import React, { Dispatch, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { getUserStatistics, getUserWords, setUserStatistics } from '../../API/apiCalls';
import { UserWordsDTO } from '../../API/apiCalls.types';
import { getToken, getUserId, IGetUSer } from '../../API/authorization';
// import { withAsync } from '../../API/helpers/withAsync';
// import { getUserToken } from '../../API/statistics';
import { getTokenConfig, USER_STAT, USER_TOKEN } from '../../utils/config';
import { sameDay } from '../../utils/helpers';
// import { AuthContext } from '../../utils/services';
import { UserContext } from '../../context/UserContext';
import storage from '../../utils/storage';
import { GameSection } from './components/GameSection';
import { GeneralStats } from './components/GeneralStats';
import { BASE_URL } from '../../API/URL';
import { IStatistics } from '../../API/statistics';

export async function getTestStats(id: string) {
  const response = await fetch(`${BASE_URL}users/${id}/statistics`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Accept: 'application/json',
    },
  });

  if (response.status === 401) {
    throw new Error('Access token is missing or invalid!');
  } else if (response.status === 404) {
    throw new Error('Statistics not found!');
  } else if (response.status !== 200) {
    throw new Error(`${response.status}`);
  }

  const userStatistics = await response.json();
  console.log(userStatistics);
  return userStatistics;
}

async function setTestStats(id: string, statistics: IStatistics) {
  const response = await fetch(`${BASE_URL}users/${id}/statistics`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(`${statistics}`),
  });

  if (response.status === 401) {
    throw new Error('Access token is missing or invalid!');
  } else if (response.status !== 200) {
    throw new Error(`${response.status}`);
  }
}
// import { IStat, Paths, Tokens } from '../../utils/types';
// import { GameStat } from './components/gameStats';
// import { WordStat } from './components/WordStats';
export enum Errors {
  ERROR_401 = 401,
  ERROR_404 = 404,
}
// import { getStats } from './utils';
// import { GameStat } from '../components/statistics/GameStats'
// import { getStats } from '../components/statistics/utils'
// import { WordStat } from '../components/statistics/WordStats'
// import { Footer } from '../components/ui/Footer/Footer'
// import { IStat } from '../utils/types'
const AuthNotification = () => {
  return (
    <div style={{ width: '99.5%' }}>
      <div style={{ width: '100%' }}>
        <h2>Страница недоступна</h2>
        Извините данная страница для зарегистрированных пользователей —
        <strong> Войдите под своей учетной записью!</strong>
      </div>
    </div>
  );
};

export type UserStatistics = {
  id?: string;
  learnedLessons?: number;
  finishedKatas?: number;
  // learnedWords?: number;
  optional: {
    date: string;
    games: {
      quiz: IGameStats;
      missingType: IGameStats;
    };
    longStat?: string;
  };
};

export type IGameStats = {
  all: number; // all existing questions/task items quantity in our database
  correct: number; // how many user answered correctly
  answered: number; // total answered questions quantity
  streak: number; // longest successful series of answers
};

export type GameStats = {
  quiz?: {
    all: number;
    correct: number;
    answered: number;
    streak: number;
  };
  missingType?: {
    all: number;
    anwered: number;
    correct: number;
    streak: number;
  };
};

export type UserStatisticsDTO = {
  // id: string;
  learnedWords: number;
  optional?: {
    [key: string]: string;
  };
};

// export const getStatPromise = async () => axios.get<IStat>(USER_STAT, getToken());
export const getNewToken = async () =>
  axios
    .get(USER_TOKEN, getTokenConfig())
    .then(({ data }) => {
      localStorage.setItem('userData', data.token);
      localStorage.setItem('userData', data.refreshToken);
    })
    .catch(() => {
      localStorage.clear();
      // window.location.href = Paths.AUTH;
    });

export const getStats = async (setStats: Dispatch<React.SetStateAction<UserStatistics>>) => {
  getUserStatistics(getUserId())
    .then(({ data }) => {
      delete data.id;
      if (sameDay(data.optional.date)) setStats((prev) => ({ ...prev, ...data }));
      else
        setStats((prev) => {
          prev.optional.longStat = data.optional.longStat;
          return { ...prev };
        });
    })
    .catch(async ({ response }) => {
      if (response?.status === 401) {
        await getNewToken();
        getUserStatistics(getUserId()).then(({ data }) => {
          delete data.id;
          if (sameDay(data.optional.date)) setStats((prev) => ({ ...prev, ...data }));
          else
            setStats((prev) => {
              prev.optional.longStat = data.optional.longStat;
              return { ...prev };
            });
        });
      }
    });
};

const Statistics = () => {
  const user = storage.getItem<IGetUSer>('userData');
  if (!user) return <AuthNotification />;

  const [stats, setStats] = useState<UserStatistics>({
    learnedLessons: 0,
    finishedKatas: 0,
    optional: {
      date: '',
      games: {
        quiz: { all: 0, correct: 0, answered: 0, streak: 0 },
        missingType: { all: 0, correct: 0, answered: 0, streak: 0 },
      },
      longStat: '',
    },
  });
  const getStatsCallback = useCallback(() => {
    getStats(setStats);
  }, []);
  useEffect(getStatsCallback, [getStatsCallback]);

  console.log(stats);
  const userId = getUserId();
  // const testStatistics = {
  //   learnedWords: 50,
  //   optional: {},
  // };
  const testStatistics: UserStatistics = {
    learnedLessons: 5,
    finishedKatas: 2,
    optional: {
      date: new Date().toJSON(),
      games: {
        quiz: {
          all: 50,
          answered: 8,
          correct: 5,
          streak: 3,
        },
        missingType: {
          all: 30,
          answered: 10,
          correct: 8,
          streak: 5,
        },
      },
    },
  };

  return (
    <>
      <GeneralStats
        finishedKatas={stats?.finishedKatas || 0}
        learnedLessons={stats?.learnedLessons || 0}
        correctAnswers={
          (stats.optional?.games?.quiz?.correct + stats.optional?.games?.missingType?.correct) /
          (stats.optional?.games?.quiz?.answered + stats.optional?.games?.missingType?.answered)
        }
      />
      <GameSection games={stats.optional?.games} />
      <div className="buttons__container">
        <button className="button" onClick={() => setUserStatistics(userId, testStatistics)}>
          SetStats
        </button>
        <button className="button" onClick={() => getTestStats(userId)}>
          GetStats
        </button>
      </div>
      {/* <LongStats longStat={stats.optional.longStat} /> */}
    </>
  );
};

export default Statistics;
