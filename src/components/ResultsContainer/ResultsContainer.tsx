import { Api } from '../../enums/enums';
import { PersonResponse } from '../../interfaces/interfaces';
import { initialPage } from '../../utils/constants';
import Pagination from '../Pagination/Pagination';
import ResultsList from '../Results-list/Results-list';

export const getPeople = async (search: string, page: number) => {
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
};

export default async function ResultsContainer({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    page?: string;
  };
}) {
  const people: PersonResponse = await getPeople(
    searchParams?.search || '',
    Number(searchParams?.page) || initialPage
  );

  return (
    <>
      <ResultsList results={people.results || []} />
      <Pagination
        currentPage={Number(searchParams?.page) || initialPage}
        count={people.count || 0}
      />
    </>
  );
}
