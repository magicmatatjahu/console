import React from 'react';

import Toolbar from "../components/Toolbar/Toolbar.component"
import Table from "../components/Table/Table.container"

import { Popover, Button, Menu } from 'fundamental-react';

import ConfigurationsService from "../services/Configurations.service";

import {
  Wrapper,
} from "./styled";

const App: React.FunctionComponent = () => {
  return (
    <Wrapper>
      <ConfigurationsService.Provider>
        <Toolbar />
        <Table />
      </ConfigurationsService.Provider>
    </Wrapper>
  );
}

export default App;
