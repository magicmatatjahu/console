import React from 'react';
import { Popover, Button, Counter } from 'fundamental-react';

import FilterPopoverBody from "./FilterPopoverBody.component";

interface Props {
  body: React.ReactNode;
  activeFiltersLength: number;
}

export const FilterPopover: React.FunctionComponent<Props> = ({
  body,
  activeFiltersLength,
}) => {
  const control = (
    <Button glyph="filter" option="light" compact>
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