import { CSSProperties } from 'react';
import classNames from 'classnames';
import { FieldValues, Path, UseFormWatch } from 'react-hook-form';
import { UseFormRegister } from 'react-hook-form';
import { normalizeText } from 'utils/helpers';

import s from './index.module.scss';

type TInputProps<T extends FieldValues> = {
  className?: string;
  style?: CSSProperties;

  inputName: Path<T>;
  type?: 'checkbox' | 'radio';
  value?: string | number;
  label?: string;
  position?: 'left' | 'right';
  watch?: UseFormWatch<T>;
  register: UseFormRegister<T>;
  size?: 's' | 'm' | 'l';
  checked?: boolean;
};

const InputCheck = <T extends FieldValues>(props: TInputProps<T>) => {
  const { className, style, type = 'checkbox', size = 'm', value } = props;
  const { inputName, label, position = 'left', register, checked } = props;

  return (
    <label className={classNames(s.wrap, className)} style={style}>
      {position === 'left' && (
        <span className={classNames(s.label, s[size], s[position])}>
          {label ? label : normalizeText(inputName)}
        </span>
      )}

      <input
        className={classNames(s.input, s[size])}
        type={type}
        checked={checked}
        value={value}
        {...register(inputName, { required: true })}
      />

      {position === 'right' && (
        <span className={classNames(s.label, s[size], s[position])}>
          {label ? label : normalizeText(inputName)}
        </span>
      )}
    </label>
  );
};

export default InputCheck;
