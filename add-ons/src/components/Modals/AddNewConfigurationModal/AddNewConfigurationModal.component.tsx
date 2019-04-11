import React, { useState } from 'react';
import { Button, FormSet, FormItem, FormInput, FormLabel, FormMessage } from 'fundamental-react';

import Modal from "../Modal.component";

interface AddNewConfigurationModalComponentProps {
  
}

export const AddNewConfigurationModalComponent: React.FunctionComponent<AddNewConfigurationModalComponentProps> = () => {
  const [numberOfUrls, setNumberOfUrls] = useState<number>(1);

  const openingComponent = (
    <Button glyph="add">
      Add New Configuration
    </Button>
  )

  return (
    <div>
      <Modal
        title="New Configuration"
        openingComponent={openingComponent}
      >
        <FormSet>
          <FormItem>
            <FormLabel htmlFor="name" required>
              Name
            </FormLabel>
            <FormInput
              id="name"
              type="text"
            />
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="labels">
              Labels
            </FormLabel>
            <FormInput
              id="labels"
              type="text"
            />
          </FormItem>
          {Array.from(Array(numberOfUrls)).map((x, idx) => (
            <FormItem>
              <FormLabel htmlFor="labels">
                {`URL${numberOfUrls == 1 ? "" : ` ${idx + 1}`}`}
                {idx == 0 ? (
                  <span className="fd-inline-help fd-has-float-right">
                    <span className="fd-inline-help__content fd-inline-help__content--bottom-left">
                      Lorem ipsum dolor sit amet, consectetur adipiscing.
                    </span>
                  </span>
                ) : null}
              </FormLabel>
              <FormInput
                id="labels"
                type="text"
              />
            </FormItem>
          ))}
        </FormSet>
        <Button glyph="add" onClick={() => setNumberOfUrls(n => n+1)} type="light" compact>
          Add URL
        </Button>
      </Modal>
    </div>
  )
}

export default AddNewConfigurationModalComponent;
