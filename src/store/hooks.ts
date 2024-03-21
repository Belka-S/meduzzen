import { useDispatch, useSelector, useStore } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import type { TAppStore, TRootState } from 'store';

import { PayloadAction } from '@reduxjs/toolkit';

export const useAppSelector = useSelector.withTypes<TRootState>();
// export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
export const useTAppStore = useStore.withTypes<TAppStore>();
// export const useTAppDispatch = useDispatch.withTypes<TAppDispatch>();
type TDispatch<T> = ThunkDispatch<T, never, PayloadAction>;
export const useTAppDispatch = () => useDispatch<TDispatch<TRootState>>();
