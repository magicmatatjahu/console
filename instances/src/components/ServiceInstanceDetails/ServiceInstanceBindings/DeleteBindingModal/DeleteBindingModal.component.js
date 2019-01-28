import React, { Fragment } from 'react';

import {
  Modal,
  Button,
  Separator,
} from '@kyma-project/react-components';

import { TextWrapper, Text, Bold } from './styled';
import LuigiClient from '@kyma-project/luigi-client';

class DeleteBindingModal extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      bindingUsageChecked: props.deleteBindingUsage ? true : false,
      bindingChecked: props.deleteBinding && props.bindingExists,
    };
  }

  handleDeletion = async (shouldDeleteBindingUsage, shouldDeleteBinding) => {
    const {
      bindingName,
      bindingExists,
      bindingUsageName,
      deleteBindingUsage,
      deleteBinding,
    } = this.props;

    if (shouldDeleteBindingUsage) {
      await deleteBindingUsage(bindingUsageName);
    }
    if (shouldDeleteBinding && bindingExists) {
      await deleteBinding(bindingName);
    }
  };

  handleConfirmation = () => {
    const { bindingUsageChecked, bindingChecked } = this.state;
    this.handleDeletion(bindingUsageChecked, bindingChecked);
  };

  toggleBinding = () => {
    this.setState({
      bindingChecked: !this.state.bindingChecked,
    });
  };

  toggleBindingUsage = () => {
    this.setState({
      bindingUsageChecked: !this.state.bindingUsageChecked,
    });
  };

  render() {
    const {
      bindingName,
      bindingExists,
      bindingUsageName,
      relatedBindingUsage,
    } = this.props;
    const { bindingChecked, bindingUsageChecked } = this.state;

    const submitEnabled = bindingChecked || bindingUsageChecked;

    const modalContent = (
      <Fragment>
        <div>
          {bindingUsageName && (
            <TextWrapper>
              <Text>
                Are you sure you want to delete <Bold>{bindingUsageName}</Bold>.
              </Text>

              <Text warning>
                Removing Service Binding Usage will prevent your application
                from accessing the instance after its restart.
              </Text>
            </TextWrapper>
          )}

          {bindingExists && (
            <TextWrapper>
              <Text>
                Are you sure you want to delete <Bold>{bindingName}</Bold>.
              </Text>

              <Text warning>
                Removing Service Binding will make all related applications stop
                working.
              </Text>

              {relatedBindingUsage &&
                relatedBindingUsage.length > 0 && (
                  <Fragment>
                    <Separator margin="20px -16px" />
                    {relatedBindingUsage.map((binding, index) => (
                      <TextWrapper flex key={`relatedBindingUsage${index}`}>
                        <Text bold width={'200px'} margin={'0 20px 20px 0'}>
                          {index === 0 && 'Related Binding Usages'}
                        </Text>
                        <Text>{binding.name}</Text>
                      </TextWrapper>
                    ))}
                  </Fragment>
                )}
            </TextWrapper>
          )}
        </div>
      </Fragment>
    );

    return (
      <Modal
        ref={modal => (this.child = modal)}
        title='Warning'
        confirmText="Delete"
        onConfirm={this.handleConfirmation}
        modalOpeningComponent={
          <Button compact option="light" glyph="delete" />
        }
        type="negative"
        disabled={!submitEnabled}
        onShow={() => LuigiClient.uxManager().addBackdrop()}
        onHide={() => LuigiClient.uxManager().removeBackdrop()}
      >
        {modalContent}
      </Modal>
    );
  }
}

export default DeleteBindingModal;
