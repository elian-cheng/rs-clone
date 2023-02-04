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
    <form className="practice__codewars-check" onSubmit={submitHandler}>
      <label htmlFor="loginCodeWars"></label>
      <input
        type="text"
        placeholder="CodeWars login"
        className="practice__codewars-check-input"
        required
        id="loginCodeWars"
        ref={loginInputRef}
        defaultValue={localStorage.getItem('CodeWarsLogin') as string}
      />
      <button className="practice__codewars-check-submit">Submit solutions</button>
      <div>{props.lvl}</div>
    </form>
  );
}
