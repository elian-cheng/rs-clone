export interface IWord {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export enum Paths {
  HOME = '/',
  SPRINT = 'sprint',
  AUDIO_CALL = 'audiocall',
  TEXTBOOK = 'textbook',
  AUTH = 'authorization',
  STAT = 'statistics',
  NOT_FOUND = '*',
}

export enum Tokens {
  token = 'token',
  refreshToken = 'refreshToken',
}

export enum WordDifficulties {
  DIFFICULT = 'difficult',
  STUDIED = 'studied',
  NEW = 'NEW',
}

export interface IUserWord {
  difficulty: WordDifficulties;
  optional: {
    lastTime: string;
    allTry: number;
    streak: number;
    games: {
      sprint: { right: number; wrong: number };
      audioCall: { right: number; wrong: number };
    };
  };
}

export interface IGotUserWord extends IUserWord {
  id?: string;
  wordId?: string;
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

import { Dispatch, SetStateAction } from 'react';

export enum GameType {
  AUDIO_CALL = 'Аудиовызов',
  SPRINT = 'Спринт',
}

export enum GameStatus {
  SELECT,
  GAME,
  RESULT,
  TEXTBOOK,
  ERROR,
}
export interface IAnswers {
  right: IWord[];
  wrong: IWord[];
  streak: number;
  max: number;
}

export interface IDifficultyProps {
  type: GameType;
  setStatus: Dispatch<SetStateAction<GameStatus>>;
  words: IWord[];
  setWords: Dispatch<SetStateAction<IWord[]>>;
}

export interface IGameRunProps {
  words: IWord[];
  answers: IAnswers;
  setAnswers: Dispatch<SetStateAction<IAnswers>>;
  setStatus: Dispatch<SetStateAction<GameStatus>>;
}

export interface IResultProps extends IGameRunProps {
  answers: IAnswers;
  setAnswers: Dispatch<SetStateAction<IAnswers>>;
  setStatus: Dispatch<SetStateAction<GameStatus>>;
  setWords: Dispatch<SetStateAction<IWord[]>>;
}

export interface IAudioButtonProps {
  audio: HTMLAudioElement;
  src?: string;
}

export enum ResultViews {
  RESULT = 'Результат',
  WORDS = 'Мои слова',
}

export enum WordListType {
  MISTAKE = 'Ошибся',
  SUCCESS = 'Успешно',
}

export interface IWordListProps {
  type: WordListType;
  audio: HTMLAudioElement;
  words: IWord[];
}

export interface IResultViewProps {
  right: number;
  wrong: number;
  nextGame: () => void;
  setActive: Dispatch<SetStateAction<ResultViews>>;
}

export interface IPostWordProps {
  isRight: boolean;
  id: string;
  gameType: GameTypeOption;
}

export enum Errors {
  ERROR_401 = 401,
  ERROR_404 = 404,
}

export interface IPutWordProps extends IPostWordProps {
  data: IGotUserWord;
}

export enum GameTypeOption {
  AUDIO_CALL = 'audioCall',
  SPRINT = 'sprint',
}

export interface IAddWordStatProps {
  answers: IAnswers;
  gameType: GameTypeOption;
}

export interface IUpdateStatProps extends IAddWordStatProps {
  data: IStat;
}

export interface IPutStatPromiseProps extends IUpdateStatProps {
  learnedWords: { all: number; today: number };
}

export interface IGameProps {
  textbookWords?: IWord[];
}

export interface IGameErrorProps {
  setStatus: Dispatch<SetStateAction<GameStatus>>;
  setWords: Dispatch<SetStateAction<IWord[]>>;
}
