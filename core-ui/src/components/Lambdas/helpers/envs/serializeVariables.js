import { newVariableModel } from './newVariableModel';
import { VARIABLE_TYPE, VARIABLE_VALIDATION } from './constants';

export function serializeVariables({
  lambdaVariables = [],
  bindingUsages = [],
}) {
  const bindingUsageVariableNames = [];
  let bindingUsageVariables = bindingUsages.flatMap(bindingUsage => {
    const variables = retrieveVariablesFromBindingUsage(bindingUsage);
    bindingUsageVariableNames.push(...variables);
    return variables;
  });

  const customVariablesNames = [];
  const customVariables = [];
  const customValueFromVariables = [];

  lambdaVariables.forEach(variable => {
    // at the moment save custom variables with valueFrom field in separate array
    // we don't support yet defining in UI variables with configMapKeyRef and secretKeyRef
    const isValueFromVariable =
      variable.valueFrom && Object.keys(variable.valueFrom).length;
    if (isValueFromVariable) {
      customValueFromVariables.push(variable);
      return;
    }

    customVariablesNames.push(variable.name);
    customVariables.push(
      newVariableModel({
        type: VARIABLE_TYPE.CUSTOM,
        variable: {
          name: variable.name,
          value: variable.value,
        },
        additionalProps: { dirty: true },
      }),
    );
  });

  bindingUsageVariables = bindingUsageVariables.map(
    (variableName, id, array) => {
      let validation = VARIABLE_VALIDATION.NONE;

      const canOverrideByCustomVar = customVariablesNames.includes(
        variableName,
      );
      const canOverrideBySBU = array.some(
        (v, vid) => vid !== id && v === variableName,
      );

      if (canOverrideByCustomVar && canOverrideBySBU) {
        validation = VARIABLE_VALIDATION.CAN_OVERRIDE_BY_CUSTOM_ENV_AND_SBU;
      } else if (canOverrideByCustomVar) {
        validation = VARIABLE_VALIDATION.CAN_OVERRIDE_BY_CUSTOM_ENV;
      } else if (canOverrideBySBU) {
        validation = VARIABLE_VALIDATION.CAN_OVERRIDE_BY_SBU;
      }

      return newVariableModel({
        type: VARIABLE_TYPE.BINDING_USAGE,
        variable: {
          name: variableName,
        },
        validation,
      });
    },
  );

  return {
    customVariables,
    customValueFromVariables,
    injectedVariables: bindingUsageVariables,
  };
}

function retrieveVariablesFromBindingUsage(bindingUsage) {
  let envPrefix = '';
  if (bindingUsage.parameters && bindingUsage.parameters.envPrefix) {
    envPrefix = bindingUsage.parameters.envPrefix.name || '';
  }

  const secretData =
    bindingUsage.serviceBinding.secret &&
    bindingUsage.serviceBinding.secret.data;

  const envs = Object.keys(secretData || {});
  if (!envs.length) {
    return [];
  }

  return envs.map(env => `${envPrefix}${env}`);
}
