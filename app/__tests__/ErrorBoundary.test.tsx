import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import ErrorBoundaryButton from '../components/ErrorBoundaryButton/ErrorBoundaryButton';
import { ErrorBoundaryFallback } from '../components/ErrorBoundary/ErrorBoundary';

describe('ErrorButton component', () => {
  test('the component is rendered', async () => {
    render(<ErrorBoundaryButton />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Throw Error');
  });

  test('the component is rendered', async () => {
    render(<ErrorBoundaryFallback />);

    const text = screen.getByText(
      'Sorry.. Something went wrong...Try reloading the page.'
    );
    expect(text).toBeInTheDocument();
  });
});
