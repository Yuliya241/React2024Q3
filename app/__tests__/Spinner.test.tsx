import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Spinner from '../components/Spinner/Spinner';
import { MemoryRouter } from 'react-router-dom';

describe('tests for the Spinner component', () => {
  it('displays loading indicator while fetching data', async () => {
    render(
      <MemoryRouter>
        <Spinner />
      </MemoryRouter>
    );

    await waitFor(() => {
      const loader = screen.getByTestId('spinner');
      expect(loader).toBeDefined();
    });
  });
});
