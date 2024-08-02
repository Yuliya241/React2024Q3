import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Person, SearchState } from '../../interfaces/interfaces';
import { LocalStorageKeys } from '../../enums/enums';

const initialState: SearchState = {
  people: [],
  search:
    (typeof window !== 'undefined' &&
      localStorage.getItem(LocalStorageKeys.SEARCH)) ||
    '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    getPeople: (state, action: PayloadAction<Person[]>) => {
      state.people = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(LocalStorageKeys.SEARCH, action.payload);
      }
      state.search = action.payload;
    },
  },
});

export const { getPeople, setSearch } = searchSlice.actions;
