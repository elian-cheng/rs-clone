import { useEffect, useState } from 'react';
import { CodeWarsAPI, ITask } from '../api/codeWarsApi';
import { codeWarsTasks } from '../api/tasksId';
import CodeWarsForm from './CodeWarsForm';

export default function CodeWarsChallenges() {
  const [status, setStatus] = useState('8 kyu');
  const [data, setData] = useState(Array<ITask>);
  const [login, setLogin] = useState('');

  const api = new CodeWarsAPI();

  // useEffect(() => {
  //   api.getAllTasks(status).then((res) => setData(res));
  // }, [status]);

  useEffect(() => {
    api.codeWarsLogin = login;
    api
      .getAllTasks(status)
      .then((res) => api.checkTasks(res))
      .then((res) => {
        setData(res);
      });
  }, [login, status]);

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
      <div className="practice__codewars-tasks">
        <ul className="practice__codewars-list">
          {data.map((item, i) => (
            <li className="practice__codewars-list-item" key={i}>
              <a href={item.url + '/typescript'}>{item.done ? item.name + ' ✓' : item.name}</a>
            </li>
          ))}
        </ul>
        <CodeWarsForm setLogin={setLogin} />
      </div>
    </section>
  );
}
