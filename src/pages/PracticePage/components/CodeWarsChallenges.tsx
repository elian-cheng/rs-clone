import { useEffect, useState } from 'react';
import { codeWarsTasks } from '../tasksId';

interface ITask {
  id: string;
  name: string;
  url: string;
  done: boolean;
}
interface IUser {
  data: Array<ICompletedTask>;
}
interface ICompletedTask {
  id: string;
  name: string;
  completedLanguages: Array<string>;
}

type codeWarsTasksType = { [status: string]: string[] };

export default function CodeWarsChallenges() {
  const [status, setStatus] = useState('8 kyu');
  const [data, setData] = useState(Array<ITask>);

  function getTasks() {
    async function getSingleTask(task: string) {
      const res = await fetch(`https://www.codewars.com/api/v1/code-challenges/${task}`)
        .then((res) => res.json())
        .then((res) => res);
      return res;
    }
    async function getUser() {
      const res: IUser = await fetch(
        // elian-cheng
        // rsschool_d64fb9cd409b7f9b
        `https://www.codewars.com/api/v1/users/rsschool_d64fb9cd409b7f9b/code-challenges/completed`
      )
        .then((res) => res.json())
        .then((res) => res);
      return res;
    }
    async function getAllTasks() {
      const obj: codeWarsTasksType = codeWarsTasks;
      const tasksArr: ITask[] = await Promise.all(
        obj[status].map((item: string) => getSingleTask(item))
      ).then((res) => res);
      const userCompletedTasks = await getUser();

      tasksArr.forEach((item) => {
        if (
          userCompletedTasks.data.find(
            (task) => task.completedLanguages.includes('typescript') && task.id === item.id
          )
        ) {
          item.done = true;
        } else {
          item.done = false;
        }
      });
      setData(tasksArr);
    }
    getAllTasks();
  }

  useEffect(() => {
    getTasks();
  }, [status]);

  return (
    <section className="practice__codewars">
      <ul className="practice__codewars-navigation">
        {Object.keys(codeWarsTasks)
          .reverse()
          .map((item, i) => {
            return (
              <li
                key={i}
                className={`${'practice__codewars-kyu'} ${status === item && 'active-btn'}`}
                onClick={() => setStatus(item)}
              >
                {item}
              </li>
            );
          })}
      </ul>
      <ul className="practice__codewars-list">
        {data.map((item, i) => (
          <li className="practice__codewars-list-item" key={i}>
            <a href={item.url + '/typescript'}>{item.done ? item.name + '+' : item.name + '-'}</a>
          </li>
        ))}
      </ul>
      <div className="practice__codewars-check">
        <input
          type="text"
          placeholder="CodeWars login"
          className="practice__codewars-check-input"
        />
        <button className="practice__codewars-check-submit">Submit solutions</button>
      </div>
    </section>
  );
}
