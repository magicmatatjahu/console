import { useContext } from "react";
import createContainer from "constate";

import ConfigurationsService from "./Configurations.service";

import { ERRORS } from "../constants";
const URL_ERRORS = ERRORS.URL;

const useUrls = () => {
  const { originalConfigs } = useContext(ConfigurationsService.Context);

  const getUrlsFromConfigByName = (configName: string): string[] => {
    const config = originalConfigs.find(config => config.name === configName);
    return config ? config.urls : [];
  }

  const validateUrl = (url: string, existingUrls: string[]): string => {
    if (existingUrls.includes(url)) {
      return URL_ERRORS.ALREADY_EXISTS;
    }
    if (!(url.startsWith("https://") || url.startsWith("http://"))) {
      return URL_ERRORS.STARTS_WITH_HTTP;
    }
    if (!(url.endsWith("yaml") || url.endsWith("yml"))) {
      return URL_ERRORS.YAML_EXTENSION; 
    }
    return "";
  }

  return {
    getUrlsFromConfigByName,
    validateUrl,
  }
}

export default createContainer(useUrls);
