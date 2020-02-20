import React from 'react';
import LuigiClient from '@kyma-project/luigi-client';

import { GenericList, Labels } from 'react-shared';

import { useLambdasQueries } from 'views/lambdas/services/lambdas-queries';
import { useLambdasMutations } from 'views/lambdas/services/lambdas-mutations';
import { CONSTANTS } from 'views/lambdas/constants';

import LambdaStatusBadge from 'views/lambdas/components/LambdaStatusBadge/LambdaStatusBadge';

export default function LambdasTable() {
  const {
    lambdasResponse: { data = {} },
  } = useLambdasQueries();
  const { deleteLambda } = useLambdasMutations();

  function goToDetailsPage(lambdaName) {
    LuigiClient.linkManager().navigate(`details/${lambdaName}`);
  }

  const headerRenderer = () => CONSTANTS.LAMBDAS_LIST.TABLE.HEADERS;
  const actions = [
    {
      name: 'Delete',
      handler: lambda => {
        deleteLambda(lambda.name);
      },
    },
  ];
  const rowRenderer = lambda => [
    <span
      className="link"
      data-test-id="lambda-name"
      onClick={() => goToDetailsPage(lambda.name)}
    >
      {lambda.name}
    </span>,
    <span>{lambda.runtime}</span>,
    <Labels labels={lambda.labels} />,
    <LambdaStatusBadge status={lambda.status} />,
  ];

  return (
    <GenericList
      entries={data.functions || []}
      actions={actions}
      headerRenderer={headerRenderer}
      rowRenderer={rowRenderer}
    />
  );
}
