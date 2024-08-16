import { createSlice } from '@reduxjs/toolkit';
import { countryList } from '../../data/countries';
import { CountriesState } from '../../interfaces/interfaces';

const initialState: CountriesState = {
  countries: countryList,
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});
