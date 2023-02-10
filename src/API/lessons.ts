import { BASE_URL } from './URL';

export interface ILesson {
  id: string,
  title: string,
  description: string[],
  examples: string[],
  question: string,
  options: string[],
  answer: string,
  theme: string
}

export async function getAllLessons():Promise<ILesson[]> {
  const res = await fetch(`${BASE_URL}lessons`)
  .then((res) => res.json());
  return res;
}
