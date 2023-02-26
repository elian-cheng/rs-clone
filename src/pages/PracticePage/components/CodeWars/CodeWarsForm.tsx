import { Dispatch, SetStateAction, useRef } from 'react';
import { getUserStatistics, setUserStatistics } from '../../../../API/statistics';
import { CodeWarsAPI, ICompletedTask } from '../../../../API/codeWarsApi';
import { codeWarsTasks } from '../../../../utils/codeWarsTasks';

export default function CodeWarsForm(props: {
  setLogin: Dispatch<SetStateAction<string>>;
  setSubmit: Dispatch<SetStateAction<boolean>>;
  lvl: string;
  submit: boolean;
}) {
  const loginInputRef = useRef<HTMLInputElement>(null);

  async function updatePracticeStatistic() {
    const userId = JSON.parse(localStorage.getItem('userData') as string).userId;
    const statisticObj = await getUserStatistics(userId);
    const userCompletedTasks = await new CodeWarsAPI().getUserCompletedTasks(
      localStorage.getItem('CodeWarsLogin') as string
    );
    const tasks = Object.values(codeWarsTasks).flat();
    if (statisticObj.data.katas) {
      const matchKatas = tasks.filter((task) =>
        userCompletedTasks.data.find(
          (completedTask: ICompletedTask) =>
            task === completedTask.id && completedTask.completedLanguages.includes('typescript')
        )
      );
      statisticObj.data.katas.katasId = JSON.stringify(matchKatas);
      statisticObj.data.katas ? (statisticObj.data.katas.finishedKatas = matchKatas.length) : null;
      delete statisticObj.data.id;
      setUserStatistics(userId, statisticObj.data);
    }
  }

  function submitHandler(event: { preventDefault: () => void }) {
    const login = loginInputRef.current?.value as SetStateAction<string>;
    event.preventDefault();
    localStorage.setItem('CodeWarsLogin', `${login}`);
    props.setLogin(login);
    updatePracticeStatistic();
  }

  return (
    <section className="practice__codewars-check">
      <div className="practice__codewars-check-insturction">
        <h2 className="practice__codewars-check-insturction-header">Attention</h2>
        <p className="practice__codewars-check-insturction-descr">
          For using this section you need to register on{' '}
          <a
            href="https://www.codewars.com/"
            target="_blank"
            rel="noreferrer"
            className="practice__codewars-check-insturction-link"
          >
            CodeWars
          </a>{' '}
          website and write your username in the field below.
        </p>
      </div>
      <form className="practice__codewars-check-form" onSubmit={submitHandler}>
        <label htmlFor="loginCodeWars"></label>
        <input
          type="text"
          placeholder="CodeWars login"
          className="practice__codewars-check-form-input"
          required
          id="loginCodeWars"
          ref={loginInputRef}
          defaultValue={localStorage.getItem('CodeWarsLogin') as string}
        />
        <button
          className="practice__codewars-check-form-submit"
          onClick={() => props.setSubmit((submit) => !submit)}
        >
          Submit solutions
        </button>
        <div>{props.lvl}</div>
      </form>
    </section>
  );
}
