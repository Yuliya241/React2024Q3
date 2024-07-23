import { Person } from '../../interfaces/interfaces';
import { RootState } from '../store/store';

export const selectSearch = () => (state: RootState) => state.main.search;

export const selectPage = () => (state: RootState) => state.main.page;

export const selectTotal = () => (state: RootState) => state.main.total;

export const selectSelectedPeople = () => (state: RootState) =>
  state.main.selectedPeople;

export const selectSelectedPeopleCount = () => (state: RootState) =>
  state.main.selectedPeople.length;

export const selectSelectedPerson = (id: string) => (state: RootState) =>
  state.main.selectedPeople.some((item: Person) => {
    const itemId = item.url.split('/').filter(Boolean).slice(-1).join('');
    return itemId === id;
  });
