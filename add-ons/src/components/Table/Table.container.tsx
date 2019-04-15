import React, { useContext } from 'react';

import TableComponent from "./Table.component";
import TableContentComponent from "./TableContent.component";

import ConfigurationsService from "../../services/Configurations.service";

import { Configuration } from "../../types";

const ToolbarContainer: React.FunctionComponent = () => {
  const contentHeaders: string[] = ["Name / URL", "Labels", ""]
  const { filteredConfigs } = useContext(ConfigurationsService.Context);

  return (
    <TableComponent>
      <TableContentComponent headers={contentHeaders} configs={filteredConfigs} />
    </TableComponent>
  )
}

export default ToolbarContainer;
