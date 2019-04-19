import React, { useState, useEffect, useContext } from 'react';
import LuigiClient from '@kyma-project/luigi-client';

import { useInput } from "../../../services/Forms";
import MutationsService from "../../../services/Mutations.service";
import ConfigurationsService from "../../../services/Configurations.service";
import UrlsService from "../../../services/Urls.service";

import Component from "./AddUrlModal.component";
import { DEFAULT_CONFIGURATION, ERRORS } from "../../../constants";

interface Props {
  configurationName?: string;
}

export const Container: React.FunctionComponent<Props> = ({
  configurationName,
}) => {
  const { addAddonsConfigurationUrls } = useContext(MutationsService.Context);
  const { configurationNames } = useContext(ConfigurationsService.Context);
  const { getUrlsFromConfigByName, validateUrl } = useContext(UrlsService.Context);

  const getConfigName = (): string => {
    let name: string;
    if (!configurationNameField.value) {
      name = configurationName ? configurationName : configurationNames[0];
    } else {
      name = configurationNameField.value;
    }

    return name;
  }
  const configurationNameField = useInput("");

  // Urls
  const [urls, setUrls] = useState<string[]>([]);
  const addUrl = () => {
    if (urlField.value) {
      setUrls(urls => [...urls, urlField.value])
      urlField.cleanUpField();
    }
  }
  const removeUrl = (url: string) => {
    if (url) {
      setUrls(urls => urls.filter(u => u !== url))
    }
  }
  const setEmptyUrls = () => {
    setUrls([]);
  }
  const validateUrlField = (url: string): string => {
    const existingUrls = getUrlsFromConfigByName(getConfigName());
    return validateUrl(url, existingUrls)
  }
  const handleEnterDownOnUrlField = (event: any) => {
    if (event.key === 'Enter' && !urlField.error) {
      addUrl()
    }
  }
  const urlField = useInput("", validateUrlField);

  const onSubmit = () => {
    let urlsToCreated: string[] = [...urls];
    addAddonsConfigurationUrls({ 
      variables: { 
        name: getConfigName(), 
        urls: urlsToCreated 
      }
    });
  }

  const resetFields = (): void => {
    urlField.cleanUpField();
    setEmptyUrls();
  }

  const onShowModal = () => {
    resetFields();
    LuigiClient.uxManager().addBackdrop();
  }

  const onHideModal = () => {
    LuigiClient.uxManager().removeBackdrop();
  }

  const configs = configurationName ? [configurationName] : configurationNames;

  return (
    <Component 
      configurationName={configurationName}
      configurations={configs}
      configurationNameField={configurationNameField}
      urlField={urlField}
      urls={urls}
      onSubmit={onSubmit}
      addUrl={addUrl}
      removeUrl={removeUrl}
      onShowModal={onShowModal}
      onHideModal={onHideModal}
    />
  )
}

export default Container;