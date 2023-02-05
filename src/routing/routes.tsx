import React from 'react';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import GamesPage from '../pages/GamesPage/GamesPage';
import HomePage from '../pages/HomePage/HomePage';
import PracticePage from '../pages/PracticePage/PracticePage';
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import StatisticsPage from '../pages/StatisticsPage/StatisticsPage';

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
    element: <GamesPage />,
  },
  {
    title: 'Quiz',
    path: '/games/quiz',
    element: <GamesPage />,
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
