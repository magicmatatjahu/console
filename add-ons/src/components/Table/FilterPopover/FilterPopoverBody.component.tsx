import React from 'react';
import { FormFieldset, FormLegend, FormItem, FormInput, FormLabel, Button } from 'fundamental-react';

import { FiltersLabelsInterface, Filters } from "../../../types";

import {
  FormFieldsetWrapper,
  StyledGroup,
} from "./styled";

interface Props {
  activeFilters: Filters;
  removeAllFilters: () => void;
}

export const FilterPopoverBody: React.FunctionComponent<Props & FiltersLabelsInterface> = ({
  activeFilters,
  uniqueLabels,
  setFilterLabel,
  hasActiveLabel,
  removeAllFilters,
}) => {
  return (
    <FormFieldsetWrapper>
      <FormFieldset>
        {Object.keys(uniqueLabels).map(key => (
          <StyledGroup key={key}>
            <FormLegend>
              {key}
            </FormLegend>
            {uniqueLabels[key].map((label, idx) => (
              <FormItem isCheck key={idx}>
                <FormInput
                  id={`checkbox-${idx}`}
                  name={`checkbox-name-${idx}`}
                  type="checkbox"
                  value={label}
                  checked={hasActiveLabel(key, label)}
                  onClick={() => setFilterLabel(key, label)}
                />
                <FormLabel htmlFor={`checkbox-${idx}`}>
                  {label}
                </FormLabel>
              </FormItem>
            ))}
          </StyledGroup>
        ))}
      </FormFieldset>
    </FormFieldsetWrapper>
  )
}

export default FilterPopoverBody;