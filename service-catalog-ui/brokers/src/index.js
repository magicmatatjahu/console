import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BrokersViewContent from './components/App/BrokersViewContent.component';

function Preload() {
  return <div />;
}

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/preload" component={Preload} />
      <Route component={BrokersViewContent} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
);
