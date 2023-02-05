import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { checkUserAuthorization, ILoginUser, userLoginAPI } from '../../API/authorization';
import { UserContext } from './UserContext';

export interface ILogin {
  setWhatPopup: React.Dispatch<React.SetStateAction<string>>;
}

const Login: React.FC<ILogin> = ({ setWhatPopup }) => {
  const [loginIsCorrect, setLoginIsCorrect] = useState(true);
  const [signInIsDisabled, setSignInIsDisabled] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ILoginUser>({
    mode: 'onBlur',
  });

  const updateUser = useCallback(() => {
    checkUserAuthorization().then((checkedUser) => {
      if (JSON.stringify(user) !== JSON.stringify(checkedUser)) {
        setUser(checkedUser);
      }
    });
  }, [setUser, user]);

  useEffect(() => {
    setSignInIsDisabled(false);
    updateUser();
  }, [updateUser, user]);

  const onSubmit: SubmitHandler<ILoginUser> = async (data) => {
    setSignInIsDisabled(true);
    const res = await userLoginAPI(data);
    if (typeof res === 'object') {
      setLoginIsCorrect(true);
      reset();
      localStorage.setItem('userData', JSON.stringify(res));
      updateUser();
    } else {
      setSignInIsDisabled(false);
      setLoginIsCorrect(false);
    }
  };

  return (
    <>
      <p className="">SIGN IN</p>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <input
          {...register('email', {
            required: 'Email is a required field',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Invalid email address',
            },
          })}
          className=""
          type="email"
          autoComplete="username"
          placeholder="Email"
        />
        <div className="">{errors.email && <p className="">{errors.email.message}</p>}</div>
        <input
          {...register('password', {
            required: 'Password is a required field',
            minLength: {
              value: 8,
              message: 'Please type minimum 8 symbols',
            },
          })}
          className=""
          type="password"
          autoComplete="current-password"
          placeholder="Password"
        />
        <div className="">{errors.password && <p className="">{errors.password.message}</p>}</div>
        <button className="" type="submit" disabled={signInIsDisabled}>
          Sign In
        </button>
        <div className="">{!loginIsCorrect && <p className="">Wrong email or password</p>}</div>
      </form>
      <div className="">
        <button className="" type="button" onClick={() => setWhatPopup('signUp')}>
          Don't have an account? Sign up
        </button>
      </div>
    </>
  );
};

export default Login;
