import React from 'react';
import { Popover, Button, Counter } from 'fundamental-react';

import FilterPopoverBody from './FilterPopoverBody.component';

interface Props {
  body: React.ReactNode;
  activeFiltersLength: number;
  configurationsExist: boolean;
}

export const FilterPopover: React.FunctionComponent<Props> = ({
  body,
  activeFiltersLength,
  configurationsExist,
}) => {
  const control = (
    <Button
      glyph="filter"
      option="light"
      compact
      disabled={!configurationsExist}
    >
      {activeFiltersLength > 0 && (
        <Counter notification>{activeFiltersLength}</Counter>
      )}
    </Button>
  );

  return (
    <Popover
      body={body}
      control={control}
      placement="bottom-end"
      className="fd-popover__popper"
    />
  );
};

export default FilterPopover;
