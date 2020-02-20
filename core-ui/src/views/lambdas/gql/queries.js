import gql from 'graphql-tag';

export const GET_LAMBDAS = gql`
  query functions($namespace: String!) {
    functions(namespace: $namespace) {
      name
      namespace
      labels
      runtime
      size
      status
    }
  }
`;

export const GET_LAMBDA = gql`
  query function($name: String!, $namespace: String!) {
    function(name: $name, namespace: $namespace) {
      name
      namespace
      labels
      runtime
      size
      status
      content
      dependencies
    }
  }
`;

export const GET_SERVICE_INSTANCES = gql`
  query ServiceInstances($namespace: String!) {
    serviceInstances(namespace: $namespace) {
      name
      labels
      bindable
      status {
        type
        message
      }
      servicePlan {
        bindingCreateParameterSchema
      }
      serviceBindings {
        items {
          name
          parameters
          secret {
            name
            data
          }
          status {
            type
            reason
            message
          }
        }
      }
      serviceBindingUsages {
        name
        serviceBinding {
          name
        }
        status {
          type
          reason
          message
        }
        usedBy {
          name
          kind
        }
      }
    }
  }
`;

// TODO: We have a bug with
// parameters {
//   envPrefix {
//     name
//   }
// }
