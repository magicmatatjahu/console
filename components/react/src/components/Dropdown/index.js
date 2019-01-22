import React from 'react';
import PropTypes from 'prop-types';

import { RelativeWrapper, DropdownWrapper } from './components';
import { Dropdown as Drpd } from '../../fundamentals-react/Dropdown/Dropdown';
import { Button } from '../../fundamentals-react/Button/Button';
import { Popover } from '../../fundamentals-react/Popover/Popover';
import { Menu, MenuList } from '../../fundamentals-react/Menu/Menu';

class Dropdown extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    enabled: PropTypes.bool,
    firstButton: PropTypes.bool,
    lastButton: PropTypes.bool,
    buttonWidth: PropTypes.string,
    marginTop: PropTypes.string,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    arrowTop: PropTypes.bool,
    arrowTopRight: PropTypes.string,
    control: PropTypes.any.isRequired,
    noArrow: PropTypes.bool,
  };

  static defaultProps = {
    enabled: true,
  };

  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.state = {
      visible: false,
      noArrow: false,
    };
  }

  toggleDropdown = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  collapse = () => {
    this.setState({
      visible: false,
    });
  };

  handleClickOutside = e => {
    if (this.node.contains(e.target)) {
      return;
    }
    this.collapse();
  };

  render() {
    const {
      enabled,
      name,
      children,
      firstButton,
      lastButton,
      buttonWidth,
      marginTop,
      primary,
      secondary,
      arrowTop,
      arrowTopRight,
      control,
      noArrow,
    } = this.props;
    const { visible } = this.state;
    const itemId = name
      ? name
          .split(' ')
          .join('-')
          .toLowerCase()
      : '';

    return (
      <Drpd>
        <Popover
          noArrow={noArrow}
          alignment="right"
          control={control}
          body={children}
        />
      </Drpd>
    );
  }
}

export default Dropdown;
