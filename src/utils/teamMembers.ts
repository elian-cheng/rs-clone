import Eugene from '../assets/images/team/eugene.jpg';
import Olga from '../assets/images/team/olga.jpg';
import Oleksandr from '../assets/images/team/oleksandr.jpg';
import { ITeam } from '../pages/HomePage/components/TeamMembers/TeamMembers';

export const teamMembers: ITeam[] = [
  {
    id: 1,
    src: `${Oleksandr}`,
    title: 'Oleksandr Mazghin',
    description: 'Compiled a database, created a lessons section, sidebar.',
    git: 'https://github.com/ordinaraviro',
  },
  {
    id: 2,
    src: `${Olga}`,
    title: 'Olga Chernega',
    description: 'App design, backend server, user authorization, games section.',
    git: 'https://github.com/elian-cheng',
  },
  {
    id: 3,
    src: `${Eugene}`,
    title: 'Eugene Burkovskiy',
    description: 'Implemented a code editor, practice section, Codewars tasks.',
    git: 'https://github.com/eugeneburkovskiy',
  },
];
