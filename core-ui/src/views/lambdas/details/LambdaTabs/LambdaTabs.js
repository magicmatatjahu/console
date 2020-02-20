import React from 'react';

import { TabGroup, Tab } from 'fundamental-react';

import { CONSTANTS } from 'views/lambdas/constants';

import FunctionTab from 'views/lambdas/details/LambdaTabs/FunctionTab/FunctionTab';

export default function LambdaTabs() {
  return (
    <TabGroup>
      <Tab
        id="lambda-function"
        key="lambda-function"
        title={CONSTANTS.LAMBDA_TABS.FUNCTION.LABEL}
      >
        <FunctionTab />
      </Tab>
    </TabGroup>
  );
}
