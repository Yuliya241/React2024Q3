import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { createMockRouter, data } from './mocks';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import Detailed from '../components/Detailed/Detailed';
import Spinner from '../components/Spinner/Spinner';

vi.mock('next/router', async () => await vi.importActual('next-router-mock'));

afterEach(() => {
  mockRouter.push('/details=62');
});

describe('tests for the Spinner component', () => {
  it('displays loading indicator while fetching data', async () => {
    render(
      <RouterContext.Provider
        value={createMockRouter({ query: { details: '62' } })}
      >
        <Detailed personResponse={data} isLoading={false} />;
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
