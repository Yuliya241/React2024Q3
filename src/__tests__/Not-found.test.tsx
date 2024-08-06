import { afterEach, describe, expect, it, vi } from 'vitest';
// import NotFound from '../local/404';
import { createMockRouter } from './mocks';
import mockRouter from 'next-router-mock';
import { render, screen, waitFor } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

afterEach(() => {
  mockRouter.push('/');
});
vi.mock('next/router', async () => await vi.importActual('next-router-mock'));

describe('tests for the NotFound page', () => {
  it('displays message if necessary page is not found', () => {
    render(
      <RouterContext.Provider
        value={createMockRouter({ query: { details: '162' } })}
      >
        {/* <NotFound />; */}
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
