import React from 'react';
import { ControlledEditor, DiffEditor } from '@monaco-editor/react';

import { useLambdasQueries } from 'views/lambdas/services/lambdas-queries';
import { useLambdaDetails } from 'views/lambdas/services/lambda-details';

export default function CodeEditor() {
  const {
    lambdaResponse: {
      data = {
        function: undefined,
      },
    },
  } = useLambdasQueries();
  const { showDiff, code, setCode } = useLambdaDetails();

  if (showDiff) {
    return (
      <DiffEditor
        id="function-code"
        height="30em"
        language="javascript"
        theme="vs-light"
        original={data.function && data.function.content}
        modified={code}
      />
    );
  }

  return (
    <ControlledEditor
      id="function-code"
      height="30em"
      language="javascript"
      theme="vs-light"
      value={code}
      onChange={(_, value) => setCode(value)}
    />
  );
}
