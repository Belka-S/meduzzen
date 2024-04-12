import { PropsWithChildren } from 'react';

export const weightNames = {
  100: 'thin',
  200: 'extraLight',
  300: 'light',
  400: 'regular',
  500: 'medium',
  600: 'semiBold',
  700: 'bold',
  800: 'extraBold',
  900: 'black',
};

export type TElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

export type TFontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export interface ITypographyProps extends PropsWithChildren {
  className?: string;
  el: TElement;
  fontWeight?: TFontWeight;
}

export interface IHeadingProps {
  className?: string;
  TfontWeight?: TFontWeight;
  children: string;
}
