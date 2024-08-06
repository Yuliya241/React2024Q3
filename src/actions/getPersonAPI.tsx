'use server';

import { Api } from '../enums/enums';
import { Person } from '../interfaces/interfaces';

export const getPersonByID = async (id: number) => {
  if (!id) {
    return;
  }

  const results = await fetch(
    `${Api.url}${id}
      `,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const person: Person = await results.json();

  return person;
};
