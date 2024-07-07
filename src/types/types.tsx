import { ChangeEvent, FormEvent } from 'react';
import { Item } from '../interfaces/interfaces';

export type SearchResultsState = {
  searchValue: string | null;
  searchResults: Item[];
  error: Error | null;
};

export type SearchProps = {
  searchTerm: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};
