import { useState, useEffect, useContext } from "react";
import createContainer from "constate";

import QueriesService from "./Queries.service";
import FiltersService from "./Filters.service";

import { Configuration } from '../types';
import { DEFAULT_CONFIGURATION } from "../constants";

const useConfigurations = () => {
  const { configs } = useContext(QueriesService.Context);
  const { activeFilters } = useContext(FiltersService.Context);

  const [originalConfigs, setOriginalConfigs] = useState<Configuration[]>(() => configs);
  const [configurationNames, setConfigurationNames] = useState<string[]>([])

  const sortConfigByName = (configs: Configuration[]): Configuration[] => {
    return configs.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (nameA === DEFAULT_CONFIGURATION) return -1;
      return nameA.localeCompare(nameB);
    });
  }

  const getConfigurationsName = (configs: Configuration[]): string[] => {
    return configs.map(config => config.name);
  }

  useEffect(() => {
    if (!configs) return;

    setOriginalConfigs(sortConfigByName(configs))
    setConfigurationNames(getConfigurationsName(configs))
  }, [configs]);

  const [filteredConfigs, setFilteredConfigs] = useState(originalConfigs);
  useEffect(() => {
    originalConfigs && setFilteredConfigs(originalConfigs)
  }, [originalConfigs]);
  useEffect(() => {
    if (!activeFilters.labels.length) {
      setFilteredConfigs(originalConfigs)
      return;
    }

    const newFilteredConfigs = originalConfigs.filter(config => {
      const labels = config.labels;
      return true;
      // Object.keys(labels).some()

      // config.labels.some(label => activeFilters.labels.includes(label))
    });
    const sortedConfigs = sortConfigByName(newFilteredConfigs);
    setFilteredConfigs(sortedConfigs);
  }, [activeFilters]);

  return { 
    originalConfigs,
    configurationNames,
    filteredConfigs, 
  };
};

export default createContainer(useConfigurations);
