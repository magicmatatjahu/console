import React from 'react';
import Grid from 'styled-components-grid';

import { Button, InformationModal } from '@kyma-project/react-components';

import { List, Item, Bold } from './styled';

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
    const { title, data, modalOpeningComponent } = this.props;
    const { encoded } = this.state;

    const items = this.populateItems(data, encoded);
    const content = <List>{items}</List>;
    const footer = (
      <Button normal first last onClick={this.toggleEncoded}>
        {encoded ? 'Decode' : 'Encode'}
      </Button>
    );

    return (
      <InformationModal
        title={title}
        content={content}
        footer={footer}
        modalOpeningComponent={modalOpeningComponent}
      />
    );
  }
}

export default SecretDataModal;
