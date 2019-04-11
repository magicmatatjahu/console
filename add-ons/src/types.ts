export type BackendModule = string;

export interface Configuration {
  name: string;
  labels: ConfigurationLabel[];
  urls: ConfigurationURL[];
};

export type ConfigurationLabel = string;
export type ConfigurationURL = string;

export interface Filters {
  labels: ConfigurationLabel[];
};

export interface ActiveFiltersAction {
  payload: string,
  type: ActiveFiltersActionType,
}

export enum ActiveFiltersActionType {
  SET_LABEL = "SET_LABEL",
  REMOVE_LABEL = "REMOVE_LABEL",
  REMOVE_ALL_FILTERS = "REMOVE_ALL_FILTERS",
}

export interface RemoveFiltersInterface {
  removeFilterLabel: (label: string) => void;
  removeAllFilters: () => void;
}

export interface FiltersLabelsInterface {
  getConfigurationsLabels: () => ConfigurationLabel[];
  setFilterLabel: (label: string) => void;
}

export interface ConfigurationsService extends FiltersLabelsInterface, RemoveFiltersInterface {}