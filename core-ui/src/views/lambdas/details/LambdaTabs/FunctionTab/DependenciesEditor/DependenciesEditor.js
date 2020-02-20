import React from 'react';
import { ControlledEditor, DiffEditor } from '@monaco-editor/react';

import { useLambdasQueries } from 'views/lambdas/services/lambdas-queries';
import { useLambdaDetails } from 'views/lambdas/services/lambda-details';

export default function DependenciesEditor() {
  const {
    lambdaResponse: {
      data = {
        function: undefined,
      },
    },
  } = useLambdasQueries();
  const { showDiff, dependencies, setDependencies } = useLambdaDetails();

  if (showDiff) {
    return (
      <DiffEditor
        id="function-code"
        height="30em"
        language="json"
        theme="vs-light"
        original={data.function && data.function.deps}
        modified={dependencies}
      />
    );
  }

  return (
    <ControlledEditor
      id="function-dependencies"
      height="30em"
      language="json"
      theme="vs-light"
      value={dependencies}
      onChange={(_, value) => setDependencies(value)}
    />
  );
}
