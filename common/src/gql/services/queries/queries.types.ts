import { DocumentNode } from 'graphql';
import { OperationVariables } from '@apollo/react-common';
import { QueryHookOptions, LazyQueryHookOptions } from '@apollo/react-hooks';

export interface Query<TData = any, TVariables = OperationVariables> {
  query: DocumentNode;
  options?:
    | QueryHookOptions<TData, TVariables>
    | LazyQueryHookOptions<TData, TVariables>;
  isLazy?: boolean;
}
