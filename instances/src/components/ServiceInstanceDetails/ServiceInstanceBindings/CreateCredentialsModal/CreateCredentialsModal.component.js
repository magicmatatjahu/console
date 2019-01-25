import React, { Fragment } from 'react';
import dcopy from 'deep-copy';

import { Button, NewModal, Tooltip } from '@kyma-project/react-components';

import SchemaData from './SchemaData.component';
import { bindingVariables } from '../InfoButton/variables';
import InfoButton from '../InfoButton/InfoButton.component';

import { clearEmptyPropertiesInObject } from '../../../../commons/helpers';
import LuigiClient from '@kyma-project/luigi-client';

class CreateCredentialsModal extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    const serviceInstance = this.props.serviceInstance;
    const servicePlan =
      (serviceInstance &&
        (serviceInstance.servicePlan || serviceInstance.clusterServicePlan)) ||
      [];
    const bindingCreateParameterSchema =
      (servicePlan && servicePlan.bindingCreateParameterSchema) || null;

    return {
      servicePlan: servicePlan,
      bindingCreateParameterSchema: bindingCreateParameterSchema,
      bindingCreateParameters: {},
      tooltipData: null,
    };
  };

  clearState = () => {
    this.setState(this.getInitialState());
  };

  componentDidUpdate(nextProps, nextState) {
    if (nextState && nextState.tooltipData && nextState.tooltipData.show) {
      this.setState({
        tooltipData: null,
      });
    }
  }

  componentWillUnmount() {
    this.clearState();
  }

  callback = data => {
    this.setState({ ...data });
  };

  create = async (params, isOpenedModal) => {
    const { serviceInstance, createBinding, sendNotification } = this.props;

    try {
      let bindingCreateParameters;
      if (params && params.formData) {
        bindingCreateParameters = dcopy(params.formData);
        clearEmptyPropertiesInObject(bindingCreateParameters);
      } else {
        bindingCreateParameters = {};
      }
      const createdBinding = await createBinding(
        serviceInstance.name,
        bindingCreateParameters,
      );

      let createdBindingName;
      if (
        createdBinding &&
        createdBinding.data &&
        createdBinding.data.createServiceBinding &&
        createdBinding.data.createServiceBinding.name
      ) {
        createdBindingName = createdBinding.data.createServiceBinding.name;
      }

      if (isOpenedModal) {
        this.child.child.handleCloseModal();
      }

      if (typeof sendNotification === 'function') {
        sendNotification({
          variables: {
            content: `Credentials "${createdBindingName}" created successfully`,
            title: `${createdBindingName}`,
            color: '#359c46',
            icon: '\uE05B',
            instanceName: createdBindingName,
          },
        });
      }
    } catch (e) {
      this.setState({
        tooltipData: {
          type: 'error',
          title: 'Error occored during creation',
          content: e.message,
          show: true,
          minWidth: '261px',
        },
      });
    }
  };

  handleConfirmation = () => {
    if (this.submitBtn) {
      this.submitBtn.click();
    } else {
      this.create(null, true);
    }
  };

  handleOpen = () => {
    const { bindingCreateParameterSchema } = this.state;
    if (!bindingCreateParameterSchema) {
      this.create(null, true);
    }
  };
  createWithoutOpening = () => {
    const { bindingCreateParameterSchema } = this.state;
    if (!bindingCreateParameterSchema) {
      this.create(null);
    }
  };

  render() {
    const {
      bindingCreateParameters,
      tooltipData,
      bindingCreateParameterSchema,
      servicePlan,
    } = this.state;

    const { serviceInstance, id } = this.props;

    const disabled = !bindingCreateParameters;

    const schemaData = {
      bindingCreateParameters: bindingCreateParameters,
    };

    const bindingCreateParameterSchemaExists =
      bindingCreateParameterSchema &&
      (bindingCreateParameterSchema.$ref ||
        bindingCreateParameterSchema.properties);

    const content = [
      <Fragment key={serviceInstance.name}>
        <SchemaData
          data={schemaData}
          bindingCreateParameterSchema={bindingCreateParameterSchema}
          onSubmitSchemaForm={el => this.create(el, true)}
          planName={servicePlan.displayName}
          callback={this.callback}
        >
          {/* Styled components don't work here */}
          <button
            className="hidden"
            type="submit"
            ref={submitBtn => (this.submitBtn = submitBtn)}
          >
            Submit
          </button>
        </SchemaData>
      </Fragment>,
    ];

    const createCredentialsButton = (
      <Button compact option="light" data-e2e-id={id} onClick={this.handleOpen}>
        + Create Credentials
      </Button>
    );

    if (serviceInstance.status.type !== 'RUNNING') {
      return (
        <Tooltip
          type="error"
          content={
            <span>
              Instance must be in a <strong>Running</strong> state
            </span>
          }
          minWidth="161px"
        >
          <Button compact option="light" disabled={true}>
            + Create Credentials
          </Button>
        </Tooltip>
      );
    }

    if (!bindingCreateParameterSchemaExists) {
      return (
        <Button
          compact
          option="light"
          data-e2e-id={id}
          onClick={this.createWithoutOpening}
        >
          + Create Credentials
        </Button>
      );
    }

    const title = (
      <>
        <span>{'Bind Application'}</span>
        <InfoButton
          content={bindingVariables.serviceBinding}
          orientation="bottom"
        />
      </>
    );

    return (
      <NewModal
        ref={modal => {
          this.child = modal;
        }}
        key={serviceInstance.name}
        title={title}
        confirmText="Create"
        onConfirm={this.handleConfirmation}
        modalOpeningComponent={createCredentialsButton}
        disabledConfirm={disabled}
        tooltipData={tooltipData}
        handleClose={this.clearState}
        onShow={() => LuigiClient.uxManager().addBackdrop()}
        onHide={() => LuigiClient.uxManager().removeBackdrop()}
      >
        {content}
      </NewModal>
    );
  }
}

export default CreateCredentialsModal;
