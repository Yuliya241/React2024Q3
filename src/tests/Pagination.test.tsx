import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import App from '../App';
import userEvent from '@testing-library/user-event';
import createFetchMock from 'vitest-fetch-mock';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe('tests for the Pagination component', (): void => {
  beforeEach((): void => {
    fetchMock.resetMocks();
  });

  test('it should update URL query parameter when page changes', async () => {
    fetchMock.mockResponse(JSON.stringify(searchResults));

    render(<App />);

    const nextPage = await screen.findByRole('button', { name: '7' });
    await userEvent.click(nextPage);
    await waitFor(() => expect(location.search).to.equal('?search=&page=7'));

    const prevPage = await screen.findByTestId('6');
    await userEvent.click(prevPage);
    await waitFor(() => expect(location.search).to.equal('?search=&page=6'));
  });
});

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
