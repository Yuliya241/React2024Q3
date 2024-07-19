import { useState } from 'react';
import { LocalStorageKey } from '../enums/enums';

export function useLocalStorage(): [string, (searchValue: string) => void] {
  const [value, setValue] = useState(
    localStorage.getItem(LocalStorageKey.KEY) || ''
  );

  const setSearchValue = (searchValue: string) => {
    localStorage.setItem(LocalStorageKey.KEY, searchValue);
    setValue(searchValue);
  };

  return [value, setSearchValue];
}
