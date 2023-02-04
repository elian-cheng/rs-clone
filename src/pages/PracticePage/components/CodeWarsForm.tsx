import { Dispatch, SetStateAction, useRef } from 'react';

export default function CodeWarsForm(props: { setLogin: Dispatch<SetStateAction<string>> }) {
  const loginInputRef = useRef<HTMLInputElement>(null);
  function submitHandler(event: { preventDefault: () => void }) {
    event.preventDefault();
    props.setLogin(loginInputRef.current?.value as SetStateAction<string>);
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
      />
      <button className="practice__codewars-check-submit">Submit solutions</button>
    </form>
  );
}
