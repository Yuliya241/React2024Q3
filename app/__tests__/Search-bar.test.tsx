import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../../src/App';
import userEvent from '@testing-library/user-event';
import { LocalStorageKeys } from '../enums/enums';

describe('tests for the Search-bar component', () => {
  test('clicking the Search button saves the entered value to the local storage', async () => {
    const user = userEvent.setup();
    render(<App />);

    const button = await screen.findByRole('button', { name: 'Search' });
    const input = screen.getByPlaceholderText<HTMLInputElement>('Search...');

    await user.type(input, 'Luke');
    await user.click(button);
    expect(localStorage.getItem(LocalStorageKeys.SEARCH)).to.equal('Luke');
  });

  test('check the component retrieves the value from the local storage upon mounting.', async () => {
    const mockSearch = localStorage.getItem(LocalStorageKeys.SEARCH) || '';
    render(<App />);

    const input = screen.getByPlaceholderText<HTMLInputElement>('Search...');
    expect(input.value).toBe(mockSearch);
  });
});
