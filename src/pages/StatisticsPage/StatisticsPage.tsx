import React, { useCallback, useEffect, useState } from 'react';
import { IGetUSer } from '../../API/authorization';
import storage from '../../utils/storage';
import { GameSection } from './components/GameSection/GameSection';
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
  games?: {
    quiz?: IGameStats;
    missingType?: IGameStats;
  };
};

export interface IGameStats {
  correct: number;
  answered: number;
  strike: number;
}

const gamesInit = {
  quiz: {
    answered: 0,
    correct: 0,
    strike: 0,
  },
  missingType: {
    answered: 0,
    correct: 0,
    strike: 0,
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
    games: {
      quiz: { correct: 0, answered: 0, strike: 0 },
      missingType: { correct: 0, answered: 0, strike: 0 },
    },
  });
  const [lessons, setLessons] = useState(Array<string>);

  const getStatsCallback = useCallback(() => {
    getLessons().then((res) => setLessons(res));
    getStats(setStats);
  }, []);
  useEffect(getStatsCallback, [getStatsCallback]);

  return (
    <div className="statistics__container">
      <div className="statistics__wrapper">
        <h1 className="statistics__title title">Statistics</h1>
        <GameSection games={stats?.games || gamesInit} />
        <ChartsBlock
          stats={stats}
          lessonsTotal={lessons.length}
          correctAnswers={stats!.games!.quiz!.correct + stats!.games!.missingType!.correct}
          totalAnswered={stats!.games!.quiz!.answered + stats!.games!.missingType!.answered}
        />
      </div>
    </div>
  );
}
