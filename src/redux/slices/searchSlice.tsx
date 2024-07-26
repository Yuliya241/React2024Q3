import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Person, SearchState } from '../../interfaces/interfaces';
import { LocalStorageKeys } from '../../enums/enums';

const initialState: SearchState = {
  people: [],
  search: localStorage.getItem(LocalStorageKeys.SEARCH)
    ? localStorage.getItem(LocalStorageKeys.SEARCH)
    : '',
  page: 1,
  limit: 10,
  total: 0,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    getPeople: (state, action: PayloadAction<Person[]>) => {
      state.people = action.payload;
    },
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
  getPeople,
  setSearch,
  setPage,
  setLimit,
  setTotal,
  onClickNextPage,
  onClickPrevPage,
} = searchSlice.actions;
