import React from 'react';
import { ActionBar, Button, Breadcrumb } from 'fundamental-react';
import LuigiClient from '@kyma-project/luigi-client';

import { useLambdasMutations } from 'views/lambdas/services/lambdas-mutations';

export default function LambdaHeader({ lambdaName }) {
  const { updateLambda, deleteLambda } = useLambdasMutations();

  const navigateToList = () => {
    LuigiClient.linkManager()
      .fromClosestContext()
      .navigate('');
  };

  const breadcrumb = (
    <Breadcrumb>
      <Breadcrumb.Item
        name="Lambdas"
        url="#"
        onClick={() => navigateToList()}
      />
      <Breadcrumb.Item />
    </Breadcrumb>
  );

  const deleteButton = (
    <Button
      onClick={() => deleteLambda(lambdaName)}
      option="light"
      type="negative"
    >
      Delete
    </Button>
  );

  return (
    <header className="fd-has-background-color-background-2">
      <section className="fd-has-padding-regular fd-has-padding-bottom-none action-bar-wrapper">
        <section>
          {breadcrumb}
          <ActionBar.Header title={lambdaName} />
        </section>
        <ActionBar.Actions>{deleteButton}</ActionBar.Actions>
      </section>
    </header>
  );
}
