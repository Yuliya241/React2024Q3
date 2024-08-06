import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { createMockRouter, data } from './mocks';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import Detailed from '../components/Detailed/Detailed';
import Spinner from '../components/Spinner/Spinner';

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

describe('tests for the Spinner component', () => {
  it('displays loading indicator while fetching data in Detailed component', async () => {
    render(
      <RouterContext.Provider
        value={createMockRouter({ query: { details: '62' } })}
      >
        <Detailed personResponse={data} />;
      </RouterContext.Provider>
    );

    const loader = screen.queryByTestId('spinner');
    waitFor(() => expect(loader).not.toBeInTheDocument());
  });

  it('displays loading indicator while fetching data', async () => {
    render(
      <RouterContext.Provider
        value={createMockRouter({ query: { details: '62' } })}
      >
        <Spinner />;
      </RouterContext.Provider>
    );

    const loader = screen.queryByTestId('spinner');
    waitFor(() => expect(loader).toBeInTheDocument());
  });
});
