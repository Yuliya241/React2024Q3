import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { render, renderHook, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store/store';
import Detailed from '../pages/Detailed/Detailed';
import { ReactNode } from 'react';
import { useGetPersonByIdQuery } from '../redux/api/StarWarsApi';
import { data } from './mocks';

describe('tests for the Detailed component', () => {
  it('check the detailed card component correctly displays the detailed card data', async () => {
    render(
      <MemoryRouter initialEntries={['/details/62']}>
        <Detailed details={data} />
      </MemoryRouter>
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

  it('renders hook', () => {
    function Wrapper(props: { children: ReactNode }) {
      return <Provider store={store}>{props.children}</Provider>;
    }

    renderHook(() => useGetPersonByIdQuery('62'), {
      wrapper: Wrapper,
    });
  });
});
