import Eugene from '../assets/images/team/eugene.jpg';
import Olga from '../assets/images/team/olga.jpg';
import Oleksandr from '../assets/images/team/oleksandr.jpg';
import { ITeam } from '../pages/HomePage/components/TeamMembers/TeamMembers';

export const teamMembers: ITeam[] = [
  {
    id: 1,
    src: `${Oleksandr}`,
    title: 'Oleksandr Mazghin',
    description:
      'Compiled databases for lessons and part of the Quiz, created the lessons page, footer, sidebar menu and navigation.',
    git: 'https://github.com/ordinaraviro',
  },
  {
    id: 2,
    src: `${Olga}`,
    title: 'Olga Chernega',
    description:
      "App design, backend server, home page's features and team sections, user authorization and forms, Quiz game, statistics game section.",
    git: 'https://github.com/elian-cheng',
  },
  {
    id: 3,
    src: `${Eugene}`,
    title: 'Eugene Burkovskiy',
    description:
      "Implemented a code editor, practice page, Codewars API and tasks, home page's full-screen block, Missing Type game, statistics charts.",
    git: 'https://github.com/eugeneburkovskiy',
  },
];
