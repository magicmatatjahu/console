import React, { useContext } from 'react';

import FilterPopoverComponent from "./FilterPopover.component";
import FilterPopoverBody from "./FilterPopoverBody.component";
import ConfigurationsService from "../../services/Configurations.service";

import { ConfigurationLabel } from "../../types";

interface FilterPopoverBodyProps {}

export const FilterPopover: React.FunctionComponent<FilterPopoverBodyProps> = () => {
  const { activeFilters, getConfigurationsLabels, setFilterLabel } = useContext(ConfigurationsService.Context);

  const filterPopoverBody = (
    <FilterPopoverBody
      activeFilters={activeFilters}
      getConfigurationsLabels={getConfigurationsLabels}
      setFilterLabel={setFilterLabel}
    />
  )

  return (
    <FilterPopoverComponent 
      activeFiltersLength={activeFilters.labels.length}
      body={filterPopoverBody}
    />
  )
}

export default FilterPopover;
