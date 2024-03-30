import { CSSProperties } from 'react';
import classNames from 'classnames';
import {
  FieldValues,
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
  register: UseFormRegister<T>;
  size?: 's' | 'm' | 'l';
  checked?: boolean;
};

const InputCheck = <T extends FieldValues>(props: TInputProps<T>) => {
  const { className, style } = props;
  const { inputField, label, register, size = 'm', checked } = props;

  return (
    <label className={classNames(s.wrap, className)} style={style}>
      <span className={classNames(s.label, s[size])}>
        {label ? label : normalizeText(inputField)}
      </span>

      <input
        className={classNames(s.input, s[size])}
        type="checkbox"
        checked={checked}
        {...register(inputField, { required: true })}
      />
    </label>
  );
};

export default InputCheck;
