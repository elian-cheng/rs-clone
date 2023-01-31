import ErrorPage from '../pages/ErrorPage';
import GamesPage from '../pages/GamesPage';
import HomePage from '../pages/HomePage';
import LessonsPage from '../pages/LessonsPage';
import PracticePage from '../pages/PracticePage';
import StatisticsPage from '../pages/StatisticsPage';
import { IRoute, ITitle } from '../types/interfaces';

export const titles: ITitle = {
  '/': 'TS Academy',
  '/lessons': 'Lessons',
  '/practice': 'Practice',
  '/games': 'Games',
  '/statistics': 'Statistics',
};

export const routes: IRoute[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/lessons',
    element: <LessonsPage />,
  },
  {
    path: '/practice',
    element: <PracticePage />,
  },
  {
    path: '/games',
    element: <GamesPage />,
  },
  {
    path: '/statistics',
    element: <StatisticsPage />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
];
