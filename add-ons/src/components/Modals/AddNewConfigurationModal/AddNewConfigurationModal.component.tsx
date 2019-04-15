import React, { useState } from 'react';
import { Button, FormSet, FormItem, FormInput, FormLabel, FormMessage, Icon } from 'fundamental-react';

import Modal from "../Modal.component";

import {
  AddedUrl,
} from "./styled";

interface Props {
  nameField: any;
  labelsField: any;
  urlField: any;
  urls: string[];
  onSubmit: (event: any) => void;
  addUrl: () => void;
  removeUrl: (url: string) => void;
  setEmptyUrls: () => void;
}

export const AddNewConfigurationModal: React.FunctionComponent<Props> = ({
  nameField,
  labelsField,
  urlField,
  urls,
  onSubmit,
  addUrl,
  removeUrl,
  setEmptyUrls,
}) => {
  const openingComponent = (
    <Button glyph="add">
      Add New Configuration
    </Button>
  )

  const inlineHelp = (
    <span className="fd-inline-help fd-has-float-right">
      <span className="fd-inline-help__content fd-inline-help__content--bottom-left">
        Lorem ipsum dolor sit amet, consectetur adipiscing.
      </span>
    </span>
  )

  const addedUrls = () => {
    return urls.length ? urls.map(url => <AddedUrl onClick={() => removeUrl(url)} key={url}>{url}<Icon glyph="decline" /></AddedUrl>) : null
  }

  const onSubmitDisabled = !urls.length || nameField.error || !nameField.value || labelsField.error || urlField.error;

  return (
<Modal
        title="New Configuration"
        openingComponent={openingComponent}
        onSubmit={onSubmit}
        onSubmitDisabled={onSubmitDisabled}
        onOpen={() => {
          nameField.resetValue();
          nameField.resetError();

          labelsField.resetValue();
          labelsField.resetError();

          urlField.resetValue();
          urlField.resetError();
          
          setEmptyUrls();
        }}
      >
          <FormSet>
            <FormItem key="name">
              <FormLabel htmlFor="name" required>
                Name
              </FormLabel>
              <FormInput
                id="name"
                type="text"
                placeholder="Insert name"
                state={nameField.error ? "invalid" : "normal"}
                {...nameField.bind}
              />
              {nameField.error ? (
                <FormMessage type="error">
                  {nameField.error}
                </FormMessage>
              ) : null}
            </FormItem>
            <FormItem key="labels">
              <FormLabel htmlFor="labels">
                Labels
              </FormLabel>
              <FormInput
                id="labels"
                type="text"
                placeholder="Insert labels (optionally)"
                state={labelsField.error ? "invalid" : "normal"}
                {...labelsField.bind}
              />
              {labelsField.error ? (
                <FormMessage type="error">
                  {labelsField.error}
                </FormMessage>
              ) : null}
            </FormItem>
            <FormItem key="url">
              <FormLabel htmlFor="url" required>
                Url{inlineHelp}
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

export default AddNewConfigurationModal;
