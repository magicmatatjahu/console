import React from 'react';
import PropTypes from 'prop-types';

import { Popover } from './styled';
import { Dropdown as DropDownWrapper } from 'fundamental-react';

const Dropdown = ({ enabled = true, children, control, noArrow }) => (
  <DropDownWrapper disabled={!enabled}>
    <Popover
      noArrow={noArrow}
      alignment="right"
      control={control}
      body={children}
    />
  </DropDownWrapper>
);

Dropdown.propTypes = {
  children: PropTypes.any.isRequired,
  enabled: PropTypes.bool,
  control: PropTypes.any.isRequired,
  noArrow: PropTypes.bool,
};

export default Dropdown;
