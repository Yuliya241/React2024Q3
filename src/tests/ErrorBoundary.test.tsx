import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

describe('tests for the ErrorBoundary component', () => {
  it('displays the message when an error is thrown', () => {
    const spy = vi.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    const Throw = () => {
      throw new Error('bad');
    };

    const { getByText } = render(
      <ErrorBoundary>
        <Throw />
      </ErrorBoundary>
    );

    expect(
      getByText('Sorry.. Something went wrong...Try reloading the page.')
    ).toBeDefined();

    spy.mockRestore();
  });
});
