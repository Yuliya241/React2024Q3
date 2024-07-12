import { ChangeEvent, FormEvent, ReactNode } from 'react';
import { Item } from '../interfaces/interfaces';

export type SearchResultsProps = {
  data: Item[];
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
