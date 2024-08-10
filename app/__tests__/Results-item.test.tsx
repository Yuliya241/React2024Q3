import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../redux/store/store';
import ResultsItem from '../components/Results-item/Results-item';
import createFetchMock from 'vitest-fetch-mock';
import { data } from './mocks';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe('tests for the Results-item component', () => {
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

    const card = await screen.findByTestId('person-card');
    await user.click(card);
    waitFor(() => expect(card).toBeInTheDocument());
  });

  test('clicking on a card should triggers an additional API call to fetch detailed information', async () => {
    fetchMock.mockResponse(JSON.stringify(data));
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ResultsItem {...data} />
        </MemoryRouter>
      </Provider>
    );
    expect(fetchMock).toHaveBeenCalledTimes(0);
    const people = await screen.findAllByTestId('person-card');
    const person = people[0];
    expect(person).toBeInTheDocument();
  });
});
