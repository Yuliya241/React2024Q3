import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Person, PersonResponse } from '../../interfaces/interfaces';

export const starWarsApi = createApi({
  reducerPath: 'starWars',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getAllPeople: builder.query<
      PersonResponse,
      { search: string; page: number }
    >({
      query: ({ search, page }) => `people/?search=${search}&page=${page}`,
    }),

    getPersonById: builder.query<Person, string>({
      query: (id) => `people/${id}`,
    }),
  }),
});

export const { useGetAllPeopleQuery, useGetPersonByIdQuery } = starWarsApi;
