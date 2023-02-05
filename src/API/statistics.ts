import { BASE_URL } from './URL';
import { getToken } from './authorization';

export async function setUserStatistics(
  id: string,
  learnedLessons: number,
  finishedKatas: number,
  optional: any
) {
  const response = await fetch(`${BASE_URL}users/${id}/statistics`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      learnedLessons,
      finishedKatas,
      optional,
    }),
  });

  if (response.status === 401) {
    throw new Error('Access token is missing or invalid!');
  } else if (response.status !== 200) {
    throw new Error('Some ERROR!');
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
    throw new Error('Some ERROR!');
  }

  const userStatistic = await response.json();

  return userStatistic;
}
