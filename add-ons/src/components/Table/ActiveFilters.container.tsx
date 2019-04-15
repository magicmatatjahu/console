import React, { useContext } from 'react';
    
import ActiveFiltersComponent from "./ActiveFilters.component";
import FiltersService from "../../services/Filters.service";

interface ActiveFiltersProps {}

export const ActiveFiltersContainer: React.FunctionComponent<ActiveFiltersProps> = () => {
  const { activeFilters, removeFilterLabel, removeAllFilters, hasActiveLabel } = useContext(FiltersService.Context);

  return (
    <ActiveFiltersComponent
      activeFilters={activeFilters}
      removeFilterLabel={removeFilterLabel}
      removeAllFilters={removeAllFilters}
      hasActiveLabel={hasActiveLabel}
    />
  )
}

export default ActiveFiltersContainer;