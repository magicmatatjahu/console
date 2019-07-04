import React from 'react';
import {
  RenderEngineProps,
  RenderEngine,
} from '@kyma-project/documentation-component';
import OData from '@kyma-project/odata-react';

const ODataRenderEngine: React.FunctionComponent<RenderEngineProps> = ({
  source,
  options = {},
}) => (
  <OData
    schema={source.content ? source.content : source.rawContent}
    {...options}
  />
);

export const odataRenderEngine = {
  component: ODataRenderEngine,
  sourceTypes: ['odata'],
};
