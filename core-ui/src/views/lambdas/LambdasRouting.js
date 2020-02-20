import React from 'react';
import { Route } from 'react-router-dom';

import LambdasList from 'views/lambdas/list/LambdasList';
import LambdaDetails from 'views/lambdas/details/LambdaDetails';

export default function LambdasRouting() {
  return (
    <>
      <Route path="/lambdas" exact component={LambdasList} />
      <Route path="/lambda/:name" component={RoutedLambdaDetails} />
    </>
  );
}

function RoutedLambdaDetails({ match }) {
  return <LambdaDetails lambdaName={match.params.name} />;
}
