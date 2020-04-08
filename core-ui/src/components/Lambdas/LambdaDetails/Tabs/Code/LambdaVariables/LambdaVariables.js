import React from 'react';

import { Icon, Badge } from 'fundamental-react';
import { Tooltip, TooltipType } from '@kyma-project/components';
import { GenericList } from 'react-shared';

import EditVariablesModal from './EditVariablesModal';

import {
  VARIABLE_VALIDATION,
  VARIABLE_TYPE,
  WARNINGS_VARIABLE_VALIDATION,
} from 'components/Lambdas/helpers/envs';
import {
  ENVIRONMENT_VARIABLES_PANEL,
  ERRORS,
} from 'components/Lambdas/constants';

import './LambdaEnvs.scss';

const headerRenderer = () => ['Variable Name', '', 'Value', 'Type', ''];
const textSearchProperties = ['name', 'value', 'type'];

function VariableStatus({ validation, type }) {
  if (!WARNINGS_VARIABLE_VALIDATION.includes(validation)) {
    return null;
  }

  const statusClassName = 'fd-has-color-status-2';
  const control = (
    <div>
      <span className={statusClassName}>Warning</span>
      <Icon
        glyph="message-warning"
        size="s"
        className={`${statusClassName} fd-has-margin-left-tiny`}
      />
    </div>
  );

  let message = '';
  switch (validation) {
    case VARIABLE_VALIDATION.CAN_OVERRIDE_SBU: {
      message = ENVIRONMENT_VARIABLES_PANEL.WARNINGS.VARIABLE_CAN_OVERRIDE_SBU;
      break;
    }
    case VARIABLE_VALIDATION.CAN_OVERRIDE_BY_CUSTOM_ENV_AND_SBU: {
      message =
        ENVIRONMENT_VARIABLES_PANEL.WARNINGS.SBU_CAN_BE_OVERRIDE
          .BY_CUSTOM_ENV_AND_SBU;
      break;
    }
    case VARIABLE_VALIDATION.CAN_OVERRIDE_BY_CUSTOM_ENV: {
      message =
        ENVIRONMENT_VARIABLES_PANEL.WARNINGS.SBU_CAN_BE_OVERRIDE.BY_CUSTOM_ENV;
      break;
    }
    case VARIABLE_VALIDATION.CAN_OVERRIDE_BY_SBU: {
      message = ENVIRONMENT_VARIABLES_PANEL.WARNINGS.SBU_CAN_BE_OVERRIDE.BY_SBU;
      break;
    }
    default: {
      message = ENVIRONMENT_VARIABLES_PANEL.WARNINGS.VARIABLE_CAN_OVERRIDE_SBU;
    }
  }

  const content = <span>{message}</span>;
  return (
    <Tooltip content={content} type={TooltipType.WARNING} minWidth="320px">
      {control}
    </Tooltip>
  );
}

function VariableType({ type }) {
  let message = ENVIRONMENT_VARIABLES_PANEL.VARIABLE_TYPE.CUSTOM;
  let badgeType;

  if (type === VARIABLE_TYPE.BINDING_USAGE) {
    message = ENVIRONMENT_VARIABLES_PANEL.VARIABLE_TYPE.BINDING_USAGE;
    badgeType = 'warning';
  }

  return <Badge type={badgeType}>{message}</Badge>;
}

export default function LambdaEnvs({
  lambda,
  customVariables,
  customValueFromVariables,
  injectedVariables,
}) {
  const rowRenderer = variable => [
    <span>{variable.name}</span>,
    <span className="sap-icon--arrow-right" />,
    <span>{variable.value || '-'}</span>,
    <VariableType type={variable.type} />,
    <VariableStatus validation={variable.validation} type={variable.type} />,
  ];

  const editEnvsModal = (
    <EditVariablesModal
      lambda={lambda}
      customVariables={customVariables}
      customValueFromVariables={customValueFromVariables}
      injectedVariables={injectedVariables}
    />
  );

  return (
    <div className="lambda-variables">
      <GenericList
        title={ENVIRONMENT_VARIABLES_PANEL.LIST.TITLE}
        showSearchField={true}
        showSearchSuggestion={false}
        textSearchProperties={textSearchProperties}
        extraHeaderContent={editEnvsModal}
        entries={[...customVariables, ...injectedVariables]}
        headerRenderer={headerRenderer}
        rowRenderer={rowRenderer}
        notFoundMessage={ERRORS.RESOURCES_NOT_FOUND}
        noSearchResultMessage={ERRORS.NOT_MATCHING_SEARCH_QUERY}
      />
    </div>
  );
}
