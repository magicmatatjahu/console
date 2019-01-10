import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

import { GraphQLErrorBoundary } from '@kyma-project/react-components';
import BackendModulesProvider from './components/BackendModulesProvider/BackendModulesProvider.container';
import App from './components/App/App.container';

import builder from './commons/builder';

import { createApolloClient } from './store';
const client = createApolloClient();

(async () => {
  await builder.init();
  ReactDOM.render(
    <BrowserRouter>
      <ApolloProvider client={client}>
        <BackendModulesProvider>
          {modulesDisabled => {
            console.log(modulesDisabled)
            return (
              <GraphQLErrorBoundary>
                <App modulesDisabled={modulesDisabled} />
              </GraphQLErrorBoundary>
            )
          }}
        </BackendModulesProvider>
      </ApolloProvider>
    </BrowserRouter>,
    document.getElementById('root'),
  );
})();
