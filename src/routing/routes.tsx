import React from 'react';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import GamesPage from '../pages/GamesPage/GamesPage';
import HomePage from '../pages/HomePage/HomePage';
import PracticePage from '../pages/PracticePage/PracticePage';
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import StatisticsPage from '../pages/StatisticsPage/StatisticsPage';
import MissingTypePage from '../pages/MissingTypePage/MissingTypePage';
import QuizPage from '../pages/QuizPage/QuizPage';

export interface IRoute {
  title: string;
  path: string;
  element: React.ReactNode;
}

interface ITitle {
  [key: string]: string;
}

export const titles: ITitle = {
  '/': 'TS Academy',
  '/lessons': 'Lessons',
  '/practice': 'Practice',
  '/games': 'Games',
  '/games/quiz': 'Quiz',
  '/games/missing-type': 'Missing Type',
  '/statistics': 'Statistics',
  '/settings': 'Settings',
};

export const routes: IRoute[] = [
  {
    title: 'Home',
    path: '/',
    element: <HomePage />,
  },
  {
    title: 'Practice',
    path: '/practice',
    element: <PracticePage />,
  },
  {
    title: 'Games',
    path: '/games',
    element: <GamesPage />,
  },
  {
    title: 'Missing Type',
    path: '/games/missing-type',
    element: <MissingTypePage />,
  },
  {
    title: 'Quiz',
    path: '/games/quiz',
    element: <QuizPage />,
  },
  {
    title: 'Statistics',
    path: '/statistics',
    element: <StatisticsPage />,
  },
  {
    title: 'Settings',
    path: '/settings',
    element: <SettingsPage />,
  },
  {
    title: 'Other',
    path: '*',
    element: <ErrorPage />,
  },
];
