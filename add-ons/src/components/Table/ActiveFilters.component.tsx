import React from 'react';
import { Panel } from 'fundamental-react';

import { Filters, RemoveFiltersInterface } from "../../types";

import {
  StyledToken,
} from "./styled";

interface ActiveFiltersProps {
  activeFilters: Filters;
}

export const ActiveFiltersComponent: React.FunctionComponent<ActiveFiltersProps & RemoveFiltersInterface> = ({
  activeFilters,
  removeFilterLabel,
  removeAllFilters,
}) => {
  return (
    <>
      {activeFilters.labels.length ? (
        <Panel.Filters>
          {activeFilters.labels.map(label => (
            <StyledToken key={label} onClick={() => removeFilterLabel(label)}>{label}</StyledToken>
          ))}
        </Panel.Filters>
      ) : null}
    </>
  )
}

export default ActiveFiltersComponent;