import React, { useContext } from 'react';
import { Router } from '@reach/router'
import { StickyContainer, Sticky } from "react-sticky";
import { Grid, Spinner } from '@kyma-project/components';

import { Content } from '../components/Content';
import { Navigation } from '../components/Navigation';
import { QueriesService } from '../services';
import { ERRORS } from '../constants';

import { Wrapper, ErrorWrapper } from './styled';

export const App: React.FunctionComponent = () => {
  const { loading, error } = useContext(QueriesService);

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <ErrorWrapper>{ERRORS.SERVER}</ErrorWrapper>;
  }

  return (
    <Wrapper>
      <Grid.Container className="grid-container" width="1580px">
        <StickyContainer>
          <Grid.Row>
            <Grid.Unit df={2} sm={0}>
              <Sticky>
                {({ style }: any) => (
                  <div style={{ ...style, zIndex: 200 }}>
                    <Navigation />
                  </div>
                )}
              </Sticky>
            </Grid.Unit>
            <Router>
              <Content path="/" />
              <Content path="/:group/:topic" />
            </Router>
          </Grid.Row>
        </StickyContainer>
      </Grid.Container>
    </Wrapper>
  );
};
