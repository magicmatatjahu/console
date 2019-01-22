import React, { Fragment } from 'react';

import {
  Icon,
  Table,
  Tabs,
  Tab,
  Tooltip,
} from '@kyma-project/react-components';

import BindApplicationModal from './BindApplicationModal/BindApplicationModal.container';
import CreateCredentialsModal from './CreateCredentialsModal/CreateCredentialsModal.container';
import SecretDataModal from './SecretDataModal/SecretDataModal.component';
import ParametersDataModal from './ParametersDataModal/ParametersDataModal.component';
import DeleteBindingModal from './DeleteBindingModal/DeleteBindingModal.component';
import StatusIndicator from './StatusIndicator/StatusIndicator.component';

import { statusColor } from '../../../commons/helpers';

import {
  Bold,
  ServiceInstanceBindingsWrapper,
  SecretModalButton,
  ParametersModalButton,
  ActionsWrapper,
} from './styled';

import { TextOverflowWrapper } from '../../ServiceInstances/ServiceInstancesTable/styled';

class ServiceInstanceBindings extends React.Component {
  capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  countBindingUsage = usage => {
    if (
      !this.props.serviceInstance ||
      !this.props.serviceInstance.serviceBindingUsages
    ) {
      return 0;
    }

    return this.props.serviceInstance.serviceBindingUsages.filter(item => {
      if (!item.serviceBinding || !usage.serviceBinding) {
        return false;
      }
      return item.serviceBinding.name === usage.serviceBinding.name;
    }).length;
  };

  relatedBindingUsage = bindingName => {
    return this.props.serviceInstance.serviceBindingUsages.filter(item => {
      if (!item.serviceBinding) {
        return null;
      }
      return item.serviceBinding.name === bindingName;
    });
  };

  getStatusType = statusType => {
    let type;
    switch (statusType) {
      case 'READY':
        type = 'success';
        break;
      case 'FAILED':
        type = 'error';
        break;
      default:
        type = 'warning';
    }
    return type;
  };

  status = (data, id) => {
    return <StatusIndicator data={data} key={id} />;
  };

  createBindingUsagesTableData = (data) => {
    if (!data.length) return [];

    return data.map(bindingUsage => {
      return {
        rowData: [
          (
            <TextOverflowWrapper>
              <span title={bindingUsage.name}>{bindingUsage.name}</span>
            </TextOverflowWrapper>
          ),
          (_ => {
            const text = `${bindingUsage.usedBy.name} (${this.capitalize(
              bindingUsage.usedBy.kind,
            )})`;

            return (
              <TextOverflowWrapper>
                <span title={text}>{text}</span>
              </TextOverflowWrapper>
            );
          })(),
          (_ => {
            return bindingUsage.serviceBinding && (
              <TextOverflowWrapper>
                <span title={bindingUsage.serviceBinding.name}>
                  {bindingUsage.serviceBinding.name}
                </span>
              </TextOverflowWrapper>
            )
          })(),
          (_ => {
            const prefix =
              bindingUsage.parameters &&
              bindingUsage.parameters.envPrefix &&
              bindingUsage.parameters.envPrefix.name;
            const secret = bindingUsage.serviceBinding && bindingUsage.serviceBinding.secret;

            return secret && Object.keys(secret).length ? (
              <TextOverflowWrapper>
                <SecretDataModal
                  title={
                    <span title={secret.name}>
                      Secret <Bold>{secret.name}</Bold>
                    </span>
                  }
                  data={secret.data}
                  prefix={prefix}
                  modalOpeningComponent={
                    <SecretModalButton title={secret.name}>
                      {secret.name}
                    </SecretModalButton>
                  }
                />
              </TextOverflowWrapper>
            ) : (
              '-'
            );
          })(),
          (
            <Tooltip
              wrapperStyles="max-width: 100%;"
              type={this.getStatusType(bindingUsage.status.type)}
              content={bindingUsage.status.message}
              minWidth="250px"
            >
              <span
                style={{
                  color: statusColor(bindingUsage.status.type),
                  cursor: `${bindingUsage.status.message ? 'help' : 'default'}`,
                }}
                title={bindingUsage.status.type}
              >
                {bindingUsage.status.type}
              </span>
            </Tooltip>
          ),
          (
            <ActionsWrapper>
              <DeleteBindingModal
                deleteBindingUsage={this.props.deleteBindingUsage}
                bindingUsageName={bindingUsage.name}
                bindingUsageCount={this.countBindingUsage(bindingUsage)}
                id={`service-binding-delete-${bindingUsage.name}`}
              />
            </ActionsWrapper>
          )
        ]
      }
    })
  }

