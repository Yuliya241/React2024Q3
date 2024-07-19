import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../pages/Home/Home';
import Detailed from '../pages/Detailed/Detailed';

describe('testing Results-item component', () => {
  test('if click on item a detailed page is opened', async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="details/:id" element={<Detailed />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );

    const link = await screen.findByRole('link');
    await user.click(link);

    const cardInfo = await screen.getByText('Yoda');
    expect(cardInfo).toBeInTheDocument();
  });
});
