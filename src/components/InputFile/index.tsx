import { ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import SvgIcon from 'components/ui/SvgIcon';
import { Controller, FieldValues, GlobalError, Path } from 'react-hook-form';
import { Control, UseFormRegister } from 'react-hook-form';

import s from './index.module.scss';

type TInputProps<T extends FieldValues> = {
  className?: string;

  inputName: Path<T>;
  register: UseFormRegister<T>;
  control: Control<FieldValues>;
  callback: (e: Event | ChangeEvent) => void;
  accept?: string;
  errors?: Record<string, GlobalError>;
  // avatar
  btnId?: string;
  fileError: 'noError' | string;
  errorMessage?: string;
};

const InputFile = <T extends FieldValues>(props: TInputProps<T>) => {
  const { inputName, className, control, register, errors } = props;
  const { btnId, callback, accept, fileError, errorMessage } = props;
  const [activeIcon, setActiveIcon] = useState(false);

  return (
    <label className={classNames(className, s.label)}>
      <span className={s.error}>
        {errorMessage && errorMessage}
        {errors && errors[inputName]?.message}
      </span>

      <Controller
        control={control}
        name={inputName}
        render={({ field: { onChange } }) => (
          <input
            id={btnId ? `${btnId}` : ''}
            className={classNames(
              s.input,
              fileError && s.border__error,
              fileError === 'noError' && s.border__success,
            )}
            type="file"
            accept={accept}
            {...register(inputName, { required: true })}
            onChange={e => {
              callback(e);
              if (e.target.files) {
                return onChange(e.target.files[0]);
              }
            }}
            onMouseOver={() => setActiveIcon(true)}
            onMouseOut={e => {
              setActiveIcon(false);
              e.currentTarget.blur();
            }}
          />
        )}
      />

      {fileError && fileError !== 'noError' && (
        <SvgIcon
          className={classNames(s.validation, s.exclamation)}
          svgId="menu-exclamation"
          size={24}
        />
      )}
      {fileError === 'noError' && (
        <SvgIcon
          className={classNames(s.validation, s.check)}
          svgId="menu-check"
          size={24}
        />
      )}
      {activeIcon && (
        <SvgIcon
          className={classNames(s.validation, s.plus)}
          svgId="menu-plus"
          size={24}
        />
      )}
    </label>
  );
};

export default InputFile;
