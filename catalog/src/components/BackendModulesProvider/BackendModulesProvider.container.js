import { graphql, compose } from 'react-apollo';
import { BackendModulesProvider } from '@kyma-project/react-components';

import { BACKEND_MODULES_QUERY } from './queries';

export default compose(
  graphql(BACKEND_MODULES_QUERY, {
    name: 'backendModules',
    options: () => ({
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    }),
  }),
)(BackendModulesProvider);
