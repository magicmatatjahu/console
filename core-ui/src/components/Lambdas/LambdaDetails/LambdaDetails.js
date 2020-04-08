import React, { useState } from 'react';
import { TabGroup, Tab } from 'fundamental-react';

import LambdaDetailsHeader from './LambdaDetailsHeader/LambdaDetailsHeader';

import CodeTab from './Tabs/Code/CodeTab';
import ConfigurationTab from './Tabs/Configuration/Configuration';

export default function LambdaDetails({ lambda }) {
  const [bindingUsages, setBindingUsages] = useState([]);

  return (
    <>
      <LambdaDetailsHeader lambda={lambda} />
      <TabGroup>
        <Tab key="lambda-code" id="lambda-code" title="Code">
          <CodeTab lambda={lambda} bindingUsages={bindingUsages} />
        </Tab>

        <Tab
          key="lambda-configuration"
          id="lambda-configuration"
          title="Configuration"
        >
          <ConfigurationTab
            lambda={lambda}
            setBindingUsages={setBindingUsages}
          />
        </Tab>
      </TabGroup>
    </>
  );
}
