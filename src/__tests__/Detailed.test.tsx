import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { render, renderHook, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store/store';
import Detailed from '../pages/Detailed/Detailed';
import { ReactNode } from 'react';
import { useGetPersonByIdQuery } from '../redux/api/StarWarsApi';

describe('tests for the Detailed component', () => {
  it('displays loading indicator while fetching data', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details/62']}>
          <Detailed />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const loader = screen.getByTestId('spinner');
      expect(loader).toBeDefined();
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

  it('the detailed card component correctly displays the detailed card data', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details/1?page=1']}>
          <Routes>
            <Route path="/details/:id" element={<Detailed />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });

  it('render the close button', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details/1?page=1']}>
          <Routes>
            <Route path="/details/:id" element={<Detailed />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const button = screen.getByRole('button', { name: 'X' });
    expect(button).toBeInTheDocument();
  });
});
