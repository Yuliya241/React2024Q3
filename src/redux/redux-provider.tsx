'use client';

import { PropsWithChildren } from 'react';

import { Provider } from 'react-redux';
import { store } from './store/store';

export default function ReduxProvider({
  children,
}: PropsWithChildren<unknown>) {
  const stor = store();
  return <Provider store={stor}>{children}</Provider>;
}
