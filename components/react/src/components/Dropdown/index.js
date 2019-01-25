import React from 'react';
import PropTypes from 'prop-types';

import { Popover } from './styled';
import { Dropdown as DropDownWrapper } from '../../fundamentals-react';
class Dropdown extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    enabled: PropTypes.bool,
    control: PropTypes.any.isRequired,
    noArrow: PropTypes.bool,
  };

  static defaultProps = {
    enabled: true,
  };

  render() {
    const { enabled, children, control, noArrow } = this.props;

    return (
      <DropDownWrapper disabled={!enabled}>
        <Popover
          noArrow={noArrow}
          alignment="right"
          control={control}
          body={children}
        />
      </DropDownWrapper>
    );
  }
}

export default Dropdown;