  createBindingsTableData = (data) => {
    if (!data.length) return [];

    return data.map(binding => {
      return {
        rowData: [
          (
            <TextOverflowWrapper>
              <span title={binding.name}>{binding.name}</span>
            </TextOverflowWrapper>
          ),
          (_ => {
            const secret = binding && binding.secret;
            return secret && Object.keys(secret).length ? (
              <TextOverflowWrapper>
                <SecretDataModal
                  title={
                    <Fragment>
                      Secret <Bold>{secret.name}</Bold>
                    </Fragment>
                  }
                  data={secret.data}
                  modalOpeningComponent={
                    <SecretModalButton title={secret.name}>
                      {secret.name}
                    </SecretModalButton>
                  }
                />
              </TextOverflowWrapper>
            ) : (
              '-'
            );
          })(),
          (
            <Tooltip
              type={this.getStatusType(binding.status.type)}
              content={binding.status.message}
              minWidth="250px"
              wrapperStyles="max-width: 100%;"
            >
              <span
                style={{
                  color: statusColor(binding.status.type),
                  cursor: `${binding.status.message ? 'help' : 'default'}`,
                }}
                title={binding.status.type}
              >
                {binding.status.type}
              </span>
            </Tooltip>
          ),
          (_ => {
            const parameters = binding && binding.parameters;
            return (
              <ActionsWrapper>
                {parameters &&
                  Object.keys(parameters).length > 0 && (
                    <Tooltip content={'Parameters'} minWidth="90px">
                      <span
                        style={{
                          cursor: 'help',
                        }}
                      >
                        <ParametersDataModal
                          title={
                            <Fragment>
                              Parameters for <Bold>{binding.name}</Bold>
                            </Fragment>
                          }
                          data={parameters}
                          modalOpeningComponent={
                            <ParametersModalButton
                              id={`service-binding-parameters-${binding.name}`}
                              margin={'0 8px'}
                            >
                              <Icon icon={'\uE139'} />
                            </ParametersModalButton>
                          }
                        />
                      </span>
                    </Tooltip>
                  )}
    
                <DeleteBindingModal
                  deleteBinding={this.props.deleteBinding}
                  bindingName={binding.name || null}
                  bindingExists={Boolean(binding)}
                  bindingUsageCount={this.countBindingUsage({
                    serviceBinding: binding,
                  })}
                  relatedBindingUsage={this.relatedBindingUsage(binding.name)}
                  id={`service-binding-delete-${binding.name}`}
                />
              </ActionsWrapper>
            );
          })()
        ]
      }
    })
  }

