import axios from 'axios';
import { createContext } from 'react';

import { Dispatch, SetStateAction } from 'react';

export enum AuthAction {
  AUTH,
  REGISTRATION,
}

export interface IAuthProps {
  error: Errors;
  setAction: Dispatch<SetStateAction<AuthAction>>;
  setError: Dispatch<SetStateAction<Errors>>;
}

export type IsAuthContext = {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
};

export interface ISignIn {
  email: string;
  password: string;
}

export interface IRegistration {
  username: string;
  email: string;
  password: string;
}

// import { IRegistration, IsAuthContext, ISignIn } from '../components/auth/types';
// import {
//   IPostWordProps,
//   IPutWordProps,
//   IAddWordStatProps,
//   IPutStatPromiseProps,
// } from '../components/games/types';
import {
  createStatConfig,
  getTokenConfig,
  getUserWordResponse,
  getWordsResponse,
  postWordConfig,
  putWordConfig,
  SIGN_IN,
  updateStatConfig,
  USERS,
  USER_STAT,
  USER_TOKEN,
  USER_WORDS,
} from './config';
import { sameDay } from './helpers';
import {
  Errors,
  IAddWordStatProps,
  IGotUserWord,
  IPostWordProps,
  IPutStatPromiseProps,
  IPutWordProps,
  IStat,
  IUpdateStatProps,
  Paths,
  Tokens,
  WordDifficulties,
} from './types';
// import { getRandomInteger } from './utils';

export const AuthContext = createContext<IsAuthContext>({
  isAuth: false,
  setIsAuth: () => {},
});

export const singInPromise = async ({ email, password }: ISignIn) =>
  axios.post(SIGN_IN, { email, password });

export const registerPromise = async ({ username, email, password }: IRegistration) =>
  axios.post(USERS, {
    username,
    email,
    password,
  });

export const getNewToken = async () =>
  axios
    .get(USER_TOKEN, getTokenConfig())
    .then(({ data }) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
    })
    .catch(() => {
      localStorage.clear();
      window.location.href = Paths.AUTH;
    });

export const getWordPromise = async (id: string) =>
  axios.get<IGotUserWord>(getUserWordResponse(id), getTokenConfig());

export const postWordPromise = async ({ id, isRight, gameType }: IPostWordProps) =>
  axios.post(getUserWordResponse(id), postWordConfig({ isRight, gameType }), getTokenConfig());

export const putWordPromise = async ({ id, isRight, gameType, data }: IPutWordProps) =>
  axios.put(getUserWordResponse(id), putWordConfig({ data, isRight, gameType }), getTokenConfig());

export const getStatPromise = async () => axios.get<IStat>(USER_STAT, getTokenConfig());

export const createStatPromise = async (props: IAddWordStatProps) =>
  axios.put(USER_STAT, createStatConfig(props), getTokenConfig());

// export const axiosCreateStats = async (props: UserStatistics) =>
//   axios.put(USER_STAT, createStatConfig(props), getTokenConfig());

export const putStatPromise = async (props: IPutStatPromiseProps) =>
  axios.put(USER_STAT, updateStatConfig(props), getTokenConfig());

export const getAllUserWordsPromise = async () =>
  axios.get<IGotUserWord[]>(USER_WORDS, getTokenConfig());

const createWord = async (props: IPostWordProps) =>
  postWordPromise(props).catch(async ({ response }) => {
    if (response.status === Errors.ERROR_401) {
      await getNewToken();
      postWordPromise(props);
    }
  });

const updateWord = async (props: IPutWordProps) =>
  putWordPromise(props).catch(async ({ response }) => {
    if (response.status === Errors.ERROR_401) {
      await getNewToken();
      putWordPromise(props);
    }
  });

export const addWord = async (props: IPostWordProps) =>
  getWordPromise(props.id)
    .then(({ data }) => updateWord({ data, ...props }))
    .catch(async ({ response }) => {
      if (response.status === Errors.ERROR_401) {
        await getNewToken();
        getWordPromise(props.id)
          .then(({ data }) => updateWord({ data, ...props }))
          .catch((error) => {
            if (error.response.status === Errors.ERROR_404) createWord(props);
          });
      }
      if (response.status === Errors.ERROR_404) createWord(props);
    });

const createStat = async (props: IAddWordStatProps) =>
  createStatPromise(props).catch(async ({ response }) => {
    if (response.status === Errors.ERROR_401) {
      await getNewToken();
      createStatPromise(props);
    }
  });

export const setLearnedWordsLength = ({
  learnedWords,
  data,
}: {
  learnedWords: { all: number; today: number };
  data: IGotUserWord[];
}) => {
  data.forEach((w) => {
    if (w.difficulty === WordDifficulties.STUDIED) {
      learnedWords.all += 1;
      if (sameDay(w.optional.lastTime)) learnedWords.today += 1;
    }
  });
};

export const updateStat = async (props: IUpdateStatProps) => {
  const learnedWords = { all: 0, today: 0 };
  await getAllUserWordsPromise()
    .then(({ data }) => setLearnedWordsLength({ learnedWords, data }))
    .catch(async ({ response }) => {
      if (response.status === Errors.ERROR_401) {
        await getNewToken();
        getAllUserWordsPromise().then(({ data }) => setLearnedWordsLength({ learnedWords, data }));
      }
    });
  const data = { ...props, learnedWords };
  putStatPromise(data).catch(async ({ response }) => {
    if (response.status === Errors.ERROR_401) {
      await getNewToken();
      putStatPromise(data);
    }
  });
};

export const addWordStat = async (props: IAddWordStatProps) => {
  getStatPromise()
    .then(({ data }) => updateStat({ data, ...props }))
    .catch(async ({ response }) => {
      if (response.status === Errors.ERROR_401) {
        await getNewToken();
        getStatPromise()
          .then(({ data }) => updateStat({ data, ...props }))
          .catch((error) => {
            if (error.response.status === Errors.ERROR_404) createStat(props);
          });
      }
      if (response.status === Errors.ERROR_404) createStat(props);
    });
};
