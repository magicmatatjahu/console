import React, { useContext } from 'react';

import FilterPopoverComponent from "./FilterPopover.component";
import FilterPopoverBody from "./FilterPopoverBody.component";

import FiltersService from "../../../services/Filters.service";
import LabelsService from "../../../services/Labels.service";

interface Props {}

export const FilterPopoverContainer: React.FunctionComponent<Props> = () => {
  const { activeFilters, setFilterLabel, hasActiveLabel } = useContext(FiltersService.Context);
  const { uniqueLabels } = useContext(LabelsService.Context);

  const filterPopoverBody = (
    <FilterPopoverBody
      activeFilters={activeFilters}
      uniqueLabels={uniqueLabels}
      setFilterLabel={setFilterLabel}
      hasActiveLabel={hasActiveLabel}
    />
  )

  let activeFiltersLength: number = 0;
  Object.keys(activeFilters.labels).map(key => {
    activeFiltersLength += activeFilters.labels[key].length;
  })

  return (
    <FilterPopoverComponent 
      activeFiltersLength={activeFiltersLength}
      body={filterPopoverBody}
    />
  )
}

export default FilterPopoverContainer;
