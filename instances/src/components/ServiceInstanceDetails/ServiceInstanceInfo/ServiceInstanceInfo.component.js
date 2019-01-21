import React from 'react';
import Grid from 'styled-components-grid';
import LuigiClient from '@kyma-project/luigi-client';

import {
  Label,
  Icon,
  Header,
  Separator,
  InformationModal,
  PanelActions,
} from '@kyma-project/react-components';

import {
  ServiceInstanceInfoWrapper,
  StretchedContentWrapper,
  CenterSideWrapper,
  ContentHeader,
  ContentDescription,
  Element,
  InfoIcon,
  PlanModalButton,
  ServiceClassButton,
  LabelWrapper,
  ExternalLink,
  JSONCode,
} from './styled';

import { getResourceDisplayName, statusColor } from '../../../commons/helpers';

const INFORMATION_KEY_SIZE = { mobile: 1, tablet: 0.5, desktop: 0.3 };
const INFORMATION_VALUE_SIZE = { mobile: 1, tablet: 0.5, desktop: 0.7 };

const ServiceInstanceInfo = ({ serviceInstance }) => {
  const statusIcon = statusType => {
    switch (statusType) {
      case ('PROVISIONING', 'DEPROVISIONING', 'PENDING'):
        return 'sys-help';
      case 'FAILED':
        return 'sys-cancel';
      case 'RUNNING':
        return 'sys-enter';
      default:
        return 'sys-help';
    }
  };

  const goToServiceClassDetails = name => {
    LuigiClient.linkManager()
      .fromContext('namespaces')
      .navigate(`service-catalog/details/${name}`);
  };

  if (!serviceInstance) {
    return null;
  }

  const instanceClass = serviceInstance.clusterServiceClass
    ? serviceInstance.clusterServiceClass
    : serviceInstance.serviceClass;
  const instancePlan = serviceInstance.clusterServicePlan
    ? serviceInstance.clusterServicePlan
    : serviceInstance.servicePlan;

  return (
    <ServiceInstanceInfoWrapper cols={3}>
      <CenterSideWrapper colSpan={2}>
        <ContentHeader>
          General Information
        </ContentHeader>

        <ContentDescription>
          <Grid>
            <Grid.Unit size={INFORMATION_KEY_SIZE}>
              <Element margin="0">Service Class</Element>
            </Grid.Unit>
            <Grid.Unit size={INFORMATION_VALUE_SIZE}>
              <Element margin="0" data-e2e-id="instance-service-class">
                {instanceClass && instanceClass.name ? (
                  <ServiceClassButton
                    onClick={() =>
                      goToServiceClassDetails(instanceClass.name)
                    }
                  >
                    {getResourceDisplayName(instanceClass)}
                  </ServiceClassButton>
                ) : (
                  '-'
                )}
              </Element>
            </Grid.Unit>
            <Grid.Unit size={INFORMATION_KEY_SIZE}>
              <Element>Plan</Element>
            </Grid.Unit>
            <Grid.Unit size={INFORMATION_VALUE_SIZE}>
              <Element>
                {serviceInstance.planSpec &&
                serviceInstance.planSpec !== null &&
                typeof serviceInstance.planSpec === 'object' &&
                Object.keys(serviceInstance.planSpec).length ? (
                  <InformationModal
                    modalOpeningComponent={
                      <PlanModalButton data-e2e-id="instance-service-plan">
                        {getResourceDisplayName(instancePlan)}
                      </PlanModalButton>
                    }
                    title="Instance Parameters"
                    content={
                      <JSONCode>
                        {JSON.stringify(
                          serviceInstance.planSpec,
                          undefined,
                          2,
                        )}
                      </JSONCode>
                    }
                  />
                ) : (
                  `${getResourceDisplayName(instancePlan) || '-'}`
                )}
              </Element>
            </Grid.Unit>
          </Grid>
          {serviceInstance.labels &&
            serviceInstance.labels.length > 0 && (
              <Grid>
                <Grid.Unit size={INFORMATION_KEY_SIZE}>
                  <Element>Labels</Element>
                </Grid.Unit>
                <Grid.Unit size={INFORMATION_VALUE_SIZE}>
                  <Element margin="1px 0 0 0">
                    {serviceInstance.labels.map(label => (
                      <LabelWrapper>
                        <Label key={label}>{label}</Label>
                      </LabelWrapper>
                    ))}
                  </Element>
                </Grid.Unit>
              </Grid>
            )}
          {instanceClass && instanceClass.documentationUrl ? (
            <Grid>
              <Grid.Unit size={INFORMATION_KEY_SIZE}>
                <Element
                  margin={
                    serviceInstance.labels &&
                    serviceInstance.labels.length > 0
                      ? '11px 0 0 0'
                      : '16px 0 0 0'
                  }
                >
                  Documentation
                </Element>
              </Grid.Unit>
              <Grid.Unit size={INFORMATION_VALUE_SIZE}>
                <Element
                  margin={
                    serviceInstance.labels &&
                    serviceInstance.labels.length > 0
                      ? '11px 0 0 0'
                      : '16px 0 0 0'
                  }
                >
                  <ExternalLink
                    href={instanceClass.documentationUrl}
                    target="_blank"
                    data-e2e-id="instance-service-documentation-link"
                  >
                    Link
                  </ExternalLink>
                </Element>
              </Grid.Unit>
            </Grid>
          ) : null}
          {instanceClass && instanceClass.supportUrl ? (
            <Grid>
              <Grid.Unit size={INFORMATION_KEY_SIZE}>
                <Element>Support</Element>
              </Grid.Unit>
              <Grid.Unit size={INFORMATION_VALUE_SIZE}>
                <Element>
                  <ExternalLink
                    href={instanceClass.supportUrl}
                    target="_blank"
                    data-e2e-id="instance-service-support-link"
                  >
                    Link
                  </ExternalLink>
                </Element>
              </Grid.Unit>
            </Grid>
          ) : null}
        </ContentDescription>
      </CenterSideWrapper>
      <CenterSideWrapper colSpan={1} color={statusColor(serviceInstance.status.type)}>
        <ContentHeader>
          Status
          <PanelActions>
            <Icon glyph={statusIcon(serviceInstance.status.type)} style={{ color: statusColor(serviceInstance.status.type) }} />
          </PanelActions>
        </ContentHeader>

        <ContentDescription>
          <Element margin="0" data-e2e-id="instance-status-type">
            {serviceInstance.status.type}
          </Element>
          <Element
            style={{ padding: '0' }}
            data-e2e-id="instance-status-message"
          >
            {serviceInstance.status.message}
          </Element>
        </ContentDescription>
      </CenterSideWrapper>
    </ServiceInstanceInfoWrapper>
  );
};

