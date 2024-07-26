import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

describe('tests for the Spinner component', () => {
  it('displays loading indicator while fetching data', async () => {
    render(<App />);

    await waitFor(() => {
      const loader = screen.getByTestId('spinner');
      expect(loader).toBeDefined();
    });
  });
});
