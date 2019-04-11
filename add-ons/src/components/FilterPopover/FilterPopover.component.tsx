import React from 'react';
import { Popover, Button, Counter } from 'fundamental-react';

import FilterPopoverBody from "./FilterPopoverBody.component";

interface FilterPopoverProps {
  body: React.ReactNode;
  activeFiltersLength: number;
}

export const FilterPopover: React.FunctionComponent<FilterPopoverProps> = ({
  body,
  activeFiltersLength,
}) => {
  const control = (
    <Button glyph="filter" option="light">
      {activeFiltersLength > 0 && (
        <Counter notification>
          {activeFiltersLength}
        </Counter>
      )}
    </Button>
  );

  return (
    <Popover
      body={body}
      control={control}
      placement="bottom"
      className="fd-popover__popper"
    />
  )
}

export default FilterPopover;