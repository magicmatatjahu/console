// import { useMutation } from '@apollo/react-hooks';
import createUseContext from 'constate';

import { Mutation } from './mutations.types';

export interface MutationsOptions {
  mutations: { [mutation: string]: Mutation };
}

const useMutations = ({ mutations = {} }: MutationsOptions) => {
  // const preparedMutations = Object.fromEntries(
  //   Object.entries(mutations).map(m => {
  //     const [key, mutation] = m;
  //     const result = useMutation(mutation.mutation, mutation.options);
  //     return [key, result];
  //   })
  // );
  // return {
  //   ...preparedMutations,
  // };
};

const { Provider, Context } = createUseContext(useMutations);
export { Provider as MutationsProvider, Context as MutationsService };
