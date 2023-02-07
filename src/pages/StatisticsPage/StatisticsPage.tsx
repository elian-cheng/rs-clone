import React, { useCallback, useEffect, useState } from 'react';
import { getToken, getUserId, IGetUSer } from '../../API/authorization';
import storage from '../../utils/storage';
import { GameSection } from './components/GameSection';
import { GeneralStats } from './components/GeneralStats';
import { BASE_URL } from '../../API/URL';
import { getStats, setUserStatistics } from '../../API/statistics';

export type UserStatistics = {
  id?: string;
  learnedLessons?: number;
  finishedKatas?: number;
  optional: {
    date: string;
    games: {
      quiz: IGameStats;
      missingType: IGameStats;
    };
    longStat?: ILongStat;
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
    learnedLessons: 0,
    finishedKatas: 0,
    optional: {
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
    },
  });
  const getStatsCallback = useCallback(() => {
    getStats(setStats);
  }, []);
  useEffect(getStatsCallback, [getStatsCallback]);

  console.log(stats);
  const userId = getUserId();

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
    </>
  );
}

const testStatistics: UserStatistics = {
  learnedLessons: 5,
  finishedKatas: 7,
  optional: {
    date: new Date().toJSON(),
    games: {
      quiz: {
        score: 70,
        answered: 8,
        correct: 6,
        streak: 7,
      },
      missingType: {
        score: 60,
        answered: 12,
        correct: 8,
        streak: 5,
      },
    },
  },
};

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
