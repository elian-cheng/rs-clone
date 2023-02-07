import { API_URL } from './URL';
import { getNewToken, getUserId, IGetUSer } from './authorization';
import React, { Dispatch } from 'react';
import axios from 'axios';
import { sameDay } from '../utils/helpers';
import storage from '../utils/storage';
import { UserStatistics } from '../pages/StatisticsPage/StatisticsPage';

axios.interceptors.request.use((request) => {
  const auth = storage.getItem<IGetUSer>('userData');
  if (auth?.token && request.headers) {
    request.headers['Authorization'] = 'Bearer ' + auth.token;
  }

  return request;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status == 401) {
      localStorage.deleteItem('userData');
      location.reload();
      return Promise.reject({ message: 'Please login again.' });
    }
    return Promise.reject(error);
  }
);

export const getUserStatistics = (id: string) => {
  return axios.get<UserStatistics>(`${API_URL}/users/${id}/statistics`);
};
export const setUserStatistics = (id: string, body: UserStatistics) => {
  return axios.put<UserStatistics>(`${API_URL}/users/${id}/statistics`, body);
};

export const getStats = async (setStats: Dispatch<React.SetStateAction<UserStatistics>>) => {
  getUserStatistics(getUserId())
    .then(({ data }) => {
      delete data.id;
      if (sameDay(data.optional.date)) setStats((prev) => ({ ...prev, ...data }));
      else
        setStats((prev) => {
          prev.optional.longStat = data.optional.longStat;
          return { ...prev };
        });
    })
    .catch(async ({ response }) => {
      if (response?.status === 401) {
        await getNewToken();
        getUserStatistics(getUserId()).then(({ data }) => {
          delete data.id;
          if (sameDay(data.optional.date)) setStats((prev) => ({ ...prev, ...data }));
          else
            setStats((prev) => {
              prev.optional.longStat = data.optional.longStat;
              return { ...prev };
            });
        });
      }
    });
};