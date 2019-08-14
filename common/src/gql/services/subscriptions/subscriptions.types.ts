import { DocumentNode } from 'graphql';
import { OperationVariables } from '@apollo/react-common';
import { SubscriptionHookOptions } from '@apollo/react-hooks';

import { NotificationArgs } from '../../../services/notifications/notifications.types';

export enum SubscriptionType {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export interface OnSubscriptionArgs<T> {
  item: T;
  successNotification: (args: NotificationArgs) => void;
}

export interface Subscription<TData = any, TVariables = OperationVariables> {
  subscription: DocumentNode;
  options?: SubscriptionHookOptions<
    { [k: string]: { item: TData; type: SubscriptionType } },
    TVariables
  >;
  onAdd?: (args: OnSubscriptionArgs<TData>) => void;
  onUpdate?: (args: OnSubscriptionArgs<TData>) => void;
  onDelete?: (args: OnSubscriptionArgs<TData>) => void;
}
