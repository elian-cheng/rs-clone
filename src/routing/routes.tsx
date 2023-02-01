import ErrorPage from '../pages/ErrorPage/ErrorPage';
import GamesPage from '../pages/GamesPage/GamesPage';
import HomePage from '../pages/HomePage/HomePage';
import LessonsPage from '../pages/LessonsPage/LessonsPage';
import PracticePage from '../pages/PracticePage/PracticePage';
import StatisticsPage from '../pages/StatisticsPage/StatisticsPage';

export interface IRoute {
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
