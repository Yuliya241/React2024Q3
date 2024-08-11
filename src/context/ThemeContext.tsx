'use client';

import { createContext } from 'react';
import { ContextTheme } from '../interfaces/interfaces';
import { LocalStorageValues } from '../enums/enums';

const initialState = {
  isDark: LocalStorageValues.LIGHT,
  toggleTheme: () => {},
};

export const ThemeContext = createContext<ContextTheme>(initialState);
