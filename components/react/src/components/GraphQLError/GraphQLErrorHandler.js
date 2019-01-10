import React from 'react';
// import {
//   ServerError,
//   AuthorizationError,
//   ResourceNotFound
// } from '../errors';

// const checkFor = (code, errors) => errors && errors.find(e => e.extensions.code === code);

// const checkErrorMessage = ({ networkError, graphQLErrors }) => {
//   if (networkError) {
//     throw new ServerError();
//   }

//   if (checkFor('server_error', graphQLErrors)) {
//     throw new ServerError();
//   }

//   if (checkFor('authorization_error', graphQLErrors)) {
//     throw new AuthorizationError();
//   }

//   if (checkFor('resource_not_found', graphQLErrors)) {
//     throw new ResourceNotFound();
//   }
// };

const GraphQLErrorHandler = ({ error, children }) => {
//   if (error) checkError(error);
  return children;
};

export default GraphQLErrorHandler;