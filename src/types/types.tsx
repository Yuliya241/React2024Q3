import { ChangeEvent, FormEvent, ReactNode } from 'react';
import { Person } from '../interfaces/interfaces';

export type SearchResultsProps = {
  data: Person[];
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
  currentPage: string;
  setCurrentPage: (page: string) => void;
};
