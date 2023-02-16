import { useEffect, useState } from 'react';
import { CodeWarsAPI, ITask } from '../../../../API/codeWarsApi';
import { codeWarsTasks } from '../../../../utils/codeWarsTasks';
import CodeWarsForm from './CodeWarsForm';
import CodeWarsTaskList from './CodeWarsTaskList';

export default function CodeWarsChallenges() {
  const [status, setStatus] = useState('8 kyu');
  const [data, setData] = useState(Array<ITask>);
  const [login, setLogin] = useState('some_user');
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const api = new CodeWarsAPI();

  useEffect(() => {
    setLoading(false);
    api.renderTasks(login, status).then((res) => {
      setData(res);
      setLoading(true);
    });
  }, [login, status, submit]);

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
        {loading ? (
          <CodeWarsTaskList data={data} />
        ) : (
          <div className="practice__codewars-tasks-loading">Loading...</div>
        )}
        <CodeWarsForm setLogin={setLogin} setSubmit={setSubmit} submit={submit} lvl={status} />
      </div>
    </section>
  );
}
