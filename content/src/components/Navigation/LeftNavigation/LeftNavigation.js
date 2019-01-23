import React from "react";
<<<<<<< HEAD
import { Icon } from '@kyma-project/react-components';
import NavigationList from "./NavigationList/NavigationList";

import {
  GoBack
=======
import { Toolbar } from '@kyma-project/react-components';
import NavigationList from "./NavigationList/NavigationList";

import {
  ToolbarWrapper
>>>>>>> Remove warnings
} from './styled';

function LeftNavigation(props) {
  return (
    <>
<<<<<<< HEAD
      <GoBack
        data-e2e-id="go-to-environment"
        onClick={props.history.goBack}
      >
        <Icon size="m" glyph="nav-back" />Back to Environment
      </GoBack>
=======
      <ToolbarWrapper>
        <Toolbar
          title="Docs"
          addSeparator
          goBack={props.history.goBack}
        />
      </ToolbarWrapper>
>>>>>>> Remove warnings
      <NavigationList {...props} />
    </>
  );
}

export default LeftNavigation;
