import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ThemeButton from '../components/ThemeSwitcher/ThemeButton';
import userEvent from '@testing-library/user-event';

describe('tests for the ThemeButton component', () => {
  it('displays the ThemeButton exists', async () => {
    render(<ThemeButton />);

    const themeButton = screen.queryByTestId('theme-button');
    waitFor(() => expect(themeButton).toBeInTheDocument());
  });

  it('check the ThemeButton changes the text content', async () => {
    render(<ThemeButton />);

    const themeButton = await screen.findByTestId('theme-button');
    await userEvent.click(themeButton);
    waitFor(() => expect(themeButton).toHaveTextContent('🌙'));
  });
});
