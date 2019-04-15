import React from 'react';

import Toolbar from "../components/Toolbar/Toolbar.component"
import Table from "../components/Table/Table.container"

import { Popover, Button, Menu } from 'fundamental-react';

import nestServices from "../services/nest";
import QueriesService from "../services/Queries.service";
import MutationsService from "../services/Mutations.service";
import FiltersService from "../services/Filters.service";
import ConfigurationsService from "../services/Configurations.service";
import LabelsService from "../services/Labels.service";

import {
  Wrapper,
} from "./styled";

const Services = nestServices(
  QueriesService.Provider,
  MutationsService.Provider,
  FiltersService.Provider,
  ConfigurationsService.Provider,
  LabelsService.Provider,
);

const App: React.FunctionComponent = () => {
  return (
    <Wrapper>
      <Services>
        <Toolbar />
        <Table />
      </Services>
    </Wrapper>
  );
}

export default App;
