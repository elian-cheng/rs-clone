import { BASE_URL } from './URL';
import { getNewToken, getToken, getUserId, IGetUSer } from './authorization';
// import { UserStatistics } from '../pages/StatisticsPage/StatisticsPage';
import React, { Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { sameDay } from '../utils/helpers';
import storage from '../utils/storage';
import { UserStatistics } from '../pages/StatisticsPage/StatisticsPage';

export enum Errors {
  ERROR_401 = 401,
  ERROR_404 = 404,
}

export interface IStat {
  id?: string;
  learnedWords: number;
  optional: {
    words: string; // массив id всех изученных слов
    date: string;
    games: {
      sprint: IGameStat;
      audioCall: IGameStat;
    };
    longStat: string; // если последний элемент в массиве прошлого дня дата - пушишь новый, нет - добавляешь/обновляешь элемент с датой сегодня
  };
}
export interface IStatistics {
  id?: string;
  learnedWords?: number;
  optional?: {
    date: string;
    games?: {
      sprint?: IGameStat;
      audioCall?: IGameStat;
    };
    longStat?: string; // если последний элемент в массиве прошлого дня дата - пушишь новый, нет - добавляешь/обновляешь элемент с датой сегодня
  };
}


export interface ILongStat {
  date: string; // дата долгосрочной статы, т.е. если дата сегоднешняя данные обновлять, нет - добавить с новой датой
  newWords: number; // количество новых слов за этот день
  learnedWords: number;
}

export interface IGameStat {
  newWords: number;
  allWords: number;
  right: number;
  streak: number;
}

export type GameStats = {
  sprint?: {
    totalWords: number;
    correctAnswers: number;
    wrongAnswers: number;
    longestSeries: number;
  };
  audiocall?: {
    totalWords: number;
    correctAnswers: number;
    wrongAnswers: number;
    longestSeries: number;
  };
  savannah?: {
    totalWords: number;
    correctAnswers: number;
    wrongAnswers: number;
    longestSeries: number;
  };
};

export type UserStatisticsBody = {
  learnedWords: number;
  optional?: {
    [key: string]: GameStats;
  };
};

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
      storage.clear();
      // refresh the page for them
      location.reload();
      return Promise.reject({ message: 'Please login again.' });
    }
    return Promise.reject(error);
  }
);

// export async function setUserStatistics(id: string, statistics: Omit<UserStatistics, 'userId'>) {
//   const response = await fetch(`${BASE_URL}users/${id}/statistics`, {
//     method: 'PUT',
//     headers: {
//       Authorization: `Bearer ${getToken()}`,
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(`${statistics}`),
//   });

//   if (response.status === 401) {
//     throw new Error('Access token is missing or invalid!');
//   } else if (response.status !== 200) {
//     throw new Error(`${response.status}`);
//   }
// }

// export async function getUserStatistics(id: string) {
//   const response = await fetch(`${BASE_URL}users/${id}/statistics`, {
//     headers: {
//       Authorization: `Bearer ${getToken()}`,
//       Accept: 'application/json',
//     },
//   });

//   if (response.status === 401) {
//     throw new Error('Access token is missing or invalid!');
//   } else if (response.status === 404) {
//     throw new Error('Statistics not found!');
//   } else if (response.status !== 200) {
//     throw new Error(`${response.status}`);
//   }

//   const userStatistics = await response.json();
//   return userStatistics;
// }

export function getUserStatistics(id: string) {
  return axios.get<IStat>(`${BASE_URL}/users/${id}/statistics`);
}
export function setUserStatistics(id: string, body: UserStatistics) {
  return axios.put<IStat>(`${BASE_URL}/users/${id}/statistics`, body);
}
// export function setUserStatistics(id: string, body: UserStatisticsBody) {
//   return axios.put<IStat>(`${BASE_URL}/users/${id}/statistics`, body);
// }

export const getStats = async (setStats: Dispatch<React.SetStateAction<IStat>>) => {
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
      if (response?.status === Errors.ERROR_401) {
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
