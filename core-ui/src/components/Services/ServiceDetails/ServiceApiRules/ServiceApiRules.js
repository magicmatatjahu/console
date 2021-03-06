import React from 'react';

import ApiRuleStatus from 'components/ApiRules/ApiRuleStatus/ApiRuleStatus';
import {
  GoToApiRuleDetails,
  CopiableApiRuleHost,
  ApiRuleServiceInfo,
  ApiRuleAccessStrategiesList,
} from 'components/ApiRules/ApiRulesList/components';

import ApiRulesListWrapper from 'components/ApiRules/ApiRulesList/ApiRulesListWrapper';

const headerRenderer = () => ['', 'Name', 'Host', 'Port', 'Status'];
const textSearchProperties = [
  'name',
  'spec.service.host',
  'spec.service.port',
  'status.apiRuleStatus.code',
];

export default function ApiRules({ service, namespace }) {
  const rowRenderer = apiRule => ({
    cells: [
      <GoToApiRuleDetails apiRule={apiRule} />,
      <CopiableApiRuleHost apiRule={apiRule} />,
      <ApiRuleServiceInfo apiRule={apiRule} withName={false} />,
      <ApiRuleStatus apiRule={apiRule} />,
    ],
    collapseContent: (
      <ApiRuleAccessStrategiesList apiRule={apiRule} colSpan="6" />
    ),
    showCollapseControl: !!apiRule.spec.rules,
    withCollapseControl: true,
  });

  return (
    <ApiRulesListWrapper
      service={service}
      resourceType="Service"
      namespace={namespace}
      inSubView={true}
      redirectCtx="namespaces"
      redirectPath={`services/details/${service.name}`}
      headerRenderer={headerRenderer}
      rowRenderer={rowRenderer}
      textSearchProperties={textSearchProperties}
    />
  );
}
