import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PersonState } from '../../interfaces/interfaces';
import { LocalStorageKeys } from '../../enums/enums';

const initialState: PersonState = {
  people: [],
  search: localStorage.getItem(LocalStorageKeys.SEARCH)
    ? localStorage.getItem(LocalStorageKeys.SEARCH)
    : '',
  page: 1,
  limit: 10,
  total: 0,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      localStorage.setItem(LocalStorageKeys.SEARCH, action.payload);
      state.search = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setTotal(state, action) {
      state.total = Math.ceil(action.payload / state.limit);
    },
    onClickNextPage(state) {
      state.page += 1;
    },
    onClickPrevPage(state) {
      state.page -= 1;
    },
  },
});

export const {
  setSearch,
  setPage,
  setLimit,
  setTotal,
  onClickNextPage,
  onClickPrevPage,
} = mainSlice.actions;
