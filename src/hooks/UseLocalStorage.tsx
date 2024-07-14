import { useState, useEffect } from 'react';
import { LocalStorageKey } from '../enums/enums';

export default function useLocalStorage(key: string) {
  const localStorageKey = localStorage.getItem(LocalStorageKey.KEY);

  const [term, setTerm] = useState<string>(() =>
    localStorageKey ? localStorageKey : ''
  );

  useEffect(() => {
    localStorage.setItem(key, term);
  }, [term, key]);

  const setItem = (val: string) => {
    setTerm(val);
    localStorage.setItem(key, val);
  };
  return [term, setItem];
}
