import { configureStore } from '@reduxjs/toolkit';
import { starWarsApi } from '../api/StarWarsApi';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { searchSlice } from '../slices/searchSlice';
import { selectedSlice } from '../slices/selectedSlice';

export const store = configureStore({
  reducer: {
    [starWarsApi.reducerPath]: starWarsApi.reducer,
    search: searchSlice.reducer,
    selected: selectedSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 100 },
      serializableCheck: { warnAfter: 100 },
    }).concat(starWarsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
