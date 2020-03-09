import React from 'react';
import { useGroupContext } from '@kyma-project/documentation-component/lib/containers/Content/groupProvider';
import { Tab } from '@kyma-project/components';

import { TabsLabels } from './Group.renderer';

import { StyledOData, StyledAsyncAPI } from './styled';
import { StyledSwagger } from '../render-engines/open-api/styles';

function chooseStyledAPIComponent(apiType: TabsLabels): React.ElementType {
  switch (apiType) {
    case TabsLabels.CONSOLE:
      return StyledSwagger;
    case TabsLabels.EVENTS:
      return StyledAsyncAPI;
    case TabsLabels.ODATA:
      return StyledOData;
    default:
      return StyledSwagger;
  }
}

export interface APIRenderedContent {
  apiLabel: TabsLabels;
  apiClassName: string;
  sourceTypes: string[];
}

export const APIRenderedContent: React.FunctionComponent<
  APIRenderedContent
> = ({
  apiLabel = TabsLabels.CONSOLE,
  apiClassName = 'custom-open-api-styling',
  sourceTypes = [],
}) => {
  const { sources } = useGroupContext();

  if (!sources || !sources.length) {
    return null;
  }

  const StyledComponent = chooseStyledAPIComponent(apiLabel);
  const renderedContents = sources
    .filter(source => sourceTypes.includes(source.type))
    .map((source, id) => {
      const data = source.data;
      if (!data) {
        return null;
      }

      return (
        <Tab label={`${apiLabel}${id}`} id={`${apiLabel}${id}`}>
          <StyledComponent className={apiClassName}>
            <React.Fragment key={data.renderedContent}>
              {data.renderedContent}
            </React.Fragment>
          </StyledComponent>
        </Tab>
      );
    });

  return <>{renderedContents}</>;
};
