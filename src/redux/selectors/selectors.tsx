import { Person } from '../../interfaces/interfaces';
import { RootState } from '../store/store';

export const selectSearch = () => (state: RootState) => state.search.search;

export const selectPage = () => (state: RootState) => state.search.page;

export const selectTotal = () => (state: RootState) => state.search.total;

export const selectSelectedPeople = () => (state: RootState) =>
  state.selected.selectedPeople;

export const selectSelectedPeopleCount = () => (state: RootState) =>
  state.selected.selectedPeople.length;

export const selectSelectedPerson = (id: string) => (state: RootState) =>
  state.selected.selectedPeople.some((item: Person) => {
    const itemId = item.url.split('/').filter(Boolean).slice(-1).join('');
    return itemId === id;
  });
