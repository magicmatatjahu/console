import React, { useContext } from 'react';
import { Icon } from 'fundamental-react';

import { NavigationService } from '../services';
import { NavigationList } from './NavigationList';

import { NavigationWrapper, GoBack } from './styled';

export const Navigation: React.FunctionComponent = () => {
  const context = useContext(NavigationService);
  if (!context || !context.navigation) {
    return null;
  }

  return (
    <NavigationWrapper>
      <GoBack data-e2e-id="go-to-environment">
        <Icon size="m" glyph="nav-back" />
        <span>Back to Environment</span>
      </GoBack>
      <NavigationList navigation={context.navigation} />
    </NavigationWrapper>
  );
};
