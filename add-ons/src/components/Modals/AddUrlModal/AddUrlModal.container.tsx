import React, { useState, useEffect, useContext } from 'react';

import { useInput } from "../../../services/Forms";
import MutationsService from "../../../services/Mutations.service";
import ConfigurationsService from "../../../services/Configurations.service";

import Component from "./AddUrlModal.component";
import { DEFAULT_CONFIGURATION } from "../../../constants";

interface Props {
  configurationName?: string;
}

export const Container: React.FunctionComponent<Props> = ({
  configurationName,
}) => {
  const { addAddonsConfigurationUrls } = useContext(MutationsService.Context);
  const { configurationNames } = useContext(ConfigurationsService.Context);

  // Urls
  const [urls, setUrls] = useState<string[]>(["dupa.yaml"]);
  const addUrl = () => {
    setUrls(urls => [...urls, urlField.value])
    urlField.resetValue();
  }
  const removeUrl = (url: string) => {
    setUrls(urls => urls.filter(u => u !== url))
  }

  const validateUrl = (value: string): string => {
    if (urls.includes(value)) return "Url already exists";

    if (!(value.endsWith("yaml") || value.endsWith("yml"))) return "Url must have yaml or yml extension"
    return "";
  }
  
  const urlField = useInput("", validateUrl);
  const configurationNameField = useInput("", validateUrl);

  const onSubmit = () => {
    let urlsToCreated: string[] = [...urls];
    if (urlField.value) urlsToCreated.push(urlField.value);

    let name: string;
    if (!configurationNameField.value) {
      name = configurationName ? configurationName : configurationNames[0];
    } else {
      name = configurationNameField.value;
    }

    addAddonsConfigurationUrls({ variables: { name, urls: urlsToCreated } });
  }

  const setEmptyUrls = () => {
    setUrls([]);
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
      setEmptyUrls={setEmptyUrls}
    />
  )
}

export default Container;