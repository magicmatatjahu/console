import React from 'react';
import PropTypes from 'prop-types';

import { LayoutGrid, Panel, Button, Toggle, Badge } from 'fundamental-react';
import { RESOURCES_MANAGEMENT_PANEL } from 'components/Lambdas/constants';

import EditResourcesManagementModal from './EditResourcesManagementModal';

import './ResourcesManagement.scss';

function LambdaReplicas({ replicas }) {
  const scaleToZeroEnable = replicas.min === 0;
  const fixedReplicas = replicas.min === replicas.max;

  const panels = [
    {
      title: RESOURCES_MANAGEMENT_PANEL.REPLICAS_MODE.MIN_NUMBER.TITLE,
      description:
        RESOURCES_MANAGEMENT_PANEL.REPLICAS_MODE.MIN_NUMBER.DESCRIPTION,
      action: <Badge>{replicas.min}</Badge>,
    },
    {
      title: RESOURCES_MANAGEMENT_PANEL.REPLICAS_MODE.MAX_NUMBER.TITLE,
      description:
        RESOURCES_MANAGEMENT_PANEL.REPLICAS_MODE.MAX_NUMBER.DESCRIPTION,
      action: <Badge>{replicas.max}</Badge>,
    },
    // {
    //   title: RESOURCES_MANAGEMENT_PANEL.REPLICAS_MODE.SCALE_TO_ZERO.TITLE,
    //   description: RESOURCES_MANAGEMENT_PANEL.REPLICAS_MODE.SCALE_TO_ZERO.DESCRIPTION,
    //   action: (
    //     <Toggle checked={scaleToZeroEnable} size="s" />
    //   ),
    // },
    // {
    //   title: RESOURCES_MANAGEMENT_PANEL.REPLICAS_MODE.FIXED.TITLE,
    //   description: RESOURCES_MANAGEMENT_PANEL.REPLICAS_MODE.FIXED.DESCRIPTION,
    //   action: (
    //     <Toggle checked={fixedReplicas} size="s" />
    //   ),
    // }
  ];
  const content = panels.map(panel => (
    <Panel className="has-box-shadow-none">
      <Panel.Header className="has-padding-none has-none-border-bottom">
        <Panel.Head title={panel.title} description={panel.description} />
        <Panel.Actions>{panel.action}</Panel.Actions>
      </Panel.Header>
    </Panel>
  ));

  return (
    <LayoutGrid cols={panels.length} className="has-bottom-margin">
      {content}
    </LayoutGrid>
  );
}

function LambdaResources({ resources }) {
  const requests = resources.requests;
  const limits = resources.limits;

  return (
    <LayoutGrid cols={2}>
      <Panel className="has-box-shadow-none">
        <Panel.Header className="has-padding-none has-none-border-bottom">
          <Panel.Head
            title={RESOURCES_MANAGEMENT_PANEL.RESOURCES.REQUESTS.TITLE}
            description={
              RESOURCES_MANAGEMENT_PANEL.RESOURCES.REQUESTS.DESCRIPTION
            }
          />
        </Panel.Header>
        <Panel.Body className="has-padding-none">
          <div>
            {RESOURCES_MANAGEMENT_PANEL.RESOURCES.MEMORY.TITLE}:{' '}
            {requests.memory}
          </div>
          <div>
            {RESOURCES_MANAGEMENT_PANEL.RESOURCES.CPU.TITLE}: {requests.cpu}
          </div>
        </Panel.Body>
      </Panel>
      <Panel className="has-box-shadow-none">
        <Panel.Header className="has-padding-none has-none-border-bottom">
          <Panel.Head
            title={RESOURCES_MANAGEMENT_PANEL.RESOURCES.LIMITS.TITLE}
            description={
              RESOURCES_MANAGEMENT_PANEL.RESOURCES.LIMITS.DESCRIPTION
            }
          />
        </Panel.Header>
        <Panel.Body className="has-padding-none">
          <div>
            {RESOURCES_MANAGEMENT_PANEL.RESOURCES.MEMORY.TITLE}: {limits.memory}
          </div>
          <div>
            {RESOURCES_MANAGEMENT_PANEL.RESOURCES.CPU.TITLE}: {limits.cpu}
          </div>
        </Panel.Body>
      </Panel>
    </LayoutGrid>
  );
}

export default function ResourcesManagement({ lambda }) {
  // const createEventTrigger = (
  //   <CreateEventTriggerModal
  //     lambda={lambda}
  //     availableEvents={availableEvents}
  //   />
  // );

  const editResourceManagementModal = (
    <EditResourcesManagementModal lambda={lambda} />
  );

  return (
    <Panel className="fd-has-margin-m lambda-resources-management">
      <Panel.Header className="fd-has-padding-xs">
        <Panel.Head title={RESOURCES_MANAGEMENT_PANEL.TITLE} />
        <Panel.Actions>{editResourceManagementModal}</Panel.Actions>
      </Panel.Header>
      <Panel.Body className="fd-has-padding-xs">
        <LambdaReplicas replicas={lambda.replicas} />
        {/* <table className="fd-table">
          {showHeader && (
            <thead>
              <tr>
                <HeaderRenderer
                  entries={entries}
                  actions={actions}
                  headerRenderer={headerRenderer}
                />
              </tr>
            </thead>
          )}
          <tbody>{renderTableBody()}</tbody>
        </table> */}
      </Panel.Body>
      <Panel.Body className="fd-has-padding-xs">
        <LambdaResources resources={lambda.resources} />
      </Panel.Body>
    </Panel>
  );

  // return (
  //   <div>
  //     <GenericList
  //       title={EVENT_TRIGGERS_PANEL.LIST.TITLE}
  //       showSearchField={true}
  //       textSearchProperties={textSearchProperties}
  //       showSearchSuggestion={false}
  //       extraHeaderContent={createEventTrigger}
  //       actions={actions}
  //       entries={eventTriggers}
  //       headerRenderer={headerRenderer}
  //       rowRenderer={rowRenderer}
  //       serverDataError={serverDataError}
  //       serverDataLoading={serverDataLoading}
  //       notFoundMessage={ERRORS.RESOURCES_NOT_FOUND}
  //       noSearchResultMessage={ERRORS.NOT_MATCHING_SEARCH_QUERY}
  //       serverErrorMessage={ERRORS.SERVER}
  //     />
  //   </div>
  // );
}

ResourcesManagement.propTypes = {
  lambda: PropTypes.object.isRequired,
};
