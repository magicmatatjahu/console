import React from 'react';
import { Panel, Button, Popover } from 'fundamental-react';

import FilterPopover from "../FilterPopover/FilterPopover.container";
import ActiveFilters from "./ActiveFilters.container";
import AddUrlModal from "../Modals/AddUrlModal/AddUrlModal.container";

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
              compact
            />
            <FilterPopover />
            <AddUrlModal />
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
