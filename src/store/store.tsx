import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { countriesSlice } from './reducers/countriesSlice';
import { formSlice } from './reducers/formSlice';

export const store = configureStore({
  reducer: {
    form: formSlice.reducer,
    countries: countriesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
