import { getToken } from './authorization';
import { BASE_URL } from './URL';

export async function setUserSettings(id: string, optional: Object) {
  const response = await fetch(`${BASE_URL}/users/${id}/settings`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      optional,
    }),
  });

  if (response.status === 401) {
    throw new Error('Access token is missing or invalid!');
  } else if (response.status !== 200) {
    throw new Error(`${response.status}`);
  }
}

export async function getUserSettings(id: string) {
  const response = await fetch(`${BASE_URL}/users/${id}/settings`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 401) {
    throw new Error('Access token is missing or invalid!');
  } else if (response.status === 404) {
    throw new Error('Settings not found!');
  } else if (response.status !== 200) {
    throw new Error(`${response.status}`);
  }

  const userSettings = await response.json();
  return userSettings;
}
