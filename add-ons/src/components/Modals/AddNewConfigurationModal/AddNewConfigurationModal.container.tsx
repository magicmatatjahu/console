import React, { useState, useEffect, useContext } from 'react';

import { useInput } from "../../../services/Forms";
import MutationsService from "../../../services/Mutations.service";

import Component from "./AddNewConfigurationModal.component";

interface Props {}

export const Container: React.FunctionComponent<Props> = () => {
  const { createAddonsConfiguration } = useContext(MutationsService.Context);

  // Urls
  const [urls, setUrls] = useState<string[]>(["dupa.yaml"]);
  const addUrl = () => {
    setUrls(urls => [...urls, urlField.value])
    urlField.resetValue();
  }
  const removeUrl = (url: string) => {
    setUrls(urls => urls.filter(u => u !== url))
  }

  // Form
  const validateName = (value: string): string => {
    return !value || value.length < 4 ? "Name field cannot be empty" : "";
  }

  const validateLabels = (value: string): string => {
    return !value || value.length < 4 ? "Name field cannot be empty" : "";
  }

  const validateUrl = (value: string): string => {
    if (urls.includes(value)) return "Url already exists";

    if (!(value.endsWith("yaml") || value.endsWith("yml"))) return "Url must have yaml or yml extension"
    return "";
  }
  
  const nameField = useInput("", validateName);
  const labelsField = useInput("", validateLabels);
  const urlField = useInput("", validateUrl);

  const onSubmit = () => {
    let urlsToCreated: string[] = [...urls];
    if (urlField.value) urlsToCreated.push(urlField.value);

    createAddonsConfiguration({ variables: { 
      name: nameField.value, 
      urls: urlsToCreated,
      labels: { dupa: "lol" }
    } })
  }

  const setEmptyUrls = () => {
    setUrls([]);
  }

  return (
    <Component 
      nameField={nameField}
      labelsField={labelsField}
      urlField={urlField}
      onSubmit={onSubmit}
      urls={urls}
      addUrl={addUrl}
      removeUrl={removeUrl}
      setEmptyUrls={setEmptyUrls}
    />
  )
}

export default Container;