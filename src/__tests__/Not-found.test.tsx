import { describe, expect, it, vi } from 'vitest';
import { createMockRouter } from './mocks';
import { render, screen, waitFor } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import NotFound from '../app/not-found';

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

describe('tests for the NotFound page', () => {
  it('displays message if necessary page is not found', () => {
    render(
      <RouterContext.Provider
        value={createMockRouter({ query: { details: '162' } })}
      >
        <NotFound />;
      </RouterContext.Provider>
    );

    waitFor(() => {
      expect(
        screen.getByText('Sorry, the page is Not Found')
      ).toBeInTheDocument();
      expect(screen.getByText('404')).toBeInTheDocument();
    });
  });
});
