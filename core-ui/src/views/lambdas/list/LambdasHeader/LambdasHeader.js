import React from 'react';
import LuigiClient from '@kyma-project/luigi-client';
import { Button } from 'fundamental-react';

import { PageHeader } from 'react-shared';

import { CONSTANTS } from 'views/lambdas/constants';

export default function LambdasHeader({ disableCreate = true }) {
  function goToCreatePage() {
    LuigiClient.linkManager().navigate(`create`);
  }

  const createModalButton = (
    <Button glyph="add" disabled={disableCreate} onClick={goToCreatePage}>
      {CONSTANTS.LAMBDAS_LIST.HEADER.ADD_LAMBDA}
    </Button>
  );

  return (
    <PageHeader
      title={CONSTANTS.LAMBDAS_LIST.HEADER.TITLE}
      actions={createModalButton}
    />
  );
}
