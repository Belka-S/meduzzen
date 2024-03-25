import classNames from 'classnames';
import {
  FieldValues,
  GlobalError,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import { normalizeText } from 'utils/helpers';

import s from './index.module.scss';

type TInputProps<T extends FieldValues> = {
  className?: string;
  inputName: Path<T>;
  errors: Record<string, GlobalError>;
  register: UseFormRegister<T>;
  placeholder?: string;
  size?: 's' | 'm' | 'l';
};

const InputRhf = <T extends FieldValues>(props: TInputProps<T>) => {
  const { errors, register, className } = props;
  const { inputName, placeholder = '', size = 'm' } = props;

  return (
    <label className={className}>
      <span className={classNames(s.label, s[size])}>
        {normalizeText(inputName)}
      </span>
      &nbsp;
      <span className={classNames(s.error, s[size])}>
        {errors[inputName]?.message}
      </span>
      <input
        type={inputName.includes('password') ? 'password' : inputName}
        placeholder={placeholder}
        readOnly
        onFocus={e => e.target.removeAttribute('readonly')}
        className={classNames(
          s.input,
          s[size],
          errors[inputName] ? s.invalid : s.valid,
        )}
        {...register(inputName, { required: true })}
      />
    </label>
  );
};

export default InputRhf;
