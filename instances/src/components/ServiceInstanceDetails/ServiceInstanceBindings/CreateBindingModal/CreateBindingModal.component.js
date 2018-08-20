import React from 'react';

import { Tooltip, StepsModal } from '@kyma-project/react-components';

import FirstStep from './FirstStep.component';
import SecondStep from './SecondStep.component';

import { CreateBindingButton } from './styled';

import builder from '../../../../commons/builder';

class CreateBindingModal extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    return {
      checkbox: this.props.serviceInstance.serviceBindings.length === 0,
      nameServiceBinding: this.props.serviceInstance.name + '-binding',
      selectedExistingBinding: '',

      nameServiceBindingUsage:
        this.props.serviceInstance.name + '-binding-usage',
      selectedKind: '',
      selectedResource: '',
      usageKindResources: null,

      firstStepFilled: false,
      possibilityToCreate: false,
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

  prepareData = () => {
    const {
      checkbox,
      nameServiceBinding,
      nameServiceBindingUsage,
      selectedExistingBinding,
      selectedKind,
      selectedResource,
    } = this.state;

    return {
      name: nameServiceBindingUsage,
      environment: builder.getCurrentEnvironmentId(),
      serviceBindingRef: {
        name: checkbox ? nameServiceBinding : selectedExistingBinding,
      },
      usedBy: {
        kind: selectedKind.split(' ')[0],
        name: selectedResource,
      },
    };
  };

  create = async () => {
    const { checkbox, nameServiceBinding } = this.state;
    const {
      serviceInstance,
      createBinding,
      createBindingUsage,
      serviceInstanceRefetch,
    } = this.props;
    const dataToSend = this.prepareData();

    try {
      if (checkbox) {
        await createBinding(nameServiceBinding, serviceInstance.name);
      }
      await createBindingUsage(dataToSend);
      this.child.child.handleCloseModal();

      setTimeout(() => {
        if (typeof serviceInstanceRefetch === 'function') {
          serviceInstanceRefetch();
        }
      }, 1000);
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
    this.create();
  };

  render() {
    const {
      checkbox,
      nameServiceBinding,
      selectedExistingBinding,

      nameServiceBindingUsage,
      selectedKind,
      selectedResource,
      usageKindResources,

      firstStepFilled,
      possibilityToCreate,
      tooltipData,
    } = this.state;
    const { serviceInstance, usageKinds, fetchUsageKindResources } = this.props;

    const contentTexts = ['Service Binding', 'Service Binding Usage'];
    const currentStage =
      this.child && this.child.state && this.child.state.currentStage;
    const disabledNext =
      (!firstStepFilled && currentStage === 1) ||
      (!possibilityToCreate && currentStage === 2);

    const firstStepData = {
      checkbox: checkbox,
      nameServiceBinding: nameServiceBinding,
      selectedExistingBinding: selectedExistingBinding,
      firstStepFilled: firstStepFilled,
    };

    const secondStepData = {
      nameServiceBindingUsage: nameServiceBindingUsage,
      selectedKind: selectedKind,
      selectedResource: selectedResource,
      usageKindResources: usageKindResources,
      possibilityToCreate: possibilityToCreate,
    };

    const steps = [
      <FirstStep
        data={firstStepData}
        existingServiceBindings={serviceInstance.serviceBindings}
        callback={this.callback}
      />,
      <SecondStep
        data={secondStepData}
        usageKinds={usageKinds.usageKinds}
        fetchUsageKindResources={fetchUsageKindResources}
        callback={this.callback}
      />,
    ];

    const createBindingButton =
      serviceInstance.status.type === 'RUNNING' ? (
        <CreateBindingButton onClick={this.openModal}>
          + Create Binding
        </CreateBindingButton>
      ) : (
        <Tooltip
          type="error"
          content={
            <span>
              Instance must be in a <strong>Running</strong> state
            </span>
          }
          minWidth="161px"
        >
          <CreateBindingButton disabled={true}>
            + Create Binding
          </CreateBindingButton>
        </Tooltip>
      );

    return (
      <StepsModal
        ref={modal => {
          this.child = modal;
        }}
        title={'Create Binding'}
        contentTexts={contentTexts}
        confirmText="Create"
        content={steps}
        handleConfirmation={this.handleConfirmation}
        modalOpeningComponent={createBindingButton}
        disabledNext={disabledNext}
        tooltipData={tooltipData}
        handleClose={this.clearState}
      />
    );
  }
}

export default CreateBindingModal;
