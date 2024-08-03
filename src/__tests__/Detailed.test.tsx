import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { render, renderHook, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { wrapper } from '../redux/store/store';
import { ReactNode } from 'react';
import { useGetPersonByIdQuery } from '../redux/api/StarWarsApi';
import Detailed from '../pages/[details/[id]]';

describe('tests for the Detailed component', () => {
  it('displays loading indicator while fetching data', async (...rest) => {
    const { store } = wrapper.useWrappedStore(rest);
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

  it('renders hook', (rest) => {
    const { store } = wrapper.useWrappedStore(rest);
    function Wrapper(props: { children: ReactNode }) {
      return <Provider store={store}>{props.children}</Provider>;
    }

    renderHook(() => useGetPersonByIdQuery('62'), {
      wrapper: Wrapper,
    });
  });
});
