import { Person } from '../../interfaces/interfaces';
import { RootState } from '../store/store';

export const selectSelectedPeople = () => (state: RootState) =>
  state.selected.selectedPeople;

export const selectSelectedPeopleCount = () => (state: RootState) =>
  state.selected.selectedPeople.length;

export const selectSelectedPerson = (id: string) => (state: RootState) =>
  state.selected.selectedPeople.some((item: Person) => {
    const itemId = item.url.split('/').filter(Boolean).slice(-1).join('');
    return itemId === id;
  });
