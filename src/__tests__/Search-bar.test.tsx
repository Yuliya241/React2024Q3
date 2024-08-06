import { describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocalStorageKeys } from '../enums/enums';
import SearchBar from '../components/Search-bar/Search-bar';
import { createMockRouter } from './mocks';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

const { useRouter } = vi.hoisted(() => {
  const mockedRouterPush = vi.fn();
  return {
    useRouter: () => ({ push: mockedRouterPush }),
    mockedRouterPush,
  };
});

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter,
  };
});

describe('tests for the Search-bar component', () => {
  const mockSearch = 'Lyke';

  test('clicking the Search button saves the entered value to the local storage', async () => {
    render(
      <RouterContext.Provider
        value={createMockRouter({ query: { search: '' } })}
      >
        <SearchBar searchValue={''} />;
      </RouterContext.Provider>
    );
    const user = userEvent.setup();

    const button = await screen.findByRole('button', { name: 'Search' });
    const input = screen.getByPlaceholderText<HTMLInputElement>('Search...');

    await user.type(input, mockSearch);
    await user.click(button);
    waitFor(() =>
      expect(localStorage.getItem(LocalStorageKeys.SEARCH)).to.equal(mockSearch)
    );
  });

  test('check the component retrieves the value from the local storage upon mounting.', async () => {
    render(
      <RouterContext.Provider
        value={createMockRouter({ query: { search: mockSearch } })}
      >
        <SearchBar searchValue={mockSearch} />;
      </RouterContext.Provider>
    );

    const input = screen.getByPlaceholderText<HTMLInputElement>('Search...');
    waitFor(() => expect(input.value).toBe(mockSearch));
  });
});
