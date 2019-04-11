import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo-hooks';

import App from './core/App';
import 'fiori-fundamentals/dist/fiori-fundamentals.min.css';

import appInitializer from "./core/app-initializer";
import { createApolloClient } from './core/apollo-client';
const client = createApolloClient();

(async () => {
  await appInitializer.init();
  ReactDOM.render(
    (
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    ),
    document.getElementById('root'),
  );
})();
