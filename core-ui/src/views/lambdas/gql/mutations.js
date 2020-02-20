import gql from 'graphql-tag';

export const CREATE_LAMBDA = gql`
  mutation createFunction(
    $name: String!
    $namespace: String!
    $labels: Labels!
    $size: String!
    $runtime: String!
  ) {
    createFunction(
      name: $name
      namespace: $namespace
      labels: $labels
      size: $size
      runtime: $runtime
    ) {
      name
      namespace
      labels
      size
      runtime
    }
  }
`;

export const UPDATE_LAMBDA = gql`
  mutation updateFunction(
    $name: String!
    $namespace: String!
    $params: FunctionUpdateInput!
  ) {
    updateFunction(name: $name, namespace: $namespace, params: $params) {
      name
      namespace
      labels
      size
      runtime
      content
      dependencies
    }
  }
`;

export const DELETE_LAMBDA = gql`
  mutation deleteFunction($name: String!, $namespace: String!) {
    deleteFunction(name: $name, namespace: $namespace) {
      name
    }
  }
`;

export const CREATE_SERVICE_BINDING = gql`
  mutation createServiceBinding(
    $serviceBindingName: String!
    $serviceInstanceName: String!
    $namespace: String!
    $parameters: JSON
  ) {
    createServiceBinding(
      serviceBindingName: $name
      serviceInstanceName: $serviceInstanceName
      namespace: $namespace
      parameters: $parameters
    ) {
      name
    }
  }
`;

export const DELETE_SERVICE_BINDING = gql`
  mutation deleteServiceBinding(
    $serviceBindingName: String!
    $namespace: String!
  ) {
    deleteServiceBinding(serviceBindingName: $name, namespace: $namespace) {
      name
    }
  }
`;

export const CREATE_SERVICE_BINDING_USAGE = gql`
  mutation createServiceBindingUsage(
    $createServiceBindingUsageInput: CreateServiceBindingUsageInput
    $namespace: String!
  ) {
    createServiceBindingUsage(
      createServiceBindingUsageInput: $createServiceBindingUsageInput
      namespace: $namespace
    ) {
      name
    }
  }
`;

export const DELETE_SERVICE_BINDING_USAGE = gql`
  mutation deleteServiceBindingUsage(
    $serviceBindingUsageName: String!
    $namespace: String!
  ) {
    deleteServiceBindingUsage(
      serviceBindingUsageName: $serviceBindingUsageName
      namespace: $namespace
    ) {
      name
    }
  }
`;

export const CREATE_SECRET = gql`
  mutation createServiceBindingUsage(
    $createServiceBindingUsageInput: CreateServiceBindingUsageInput
    $namespace: String!
  ) {
    createServiceBindingUsage(
      createServiceBindingUsageInput: $createServiceBindingUsageInput
      namespace: $namespace
    ) {
      name
    }
  }
`;
