import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Button, Dropdown, Search, Separator } from '@kyma-project/react-components';

import Filter from './Filter.component';

import {
  FiltersDropdown,
  FiltersContainer,
  SearchWrapper,
  ClearAllActiveFiltersButton,
} from './styled';

const FilterList = ({
  filters,
  filtersExists,
  active,
  onChange,
  onSearch,
  onSeeMore,
  activeTagsFilters,
  activeFiltersCount,
  clearAllActiveFilters,
}) => (
  <FiltersDropdown>
    <Dropdown
      id="dupa"
      name={activeFiltersCount ? `Filter (${activeFiltersCount})` : 'Filter'}
      enabled={filters && filters.length > 0}
      buttonWidth="97px"
      marginTop="0"
      lastButton
      primary
      arrowTop
      arrowTopRight="41px"
      control= {
        <Button option="emphasized" disabled={!(filters && filters.length > 0)}>
          {activeFiltersCount ? `Filter (${activeFiltersCount})` : 'Filter'}
        </Button>
      }
    >
      <SearchWrapper>
        <Search
          noSearchBtn
          placeholder="Search"
          onChange={onSearch}
          id="search-filter"
        />
        <ClearAllActiveFiltersButton
          onClick={clearAllActiveFilters}
          option="light"
          data-e2e-id="clear-all-filters"
        >
          Clear all filters
        </ClearAllActiveFiltersButton>
      </SearchWrapper>
      <Separator />
      <FiltersContainer data-e2e-id="filter">
        {filters &&
          filters.map((filter, idx) => (
            <Fragment key={filter.name}>
              {filter.values &&
                filter.values.length > 0 &&
                filtersExists[filter.name] && (
                  <Fragment>
                    <Filter
                      name={filter.name}
                      items={filter.values}
                      activeValue={active[filter.name]}
                      onChange={onChange}
                      activeTagsFilters={activeTagsFilters}
                      onSeeMore={onSeeMore}
                      isMore={filter.isMore}
                    />
                    {idx < filters.length - 1 && (
                      <Separator margin="0 -10px 0"  />
                    )}
                  </Fragment>
                )}
            </Fragment>
          ))}
      </FiltersContainer>
    </Dropdown>
  </FiltersDropdown>
);

FilterList.propTypes = {
  filters: PropTypes.array,
  filtersExists: PropTypes.object,
  active: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  clearAllActiveFilters: PropTypes.func.isRequired,
};

export default FilterList;
