import { configureStore } from '@reduxjs/toolkit';
import { starWarsApi } from '../api/StarWarsApi';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { mainSlice } from '../slices/mainSlice';

export const store = configureStore({
  reducer: {
    [starWarsApi.reducerPath]: starWarsApi.reducer,
    main: mainSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
