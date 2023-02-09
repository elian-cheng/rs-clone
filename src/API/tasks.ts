import { API_URL } from './URL';

export async function getLessons() {
  const res = await fetch(`${API_URL}/lessons`).then((data) => data.json());
  return res;
}
export async function getQuiz() {
  const res = await fetch(`${API_URL}/quiz`).then((data) => data.json());
  return res;
}
