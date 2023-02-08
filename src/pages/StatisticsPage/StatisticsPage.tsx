import React, { useCallback, useEffect, useState } from 'react';
import { getToken, getUserId, IGetUSer } from '../../API/authorization';
import storage from '../../utils/storage';
import { GameSection } from './components/GameSection';
import { GeneralStats } from './components/GeneralStats';
import { BASE_URL } from '../../API/URL';
import { getStats, setUserStatistics } from '../../API/statistics';

export type UserStatistics = {
  id?: string;
  lessons?: {
    learnedLessons?: number;
    lessonsId?: string;
  };
  katas?: {
    finishedKatas?: number;
    katasId?: string;
  };
  date: string;
  longStat?: ILongStat;
  games?: {
    quiz?: IGameStats;
    missingType?: IGameStats;
  };
};

export interface ILongStat {
  date: string; // дата долгосрочной статы, т.е. если дата сегоднешняя данные обновлять, нет - добавить с новой датой
  lessons: number; // количество новых уроков за этот день
  katas: number; // количество новых кат за этот день
  games: number; // количество cыгранных игр за этот день
}

export interface IGameStats {
  score: number; // best game score
  correct: number; // how many questions user answered correctly
  answered: number; // total answered questions quantity
  streak: number; // longest successful series of answers
}

export default function Statistics() {
  const user = storage.getItem<IGetUSer>('userData');
  if (!user) return <AuthNotification />;

  const [stats, setStats] = useState<UserStatistics>({
    lessons: {
      learnedLessons: 0,
    },
    katas: {
      finishedKatas: 0,
    },
    date: '',
    games: {
      quiz: { score: 0, correct: 0, answered: 0, streak: 0 },
      missingType: { score: 0, correct: 0, answered: 0, streak: 0 },
    },
    longStat: {
      date: '',
      lessons: 0,
      katas: 0,
      games: 0,
    },
  });
  const getStatsCallback = useCallback(() => {
    getStats(setStats);
  }, []);
  useEffect(getStatsCallback, [getStatsCallback]);

  // console.log(stats);
  const userId = getUserId();

  return (
    <>
      <GeneralStats
        finishedKatas={stats?.katas?.finishedKatas || 0}
        learnedLessons={stats?.lessons?.learnedLessons || 0}
        correctAnswers={
          ((stats?.games?.quiz?.correct || 0) + (stats?.games?.missingType?.correct || 0)) /
          ((stats?.games?.quiz?.answered || 0) + (stats?.games?.missingType?.answered || 0))
        }
      />
      <GameSection games={stats?.games || gamesInit} />
      <div className="buttons__container">
        <button className="button" onClick={() => setUserStatistics(userId, testStatistics)}>
          SetStats
        </button>
        <button className="button" onClick={() => getTestStats(userId)}>
          GetStats
        </button>
      </div>
    </>
  );
}

const gamesInit = {
  quiz: {
    score: 0,
    answered: 0,
    correct: 0,
    streak: 0,
  },
  missingType: {
    score: 0,
    answered: 0,
    correct: 0,
    streak: 0,
  },
};

const testStatistics: UserStatistics = {
  lessons: {
    learnedLessons: 0,
    // lessonsId: JSON.stringify(['2']),
  },
  katas: {
    finishedKatas: 0,
    // katasId: JSON.stringify(['1']),
  },
  date: new Date().toJSON(),
  games: {
    quiz: {
      score: 0,
      answered: 0,
      correct: 0,
      streak: 0,
    },
    missingType: {
      score: 0,
      answered: 0,
      correct: 0,
      streak: 0,
    },
  },
  longStat: {
    date: new Date().toJSON(),
    lessons: 0,
    katas: 0,
    games: 0,
  },
};

// const testStatistics: UserStatistics = {
//   learnedLessons: 1,
//   finishedKatas: 1,
//   optional: {
//     date: '',
//     // lessonsId: [],
//     // katasId: [],
//     games: {
//       quiz: {
//         score: 2,
//         answered: 2,
//         correct: 3,
//         streak: 2,
//       },
//       missingType: {
//         score: 2,
//         answered: 2,
//         correct: 2,
//         streak: 2,
//       },
//     },
//   },
// };

function AuthNotification() {
  return (
    <div style={{ width: '99.5%' }}>
      <div style={{ width: '100%' }}>
        <h2>Страница недоступна</h2>
        Извините данная страница для зарегистрированных пользователей —
        <strong> Войдите под своей учетной записью!</strong>
      </div>
    </div>
  );
}

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

// async function setTestStats(id: string, statistics: UserStatistics) {
//   const response = await fetch(`${BASE_URL}users/${id}/statistics`, {
//     method: 'PUT',
//     headers: {
//       Authorization: `Bearer ${getToken()}`,
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(`${statistics}`),
//   });

//   if (response.status === 401) {
//     throw new Error('Access token is missing or invalid!');
//   } else if (response.status !== 200) {
//     throw new Error(`${response.status}`);
//   }
// }
