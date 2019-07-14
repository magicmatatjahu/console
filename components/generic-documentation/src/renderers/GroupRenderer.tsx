import React from 'react';
import {
  Source,
  RenderedContent,
  GroupRendererComponent,
} from '@kyma-project/documentation-component';

import { StickyContainer, Sticky } from 'react-sticky';
import { HeadersNavigation } from '../render-engines/markdown/headers-toc';
import { Tabs, Tab } from '../components';
import { ContentWrapper } from '../styled';
import {
  markdownTypes,
  openApiTypes,
  asyncApiTypes,
  odataTypes,
} from '../constants';
import { StyledAsyncApi } from './styled';
import { StyledSwagger } from '../render-engines/open-api/styles';

function existsFiles(sources: Source[], types: string[]) {
  return sources.find(source => types.includes(source.type));
}

export interface GroupRendererProps extends GroupRendererComponent {
  additionalTabs?: Array<{
    label: string;
    content: React.ReactNode;
  }>;
}

export const GroupRenderer: React.FunctionComponent<GroupRendererProps> = ({
  sources,
  additionalTabs,
}) => {
  if (!sources || !sources.length) {
    return null;
  }

  const markdownsExists = existsFiles(sources, markdownTypes);
  const openApiExists = existsFiles(sources, openApiTypes);
  const asyncApiExists = existsFiles(sources, asyncApiTypes);
  const odataExists = existsFiles(sources, odataTypes);

  const tabs =
    additionalTabs &&
    additionalTabs.map(tab => (
      <Tab label={tab.label} key={tab.label}>
        {tab.content}
      </Tab>
    ));

  return (
    <Tabs>
      {markdownsExists && (
        <Tab label="Documentation">
          <ContentWrapper>
            <StickyContainer>
              <div>
                <RenderedContent sourceTypes={markdownTypes} />
              </div>
              <Sticky>
                {({ style }: any) => (
                  <div style={{ ...style, zIndex: 200, width: '310px' }}>
                    <HeadersNavigation enableSmoothScroll={true} />
                  </div>
                )}
              </Sticky>
            </StickyContainer>
          </ContentWrapper>
        </Tab>
      )}
      {openApiExists && (
        <Tab label="Console">
          <StyledSwagger className="custom-open-api-styling">
            <RenderedContent sourceTypes={openApiTypes} />
          </StyledSwagger>
        </Tab>
      )}
      {asyncApiExists && (
        <Tab label="Events">
          <StyledAsyncApi className="custom-async-api-styling">
            <RenderedContent sourceTypes={asyncApiTypes} />
          </StyledAsyncApi>
        </Tab>
      )}
      {odataExists && (
        <Tab label="OData">
          <RenderedContent sourceTypes={odataTypes} />
        </Tab>
      )}
      {tabs}
    </Tabs>
  );
};
