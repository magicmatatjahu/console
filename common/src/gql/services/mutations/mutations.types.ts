import { DocumentNode } from 'graphql';
import { OperationVariables } from '@apollo/react-common';
import { MutationHookOptions } from '@apollo/react-hooks';

export interface Mutation<TData = any, TVariables = OperationVariables> {
  mutation: DocumentNode;
  options?: MutationHookOptions<TData, TVariables>;
}
