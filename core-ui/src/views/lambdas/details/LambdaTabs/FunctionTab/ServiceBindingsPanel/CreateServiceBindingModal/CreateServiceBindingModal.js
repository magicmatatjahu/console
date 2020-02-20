import React, { useRef, useState, useEffect } from 'react';
import { FormItem, FormLabel, FormInput } from 'fundamental-react';

import { useServiceBindings } from 'views/lambdas/services/service-bindings';

import ServiceBindingSchemaForm from './ServiceBindingSchemaForm';

import CheckBox from 'views/lambdas/components/CheckBox/CheckBox';

export default function CreateServiceBindingModal({
  onChange,
  onCompleted,
  onError,
  formElementRef,
}) {
  const { serviceInstances, createServiceBinding } = useServiceBindings();

  const [
    bindingCreateParameterSchema,
    setBindingCreateParameterSchema,
  ] = useState({});
  const serviceInstanceNameRef = useRef(null);
  const envPrefixRef = useRef(null);
  const createCredentialsRef = useRef(null);
  const bindingSchemaFormRef = useRef(null);
  const existingBindingRef = useRef(null);

  useEffect(() => {
    let schema = serviceInstances.find(
      service =>
        serviceInstanceNameRef &&
        service.name === serviceInstanceNameRef.current.value,
    );

    if (schema) {
      schema = schema.servicePlan.bindingCreateParameterSchema;
      setBindingCreateParameterSchema(schema);
    }
  }, [serviceInstanceNameRef]);

  async function handleFormSubmit() {
    const serviceBindingUsageParameters = {
      envPrefix: envPrefixRef.current.value,
    };
    const variables = {
      serviceInstanceName: serviceInstanceNameRef.current.value,
      serviceBindingUsageParameters,
      createCredentials: createCredentialsRef.current.value,
      bindingSchemaForm: bindingSchemaFormRef,
      existingBinding: existingBindingRef.current.value,
    };

    await createServiceBinding(variables);
  }

  const serviceInstancesNames = serviceInstances.map(serviceInstance => (
    <option value={serviceInstance.name}>{serviceInstance.name}</option>
  ));

  const showBindingSchemaForm =
    serviceInstanceNameRef &&
    serviceInstanceNameRef.current &&
    serviceInstanceNameRef.current.value &&
    createCredentialsRef &&
    createCredentialsRef.current &&
    createCredentialsRef.current.value;

  return (
    <form
      ref={formElementRef}
      style={{ width: '30em' }}
      onChange={onChange}
      onSubmit={handleFormSubmit}
    >
      <FormItem>
        <FormLabel htmlFor="serviceInstanceName">
          Service Instance Name
        </FormLabel>
        <select
          id="serviceInstanceName"
          defaultValue=""
          ref={serviceInstanceNameRef}
        >
          <option></option>
          {serviceInstancesNames}
        </select>
      </FormItem>

      <FormItem>
        <FormLabel htmlFor="envPrefix">Env Prefix</FormLabel>
        <FormInput
          id="envPrefix"
          placeholder="Field placeholder text"
          type="text"
          ref={envPrefixRef}
        />
      </FormItem>

      <FormItem>
        <CheckBox
          id="createCredentials"
          name="createCredentials"
          value="Create new credentials"
          ref={createCredentialsRef}
        />
      </FormItem>

      {/* {showBindingSchemaForm && (
        <ServiceBindingSchemaForm
          bindingCreateParameterSchema={bindingCreateParameterSchema}
          bindingSchemaFormRef={bindingSchemaFormRef}
        />
      )} */}
    </form>
  );
}
