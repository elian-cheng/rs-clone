import React from 'react';
import { FieldError } from 'react-hook-form';

interface IFormInput {
  placeholder: string;
  name: string;
  type: string;
  autoComplete: string;
  validationRules: Record<string, unknown>;
  register: Function;
  error: FieldError | undefined;
}

const FormInput: React.FC<IFormInput> = ({
  placeholder,
  name,
  type,
  autoComplete,
  validationRules,
  register,
  error,
}) => (
  <>
    <input
      {...register(name, validationRules)}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
    />
    {error && <p className="popup__error">{error.message}</p>}
  </>
);

export default FormInput;
