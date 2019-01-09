import gql from 'graphql-tag';

export const BACKEND_MODULES_QUERY = gql`
  query getBackendModules {
    backendModules {
      name
    }
  }
`;
