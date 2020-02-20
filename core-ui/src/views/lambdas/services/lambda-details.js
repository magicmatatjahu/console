import React, { createContext, useContext, useState, useEffect } from 'react';

import { useLambdasQueries } from 'views/lambdas/services/lambdas-queries';

const defaultLambdaCode = {
  node: `module.exports = { 
  main: function (event, context) {
    
  }
}`,
};

const defaultLambdaDependencies = {
  node: `{ 
  "name": "%NAME%",
  "version": "0.0.1",
  "dependencies": {}
}`,
};

function addLambdaNameToDeps(lambdaName, lambdaRuntime) {
  let runtime = 'node';
  switch (lambdaRuntime) {
    case 'nodejs6':
    case 'nodejs8':
      runtime = 'node';
      break;
    default:
      runtime = 'node';
  }

  return defaultLambdaDependencies[runtime].replace('%NAME%', lambdaName);
}

export const LambdaDetailsContext = createContext({
  diff: false,
  setDiff: () => void 0,
  labels: undefined,
  setLabels: () => void 0,
  code: undefined,
  setCode: () => void 0,
  dependencies: undefined,
  setDependencies: () => void 0,
});

export const LambdaDetailsProvider = ({ children }) => {
  const {
    lambdaResponse: {
      data = {
        function: undefined,
      },
    },
  } = useLambdasQueries();

  const [showDiff, setShowDiff] = useState(false);

  const [labels, setLabels] = useState([]);
  const [code, setCode] = useState(defaultLambdaCode.node);
  const [dependencies, setDependencies] = useState(
    defaultLambdaDependencies.node,
  );

  useEffect(() => {
    if (data.function) {
      setLabels(data.function.labels);
      setCode(data.function.content || defaultLambdaCode.node);
      console.log(data.function.dependencies);
      setDependencies(
        data.function.dependencies ||
          addLambdaNameToDeps(data.function.name, data.function.runtime),
      );
    }
  }, [data.function]);

  const exposedData = {
    showDiff,
    setShowDiff,

    labels,
    setLabels,
    code,
    setCode,
    dependencies,
    setDependencies,
  };

  return (
    <LambdaDetailsContext.Provider
      value={{
        ...exposedData,
      }}
    >
      {children}
    </LambdaDetailsContext.Provider>
  );
};

export function useLambdaDetails() {
  return useContext(LambdaDetailsContext);
}
