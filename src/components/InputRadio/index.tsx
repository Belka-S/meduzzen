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
  label?: string;
  watch?: UseFormWatch<T>;
  register: UseFormRegister<T>;
  size?: 's' | 'm' | 'l';
  checked?: boolean;
};

const InputRadio = <T extends FieldValues>(props: TInputProps<T>) => {
  const { className, style } = props;
  const { inputName, label, register, size = 'm', checked } = props;

  return (
    <label className={classNames(s.wrap, className)} style={style}>
      <span className={classNames(s.label, s[size])}>
        {label ? label : normalizeText(inputName)}
      </span>

      <input
        className={classNames(s.input, s[size])}
        type="radio"
        checked={checked}
        {...register(inputName, { required: true })}
      />
    </label>
  );
};

export default InputRadio;
