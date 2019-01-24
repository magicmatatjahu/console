import React from 'react';

import { Search } from '@kyma-project/react-components';

const SearchDropdown = ({ onChange }) => {
  return (
    <Search noSearchBtn placeholder="Search" onChange={onChange} />
  );
};

export default SearchDropdown;
