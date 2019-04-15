import { useContext, useEffect, useState } from "react";
import createContainer from "constate";

import ConfigurationsService from "./Configurations.service";

import { Configuration, ConfigurationLabels, FilterLabels } from '../types';

const useLabels = () => {
  const { originalConfigs } = useContext(ConfigurationsService.Context);
  const [uniqueLabels, setUniqueLabels] = useState<FilterLabels>({})

  const getFiltersLabels = (configs: Configuration[]): FilterLabels => {
    let labels: FilterLabels = {};
    configs.forEach(config => {
      Object.keys(config.labels).forEach(key => {
        const label = config.labels[key];
        if (!labels[key]) {
          labels[key] = [label];
        } else {
          labels[key].push(label)
        } 
      });
    })

    return labels;
  }

  const getUniqueLabels = (labels: FilterLabels): FilterLabels => {
    Object.keys(labels).forEach(key => {
      const values = labels[key];
      labels[key] = labels[key].filter((v, i, a) => a.indexOf(v) === i)
    });

    return labels;
  }

  const sortLabels = (labels: FilterLabels): FilterLabels => {
    return labels;
    // return labels.sort();
  }

  useEffect(() => {
    originalConfigs && setUniqueLabels(sortLabels(getFiltersLabels(originalConfigs)));
  }, [originalConfigs]);

  return {
    uniqueLabels,
  }
}

export default createContainer(useLabels);
