import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import createFetchMock from 'vitest-fetch-mock';
import { searchResults } from './mocks';
import { MemoryRouter } from 'react-router-dom';
import Pagination from '../components/Pagination/Pagination';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe('tests for the Pagination component', (): void => {
  beforeEach((): void => {
    fetchMock.resetMocks();
  });

  test('it should update URL query parameter when page changes', async () => {
    fetchMock.mockResponse(JSON.stringify(searchResults));

    render(
      <MemoryRouter>
        <Pagination count={82} currentPage={1} />
      </MemoryRouter>
    );

    const nextPage = await screen.findByTestId('nextPage');
    waitFor(() => expect(nextPage).toBeInTheDocument());
    await userEvent.click(nextPage);

    const prevPage = await screen.findByTestId('prevPage');
    waitFor(() => expect(prevPage).toBeInTheDocument());
    await userEvent.click(prevPage);
  });
});
