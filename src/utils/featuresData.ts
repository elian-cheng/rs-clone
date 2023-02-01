import book from '../assets/images/features/book.png';
import practice from '../assets/images/features/practice.png';
import games from '../assets/images/features/games.png';
import statistics from '../assets/images/features/statistics.png';
import { IFeature } from '../pages/HomePage/components/Features/Features';

export const featuresData: IFeature[] = [
  {
    id: 1,
    src: `${book}`,
    title: 'Lessons',
    description:
      'In the "Lessons" section you can find comprehensive Typescript textbook.\nOur lessons are designed to cater to all knowledge levels, from beginner to advanced.',
  },
  {
    id: 2,
    src: `${practice}`,
    title: 'Practice',
    description:
      'Our site offers exercises to help you learn and apply the concepts of Typescript. \nYou can train your practical skills with algorithms in the section "Practice".',
  },
  {
    id: 3,
    src: `${games}`,
    title: 'Games',
    description: `Our collection of mini-games adds some fun to the learning process. \n"Games" section will test your knowledge of the language in an interactive and entertaining way.`,
  },
  {
    id: 4,
    src: `${statistics}`,
    title: 'Statistics',
    description:
      '"Statistics" is designed to help you track your progress and understanding of the language. \nIt includes detailed performance metrics for every tutorial, exercise, and game.',
  },
];
