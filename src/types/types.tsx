import { ChangeEvent, FormEvent, ReactNode } from 'react';
import { Item } from '../interfaces/interfaces';

export type SearchResultsState = {
  searchValue: string | null;
  searchResults: Item[];
  error: Error | null;
  isLoading: boolean;
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
