import React from 'react';
import { Panel, Button, Popover } from 'fundamental-react';

import FilterPopover from "../FilterPopover/FilterPopover.container";
import ActiveFilters from "./ActiveFilters.container";

import { Filters } from "../../types";

import {
  PanelWrapper,
  StyledToken,
} from "./styled";

interface TableComponentProps {}

const TableComponent: React.FunctionComponent<TableComponentProps> = ({
  children,
}) => {
  return (
    <PanelWrapper>
      <Panel>
        <Panel.Header>
          <Panel.Head
            title="Repository URLs"
          />
          <Panel.Actions>
            <Button
              glyph="search"
              option="light"
            />
            <FilterPopover />
            <Button glyph="add" compact option="light">
              Add URL
            </Button>
          </Panel.Actions>
        </Panel.Header>
        {/* <ActiveFilters /> */}
        <Panel.Body>
          {children}
        </Panel.Body>
      </Panel>
    </PanelWrapper>
  )
}

export default TableComponent;
