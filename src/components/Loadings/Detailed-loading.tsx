import { Suspense } from 'react';
import Loading from '../../app/loading';
import Detailed from '../Detailed/Detailed';
import { DetailsProps } from '../../types/types';

export default async function DetailedLoading({ id }: DetailsProps) {
  return (
    <Suspense key="details" fallback={<Loading />}>
      <Detailed id={id} />
    </Suspense>
  );
}
