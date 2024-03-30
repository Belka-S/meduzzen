import { CSSProperties } from 'react';
import classNames from 'classnames';
import {
  FieldValues,
  GlobalError,
  Path,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { normalizeText } from 'utils/helpers';

import s from './index.module.scss';

type TInputProps<T extends FieldValues> = {
  className?: string;
  style?: CSSProperties;

  inputField: Path<T>;
  label?: string;
  watch?: UseFormWatch<T>;
  errors: Record<string, GlobalError>;
  register: UseFormRegister<T>;
  placeholder?: string;
  size?: 's' | 'm' | 'l';
};

const InputRhf = <T extends FieldValues>(props: TInputProps<T>) => {
  const { inputField, label, errors, register, style } = props;
  const { placeholder = '', size = 'm', className } = props;

  return (
    <label className={className} style={style}>
      <span className={classNames(s.label, s[size])}>
        {label ? label : normalizeText(inputField)}
      </span>
      &nbsp;
      <span className={classNames(s.error, s[size])}>
        {errors[inputField]?.message}
      </span>
      <input
        className={classNames(
          s.input,
          s[size],
          errors[inputField] ? s.invalid : s.valid,
        )}
        type={inputField.includes('password') ? 'password' : inputField}
        placeholder={placeholder}
        readOnly
        onFocus={e => e.target.removeAttribute('readonly')}
        {...register(inputField, { required: true })}
      />
    </label>
  );
};

export default InputRhf;
