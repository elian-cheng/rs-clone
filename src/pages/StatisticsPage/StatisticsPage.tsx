import React, { useCallback, useEffect, useState } from 'react';
import { IGetUSer } from '../../API/authorization';
import storage from '../../utils/storage';
import { GameSection } from './components/GameSection/GameSection';
import { GeneralStats } from './components/GeneralStats';
import { getStats } from '../../API/statistics';
import AuthNotification from './components/AuthNotification/AuthNotification';
import ChartsBlock from './components/ChartsBlock/ChartsBlock';
import { getLessons } from '../../API/tasks';

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
  date?: string;
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
  correct: number; // how many questions user answered correctly
  answered: number; // total answered questions quantity
  streak: number; // longest successful series of answers
}

const gamesInit = {
  quiz: {
    answered: 0,
    correct: 0,
    streak: 0,
  },
  missingType: {
    answered: 0,
    correct: 0,
    streak: 0,
  },
};

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
      quiz: { correct: 0, answered: 0, streak: 0 },
      missingType: { correct: 0, answered: 0, streak: 0 },
    },
    longStat: {
      date: '',
      lessons: 0,
      katas: 0,
      games: 0,
    },
  });
  const [lessons, setLessons] = useState(Array<string>);

  const getStatsCallback = useCallback(() => {
    getLessons().then((res) => setLessons(res));
    getStats(setStats);
  }, []);
  useEffect(getStatsCallback, [getStatsCallback]);

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
      <div className="charts__container">
        <ChartsBlock stats={stats} lessonsTotal={lessons.length} />
      </div>
    </>
  );
}
