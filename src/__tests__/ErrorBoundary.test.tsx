import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import ErrorBoundaryButton from '../components/ErrorBoundaryButton/ErrorBoundaryButton';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import userEvent from '@testing-library/user-event';

describe('ErrorButton component', () => {
  test('the component is rendered', async () => {
    const consoleError = vi.spyOn(console, 'error');
    consoleError.mockImplementation(() => {});
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <ErrorBoundaryButton />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Throw Error');

    await user.click(button);
    expect(
      screen.getByText('Sorry.. Something went wrong...Try reloading the page.')
    ).toBeInTheDocument();
    expect(consoleError).toBeCalled();

    consoleError.mockRestore();
  });
});
