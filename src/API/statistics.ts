import { BASE_URL } from './URL';
import { getToken } from './authorization';
import { UserStatistics } from '../pages/StatisticsPage/StatisticsPage';

export async function setUserStatistics(id: string, statistics: Omit<UserStatistics, 'userId'>) {
  const response = await fetch(`${BASE_URL}users/${id}/statistics`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(`${statistics}`),
  });

  if (response.status === 401) {
    throw new Error('Access token is missing or invalid!');
  } else if (response.status !== 200) {
    throw new Error(`${response.status}`);
  }
}

export async function getUserStatistics(id: string) {
  const response = await fetch(`${BASE_URL}users/${id}/statistics`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Accept: 'application/json',
    },
  });

  if (response.status === 401) {
    throw new Error('Access token is missing or invalid!');
  } else if (response.status === 404) {
    throw new Error('Statistics not found!');
  } else if (response.status !== 200) {
    throw new Error(`${response.status}`);
  }

  const userStatistics = await response.json();
  return userStatistics;
}
