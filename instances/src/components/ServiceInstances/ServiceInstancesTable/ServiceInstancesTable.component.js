import React from 'react';
import LuigiClient from '@kyma-project/luigi-client';

import {
  Button,
  Icon,
  ConfirmationModal,
  Table,
  Tooltip,
  InformationModal,
} from '@kyma-project/react-components';

import {
  LinkButton,
  Link,
  ServiceClassButton,
  AddServiceInstanceRedirectButton,
  ServicePlanButton,
  JSONCode,
  DeleteButtonWrapper,
  TextOverflowWrapper,
} from './styled';

import { getResourceDisplayName, statusColor } from '../../../commons/helpers';
import { SERVICE_CATALOG_ADDONS } from '../../../commons/graphql-errors';

function ServiceInstancesTable({ data, deleteServiceInstance, loading, modulesDisabled }) {
  const handleDelete = async element => {
    await deleteServiceInstance(element.name);
  };

  const displayBindingsUsages = (bindings = []) => {
    switch (bindings.length) {
      case 0:
        return '-';
      case 1:
        return bindings[0].name;
      default:
        return `Multiple (${bindings.length})`;
    }
  };

  const goToServiceCatalog = () => {
    LuigiClient.linkManager()
      .fromContext('namespaces')
      .navigate('service-catalog');
  };

  const goToServiceClassDetails = name => {
    LuigiClient.linkManager()
      .fromContext('namespaces')
      .navigate(`service-catalog/details/${name}`);
  };

  const goToServiceInstanceDetails = name => {
    LuigiClient.linkManager()
      .fromContext('namespaces')
      .navigate(`instances/details/${name}`);
  };

  const deleteButton = (
    <DeleteButtonWrapper>
      <Button padding={'0'} marginTop={'0'} marginBottom={'0'}>
        <Icon icon={'\uE03D'} />
      </Button>
    </DeleteButtonWrapper>
  );

  const addServiceInstanceRedirectButton = (
    <AddServiceInstanceRedirectButton onClick={goToServiceCatalog}>
      + Add Instance
    </AddServiceInstanceRedirectButton>
  );

  const tableSize = !modulesDisabled[SERVICE_CATALOG_ADDONS] ? {
    'Name': 0.2,
    'Service Class': 0.15,
    'Plan': 0.15,
    'Bound Applications': 0.2,
    'Status': 0.2,
    '': 0.1,
  } : {
    'Name': 0.25,
    'Service Class': 0.2,
    'Plan': 0.2,
    'Status': 0.25,
    '': 0.1,
  }

  const table = {
    title: 'Manage Service Instances',
    columns: [
      {
        name: 'Name',
        size: tableSize['Name'],
        accesor: el => (
          <TextOverflowWrapper>
            <LinkButton data-e2e-id="instance-name">
              <Link
                onClick={() => goToServiceInstanceDetails(el.name)}
                data-e2e-id={`instance-name-${el.name}`}
                title={el.name}
              >
                {el.name}
              </Link>
            </LinkButton>
          </TextOverflowWrapper>
        ),
      },
      {
        name: 'Service Class',
        size: tableSize['Service Class'],
        accesor: el => {
          const elClass = el.clusterServiceClass || el.serviceClass;
          if (!elClass || !elClass.name) {
            return '-';
          }

          const classTitle = getResourceDisplayName(elClass);
          return (
            <TextOverflowWrapper>
              <ServiceClassButton
                onClick={() => goToServiceClassDetails(elClass.name)}
                title={classTitle}
              >
                {classTitle}
              </ServiceClassButton>
            </TextOverflowWrapper>
          );
        },
      },
      {
        name: 'Plan',
        size: tableSize['Plan'],
        accesor: el => {
          const plan = el.clusterServicePlan || el.servicePlan;
          if (!plan) {
            return '-';
          }

          const planDisplayName = getResourceDisplayName(plan);
          if (
            el.planSpec &&
            el.planSpec !== null &&
            typeof el.planSpec === 'object' &&
            Object.keys(el.planSpec).length
          ) {
            return (
              <TextOverflowWrapper>
                <InformationModal
                  title="Instances Parameters"
                  modalOpeningComponent={
                    <ServicePlanButton title={planDisplayName}>
                      {planDisplayName}
                    </ServicePlanButton>
                  }
                  content={
                    <JSONCode>{JSON.stringify(el.planSpec, null, 2)}</JSONCode>
                  }
                />
              </TextOverflowWrapper>
            );
          }
          return (
            <TextOverflowWrapper>
              <span title={planDisplayName}>{planDisplayName}</span>
            </TextOverflowWrapper>
          );
        },
      },
      {
        name: 'Bound Applications',
        size: tableSize['Bound Applications'],
        visibility: !modulesDisabled[SERVICE_CATALOG_ADDONS],
        accesor: el => {
          if (!el.serviceBindingUsages) return null

          const bindingUsages = displayBindingsUsages(el.serviceBindingUsages);
          return (
            <TextOverflowWrapper>
              <span title={bindingUsages}>{bindingUsages}</span>
            </TextOverflowWrapper>
          );
        },
      },
      {
        name: 'Status',
        size: tableSize['Status'],
        accesor: el => {
          if (!el.status) {
            return '-';
          }

          let type = '';
          switch (el.status.type) {
            case 'RUNNING':
              type = 'success';
              break;
            case 'FAILED':
              type = 'error';
              break;
            default:
              type = 'warning';
          }
          return (
            <Tooltip
              wrapperStyles="max-width: 100%;"
              type={type}
              content={el.status.message}
              minWidth="250px"
            >
              <TextOverflowWrapper>
                <span
                  style={{
                    color: statusColor(el.status.type),
                    cursor: 'help',
                  }}
                  title={el.status.type}
                >
                  {el.status.type}
                </span>
              </TextOverflowWrapper>
            </Tooltip>
          );
        },
      },
      {
        name: '',
        size: tableSize[''],
        accesor: el => (
          <ConfirmationModal
            title="Warning"
            content={`Are you sure you want to delete instance "${el.name}"?`}
            confirmText="Delete"
            cancelText="Cancel"
            handleConfirmation={() => handleDelete(el)}
            modalOpeningComponent={deleteButton}
            warning={true}
            width={'481px'}
            onShow={() => LuigiClient.uxManager().addBackdrop()}
            onHide={() => LuigiClient.uxManager().removeBackdrop()}
          />
        ),
      },
    ],
    data: data,
  };

  return (
    <Table
      title={table.title}
      addHeaderContent={addServiceInstanceRedirectButton}
      columns={table.columns}
      data={table.data}
      loading={loading}
      notFoundMessage="No Service Instances found"
    />
  );
}

export default ServiceInstancesTable;
