import { API_URL } from './URL';

export async function getLessons() {
  const res = await fetch(`${API_URL}/lessons`).then((data) => data.json());
  return res;
}

export async function getLesson(id: string) {
  const res = await fetch(`${API_URL}/lessons/${id}`).then((data) => data.json());
  return res;
}

export async function getQuiz() {
  const res = await fetch(`${API_URL}/quiz`).then((data) => data.json());
  return res;
}

export async function getMissingType() {
  const res = await fetch(`${API_URL}/missing-type`).then((data) => data.json());
  return res;
}
