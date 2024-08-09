import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import App from '../../src/App';
import userEvent from '@testing-library/user-event';
import createFetchMock from 'vitest-fetch-mock';
import { searchResults } from './mocks';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe('tests for the Pagination component', (): void => {
  beforeEach((): void => {
    fetchMock.resetMocks();
  });

  test('it should update URL query parameter when page changes', async () => {
    fetchMock.mockResponse(JSON.stringify(searchResults));

    render(<App />);
    expect(location.search).to.equal(`?page=1`);

    const nextPage = await screen.findByTestId('nextPage');
    await userEvent.click(nextPage);
    await waitFor(() => expect(location.search).to.equal('?page=2'));

    const prevPage = await screen.findByTestId('prevPage');
    await userEvent.click(prevPage);
    await waitFor(() => expect(location.search).to.equal('?page=1'));
  });
});
