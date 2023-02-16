import React, { useCallback, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  checkUserAuthorization,
  getUserId,
  ILoginUser,
  userLoginAPI,
} from '../../API/authorization';
import { getInitialStatistics } from '../../API/statistics';
import storage from '../../utils/storage';
export interface ILogin {
  setWhatPopup: React.Dispatch<React.SetStateAction<string>>;
}

const Login: React.FC<ILogin> = ({ setWhatPopup }) => {
  const userData = storage.getItem('userData') || null;
  const [user, setUser] = useState(userData);
  const [loginIsCorrect, setLoginIsCorrect] = useState(true);
  const [signInIsDisabled, setSignInIsDisabled] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    clearErrors,
  } = useForm<ILoginUser>({
    mode: 'onChange',
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
      await getInitialStatistics(getUserId());
      location.reload();
    } else {
      setSignInIsDisabled(false);
      setLoginIsCorrect(false);
    }
  };

  return (
    <div className="popup__form form login">
      <div
        className="form__header"
        onClick={() => {
          setWhatPopup('signUp');
          clearErrors();
        }}
      >
        Login
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('email', {
            required: 'Email is a required field',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Invalid email address',
            },
          })}
          type="email"
          autoComplete="username"
          placeholder="Email"
        />
        <div>{errors.email && <p>{errors.email.message}</p>}</div>
        <input
          {...register('password', {
            required: 'Password is a required field',
            minLength: {
              value: 8,
              message: 'Please type minimum 8 symbols',
            },
          })}
          type={passwordShown ? 'text' : 'password'}
          autoComplete="current-password"
          placeholder="Password"
        />
        <div>{errors.password && <p>{errors.password.message}</p>}</div>
        <div className="checkbox">
          <input
            type="checkbox"
            name="showPassword"
            id="showPassword_black"
            onChange={togglePasswordVisibility}
          />
          <label className="form__checkbox-label_black" htmlFor="showPassword_black">
            Show Password
          </label>
        </div>
        <input type="submit" value="Login" disabled={signInIsDisabled} />
        <div>{!loginIsCorrect && <p>Wrong email or password</p>}</div>
      </form>
    </div>
  );
};

export default Login;
