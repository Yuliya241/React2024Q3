import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import ResultsItem from '../components/Results-item/Results-item';
import { render, screen } from '@testing-library/react';

const ItemProps = {
  birth_year: '82BBY',
  created: '2014-12-20T15:59:03.958000Z',
  edited: '2014-12-20T21:17:50.451000Z',
  eye_color: 'blue',
  films: ['https://swapi.dev/api/films/5/'],
  gender: 'male',
  hair_color: 'brown',
  height: '183',
  homeworld: 'https://swapi.dev/api/planets/1/',
  mass: 'unknown',
  name: 'Cliegg Lars',
  skin_color: 'fair',
  species: [],
  starships: [],
  url: 'https://swapi.dev/api/people/62/',
  vehicles: [],
};

describe('Card component', () => {
  it('should render component with correct data', () => {
    render(
      <MemoryRouter>
        <ResultsItem {...ItemProps} />
      </MemoryRouter>
    );

    expect(screen.getByText(ItemProps.name)).toBeInTheDocument();
    expect(screen.getByText(ItemProps.mass)).toBeInTheDocument();
    expect(screen.getByText(ItemProps.birth_year)).toBeInTheDocument();
    expect(screen.getByText(ItemProps.gender)).toBeInTheDocument();
    expect(screen.getByText(ItemProps.url)).toBeInTheDocument();
  });
});
