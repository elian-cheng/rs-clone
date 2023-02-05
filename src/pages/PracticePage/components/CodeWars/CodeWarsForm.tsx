import { Dispatch, SetStateAction, useRef } from 'react';

export default function CodeWarsForm(props: {
  setLogin: Dispatch<SetStateAction<string>>;
  lvl: string;
}) {
  const loginInputRef = useRef<HTMLInputElement>(null);
  function submitHandler(event: { preventDefault: () => void }) {
    const login = loginInputRef.current?.value as SetStateAction<string>;
    event.preventDefault();
    localStorage.setItem('CodeWarsLogin', `${login}`);
    props.setLogin(login);
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
          website and write your username in the field above.
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
        <button className="practice__codewars-check-form-submit">Submit solutions</button>
        <div>{props.lvl}</div>
      </form>
    </section>
  );
}
