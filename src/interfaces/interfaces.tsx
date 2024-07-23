export interface Person {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

export interface PersonResponse {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: Person[];
}

export interface ContextTheme {
  isDark: string;
  toggleTheme: () => void;
}

export interface PersonState {
  people: Person[];
  selectedPeople: Person[];
  search: string | null;
  page: number;
  limit: number;
  total: number;
}
