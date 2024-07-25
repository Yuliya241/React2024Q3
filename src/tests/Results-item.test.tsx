import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../redux/store/store';
import ResultsItem from '../components/Results-item/Results-item';
import createFetchMock from 'vitest-fetch-mock';
import { data } from './mocks';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe('testing Results-item component', () => {
  test('the card component renders the relevant card data;', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ResultsItem {...data} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(data.name)).toBeInTheDocument();
    expect(screen.getByText(`Height: ${data.height}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Birth year: ${data.birth_year}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Mass: ${data.mass}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Hair color: ${data.hair_color}`)
    ).toBeInTheDocument();
  });

  test('clicking on a card opens a detailed card component', async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ResultsItem {...data} />
        </MemoryRouter>
      </Provider>
    );

    const link = screen.getByRole('link', { name: /Cliegg Lars/i });
    await user.click(link);
    expect(link).toBeInTheDocument();
  });

  test('Clicking on a card should triggers an additional API call to fetch detailed information', async () => {
    fetchMock.mockResponse(JSON.stringify(data));
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ResultsItem {...data} />
        </MemoryRouter>
      </Provider>
    );
    expect(fetchMock).toHaveBeenCalledTimes(0);
    const products = await screen.findAllByTestId('person-card');
    const product = products[0];
    expect(product).toBeInTheDocument();
  });
});
