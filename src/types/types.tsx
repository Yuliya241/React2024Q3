import { ReactNode } from 'react';
import { PersonResponse } from '../interfaces/interfaces';

export type SearchResultsProps = {
  data: PersonResponse;
};

export type Props = {
  children?: ReactNode;
};

export type State = {
  hasError: boolean;
};

export type ThemeProps = {
  children: ReactNode;
};

export type PaginationProps = {
  currentPage: number;
  count: number;
};
