import { describe, test, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../redux/store/store';
import ResultsList from '../components/Results-list/Results-list';
import { searchResults } from './mocks';
import userEvent from '@testing-library/user-event';

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

  it('check if the card is selected or not', async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ResultsList results={searchResults.results} />
        </MemoryRouter>
      </Provider>
    );

    const checkbox = screen.getAllByRole('checkbox')[0];

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
