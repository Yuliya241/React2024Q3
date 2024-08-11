import { describe, test, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { store } from '../redux/store/store';
import ResultsList from '../components/Results-list/Results-list';
import { createMockRouter, searchResults } from './mocks';
import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { Provider } from 'react-redux';

describe('tests for the ResultsList component', (): void => {
  test('the component renders the specified number of cards', async () => {
    const stor = store();

    render(
      <Provider store={stor}>
        <RouterContext.Provider
          value={createMockRouter({ query: { search: 'dddd' } })}
        >
          <ResultsList results={searchResults.results} isLoading={false} />;
        </RouterContext.Provider>
      </Provider>
    );

    const peopleList = screen.getAllByTestId('person-card');
    waitFor(() =>
      expect(peopleList).toHaveLength(searchResults.results.length)
    );
  });

  it('check if the card is selected or not', async () => {
    const user = userEvent.setup();
    const stor = store();

    render(
      <Provider store={stor}>
        <RouterContext.Provider
          value={createMockRouter({ query: { search: 'dddd' } })}
        >
          <ResultsList results={searchResults.results} isLoading={false} />;
        </RouterContext.Provider>
      </Provider>
    );

    const checkbox = screen.getAllByRole('checkbox')[0];

    await user.click(checkbox);
    waitFor(() => expect(checkbox).toBeChecked());

    await user.click(checkbox);
    waitFor(() => expect(checkbox).not.toBeChecked());
  });
});
