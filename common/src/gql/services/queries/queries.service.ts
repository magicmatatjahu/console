// import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import createUseContext from "constate";

import { Query } from "./queries.types";

export interface QueriesOptions {
  queries: { [query: string]: Query };
}

const useQueries = ({ queries = {} }: QueriesOptions) => {
  // const processedQueries = Object.fromEntries(
  //   Object.entries(queries).map(q => {
  //     const [key, query] = q;
  //     const result = query.isLazy
  //       ? useLazyQuery(query.query, query.options)
  //       : useQuery(query.query, query.options);
  //     return [key, result]
  //   })
  // );
  // return {
  //   ...processedQueries,
  // };
};

const { Provider, Context } = createUseContext(useQueries);
export { Provider as QueriesProvider, Context as QueriesService };
