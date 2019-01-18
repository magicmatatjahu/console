import React from 'react';

import {
  Dropdown,
  Text,
  MenuList,
  MenuItem,
  Menu,
  CheckBox,
  FormFieldset,
  FormInput,
  FormLabel,
  FormItem,
  Panel,
  PanelBody,
} from '@kyma-project/react-components';

import { List, Item, Checkmark } from './styled';

const FilterDropdown = ({ filter, activeValues = [], onChange }) =>
  !filter ? null : (
    <Dropdown name="Filter" enabled={filter.values && filter.values.length > 0}>
      <Panel>
        <PanelBody>
          <FormFieldset>
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
          </FormFieldset>
        </PanelBody>
      </Panel>

      {/* <MenuList>
        {filter.values.map(item => {
          const count = item.count !== null ? ` (${item.count})` : '';
          const active = activeValues.some(value => value === item.value);

          return (
            <MenuItem
              key={item.name}
              onClick={() => onChange(filter.name, item.value)}
            >
              <Checkmark checked={active} />

              {item.name}
              {count}
            </MenuItem>
          );
        })}
      </MenuList> */}
    </Dropdown>
  );

export default FilterDropdown;
