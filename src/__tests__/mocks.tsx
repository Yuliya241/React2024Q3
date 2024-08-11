import { NextRouter } from 'next/router';
import { vi } from 'vitest';

export const data = {
  birth_year: '82BBY',
  created: '2014-12-20T15:59:03.958000Z',
  edited: '2014-12-20T21:17:50.451000Z',
  eye_color: 'blue',
  films: ['https://swapi.dev/api/films/5/'],
  gender: 'male',
  hair_color: 'brown',
  height: '183',
  homeworld: 'https://swapi.dev/api/planets/1/',
  mass: 'unknown',
  name: 'Cliegg Lars',
  skin_color: 'fair',
  species: [],
  starships: [],
  url: 'https://swapi.dev/api/people/62/',
  vehicles: [],
};

export const searchResults = {
  count: 82,
  next: 'https://swapi.dev/api/people/?search=&page=8',
  previous: 'https://swapi.dev/api/people/?search=&page=6',
  results: [
    {
      birth_year: '82BBY',
      created: '2014-12-20T15:59:03.958000Z',
      edited: '2014-12-20T21:17:50.451000Z',
      eye_color: 'blue',
      films: ['https://swapi.dev/api/films/5/'],
      gender: 'male',
      hair_color: 'brown',
      height: '183',
      homeworld: 'https://swapi.dev/api/planets/1/',
      mass: 'unknown',
      name: 'Cliegg Lars',
      skin_color: 'fair',
      species: [],
      starships: [],
      url: 'https://swapi.dev/api/people/62/',
      vehicles: [],
    },
  ],
};

export function createMockRouter(router: Partial<NextRouter>): NextRouter {
  return {
    basePath: '',
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
    back: vi.fn(),
    forward: vi.fn(),
    beforePopState: vi.fn(),
    prefetch: vi.fn(),
    push: vi.fn(),
    reload: vi.fn(),
    replace: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: 'en',
    domainLocales: [],
    isPreview: false,
    ...router,
  };
}
