import React from 'react';
import { FormFieldset, FormLegend, FormItem, FormInput, FormLabel } from 'fundamental-react';

import { ConfigurationLabel, FiltersLabelsInterface, Filters } from "../../types";

import {
  FormFieldsetWrapper,
} from "./styled";

interface FilterPopoverBodyProps {
  activeFilters: Filters;
}

export const FilterPopoverBody: React.FunctionComponent<FilterPopoverBodyProps & FiltersLabelsInterface> = ({
  activeFilters,
  getConfigurationsLabels,
  setFilterLabel,
}) => {
  const labels = getConfigurationsLabels();

  return (
    <FormFieldsetWrapper>
    <FormFieldset>
      <FormLegend>
        Labels
      </FormLegend>
      {labels.map((label, idx) => (
        <FormItem isCheck key={idx}>
          <FormInput
            id={`checkbox-${idx}`}
            name={`checkbox-name-${idx}`}
            type="checkbox"
            value={label}
            checked={activeFilters.labels.includes(label)}
            onChange={() => {}}
            onClick={() => setFilterLabel(label)}
          />
          <FormLabel htmlFor={`checkbox-${idx}`}>
            {label}
          </FormLabel>
        </FormItem>
      ))}
    </FormFieldset>
    </FormFieldsetWrapper>
  )
}

export default FilterPopoverBody;