import styled from 'styled-components';

import {
  FormLabel as UnstyledFormLabel,
  Panel as UnstyledPanel,
  PanelBody as UnstyledPanelBody,
} from '@kyma-project/react-components';

export const FormLabel = styled(UnstyledFormLabel)`
  &&& {
    padding-right: 10px;
    font-size: 16px;
  }
`;

export const PanelBody = styled(UnstyledPanelBody)`
  && {
    padding: 12px;
  }
`;

export const Panel = styled(UnstyledPanel)`
  && {
    min-width: 200px;
  }
`;
