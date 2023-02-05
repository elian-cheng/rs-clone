import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISignUpUser, userSignUpAPI } from '../../API/authorization';
import { ILogin } from './Login';

const SignUp: React.FC<ILogin> = ({ setWhatPopup }) => {
  const [emailIsCorrect, setEmailIsCorrect] = useState(true);
  const [signUpIsDisabled, setSignUpIsDisabled] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ISignUpUser>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<ISignUpUser> = async (data) => {
    setSignUpIsDisabled(true);
    const res = await userSignUpAPI(data).catch();
    if (res) {
      setEmailIsCorrect(true);
      reset();
    } else {
      setEmailIsCorrect(false);
    }
    setSignUpIsDisabled(false);
  };

  return (
    <>
      <p className="">SIGN UP</p>
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
        <div className="">{errors.name && <p className="">{errors.name.message}</p>}</div>
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
        <div className="">
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
          type="password"
          autoComplete="current-password"
          placeholder="Password"
        />
        <div className="">{errors.password && <p className="">{errors.password.message}</p>}</div>
        <button className="" type="submit" disabled={signUpIsDisabled}>
          Sign Up
        </button>
      </form>
      <div className="">
        <button className="" type="button" onClick={() => setWhatPopup('login')}>
          Do you have an account? Sign in
        </button>
      </div>
    </>
  );
};

export default SignUp;
