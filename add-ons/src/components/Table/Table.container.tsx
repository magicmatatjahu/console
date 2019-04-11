import React, { useContext } from 'react';

import TableComponent from "./Table.component";
import TableContentComponent from "./TableContent.component";

import ConfigurationsService from "../../services/Configurations.service";

import { Configuration } from "../../types";

const ToolbarContainer: React.FunctionComponent = () => {
  const contentHeaders: string[] = ["Name / URL", "Labels", ""]
  const { configs, removeFilterLabel } = useContext(ConfigurationsService.Context);

  return (
    <TableComponent>
      <TableContentComponent headers={contentHeaders} configurations={configs} />
    </TableComponent>
  )
}

export default ToolbarContainer;
