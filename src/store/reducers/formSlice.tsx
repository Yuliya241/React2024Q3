import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData, FormsState } from '../../interfaces/interfaces';

const initialState: FormsState = {
  forms: [],
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormData>) => {
      const newForm = action.payload;
      state.forms.push(newForm);
    },
  },
});

export const { setFormData } = formSlice.actions;
