import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { ServiceBindingsService } from './ServiceBindingsService';
import ServiceBindings from './ServiceBindings';
import { useServiceBindingUsagesQuery } from 'components/Lambdas/gql/hooks/queries';

export default function ServiceBindingsWrapper({
  lambda,
  setBindingUsages = () => void 0,
}) {
  const { bindingUsages = [], error, loading } = useServiceBindingUsagesQuery({
    lambda,
  });

  useEffect(() => {
    setBindingUsages(bindingUsages);
  }, [setBindingUsages, bindingUsages]);

  return (
    <ServiceBindingsService lambdaName={lambda.name}>
      <ServiceBindings serviceBindingUsages={bindingUsages} />
    </ServiceBindingsService>
  );
}

ServiceBindingsWrapper.propTypes = {
  lambda: PropTypes.object.isRequired,
  setBindingUsages: PropTypes.func.isRequired,
};
