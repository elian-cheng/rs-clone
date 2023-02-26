import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISignUpUser, userSignUpAPI } from '../../../API/authorization';
import FormInput from './FormInput';
import { CHECK_EMAIL_SCHEMA, ILogin } from './Login';

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

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    clearErrors,
  } = useForm<ISignUpUser>({
    shouldUseNativeValidation: false,
    mode: 'onBlur',
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
      setAlert(true);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            placeholder="Name"
            name="name"
            type="text"
            autoComplete="username"
            validationRules={{
              required: 'Name is a required field',
              minLength: {
                value: 3,
                message: 'Please type from 3 to 10 symbols',
              },
              maxLength: {
                value: 10,
                message: 'Please type from 3 to 10 symbols',
              },
            }}
            register={register}
            error={errors.name}
          />
          <FormInput
            placeholder="Email"
            name="email"
            type="email"
            autoComplete="username"
            validationRules={{
              required: 'Email is a required field',
              pattern: {
                value: CHECK_EMAIL_SCHEMA,
                message: 'Invalid email address',
              },
              maxLength: {
                value: 25,
                message: 'The value is too long',
              },
            }}
            register={register}
            error={errors.email}
          />
          <FormInput
            placeholder="Password"
            name="password"
            type={passwordShown ? 'text' : 'password'}
            autoComplete="current-password"
            validationRules={{
              required: 'Password is a required field',
              minLength: {
                value: 8,
                message: 'Please type minimum 8 symbols',
              },
            }}
            register={register}
            error={errors.password}
          />
          <div className="checkbox">
            <input
              type="checkbox"
              name="showPassword"
              id="showPassword"
              onChange={togglePasswordVisibility}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>
          <input type="submit" value="Signup" disabled={signUpIsDisabled} />
        </form>
      </div>
      {alert && showAlert(emailIsCorrect)}
    </>
  );
};

export default SignUp;

function PopUpAlert(message: string) {
  return <div className="popup__alert">{message}</div>;
}

function showAlert(emailIsCorrect: boolean) {
  if (!emailIsCorrect) return PopUpAlert('This email is already taken.');
  else return PopUpAlert('Your account was successfully created. You can login now.');
}
