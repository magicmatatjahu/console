import { useState, useEffect, useReducer, Reducer } from "react";
import createContainer from "constate";

import { Configuration, ConfigurationLabel, Filters, ActiveFiltersAction, ActiveFiltersActionType } from '../types';
import { fileURLToPath } from "url";

const useConfigurations = () => {
  const [originalConfigs, setOriginalConfigs] = useState<Configuration[]>([
    {
        name: "dupa1",
        labels: ["dupa2"],
        urls: ["lol2x"],
      },
      {
        name: "dupa2",
        labels: ["dupa3"],
        urls: ["lol"],
      },
  ]);

  // Filters
  const initialActiveFilters: Filters = {
    labels: [],
  }
  
  function activeFiltersReducer(state: Filters, action: ActiveFiltersAction) {
    switch (action.type) {
      case ActiveFiltersActionType.SET_LABEL:
        return { ...state, labels: [...state.labels, action.payload] };
      case ActiveFiltersActionType.REMOVE_LABEL:
        return { ...state, labels: state.labels.filter(label => label !== action.payload) };
      case ActiveFiltersActionType.REMOVE_ALL_FILTERS: 
        return initialActiveFilters;
      default:
        return state;
    }
  }

  const [activeFilters, dispatchActiveFilters] = useReducer(activeFiltersReducer, initialActiveFilters);

  const getConfigurationsLabels = (): ConfigurationLabel[] => {
    let labels: ConfigurationLabel[] = []
    originalConfigs.forEach(config => {
      labels = [...labels, ...config.labels];
    });
    return labels.filter((v, i, a) => a.indexOf(v) === i)
  }

  const setFilterLabel = (label: string) => {
    if (activeFilters.labels.includes(label)) {
      removeFilterLabel(label);
    } else {
      dispatchActiveFilters({ type: ActiveFiltersActionType.SET_LABEL, payload: label });
    }
  }

  const removeFilterLabel = (label: string) => {
    dispatchActiveFilters({ type: ActiveFiltersActionType.REMOVE_LABEL, payload: label });
  }

  const removeAllFilters = () => {
    dispatchActiveFilters({ type: ActiveFiltersActionType.REMOVE_ALL_FILTERS, payload: "" });
  }

  // Configurations
  const [filteredConfigs, setFilteredConfigs] = useState(originalConfigs);
  useEffect(() => {
    if (!activeFilters.labels.length) {
      setFilteredConfigs(originalConfigs)
      return;
    }

    const newFilteredConfigs = originalConfigs.filter(config => !config.labels.some(label => activeFilters.labels.includes(label)));
    setFilteredConfigs(newFilteredConfigs)
  }, [activeFilters]);

  return { 
    configs: filteredConfigs, 
    getConfigurationsLabels, 
    activeFilters, 
    setFilterLabel,
    removeFilterLabel,
    removeAllFilters,
  };
};

export default createContainer(useConfigurations);
