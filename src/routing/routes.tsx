import React from 'react';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import GamesPage from '../pages/GamesPage/GamesPage';
import HomePage from '../pages/HomePage/HomePage';
import LessonsPage from '../pages/LessonsPage/LessonsPage';
import PracticePage from '../pages/PracticePage/PracticePage';
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
};

export const routes: IRoute[] = [
  {
    title: 'Home',
    path: '/',
    element: <HomePage />,
  },
  {
    title: 'Lessons',
    path: '/lessons',
    element: <LessonsPage />,
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
    title: 'Statistics',
    path: '/statistics',
    element: <StatisticsPage />,
  },
  {
    title: 'Other',
    path: '*',
    element: <ErrorPage />,
  },
];