export default ServiceInstanceInfo;

{/* <ServiceInstanceInfoWrapper>
<Grid.Unit size={0.7}>
  <CenterSideWrapper margin={'left'}>
    <StretchedContentWrapper>
      <ContentHeader>
        <Header>General Information</Header>
      </ContentHeader>
      <Separator />
      <ContentDescription>
        <Grid>
          <Grid.Unit size={INFORMATION_KEY_SIZE}>
            <Element>Service Class</Element>
          </Grid.Unit>
          <Grid.Unit size={INFORMATION_VALUE_SIZE}>
            <Element data-e2e-id="instance-service-class">
              {instanceClass && instanceClass.name ? (
                <ServiceClassButton
                  onClick={() =>
                    goToServiceClassDetails(instanceClass.name)
                  }
                >
                  {getResourceDisplayName(instanceClass)}
                </ServiceClassButton>
              ) : (
                '-'
              )}
            </Element>
          </Grid.Unit>
          <Grid.Unit size={INFORMATION_KEY_SIZE}>
            <Element>Plan</Element>
          </Grid.Unit>
          <Grid.Unit size={INFORMATION_VALUE_SIZE}>
            <Element>
              {serviceInstance.planSpec &&
              serviceInstance.planSpec !== null &&
              typeof serviceInstance.planSpec === 'object' &&
              Object.keys(serviceInstance.planSpec).length ? (
                <InformationModal
                  modalOpeningComponent={
                    <PlanModalButton data-e2e-id="instance-service-plan">
                      {getResourceDisplayName(instancePlan)}
                    </PlanModalButton>
                  }
                  title="Instance Parameters"
                  content={
                    <JSONCode>
                      {JSON.stringify(
                        serviceInstance.planSpec,
                        undefined,
                        2,
                      )}
                    </JSONCode>
                  }
                />
              ) : (
                `${getResourceDisplayName(instancePlan) || '-'}`
              )}
            </Element>
          </Grid.Unit>
        </Grid>
        {serviceInstance.labels &&
          serviceInstance.labels.length > 0 && (
            <Grid>
              <Grid.Unit size={INFORMATION_KEY_SIZE}>
                <Element>Labels</Element>
              </Grid.Unit>
              <Grid.Unit size={INFORMATION_VALUE_SIZE}>
                <Element margin="1px 0 0 0">
                  {serviceInstance.labels.map(label => (
                    <LabelWrapper>
                      <Label key={label}>{label}</Label>
                    </LabelWrapper>
                  ))}
                </Element>
              </Grid.Unit>
            </Grid>
          )}
        {instanceClass && instanceClass.documentationUrl ? (
          <Grid>
            <Grid.Unit size={INFORMATION_KEY_SIZE}>
              <Element
                margin={
                  serviceInstance.labels &&
                  serviceInstance.labels.length > 0
                    ? '11px 0 0 0'
                    : '16px 0 0 0'
                }
              >
                Documentation
              </Element>
            </Grid.Unit>
            <Grid.Unit size={INFORMATION_VALUE_SIZE}>
              <Element
                margin={
                  serviceInstance.labels &&
                  serviceInstance.labels.length > 0
                    ? '11px 0 0 0'
                    : '16px 0 0 0'
                }
              >
                <ExternalLink
                  href={instanceClass.documentationUrl}
                  target="_blank"
                  data-e2e-id="instance-service-documentation-link"
                >
                  Link
                </ExternalLink>
              </Element>
            </Grid.Unit>
          </Grid>
        ) : null}
        {instanceClass && instanceClass.supportUrl ? (
          <Grid>
            <Grid.Unit size={INFORMATION_KEY_SIZE}>
              <Element>Support</Element>
            </Grid.Unit>
            <Grid.Unit size={INFORMATION_VALUE_SIZE}>
              <Element>
                <ExternalLink
                  href={instanceClass.supportUrl}
                  target="_blank"
                  data-e2e-id="instance-service-support-link"
                >
                  Link
                </ExternalLink>
              </Element>
            </Grid.Unit>
          </Grid>
        ) : null}
      </ContentDescription>
    </StretchedContentWrapper>
  </CenterSideWrapper>
</Grid.Unit>
<Grid.Unit size={0.3}>
  <CenterSideWrapper>
    <StretchedContentWrapper
      color={statusColor(serviceInstance.status.type)}
    >
      <ContentHeader>
        <Grid>
          <Grid.Unit size={0.9}>
            <Header>Status</Header>
          </Grid.Unit>
          <Grid.Unit size={0.1}>
            <InfoIcon color={statusColor(serviceInstance.status.type)}>
              <Icon icon={statusIcon(serviceInstance.status.type)} />
            </InfoIcon>
          </Grid.Unit>
        </Grid>
      </ContentHeader>
      <Separator />
      <ContentDescription>
        <Element data-e2e-id="instance-status-type">
          {serviceInstance.status.type}
        </Element>
        <Element
          style={{ padding: '0' }}
          data-e2e-id="instance-status-message"
        >
          {serviceInstance.status.message}
        </Element>
      </ContentDescription>
    </StretchedContentWrapper>
  </CenterSideWrapper>
</Grid.Unit>
</ServiceInstanceInfoWrapper> */}