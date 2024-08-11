import { Suspense } from 'react';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import Loading from '../../app/loading';

export default async function ResultsLoading({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    page?: string;
  };
}) {
  return (
    <Suspense key={JSON.stringify(searchParams)} fallback={<Loading />}>
      <ResultsContainer searchParams={searchParams} />
    </Suspense>
  );
}