  render() {
    const {
      createBinding,
      createBindingUsage,
      deleteBinding,
      deleteBindingUsage,
      serviceInstance,
      callback,
    } = this.props;

    const bindable = serviceInstance.bindable;
    if (!bindable) {
      return null;
    }

    const bindApplication = (
      <BindApplicationModal
        createBinding={createBinding}
        createBindingUsage={createBindingUsage}
        serviceInstance={serviceInstance}
        id={`create-service-binding`}
      />
    );

    const boundApplicationContent = (
      <>
        <ActionsWrapper>{bindApplication}</ActionsWrapper>
      </>
    );

    const createCredentials = (
      <CreateCredentialsModal
        createBinding={createBinding}
        createBindingUsage={createBindingUsage}
        serviceInstance={serviceInstance}
        id={`create-credentials`}
      />
    );
    const createCredentialsContent = (
      <>
        <ActionsWrapper>{createCredentials}</ActionsWrapper>
      </>
    );

    const bindingUsagesHeaders = ['Service Binding Usage', 'Bound Applications', 'Service Binding', 'Secret', 'Status', ''];
    const bindingUsagesTableData = this.createBindingUsagesTableData(serviceInstance.serviceBindingUsages);

    const bindingsHeaders = ['Bindings', 'Secret', 'Status', ''];
    const bindingsTableData = this.createBindingsTableData(serviceInstance.serviceBindings.items);

    return (
      <ServiceInstanceBindingsWrapper>
        <Tabs
          defaultActiveTabIndex={this.props.defaultActiveTabIndex}
          callback={callback}
        >
          <Tab
            title={
              <Tooltip
                content="ServiceBindingUsage is a Kyma custom resource that allows the ServiceBindingUsage controller to inject Secrets into a given application."
                minWidth="210px"
                showTooltipTimeout={750}
                key="service-binding-usage-tooltip"
              >
                Bound Applications
              </Tooltip>
            }
            id={'service-binding-usage-tab'}
            addHeaderContent={boundApplicationContent}
            aditionalStatus={this.status(
              serviceInstance.serviceBindingUsages,
              'service-binding-usage-tab',
            )}
            noMargin
          >
            <Table
              headers={bindingUsagesHeaders}
              tableData={bindingUsagesTableData}
              notFoundMessage="No applications found"
            />
          </Tab>
          <Tab
            title={
              <Tooltip
                content="ServiceBinding is a link between a ServiceInstance and an application that cluster users create to obtain access credentials for their applications."
                minWidth="210px"
                showTooltipTimeout={750}
                key="service-binding-tooltip"
              >
                Credentials
              </Tooltip>
            }
            id={'service-binding-tab'}
            addHeaderContent={createCredentialsContent}
            aditionalStatus={this.status(
              serviceInstance.serviceBindings.items,
              'service-binding-tab',
            )}
            noMargin
          >
            <Table
              headers={bindingsHeaders}
              tableData={bindingsTableData}
              notFoundMessage="No credentials found"
            />
          </Tab>
        </Tabs>
      </ServiceInstanceBindingsWrapper>
    );
  }
}

export default ServiceInstanceBindings;


// const serviceBindingsUsageTable = {
//   title: 'Bindings',
//   columns: [
//     {
//       name: 'Service Binding Usage',
//       size: 0.2,
//       accesor: el => (
//         <TextOverflowWrapper>
//           <span title={el.name}>{el.name}</span>
//         </TextOverflowWrapper>
//       ),
//     },
//     {
//       name: 'Bound Applications',
//       size: 0.2,
//       accesor: el => {
//         const text = `${el.usedBy.name} (${this.capitalize(
//           el.usedBy.kind,
//         )})`;

//         return (
//           <TextOverflowWrapper>
//             <span title={text}>{text}</span>
//           </TextOverflowWrapper>
//         );
//       },
//     },
//     {
//       name: 'Service Binding',
//       size: 0.2,
//       accesor: el =>
//         el.serviceBinding && (
//           <TextOverflowWrapper>
//             <span title={el.serviceBinding.name}>
//               {el.serviceBinding.name}
//             </span>
//           </TextOverflowWrapper>
//         ),
//     },
//     {
//       name: 'Secret',
//       size: 0.2,
//       accesor: el => {
//         const prefix =
//           el.parameters &&
//           el.parameters.envPrefix &&
//           el.parameters.envPrefix.name;
//         const secret = el.serviceBinding && el.serviceBinding.secret;

