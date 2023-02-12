import { API_URL, BASE_URL } from './URL';
import { getNewToken, getToken, getTokenConfig, getUserId, IGetUSer, USER } from './authorization';
import React, { Dispatch } from 'react';
import axios from 'axios';
import storage from '../utils/storage';
import { UserStatistics } from '../pages/StatisticsPage/StatisticsPage';
import { IAnswers } from '../pages/QuizPage/QuizPage';

export const USER_STAT = `${USER}/statistics`;

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
      localStorage.removeItem('userData');
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

export const getStatPromise = async () => axios.get<UserStatistics>(USER_STAT, getTokenConfig());

export interface IAddGameStatProps {
  answers: IAnswers;
  gameType: 'quiz' | 'missingType';
}
export interface IUpdateGameStatProps extends IAddGameStatProps {
  data: UserStatistics;
}

export const updateGameStatConfig = ({ data, answers, gameType }: IUpdateGameStatProps) => {
  delete data.id;
  const { games } = data;
  const { right, wrong, max, strike } = answers;
  const answered = right + wrong;
  const maxStrike = strike > max ? strike : max;
  games![gameType]!.answered += answered;
  games![gameType]!.correct += right;
  if (maxStrike > games![gameType]!.strike) games![gameType]!.strike = maxStrike;
  return data;
};

export const setGameStatPromise = async (props: IUpdateGameStatProps) =>
  axios.put(USER_STAT, updateGameStatConfig(props), getTokenConfig());

const updateStat = async (props: IUpdateGameStatProps) => {
  const data = { ...props };
  setGameStatPromise(data).catch(async ({ response }) => {
    if (response.status === 401) {
      await getNewToken();
      setGameStatPromise(data);
    }
  });
};

export const updateGameStatistics = async (props: IAddGameStatProps) => {
  getStatPromise()
    .then(({ data }) => updateStat({ data, ...props }))
    .catch(async ({ response }) => {
      if (response.status === 401) {
        await getNewToken();
        getStatPromise()
          .then(({ data }) => updateStat({ data, ...props }))
          .catch((error) => {
            console.log(error);
          });
      }
    });
};

export const getStats = async (setStats: Dispatch<React.SetStateAction<UserStatistics>>) => {
  getUserStatistics(getUserId())
    .then(({ data }) => {
      delete data.id;
      setStats((prev) => ({ ...prev, ...data }));
    })
    .catch(async ({ response }) => {
      if (response?.status === 401) {
        await getNewToken();
        getUserStatistics(getUserId()).then(({ data }) => {
          delete data.id;
          setStats((prev) => ({ ...prev, ...data }));
        });
      }
    });
};

const initialStatistics: UserStatistics = {
  lessons: {
    learnedLessons: 0,
  },
  katas: {
    finishedKatas: 0,
  },
  games: {
    quiz: {
      answered: 0,
      correct: 0,
      strike: 0,
    },
    missingType: {
      answered: 0,
      correct: 0,
      strike: 0,
    },
  },
};

export async function getInitialStatistics(id: string) {
  const response = await fetch(`${BASE_URL}users/${id}/statistics`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Accept: 'application/json',
    },
  });

  if (response.status === 404) {
    setUserStatistics(id, initialStatistics);
  }
}
