import React from 'react';
import { Sticky } from 'react-sticky';
import { Content, Renderers } from '@kyma-project/documentation-component';
import { Grid } from '@kyma-project/components';

import { HeadersNavigation } from '../render-engines/markdown/headers-toc';

export interface ContentUILayoutProps {
  renderers: Renderers;
}

export const ContentUILayout: React.FunctionComponent<ContentUILayoutProps> = ({
  renderers,
}) => (
  <>
    <Grid.Unit df={8} sm={12} className="grid-unit-content">
      <Content renderers={renderers} />
    </Grid.Unit>
    <Grid.Unit df={2} sm={0} className="grid-unit-navigation">
      <Sticky>
        {({ style }: any) => (
          <div style={{ ...style, zIndex: 200 }}>
            <HeadersNavigation />
          </div>
        )}
      </Sticky>
    </Grid.Unit>
  </>
);
