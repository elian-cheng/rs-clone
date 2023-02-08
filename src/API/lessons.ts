import { BASE_URL } from './URL';

interface ILesson {
    id: number,
    title: string,
    description: string[],
    examples: string[],
    theme: string
}

export async function getThemes() {
  const themesArr: string[] = [];
  await fetch(`${BASE_URL}lessons`)
  .then((res) => res.json())
  .then((res) => {
    (res as ILesson[]).forEach((item) => {
        themesArr.push(item.theme)
    })});
  return Array.from(new Set(themesArr));
}
