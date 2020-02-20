import React, { useEffect } from 'react';

import { Spinner } from 'react-shared';

import { useLambdasQueries } from 'views/lambdas/services/lambdas-queries';

import { LambdaDetailsProvider } from 'views/lambdas/services/lambda-details';

import LambdaHeader from 'views/lambdas/details/LambdaHeader/LambdaHeader';
import LambdaTabs from 'views/lambdas/details/LambdaTabs/LambdaTabs';

export default function LambdaDetails({ lambdaName }) {
  const { getLambda, lambdaResponse } = useLambdasQueries();

  useEffect(() => {
    // Temporary hack for issue https://github.com/apollographql/react-apollo/issues/3365
    setTimeout(() => {
      getLambda(lambdaName);
    }, 1);
  }, []);

  let content = null;
  if (lambdaResponse.error) {
    content = `Error! ${lambdaResponse.error.message}`;
  }
  if (lambdaResponse.loading) {
    content = <Spinner />;
  }

  return (
    <LambdaDetailsProvider>
      <LambdaHeader lambdaName={lambdaName} />
      {content || <LambdaTabs />}
    </LambdaDetailsProvider>
  );
}
