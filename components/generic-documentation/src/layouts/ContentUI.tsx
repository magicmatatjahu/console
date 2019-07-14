import React from 'react';
import { Content, Renderers } from '@kyma-project/documentation-component';
import { StickyContainer, Sticky } from 'react-sticky';

import { HeadersNavigation } from '../render-engines/markdown/headers-toc';
import { ContentWrapper } from '../styled';

export interface ContentUILayoutProps {
  renderers: Renderers;
}

export const ContentUILayout: React.FunctionComponent<ContentUILayoutProps> = ({
  renderers,
}) => (
  <ContentWrapper>
    <StickyContainer>
      <div>
        <Content renderers={renderers} />
      </div>
      <Sticky>
        {({ style }: any) => (
          <div style={{ ...style, zIndex: 200, width: '310px' }}>
            <HeadersNavigation enableSmoothScroll={false} />
          </div>
        )}
      </Sticky>
    </StickyContainer>
  </ContentWrapper>
);
