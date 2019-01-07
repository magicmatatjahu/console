import { graphql, compose } from 'react-apollo';

import { BACKEND_MODULES_QUERY } from './queries';

import BackendModulesProvider from './BackendModulesProvider.component';

export default compose(
  graphql(BACKEND_MODULES_QUERY, {
    name: 'backendModules',
    options: () => ({
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    }),
  }),
)(BackendModulesProvider);
