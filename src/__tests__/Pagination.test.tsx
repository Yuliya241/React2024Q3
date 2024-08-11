import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { createMockRouter } from './mocks';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { Provider } from 'react-redux';
import { store } from '../redux/store/store';
import Pagination from '../components/Pagination/Pagination';
import mockRouter from 'next-router-mock';

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

describe('tests for the Pagination component', (): void => {
  test('it should update URL query parameter when page changes', async () => {
    const stor = store();

    render(
      <Provider store={stor}>
        <RouterContext.Provider
          value={createMockRouter({ query: { page: '1' } })}
        >
          <Pagination count={82} currentPage={1} />;
        </RouterContext.Provider>
      </Provider>
    );

    const nextPage = await screen.findByTestId('nextPage');
    waitFor(() => expect(nextPage).toBeInTheDocument());
    await userEvent.click(nextPage);
    waitFor(() => expect(mockRouter.query.page).to.equal(undefined));

    const prevPage = await screen.findByTestId('prevPage');
    waitFor(() => expect(prevPage).toBeInTheDocument());
    await userEvent.click(prevPage);
    waitFor(() => expect(mockRouter.query.page).to.equal(undefined));
  });
});
