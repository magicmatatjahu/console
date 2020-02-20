import React from 'react';
import { Button, Toggle } from 'fundamental-react';

import { CONSTANTS } from 'views/lambdas/constants';

import TabsWithActions from 'views/lambdas/components/TabsWithActions/TabsWithActions';

import { useLambdaDetails } from 'views/lambdas/services/lambda-details';

import CodeEditor from 'views/lambdas/details/LambdaTabs/FunctionTab/CodeEditor/CodeEditor';
import DependenciesEditor from 'views/lambdas/details/LambdaTabs/FunctionTab/DependenciesEditor/DependenciesEditor';

export default function FunctionContent() {
  const { setShowDiff } = useLambdaDetails();

  const saveButton = <Button compact>Save</Button>;

  const toggle = (
    <Toggle size="xs" onChange={() => setShowDiff(prev => !prev)}>
      Diff
    </Toggle>
  );

  const tabsData = [
    {
      id: 'function-code',
      title: CONSTANTS.LAMBDA_TABS.FUNCTION.TABS.CODE.LABEL,
      body: <CodeEditor />,
    },
    {
      id: 'function-dependencies',
      title: CONSTANTS.LAMBDA_TABS.FUNCTION.TABS.DEPENDENCIES.LABEL,
      body: <DependenciesEditor />,
    },
  ];

  return (
    <TabsWithActions
      tabsData={tabsData}
      actions={
        <>
          {toggle}
          {saveButton}
        </>
      }
    />
  );
}
