import React, { useState } from 'react';
import { Button, FormSet, FormItem, FormInput, FormLabel, FormMessage, Icon, FormSelect } from 'fundamental-react';

import Modal from "../Modal.component";

import {
  AddedUrl,
} from "./styled";

interface Props {
  configurationName?: string;
  configurations: string[];
  configurationNameField: any;
  urlField: any;
  urls: string[];
  onSubmit: (event: any) => void;
  addUrl: () => void;
  removeUrl: (url: string) => void;
  setEmptyUrls: () => void;
}

export const Component: React.FunctionComponent<Props> = ({
  configurationName = "",
  configurations,
  configurationNameField,
  urlField,
  urls,
  onSubmit,
  addUrl,
  removeUrl,
  setEmptyUrls,
}) => {
  const openingComponent = (
    <Button glyph="add" option="light" compact>
      Add URL
    </Button>
  )

  const addedUrls = () => {
    return urls.length ? urls.map(url => <AddedUrl onClick={() => removeUrl(url)} key={url}>{url}<Icon glyph="decline" /></AddedUrl>) : null
  }

  const onSubmitDisabled = !urls.length || urlField.error;

  return (
      <Modal
        title="Add URL"
        openingComponent={openingComponent}
        onSubmit={onSubmit}
        onSubmitDisabled={onSubmitDisabled}
        confirmText="Add"
        onOpen={() => {
          urlField.resetValue();
          urlField.resetError();

          configurationNameField.resetValue();
          
          setEmptyUrls();
        }}
      >
          <FormSet>
            <FormItem key="configurationName">
              <FormLabel htmlFor="configurationName" required>
                Configuration
              </FormLabel>
              <FormSelect 
                id="configurationName"
                {...configurationNameField.bind}
                disabled={Boolean(configurationName)}
              >
                {configurations.map((name, idx) => (
                  <option 
                    key={name} 
                    value={name}
                  >
                    {name}
                  </option>
                ))}
              </FormSelect>
            </FormItem>
            <FormItem key="url">
              <FormLabel htmlFor="url">
                Url
              </FormLabel>
              {addedUrls()}
              <FormInput
                id="url"
                type="text"
                placeholder="Insert repository URL"
                state={urlField.error ? "invalid" : "normal"}
                {...urlField.bind}
              />
              {urlField.error ? (
                <FormMessage type="error">
                  {urlField.error}
                </FormMessage>
              ) : null}
            </FormItem>
          </FormSet>
          <Button glyph="add" onClick={addUrl} option="light" compact disabled={Boolean(urlField.error || !urlField.value)}>
            Add URL
          </Button>
      </Modal>
  )
}

export default Component;
