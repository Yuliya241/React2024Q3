import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../redux/store/store';
import ResultsList from '../components/Results-list/Results-list';
import { searchResults } from './mocks';

describe('tests for the ResultsList component', (): void => {
  test('check that an appropriate message is displayed if no cards are present', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ResultsList results={[]} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Nothing Found...')).toBeInTheDocument();
  });

  test('the component renders the specified number of cards', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ResultsList results={searchResults.results} />
        </MemoryRouter>
      </Provider>
    );
    const peopleList = screen.getAllByTestId('person-card');
    expect(peopleList).toHaveLength(searchResults.results.length);
  });
});
