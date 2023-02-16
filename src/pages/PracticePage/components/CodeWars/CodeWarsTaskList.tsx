import { ITask } from '../../../../API/codeWarsApi';

export default function CodeWarsTaskList({ data }: { data: ITask[] }) {
  return (
    <ul className="practice__codewars-list">
      {data.map((item, i) => (
        <li className="practice__codewars-list-item" key={i}>
          <a href={item.url + '/typescript'} target="_blank" rel="noreferrer">
            {item.done ? item.name + ' ✓' : item.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
