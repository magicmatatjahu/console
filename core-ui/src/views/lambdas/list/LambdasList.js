import React, { useEffect } from 'react';
import LuigiClient from '@kyma-project/luigi-client';

import { Spinner } from 'react-shared';

import { useLambdasQueries } from 'views/lambdas/services/lambdas-queries';

import LambdasHeader from 'views/lambdas/list/LambdasHeader/LambdasHeader';
import LambdasTable from 'views/lambdas/list/LambdasTable/LambdasTable';

export default function LambdasList() {
  const { getLambdas, lambdasResponse } = useLambdasQueries();

  useEffect(() => {
    // Temporary hack for issue https://github.com/apollographql/react-apollo/issues/3365
    setTimeout(() => {
      getLambdas();
    }, 1);
  }, [LuigiClient.getEventData().environmentId]);

  let content = null;
  if (lambdasResponse.error) {
    content = `Error! ${lambdasResponse.error.message}`;
  }
  if (lambdasResponse.loading) {
    content = <Spinner />;
  }
  content =
    lambdasResponse.data &&
    lambdasResponse.data.functions &&
    lambdasResponse.data.functions.length ? (
      <LambdasTable />
    ) : null;

  return (
    <>
      <LambdasHeader
        disableCreate={!!(lambdasResponse.loading || lambdasResponse.error)}
      />
      {content}
    </>
  );
}
