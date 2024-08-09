import { Api } from '../enums/enums';
import { initialPage } from '../utils/constants';
import { Person, PersonResponse } from '../interfaces/interfaces';
import { LoaderFunctionArgs } from '@remix-run/node';
import Home from '../pages/Home/Home';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const search = searchParams.get('search') || '';
  const page = searchParams.get('page') || initialPage.toString();
  const id = searchParams.get('details') || '';

  const resultsPeople = await fetch(
    `${Api.url}?search=${search}&page=${page}
    `,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const people: PersonResponse = await resultsPeople.json();

  const resultsPerson = await fetch(
    `${Api.url}${id}
    `,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const person: Person = await resultsPerson.json();

  return { people, person };
};

export default function Index() {
  return <Home />;
}
