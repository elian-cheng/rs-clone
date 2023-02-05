import React, { useCallback, useContext, useEffect, useState } from 'react';
import { getUserStatistics } from '../../API/statistics';
import { UserContext } from '../../context/UserContext';
import ChartsBlock from './components/ChartsBlock';

export type UserStatistics = {
  userId: string;
  learnedLessons?: number;
  finishedKatas?: number;
  // learnedWords?: number;
  optional?: GameStats;
};

export type GameStats = {
  quiz?: {
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    longestSeries: number;
  };
  missingType?: {
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    longestSeries: number;
  };
};

export default function StatisticsPage() {
  const { user } = useContext(UserContext);
  const [stats, setStats] = useState<UserStatistics>();
  // const [gameStats, setGameStats] = useState<Array<GameStats | undefined>>([]);

  const getStats = useCallback(async () => {
    if (!user?.id) return;
    const userStats = await getUserStatistics(user!.id);
    // console.log(userStats);
    setStats(userStats);
  }, []);

  useEffect(() => {
    getStats();
  }, [getStats]);

  return (
    <div className="main__container">
      <div style={{ marginTop: 100 }}>StatisticsPage</div>
      <div>Learned words {stats?.learnedLessons || 0}</div>
      <div>FinishedKatas {stats?.finishedKatas || 0}</div>
      {/* <div>LearnedWords {stats?.learnedWords || 0}</div> */}
      <ChartsBlock />
    </div>
  );
}
