import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import ErrorBoundaryButton from '../components/ErrorBoundaryButton/ErrorBoundaryButton';

describe('ErrorButton component', () => {
  test('the component is rendered', async () => {
    render(
      <ErrorBoundary>
        <ErrorBoundaryButton />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Throw Error');
  });
});
