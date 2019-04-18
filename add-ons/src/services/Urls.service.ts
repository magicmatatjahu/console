import { useState, useContext } from "react";
import createContainer from "constate";

import ConfigurationsService from "./Configurations.service";

import { ERRORS } from "../constants";
const URL_ERRORS = ERRORS.URL;

const useUrls = () => {
  const { originalConfigs } = useContext(ConfigurationsService.Context);
  let timer: number = 0;

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
    // validateExistsUrl(url, setExistsResource);
    return "";
  }

  // const validateExistsUrl = (url: string, setExistsResource: any) => {
  //   clearTimeout(timer);
  //   timer = setTimeout(() => {
  //     checkExistsResource(url, setExistsResource);
  //   }, 500);
  // }

  // const checkExistsResource = async (url: string, setExistsResource: any) => {
  //   const data = await fetchUrl(url);
  //   return;
  // }

  // const fetchUrl = async (url: string) => {
  //   try {
  //     const request = await fetch(url, { mode: 'cors' });
  //     console.log(request)
  //     const data = await request.json();
  //     return data;
  //   } catch (e) {
  //     console.log(e)
  //     return;
  //   }
  // }

  return {
    getUrlsFromConfigByName,
    validateUrl,
  }
}

export default createContainer(useUrls);
