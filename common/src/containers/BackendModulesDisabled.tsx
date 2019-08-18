import React from 'react';
import styled from 'styled-components';
import { Panel } from 'fundamental-react';

import { BackendModules } from '../services';

export const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  font-size: 20px;
  padding: 30px;
`;

interface Props {
  modules: BackendModules[];
}

export const BackendModulesDisabled: React.FunctionComponent<Props> = ({
  modules = [],
}) => {
  const modulesLength = modules.length;
  if (!modulesLength) {
    return null;
  }

  const text =
    modulesLength === 1
      ? `${modules[0]} backend module is disabled.`
      : `${modules.map((mod, index) =>
          index ? `, ${mod}` : mod,
        )} backend modules is disabled.`;

  return (
    <Wrapper>
      <Panel>
        <Panel.Body>{text}</Panel.Body>
      </Panel>
    </Wrapper>
  );
};
