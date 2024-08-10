import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/Not-found/Not-found';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../redux/store/store';
import PageNotFound from '../routes/$';

describe('tests for the NotFound page', () => {
  it('displays message if necessary page is not found', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByText('Sorry, the page is Not Found')
    ).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('displays global error page', async () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>
    );

    expect(
      screen.getByText('Sorry, the page is Not Found')
    ).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
