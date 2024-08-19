import { RootState } from '../store';

export const selectForm = () => (state: RootState) => state.form.forms;

export const selectCountries = () => (state: RootState) =>
  state.countries.countries;
