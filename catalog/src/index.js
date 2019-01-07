import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

import BackendModulesProvider from './components/BackendModulesProvider/BackendModulesProvider.container';

import builder from './commons/builder';

import { createApolloClient } from './store';
const client = createApolloClient();

(async () => {
  await builder.init();
  ReactDOM.render(
    <BrowserRouter>
      <ApolloProvider client={client}>
        <BackendModulesProvider />
      </ApolloProvider>
    </BrowserRouter>,
    document.getElementById('root'),
  );
})();
