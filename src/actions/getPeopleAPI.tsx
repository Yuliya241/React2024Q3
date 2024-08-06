'use server';

import { Api } from '../enums/enums';
import { PersonResponse } from '../interfaces/interfaces';

export async function getPeople(search: string, page: number) {
  const results = await fetch(
    `${Api.url}?search=${search}&page=${page}
    `,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const people: PersonResponse = await results.json();

  return people;
}
