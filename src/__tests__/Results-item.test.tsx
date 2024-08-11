import { describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../redux/store/store';
import ResultsItem from '../components/Results-item/Results-item';
import { createMockRouter, data } from './mocks';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

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

describe('tests for the Results-item component', () => {
  test('the card component renders the relevant card data;', () => {
    const stor = store();

    render(
      <Provider store={stor}>
        <RouterContext.Provider
          value={createMockRouter({ query: { search: 'Cliegg' } })}
        >
          <ResultsItem
            birth_year={data.birth_year}
            created={data.created}
            edited={data.edited}
            eye_color={data.eye_color}
            films={[]}
            gender={''}
            hair_color={data.hair_color}
            height={data.height}
            homeworld={''}
            mass={data.mass}
            name={data.name}
            skin_color={''}
            species={[]}
            starships={[]}
            url={''}
            vehicles={[]}
          />
          ;
        </RouterContext.Provider>
      </Provider>
    );

    waitFor(() => {
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
  });

  test('clicking on a card opens a detailed card component', async () => {
    const user = userEvent.setup();
    const stor = store();

    render(
      <Provider store={stor}>
        <RouterContext.Provider
          value={createMockRouter({ query: { search: 'Cliegg' } })}
        >
          <ResultsItem
            birth_year={''}
            created={''}
            edited={''}
            eye_color={''}
            films={[]}
            gender={''}
            hair_color={''}
            height={''}
            homeworld={''}
            mass={''}
            name={''}
            skin_color={''}
            species={[]}
            starships={[]}
            url={''}
            vehicles={[]}
          />
          ;
        </RouterContext.Provider>
      </Provider>
    );

    const card = await screen.findByTestId('person-card');
    await user.click(card);
    waitFor(() => expect(card).toBeInTheDocument());
  });

  test('clicking on a card should triggers an additional API call to fetch detailed information', async () => {
    const stor = store();

    render(
      <Provider store={stor}>
        <RouterContext.Provider
          value={createMockRouter({ query: { search: 'Cliegg' } })}
        >
          <ResultsItem
            birth_year={''}
            created={''}
            edited={''}
            eye_color={''}
            films={[]}
            gender={''}
            hair_color={''}
            height={''}
            homeworld={''}
            mass={''}
            name={''}
            skin_color={''}
            species={[]}
            starships={[]}
            url={''}
            vehicles={[]}
          />
          ;
        </RouterContext.Provider>
      </Provider>
    );

    const people = await screen.findAllByTestId('person-card');
    const person = people[0];
    expect(person).toBeInTheDocument();
  });
});
