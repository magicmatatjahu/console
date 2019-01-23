import React from 'react';

import {
  Dropdown,
  FormSet,
  FormInput,
  FormItem,
} from '@kyma-project/react-components';

import { FormLabel, Panel, PanelBody } from './styled';

const FilterDropdown = ({ filter, activeValues = [], onChange }) =>
  !filter ? null : (
    <Dropdown name="Filter" enabled={filter.values && filter.values.length > 0}>
      <Panel>
        <PanelBody>
          <FormSet>
            {filter.values.map((item, index) => {
              const count = item.count !== null ? ` (${item.count})` : '';
              // const active = activeValues.some(value => value === item.value);

              return (
                <FormItem isCheck key={index}>
                  <FormInput
                    type="checkbox"
                    id={`checkbox-${index}`}
                    name={`checkbox-name-${index}`}
                    onClick={() => onChange(filter.name, item.value)}
                  />
                  <FormLabel>
                    {item.name}
                    {count}
                  </FormLabel>
                </FormItem>
              );
            })}
          </FormSet>
        </PanelBody>
      </Panel>
    </Dropdown>
  );

export default FilterDropdown;
