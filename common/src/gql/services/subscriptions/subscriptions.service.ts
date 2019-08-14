// import { useContext } from 'react';
// import { useSubscription } from '@apollo/react-hooks';

// import { NotificationsService } from "../../../services";
import { Subscription } from './subscriptions.types';
import { ERRORS } from '../../../constants';

export interface SubscriptionsOptions {
  subscriptions: Subscription[];
  errorMessage?: string;
}

export const useSubscriptions = ({
  subscriptions = [],
  errorMessage = ERRORS.SERVER,
}: SubscriptionsOptions) => {
  // const {
  //   successNotification,
  //   errorNotification,
  // } = useContext(
  //   NotificationsService,
  // );
  // subscriptions.map(subscription => {
  //   const { loading, error, data } = useSubscription(
  //     subscription.subscription,
  //     subscription.options
  //   );
  //   if (loading) {
  //     return;
  //   }
  //   if (error) {
  //     errorNotification({
  //       title: "Error",
  //       content: errorMessage,
  //     });
  //     return;
  //   }
  //   if (!data || !Object.keys(data)) {
  //     return;
  //   }
  //   const event = data[Object.keys(data)[0]];
  //   const type = event.type;
  //   const item = event.item;
  //   switch (type) {
  //     case SubscriptionType.ADD: {
  //       subscription.onAdd && subscription.onAdd({
  //         item,
  //         successNotification,
  //       });
  //       break;
  //     }
  //     case SubscriptionType.UPDATE: {
  //       subscription.onUpdate && subscription.onUpdate({
  //         item,
  //         successNotification,
  //       });
  //       break;
  //     }
  //     case SubscriptionType.DELETE: {
  //       subscription.onDelete && subscription.onDelete({
  //         item,
  //         successNotification,
  //       });
  //       break;
  //     }
  //     default:
  //       break;
  //   }
  // })
};
