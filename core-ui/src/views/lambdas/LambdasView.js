import React from 'react';

import { LambdasQueriesProvider } from 'views/lambdas/services/lambdas-queries';
import { LambdasMutationsProvider } from 'views/lambdas/services/lambdas-mutations';

import LambdasRouting from 'views/lambdas/LambdasRouting';

export default function LambdasView() {
  return (
    <LambdasQueriesProvider>
      <LambdasMutationsProvider>
        <LambdasRouting />
      </LambdasMutationsProvider>
    </LambdasQueriesProvider>
  );
}
