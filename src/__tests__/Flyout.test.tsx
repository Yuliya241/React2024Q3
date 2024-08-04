import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { createMockRouter } from './mocks';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import Flyout from '../components/Flyout/Flyout';
import { store } from '../redux/store/store';
import { Provider } from 'react-redux';

vi.mock('next/router', async () => await vi.importActual('next-router-mock'));

afterEach(() => {
  mockRouter.push('/');
});

describe('tests for the Flyout component', () => {
  it('displays the Flyout component', async () => {
    const stor = store();

    render(
      <Provider store={stor}>
        <RouterContext.Provider
          value={createMockRouter({ query: { page: '2' } })}
        >
          <Flyout />;
        </RouterContext.Provider>
      </Provider>
    );

    const flyout = screen.queryByTestId('flyout');
    waitFor(() => expect(flyout).not.toBeInTheDocument());
  });
});
