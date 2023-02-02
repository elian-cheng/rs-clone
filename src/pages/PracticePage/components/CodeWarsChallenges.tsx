import { useEffect, useState } from 'react';
import { codeWarsTasks } from '../tasksId';

export default function CodeWarsChallenges() {
  const [status, setStatus] = useState('1 kyu');

  useEffect(() => {
    async function getTask(task: string) {
      const res = await fetch(`https://www.codewars.com/api/v1/code-challenges/${task}`)
        .then((data) => data.json())
        .then((data) => data.url + '/typescript');
      return res;
    }
    type codeWarsTasksType = { [status: string]: string[] };
    const obj: codeWarsTasksType = codeWarsTasks;
    Promise.all(obj[status].map((item: string) => getTask(item))).then(console.log);
  }, [status]);

  return (
    <ul className="practice__codewars-navigation">
      <li
        className={`${'practice__codewars-kyu'} ${status === '1 kyu' && 'active-btn'}`}
        onClick={() => setStatus('1 kyu')}
      >
        1 kyu
      </li>
      <li
        className={`${'practice__codewars-kyu'} ${status === '2 kyu' && 'active-btn'}`}
        onClick={() => setStatus('2 kyu')}
      >
        2 kyu
      </li>
      <li
        className={`${'practice__codewars-kyu'} ${status === '3 kyu' && 'active-btn'}`}
        onClick={() => setStatus('3 kyu')}
      >
        3 kyu
      </li>
      <li
        className={`${'practice__codewars-kyu'} ${status === '4 kyu' && 'active-btn'}`}
        onClick={() => setStatus('4 kyu')}
      >
        4 kyu
      </li>
      <li
        className={`${'practice__codewars-kyu'} ${status === '5 kyu' && 'active-btn'}`}
        onClick={() => setStatus('5 kyu')}
      >
        5 kyu
      </li>
      <li
        className={`${'practice__codewars-kyu'} ${status === '6 kyu' && 'active-btn'}`}
        onClick={() => setStatus('6 kyu')}
      >
        6 kyu
      </li>
      <li
        className={`${'practice__codewars-kyu'} ${status === '7 kyu' && 'active-btn'}`}
        onClick={() => setStatus('7 kyu')}
      >
        7 kyu
      </li>
      <li
        className={`${'practice__codewars-kyu'} ${status === '8 kyu' && 'active-btn'}`}
        onClick={() => setStatus('8 kyu')}
      >
        8 kyu
      </li>
    </ul>
  );
}
