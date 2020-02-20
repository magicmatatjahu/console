import React, { useState } from 'react';

import { JsonSchemaForm } from '@kyma-project/react-components';

export default function ServiceBindingSchemaForm({
  bindingCreateParameterSchema = {},
  children = null,
  bindingSchemaFormRef = null,
}) {
  const [schemaData, setSchemaData] = useState();

  function onChangeSchemaForm({ formData }) {
    setSchemaData(formData);
  }

  return (
    <JsonSchemaForm
      schema={bindingCreateParameterSchema}
      onChange={onChangeSchemaForm}
      liveValidate={true}
      formData={schemaData}
      ref={bindingSchemaFormRef}
    >
      {children}
    </JsonSchemaForm>
  );
}
