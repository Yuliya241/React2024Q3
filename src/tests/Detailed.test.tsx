import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store/store';
import Detailed from '../pages/Detailed/Detailed';
import userEvent from '@testing-library/user-event';

describe('tests for the Detailed component', () => {
  it('displays loading indicator while fetching data', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/detailed/62']}>
          <Detailed />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const loader = screen.getByTestId('spinner');
      expect(loader).toBeDefined();
    });
  });

  it('the detailed card component correctly displays the detailed card data', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/detailed/62']}>
          <Detailed />
        </MemoryRouter>
      </Provider>
    );

    const button = await screen.findByRole('button');
    expect(button).toHaveTextContent('X');
  });

  it('clicking the close button hides the component', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/detailed/62']}>
          <Detailed />
        </MemoryRouter>
      </Provider>
    );

    const button = await screen.findByRole('button', { name: 'X' });
    await user.click(button);
    expect(button).toBeInTheDocument();
  });
});
