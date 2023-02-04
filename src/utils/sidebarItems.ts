import { ReactComponent as Main } from "../assets/images/sidebar/main.svg";
import { ReactComponent as Lessons } from "../assets/images/sidebar/lessons.svg";
import { ReactComponent as Practice } from "../assets/images/sidebar/practice.svg";
import { ReactComponent as Statistics } from "../assets/images/sidebar/statistics.svg";
import { ReactComponent as Settings } from "../assets/images/sidebar/setting.svg";
import { ISidebarItem } from '../components/Sidebar/Sidebar';

export const sidebarItems: ISidebarItem[] = [
  {
    id: 1,
    Icon: Main,
    title: 'Main',
    path: '/',
  },
  {
    id: 2,
    Icon: Lessons,
    title: 'Lessons',
    path: '/lessons',
  },
  {
    id: 3,
    Icon: Practice,
    title: 'Practice',
    path: '/practice',
  },
  {
    id: 4,
    Icon: Statistics,
    title: 'Statistics',
    path: '/statistics',
  },
  {
    id: 5,
    Icon: Settings,
    title: 'Settings',
    path: '/settings',
  },
];
