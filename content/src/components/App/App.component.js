import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import MainPage from '../MainPage/MainPage.container';

class App extends Component {
  render() {
    return (
      <div>
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/:type/:id" component={MainPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