//         return secret && Object.keys(secret).length ? (
//           <TextOverflowWrapper>
//             <SecretDataModal
//               title={
//                 <span title={secret.name}>
//                   Secret <Bold>{secret.name}</Bold>
//                 </span>
//               }
//               data={secret.data}
//               prefix={prefix}
//               modalOpeningComponent={
//                 <SecretModalButton title={secret.name}>
//                   {secret.name}
//                 </SecretModalButton>
//               }
//             />
//           </TextOverflowWrapper>
//         ) : (
//           '-'
//         );
//       },
//     },
//     {
//       name: 'Status',
//       size: 0.1,
//       accesor: el => (
//         <Tooltip
//           wrapperStyles="max-width: 100%;"
//           type={this.getStatusType(el.status.type)}
//           content={el.status.message}
//           minWidth="250px"
//         >
//           <TextOverflowWrapper>
//             <span
//               style={{
//                 color: statusColor(el.status.type),
//                 cursor: `${el.status.message ? 'help' : 'default'}`,
//               }}
//               title={el.status.type}
//             >
//               {el.status.type}
//             </span>
//           </TextOverflowWrapper>
//         </Tooltip>
//       ),
//     },
//     {
//       name: '',
//       size: 0.1,
//       accesor: el => (
//         <ActionsWrapper>
//           <DeleteBindingModal
//             deleteBindingUsage={deleteBindingUsage}
//             bindingUsageName={el.name}
//             bindingUsageCount={this.countBindingUsage(el)}
//             id={`service-binding-delete-${el.name}`}
//           />
//         </ActionsWrapper>
//       ),
//     },
//   ],
//   data: serviceInstance.serviceBindingUsages,
// };

// const serviceBindingsTable = {
//   title: 'Bindings',
//   columns: [
//     {
//       name: 'Service Binding',
//       size: 0.3,
//       accesor: el => (
//         <TextOverflowWrapper>
//           <span title={el.name}>{el.name}</span>
//         </TextOverflowWrapper>
//       ),
//     },
//     {
//       name: 'Secret',
//       size: 0.3,
//       accesor: el => {
//         const secret = el && el.secret;
//         return secret && Object.keys(secret).length ? (
//           <TextOverflowWrapper>
//             <SecretDataModal
//               title={
//                 <Fragment>
//                   Secret <Bold>{secret.name}</Bold>
//                 </Fragment>
//               }
//               data={secret.data}
//               modalOpeningComponent={
//                 <SecretModalButton title={secret.name}>
//                   {secret.name}
//                 </SecretModalButton>
//               }
//             />
//           </TextOverflowWrapper>
//         ) : (
//           '-'
//         );
//       },
//     },
//     {
//       name: 'Status',
//       size: 0.25,
//       accesor: el => (
//         <Tooltip
//           type={this.getStatusType(el.status.type)}
//           content={el.status.message}
//           minWidth="250px"
//           wrapperStyles="max-width: 100%;"
//         >
//           <TextOverflowWrapper>
//             <span
//               style={{
//                 color: statusColor(el.status.type),
//                 cursor: `${el.status.message ? 'help' : 'default'}`,
//               }}
//               title={el.status.type}
//             >
//               {el.status.type}
//             </span>
//           </TextOverflowWrapper>
//         </Tooltip>
//       ),
//     },
//     {
//       name: '',
//       size: 0.15,
//       halign: 'right',
//       accesor: el => {
//         const parameters = el && el.parameters;
//         return (
//           <ActionsWrapper>
//             {parameters &&
//               Object.keys(parameters).length > 0 && (
//                 <Tooltip content={'Parameters'} minWidth="90px">
//                   <span
//                     style={{
//                       cursor: 'help',
//                     }}
//                   >
//                     <ParametersDataModal
//                       title={
//                         <Fragment>
//                           Parameters for <Bold>{el.name}</Bold>
//                         </Fragment>
//                       }
//                       data={parameters}
//                       modalOpeningComponent={
//                         <ParametersModalButton
//                           id={`service-binding-parameters-${el.name}`}
//                           margin={'0 8px'}
//                         >
//                           <Icon icon={'\uE139'} />
//                         </ParametersModalButton>
//                       }
//                     />
//                   </span>
//                 </Tooltip>
//               )}

//             <DeleteBindingModal
//               deleteBinding={deleteBinding}
//               bindingName={el.name || null}
//               bindingExists={Boolean(el)}
//               bindingUsageCount={this.countBindingUsage({
//                 serviceBinding: el,
//               })}
//               relatedBindingUsage={this.relatedBindingUsage(el.name)}
//               id={`service-binding-delete-${el.name}`}
//             />
//           </ActionsWrapper>
//         );
//       },
//     },
//   ],
//   data: serviceInstance.serviceBindings.items,
// };