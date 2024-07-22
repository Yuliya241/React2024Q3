import { RootState } from '../store/store';

export const selectSearch = () => (state: RootState) => state.main.search;

export const selectPage = () => (state: RootState) => state.main.page;

export const selectTotal = () => (state: RootState) => state.main.total;
