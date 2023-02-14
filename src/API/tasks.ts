import { BASE_URL } from './URL';

export async function getLessons() {
  const res = await fetch(`${BASE_URL}lessons`).then((data) => data.json());
  return res;
}

export async function getLesson(id: string) {
  const res = await fetch(`${BASE_URL}lessons/${id}`).then((data) => data.json());
  return res;
}

export async function getQuiz() {
  const res = await fetch(`${BASE_URL}quiz`).then((data) => data.json());
  return res;
}
