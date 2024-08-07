import { describe, expect, it, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Detailed from '../components/Detailed/Detailed';
import mockRouter from 'next-router-mock';
import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter, data } from './mocks';

const { useRouter } = vi.hoisted(() => {
  const mockedRouterPush = vi.fn();
  return {
    useRouter: () => ({ push: mockedRouterPush }),
    mockedRouterPush,
  };
});

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter,
  };
});

describe('tests for the Detailed component', () => {
  it('displays loading indicator while fetching data', async () => {
    const detailed = await (async () => Detailed({ id: '62' }))();

    render(
      <RouterContext.Provider
        value={createMockRouter({ query: { details: '62' } })}
      >
        {detailed};
      </RouterContext.Provider>
    );

    const loader = screen.queryByTestId('spinner');
    waitFor(() => {
      expect(loader).not.toBeInTheDocument();
    });
  });

  test('Make sure the detailed card component correctly displays the detailed card data', async () => {
    const detailed = await (async () => Detailed({ id: '62' }))();

    render(
      <RouterContext.Provider
        value={createMockRouter({ query: { details: '62' } })}
      >
        {detailed};
      </RouterContext.Provider>
    );

    waitFor(() => {
      expect(screen.getByText(data.name)).toBeInTheDocument();
      expect(screen.getByText(`Height: ${data.height}`)).toBeInTheDocument();
      expect(
        screen.getByText(`Birth year: ${data.birth_year}`)
      ).toBeInTheDocument();
      expect(screen.getByText(`Mass: ${data.mass}`)).toBeInTheDocument();
      expect(
        screen.getByText(`Hair color: ${data.hair_color}`)
      ).toBeInTheDocument();
    });
  });

  test('Ensure that clicking the close button hides the component', async () => {
    mockRouter.push = vi.fn();
    const user = userEvent.setup();
    const detailed = await (async () => Detailed({ id: '62' }))();

    render(
      <RouterContext.Provider
        value={createMockRouter({ query: { details: '62' } })}
      >
        {detailed};
      </RouterContext.Provider>
    );

    const button = await screen.findByText('X');
    await user.click(button);
    waitFor(() => expect(button).toBeInTheDocument());
  });
});
