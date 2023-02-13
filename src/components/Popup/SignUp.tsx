import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISignUpUser, userSignUpAPI } from '../../API/authorization';
import { ILogin } from './Login';

const SignUp: React.FC<ILogin> = ({ setWhatPopup }) => {
  const [emailIsCorrect, setEmailIsCorrect] = useState(true);
  const [signUpIsDisabled, setSignUpIsDisabled] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [alert]);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    clearErrors,
  } = useForm<ISignUpUser>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ISignUpUser> = async (data) => {
    setSignUpIsDisabled(true);
    const res = await userSignUpAPI(data).catch();
    if (res) {
      setEmailIsCorrect(true);
      setAlert(true);
      reset();
    } else {
      setEmailIsCorrect(false);
    }
    setSignUpIsDisabled(false);
  };

  return (
    <>
      <div className="popup__form form signup">
        <div
          className="form__header"
          onClick={() => {
            setWhatPopup('login');
            clearErrors();
          }}
        >
          Signup
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <input
            {...register('name', {
              required: 'Name is a required field',
              minLength: {
                value: 3,
                message: 'Please type from 3 to 10 symbols',
              },
              maxLength: {
                value: 10,
                message: 'Please type from 3 to 10 symbols',
              },
            })}
            className=""
            type="text"
            autoComplete="username"
            placeholder="Name"
          />
          <div className="popup__error popup__error_white">
            {errors.name && <p className="">{errors.name.message}</p>}
          </div>
          <input
            {...register('email', {
              required: 'Email is a required field',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Invalid email address',
              },
              maxLength: {
                value: 25,
                message: 'The value is too long',
              },
            })}
            className=""
            type="email"
            autoComplete="username"
            placeholder="Email"
          />
          <div className="popup__error popup__error_white">
            {errors.email && <p className="">{errors.email.message}</p>}
            {!emailIsCorrect && <p className="">This email is already taken</p>}
          </div>
          <input
            {...register('password', {
              required: 'Password is a required field',
              minLength: {
                value: 8,
                message: 'Please type minimum 8 symbols',
              },
            })}
            className=""
            type={passwordShown ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Password"
          />
          <div className="popup__error popup__error_white">
            {errors.password && <p className="">{errors.password.message}</p>}
          </div>
          <div className="checkbox">
            <input
              type="checkbox"
              name="showPassword"
              id="showPassword"
              onChange={togglePasswordVisiblity}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>
          <input type="submit" value="Signup" disabled={signUpIsDisabled} />
        </form>
      </div>
      {alert && (
        <div
          style={{
            position: 'fixed',
            top: '250px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            background: '#4caf50',
            color: '#fff',
            padding: '15px',
            borderRadius: '4px',
          }}
        >
          Your account was successfully created. You can login now.
        </div>
      )}
    </>
  );
};

export default SignUp;
