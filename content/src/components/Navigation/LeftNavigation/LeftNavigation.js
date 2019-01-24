import React from "react";
import { Icon } from '@kyma-project/react-components';
import NavigationList from "./NavigationList/NavigationList";

import {
  Toolbar
} from './styled';

function LeftNavigation(props) {
  return (
    <>
      <Toolbar
        onClick={props.history.goBack}
      >
        <Icon size="m" glyph="nav-back" />Back to Environment
      </Toolbar>
      <NavigationList {...props} />
    </>
  );
}

export default LeftNavigation;
