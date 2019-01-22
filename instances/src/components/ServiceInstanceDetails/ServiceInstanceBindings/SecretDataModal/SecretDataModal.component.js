import React, { Fragment } from 'react';
import Grid from 'styled-components-grid';
import styled from 'styled-components';
import LuigiClient from '@kyma-project/luigi-client';
import {
  Button,
  InformationModal,
  NewModal as UnstyledModal,
} from '@kyma-project/react-components';
import { List, Item, Bold, Text } from './styled';

const Modal = styled(UnstyledModal)`
  && .fd-modal {
    max-width: unset;
  }
  && .fd-modal__content {
    max-width: unset;
    width: 681px;
  }
`;

class SecretDataModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      encoded: true,
    };
  }

  toggleEncoded = () => {
    this.setState({
      encoded: !this.state.encoded,
    });
  };

  populateItems = (data, encoded) => {
    return Object.entries(data).map(([key, value]) => (
      <Grid key={key}>
        <Grid.Unit size={0.25}>
          <Item>
            <Bold>{key}</Bold>
          </Item>
        </Grid.Unit>
        <Grid.Unit size={0.75}>
          <Item>{encoded ? this.randomizeAsterisks(data[key]) : value}</Item>
        </Grid.Unit>
      </Grid>
    ));
  };

  randomizeAsterisks = value => {
    return '*'.repeat(Math.ceil(value.length / 10) * 4);
  };

  render() {
    const { title, data, prefix, showModal } = this.props;
    const { encoded } = this.state;

    const items = this.populateItems(data, encoded);
    const content = (
      <Fragment>
        {prefix && (
          <Text>
            All variables will be prefixed with: <Bold>'{prefix}'</Bold>.
          </Text>
        )}
        <List>{items}</List>
      </Fragment>
    );
    const footer = (
      <Button normal first last onClick={this.toggleEncoded}>
        {encoded ? 'Decode' : 'Encode'}
      </Button>
    );
    showModal && LuigiClient.uxManager().addBackdrop();

    return (
      // <InformationModal
      //   title={title}
      //   content={content}
      //   footer={footer}
      //   modalOpeningComponent={modalOpeningComponent}
      //   onShow={() => LuigiClient.uxManager().addBackdrop()}
      //   onHide={() => LuigiClient.uxManager().removeBackdrop()}
      // />
      <Modal
        title={title}
        show={showModal}
        onClose={() => {
          LuigiClient.uxManager().removeBackdrop();
          this.props.onClose();
        }}
        actions={footer}
      >
        {content}
      </Modal>
    );
  }
}

export default SecretDataModal;
