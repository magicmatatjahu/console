import React from "react";
import { Toolbar } from '@kyma-project/react-components';
import NavigationList from "./NavigationList/NavigationList";

import {
  ToolbarWrapper
} from './styled';

function LeftNavigation(props) {
  return (
    <>
      <ToolbarWrapper>
        <Toolbar
          title="Docs"
          addSeparator
          goBack={props.history.goBack}
        />
      </ToolbarWrapper>
      <NavigationList {...props} />
    </>
  );
}

export default LeftNavigation;
