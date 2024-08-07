import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { ErrorBoundaryButton } from '../components/ErrorBoundaryButton/ErrorBoundaryButton';

describe('ErrorButton component', () => {
  test('the component is rendered', async () => {
    render(<ErrorBoundaryButton />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Throw Error');
  });
});
