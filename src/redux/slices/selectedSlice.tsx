import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Person, SelectedState } from '../../interfaces/interfaces';

const initialState: SelectedState = {
  selectedPeople: [],
};

export const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    addSelectedPerson: (state, action: PayloadAction<Person>) => {
      const person = action.payload;
      state.selectedPeople.push(person);
    },
    removeSelectedPerson: (state, action: PayloadAction<Person>) => {
      const person = action.payload;
      state.selectedPeople = state.selectedPeople.filter((item) => {
        const itemId = item.url.split('/').filter(Boolean).slice(-1).join('');
        const personId = person.url
          .split('/')
          .filter(Boolean)
          .slice(-1)
          .join('');
        return itemId !== personId;
      });
    },
    clearAllSelectedPeople: (state) => {
      state.selectedPeople = [];
    },
  },
});

export const {
  addSelectedPerson,
  removeSelectedPerson,
  clearAllSelectedPeople,
} = selectedSlice.actions;
