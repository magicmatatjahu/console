import React from 'react';
import { Panel, Button } from 'fundamental-react';

import { Filters, RemoveFiltersInterface } from "../../types";

import {
  StyledTokensWrapper,
  StyledToken,
} from "./styled";

interface Props {
  activeFilters: Filters;
  hasActiveLabel: (key: string, value: string) => boolean;
}

export const ActiveFiltersComponent: React.FunctionComponent<Props & RemoveFiltersInterface> = ({
  activeFilters,
  removeFilterLabel,
  removeAllFiltersLabels,
}) => {
  return (
    <>
      {Object.keys(activeFilters.labels).length && Object.keys(activeFilters.labels).some(key => Boolean(activeFilters.labels[key].length)) ? (
        <StyledTokensWrapper>
          <Panel.Filters>
            {Object.keys(activeFilters.labels).map(key => activeFilters.labels[key].map(value => (
              <StyledToken key={key} onClick={() => removeFilterLabel(key, value)}>{`${key}=${value}`}</StyledToken>
            )))}
            <Button onClick={removeAllFiltersLabels} compact option="light">Clear All</Button>
          </Panel.Filters>
        </StyledTokensWrapper>
      ) : null}
    </>
  )
}

export default ActiveFiltersComponent;