import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { createMockRouter } from './mocks';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { store } from '../redux/store/store';
import { Provider } from 'react-redux';
import ThemeButton from '../components/ThemeSwitcher/ThemeButton';
import { ThemeProvider } from '../context/ThemeProvider';
import userEvent from '@testing-library/user-event';

vi.mock('next/router', async () => await vi.importActual('next-router-mock'));

afterEach(() => {
  mockRouter.push('/');
});

describe('tests for the ThemeButton component', () => {
  it('displays the ThemeButton exists', async () => {
    const stor = store();

    render(
      <ThemeProvider>
        <Provider store={stor}>
          <RouterContext.Provider
            value={createMockRouter({ query: { page: '2' } })}
          >
            <ThemeButton />;
          </RouterContext.Provider>
        </Provider>
      </ThemeProvider>
    );

    const themeButton = screen.queryByTestId('theme-button');
    waitFor(() => expect(themeButton).toBeInTheDocument());
  });

  it('check the ThemeButton changes the text content', async () => {
    const stor = store();

    render(
      <ThemeProvider>
        <Provider store={stor}>
          <RouterContext.Provider
            value={createMockRouter({ query: { page: '2' } })}
          >
            <ThemeButton />;
          </RouterContext.Provider>
        </Provider>
      </ThemeProvider>
    );

    const themeButton = await screen.findByTestId('theme-button');
    await userEvent.click(themeButton);
    waitFor(() => expect(themeButton).toHaveTextContent('🌙'));
  });
});
