import { ChangeEvent, FormEvent, ReactNode } from 'react';
import { PersonResponse } from '../interfaces/interfaces';

export type SearchResultsProps = {
  data: PersonResponse;
};

export type SearchProps = {
  searchTerm: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export type Props = {
  children?: ReactNode;
};

export type State = {
  hasError: boolean;
};

export type PaginationProps = {
  currentPage: number;
  count: number;
  setCurrentPage: (page: number) => void;
};
