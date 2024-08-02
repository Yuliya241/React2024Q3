import { configureStore } from '@reduxjs/toolkit';
import { starWarsApi } from '../api/StarWarsApi';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { searchSlice } from '../slices/searchSlice';
import { selectedSlice } from '../slices/selectedSlice';
import { createWrapper } from 'next-redux-wrapper';

export const store = () =>
  configureStore({
    reducer: {
      search: searchSlice.reducer,
      selected: selectedSlice.reducer,
      [starWarsApi.reducerPath]: starWarsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: { warnAfter: 100 },
        serializableCheck: { warnAfter: 100 },
      }).concat(starWarsApi.middleware),
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const wrapper = createWrapper<AppStore>(store, {});
