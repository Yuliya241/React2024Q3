import { waitFor, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Flyout from '../components/Flyout/Flyout';
import { store } from '../redux/store/store';

describe('tests for the Flyout component', () => {
  it('displays the Flyout component', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Flyout />
        </MemoryRouter>
      </Provider>
    );

    const flyout = screen.queryByTestId('flyout');
    waitFor(() => expect(flyout).not.toBeInTheDocument());
  });
});
