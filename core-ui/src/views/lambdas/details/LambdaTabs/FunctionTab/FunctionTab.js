import React from 'react';
import { PanelGrid, Panel } from 'fundamental-react';

import { ServiceBindingsProvider } from 'views/lambdas/services/service-bindings';

import FunctionBody from 'views/lambdas/details/LambdaTabs/FunctionTab/FunctionBody/FunctionBody';
import ServiceBindingsPanel from 'views/lambdas/details/LambdaTabs/FunctionTab/ServiceBindingsPanel/ServiceBindingsPanel';

export default function FunctionTab() {
  const serviceBindingsPanel = (
    <ServiceBindingsProvider>
      <ServiceBindingsPanel />
    </ServiceBindingsProvider>
  );

  return (
    <PanelGrid cols={3} className="fd-has-margin-medium">
      <Panel colSpan={2}>
        <FunctionBody />
      </Panel>
      <Panel colSpan={1}>{serviceBindingsPanel}</Panel>
    </PanelGrid>
  );
}
