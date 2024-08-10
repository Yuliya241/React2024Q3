import { createRemixStub } from '@remix-run/testing';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, test, vi } from 'vitest';
import App from '../root';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../context/ThemeProvider';
import { store } from '../redux/store/store';
import Home from '../pages/Home/Home';
import { MemoryRouter } from 'react-router-dom';
import { searchResults } from './mocks';

vi.mock('@remix-run/react', () => ({
  Outlet: () => <>Outlet</>,
  useLocation: () => ({
    pathname: '/',
  }),
  useLoaderData: () => ({
    people: searchResults,
  }),
  useNavigate: () => ({
    navigate: vi.fn(),
  }),
  useNavigation: () => ({
    navigate: vi.fn(),
  }),
}));

describe('Home Component', () => {
  test('renders a route', () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <div>Home</div>,
      },
    ]);

    render(<RemixStub />);

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('it renders the App component', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('Outlet')).toBeInTheDocument();
  });

  it('it renders the App component', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <ThemeProvider>
            <Home />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );

    waitFor(() => expect(screen.getByRole('main')).toBeInTheDocument());
  });
});
