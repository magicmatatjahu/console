import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@kyma-project/react-components';

import ServiceClassToolbar from './ServiceClassToolbar/ServiceClassToolbar.component';
import ServiceClassInfo from './ServiceClassInfo/ServiceClassInfo.component';
import ServiceClassDescription from './ServiceClassDescription/ServiceClassDescription.component';
import ServiceClassTabs from './ServiceClassTabs/ServiceClassTabs.component';
import CreateInstanceModal from './CreateInstanceModal/CreateInstanceModal.container';

import {
  ServiceClassDetailsWrapper,
  LeftSideWrapper,
  CenterSideWrapper,
} from './styled';

import { getResourceDisplayName, getDescription } from '../../commons/helpers';
import { CONTENT } from '../../commons/graphql-errors';

class ServiceClassDetails extends React.Component {
  static propTypes = {
    serviceClass: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    createServiceInstance: PropTypes.func.isRequired,
    modulesDisabled: PropTypes.object.isRequired,
  };

  render() {
    const { serviceClass, history, createServiceInstance, modulesDisabled } = this.props;
    const isContentModuleDisabled = modulesDisabled[CONTENT];

    const serviceClassDisplayName = getResourceDisplayName(serviceClass);
    const serviceClassDescription = getDescription(serviceClass);

    const modalOpeningComponent = (
      <Button normal primary first last microFullWidth data-e2e-id="add-to-env">
        Add to your Namespace
      </Button>
    );

    return (
      <div>
        {serviceClass && (
          <div>
            <div> {this.arrayOfJsx} </div>
            {this.renObjData}
            <ServiceClassToolbar
              arrayOfJsx={this.arrayOfJsx}
              renObjData={this.renObjData}
              history={history}
              serviceClassDisplayName={serviceClassDisplayName}
            >
              <CreateInstanceModal
                serviceClass={serviceClass}
                modalOpeningComponent={modalOpeningComponent}
                createServiceInstance={createServiceInstance}
              />
            </ServiceClassToolbar>

            <ServiceClassDetailsWrapper phoneRows>
              <LeftSideWrapper>
                <ServiceClassInfo
                  serviceClassDisplayName={serviceClassDisplayName}
                  providerDisplayName={serviceClass.providerDisplayName}
                  creationTimestamp={serviceClass.creationTimestamp}
                  documentationUrl={serviceClass.documentationUrl}
                  supportUrl={serviceClass.supportUrl}
                  imageUrl={serviceClass.imageUrl}
                  tags={serviceClass.tags}
                  labels={serviceClass.labels}
                />
              </LeftSideWrapper>
              <CenterSideWrapper>
                {serviceClassDescription && (
                  <ServiceClassDescription
                    description={serviceClassDescription}
                  />
                )}
                {!isContentModuleDisabled && (
                  <ServiceClassTabs
                    serviceClass={serviceClass}
                  />
                )}
              </CenterSideWrapper>
            </ServiceClassDetailsWrapper>
          </div>
        )}
      </div>
    );
  }
}

export default ServiceClassDetails;
