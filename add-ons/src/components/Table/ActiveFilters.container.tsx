import React, { useContext } from 'react';
    
import ActiveFiltersComponent from "./ActiveFilters.component";
import ConfigurationsService from "../../services/Configurations.service";

import { Filters, RemoveFiltersInterface } from "../../types";

interface ActiveFiltersProps {}

export const ActiveFiltersContainer: React.FunctionComponent<ActiveFiltersProps> = () => {
  const { activeFilters, removeFilterLabel, removeAllFilters } = useContext(ConfigurationsService.Context);

  return (
    <ActiveFiltersComponent
      activeFilters={activeFilters}
      removeFilterLabel={removeFilterLabel}
      removeAllFilters={removeAllFilters}
    />
  )
}

export default ActiveFiltersContainer;