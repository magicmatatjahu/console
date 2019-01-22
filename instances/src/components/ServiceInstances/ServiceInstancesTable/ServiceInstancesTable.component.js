import React, { Component } from 'react';
import LuigiClient from '@kyma-project/luigi-client';

import {
  Button,
  Icon,
  ConfirmationModal,
  Table,
  Tooltip,
  NewModal,
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

const deleteButton = <Button compact option="light" glyph="delete" />;

export class ServiceInstancesTable extends Component {
  state = {
    showModal: Array(this.props.data.length).fill(false),
  };

  displayBindingsUsages = (bindings = []) => {
    switch (bindings.length) {
      case 0:
        return '-';
      case 1:
        return bindings[0].name;
      default:
        return `Multiple (${bindings.length})`;
    }
  };

  goToServiceCatalog = () => {
    LuigiClient.linkManager()
      .fromContext('namespaces')
      .navigate('service-catalog');
  };

  goToServiceClassDetails = name => {
    LuigiClient.linkManager()
      .fromContext('namespaces')
      .navigate(`service-catalog/details/${name}`);
  };

  goToServiceInstanceDetails = name => {
    LuigiClient.linkManager()
      .fromContext('namespaces')
      .navigate(`instances/details/${name}`);
  };

  render() {
    const { data, deleteServiceInstance, loading } = this.props;
    const handleDelete = async element => {
      await deleteServiceInstance(element.name);
    };

    const createTableData = () => {
      return data.map((instance, index) => {
        return {
          rowData: [
            <TextOverflowWrapper>
              <LinkButton data-e2e-id="instance-name">
                <Link
                  onClick={() => this.goToServiceInstanceDetails(instance.name)}
                  data-e2e-id={`instance-name-${instance.name}`}
                  title={instance.name}
                >
                  {instance.name}
                </Link>
              </LinkButton>
            </TextOverflowWrapper>,
            (_ => {
              const instanceClass =
                instance.clusterServiceClass || instance.serviceClass;
              if (!instanceClass || !instanceClass.name) {
                return '-';
              }

              const classTitle = getResourceDisplayName(instanceClass);
              return (
                <TextOverflowWrapper>
                  <ServiceClassButton
                    onClick={() =>
                      this.goToServiceClassDetails(instanceClass.name)
                    }
                    title={classTitle}
                  >
                    {classTitle}
                  </ServiceClassButton>
                </TextOverflowWrapper>
              );
            })(),
            (_ => {
              const plan = instance.clusterServicePlan || instance.servicePlan;
              if (!plan) {
                return '-';
              }

              const planDisplayName = getResourceDisplayName(plan);

              if (
                instance.planSpec &&
                instance.planSpec !== null &&
                typeof instance.planSpec === 'object' &&
                Object.keys(instance.planSpec).length
              ) {
                return (
                  <TextOverflowWrapper>
                    <ServicePlanButton
                      title={planDisplayName}
                      onClick={() => {
                        this.setState({
                          showModal: [
                            ...this.state.showModal.slice(0, index),
                            true,
                            ...this.state.showModal.slice(index),
                          ],
                        });
                      }}
                    >
                      {planDisplayName}
                    </ServicePlanButton>
                    <NewModal
                      title="Instance's Parameters"
                      show={this.state.showModal[index]}
                      onClose={() =>
                        this.setState({
                          showModal: Array(data.length).fill(false),
                        })
                      }
                    >
                      <JSONCode>
                        {JSON.stringify(instance.planSpec, null, 2)}
                      </JSONCode>
                    </NewModal>
                  </TextOverflowWrapper>
                );
              }
              return (
                <TextOverflowWrapper>
                  <span title={planDisplayName}>{planDisplayName}</span>
                </TextOverflowWrapper>
              );
            })(),
            (_ => {
              const bindingUsages = this.displayBindingsUsages(
                instance.serviceBindingUsages,
              );
              return (
                <TextOverflowWrapper>
                  <span title={bindingUsages}>{bindingUsages}</span>
                </TextOverflowWrapper>
              );
            })(),
            (_ => {
              if (!instance.status) {
                return '-';
              }

              let type = '';
              switch (instance.status.type) {
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
                  content={instance.status.message}
                  minWidth="250px"
                >
                  <span
                    style={{
                      color: statusColor(instance.status.type),
                      cursor: 'help',
                    }}
                    title={instance.status.type}
                  >
                    {instance.status.type}
                  </span>
                </Tooltip>
              );
            })(),
            <ConfirmationModal
              title="Warning"
              content={`Are you sure you want to delete instance "${
                instance.name
              }"?`}
              confirmText="Delete"
              cancelText="Cancel"
              handleConfirmation={() => handleDelete(instance)}
              modalOpeningComponent={deleteButton}
              warning={true}
              width={'481px'}
              onShow={() => LuigiClient.uxManager().addBackdrop()}
              onHide={() => LuigiClient.uxManager().removeBackdrop()}
            />,
          ],
        };
      });
    };
    const addServiceInstanceRedirectButton = (
      <Button compact option="light" onClick={this.goToServiceCatalog}>
        + Add Instance
      </Button>
    );
    const title = 'Manage Service Instances';
    const headers = [
      'Name',
      'Service Class',
      'Plan',
      'Bound Applications',
      'Status',
      '',
    ];
    const tableData = createTableData();

    return (
      <Table
        title={title}
        addHeaderContent={addServiceInstanceRedirectButton}
        headers={headers}
        tableData={tableData}
        loadingData={loading}
        notFoundMessage="No Service Instances found"
      />
    );
  }
}

export default ServiceInstancesTable;

// const table = {
//   title: 'Manage Service Instances',
//   columns: [
//     {
//       name: 'Name',
//       size: 0.2,
//       accesor: el => (
//         <TextOverflowWrapper>
//           <LinkButton data-e2e-id="instance-name">
//             <Link
//               onClick={() => goToServiceInstanceDetails(el.name)}
//               data-e2e-id={`instance-name-${el.name}`}
//               title={el.name}
//             >
//               {el.name}
//             </Link>
//           </LinkButton>
//         </TextOverflowWrapper>
//       ),
//     },
//     {
//       name: 'Service Class',
//       size: 0.15,
//       accesor: el => {
//         const elClass = el.clusterServiceClass || el.serviceClass;
//         if (!elClass || !elClass.name) {
//           return '-';
//         }

//         const classTitle = getResourceDisplayName(elClass);
//         return (
//           <TextOverflowWrapper>
//             <ServiceClassButton
//               onClick={() => goToServiceClassDetails(elClass.name)}
//               title={classTitle}
//             >
//               {classTitle}
//             </ServiceClassButton>
//           </TextOverflowWrapper>
//         );
//       },
//     },
//     {
//       name: 'Plan',
//       size: 0.15,
//       accesor: el => {
//         const plan = el.clusterServicePlan || el.servicePlan;
//         if (!plan) {
//           return '-';
//         }

//         const planDisplayName = getResourceDisplayName(plan);
//         if (
//           el.planSpec &&
//           el.planSpec !== null &&
//           typeof el.planSpec === 'object' &&
//           Object.keys(el.planSpec).length
//         ) {
//           return (
//             <TextOverflowWrapper>
//               <InformationModal
//                 title="Instances Parameters"
//                 modalOpeningComponent={
//                   <ServicePlanButton title={planDisplayName}>
//                     {planDisplayName}
//                   </ServicePlanButton>
//                 }
//                 content={
//                   <JSONCode>{JSON.stringify(el.planSpec, null, 2)}</JSONCode>
//                 }
//               />
//             </TextOverflowWrapper>
//           );
//         }
//         return (
//           <TextOverflowWrapper>
//             <span title={planDisplayName}>{planDisplayName}</span>
//           </TextOverflowWrapper>
//         );
//       },
//     },
//     {
//       name: 'Bound Applications',
//       size: 0.2,
//       accesor: el => {
//         const bindingUsages = displayBindingsUsages(el.serviceBindingUsages);
//         return (
//           <TextOverflowWrapper>
//             <span title={bindingUsages}>{bindingUsages}</span>
//           </TextOverflowWrapper>
//         );
//       },
//     },
//     {
//       name: 'Status',
//       size: 0.2,
//       accesor: el => {
//         if (!el.status) {
//           return '-';
//         }

//         let type = '';
//         switch (el.status.type) {
//           case 'RUNNING':
//             type = 'success';
//             break;
//           case 'FAILED':
//             type = 'error';
//             break;
//           default:
//             type = 'warning';
//         }
//         return (
//           <Tooltip
//             wrapperStyles="max-width: 100%;"
//             type={type}
//             content={el.status.message}
//             minWidth="250px"
//           >
//             <TextOverflowWrapper>
//               <span
//                 style={{
//                   color: statusColor(el.status.type),
//                   cursor: 'help',
//                 }}
//                 title={el.status.type}
//               >
//                 {el.status.type}
//               </span>
//             </TextOverflowWrapper>
//           </Tooltip>
//         );
//       },
//     },
//     {
//       name: '',
//       size: 0.1,
//       accesor: el => (
//         <ConfirmationModal
//           title="Warning"
//           content={`Are you sure you want to delete instance "${el.name}"?`}
//           confirmText="Delete"
//           cancelText="Cancel"
//           handleConfirmation={() => handleDelete(el)}
//           modalOpeningComponent={deleteButton}
//           warning={true}
//           width={'481px'}
//           onShow={() => LuigiClient.uxManager().addBackdrop()}
//           onHide={() => LuigiClient.uxManager().removeBackdrop()}
//         />
//       ),
//     },
//   ],
//   data: data,
// };
