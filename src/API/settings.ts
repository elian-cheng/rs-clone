import axios from 'axios';
import { getToken } from './authorization';
import { BASE_URL } from './URL';

export type UserSettingsBody = {
  lessonsPerDay: number;
};

export type UserSettings = {
  id: string;
  lessonsPerDay: number;
};

//user-settings
export const getUserSettings = (id: string) => {
  return axios.get<UserSettings>(`${BASE_URL}/users/${id}/settings`);
};
export const updateUserSettings = (id: string, body: UserSettingsBody) => {
  return axios.put<UserSettings>(`${BASE_URL}/users/${id}/settings`, body);
};
