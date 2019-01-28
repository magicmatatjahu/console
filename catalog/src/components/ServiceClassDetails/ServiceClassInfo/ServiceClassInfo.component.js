import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import {
  Label,
  Icon,
  Header,
  Separator,
  Text,
  Tooltip,
} from '@kyma-project/react-components';

import {
  ServiceClassInfoContentWrapper,
  ImagePlaceholder,
  ServiceClassInfoContent,
  ExternalLink,
  Image,
  LabelsWrapper,
  LabelWrapper,
} from './styled';

import { isStringValueEqualToTrue } from '../../../commons/helpers';

const ServiceClassInfo = ({
  serviceClassDisplayName,
  providerDisplayName,
  creationTimestamp,
  documentationUrl,
  supportUrl,
  imageUrl,
  tags,
  labels,
}) => {
  function sortTags(tag1, tag2) {
    return tag1.length > 8 && tag2.length < 15;
  }

  const extractLabels = () => {
    const extractedLabels = [];

    if (labels) {
      if (labels['connected-app'])
        extractedLabels.push({
          name: labels['connected-app'],
          type: 'connected-app',
        });
      if (isStringValueEqualToTrue(labels.local))
        extractedLabels.push({ name: 'local', type: 'basic' });
      if (isStringValueEqualToTrue(labels.showcase))
        extractedLabels.push({ name: 'showcase', type: 'basic' });
    }

    return extractedLabels;
  };

  const modifiedTags = [
    ...tags.map(tag => ({ name: tag, type: 'tag' })),
    ...extractLabels(),
  ];

  const tagsDescription = {
    basic: 'Basic filter',
    'connected-app': 'Connected application',
    tag: 'Tag',
  };

  const tooltipWidth = {
    basic: '80px',
    'connected-app': '140px',
    tag: '50px',
  };

  return (
    <div>
      <ServiceClassInfoContentWrapper>
        <ImagePlaceholder>
          {imageUrl ? (
            <Image size="l" photo={imageUrl} />
          ) : (
            <Icon icon={'\ue113'} />
          )}
        </ImagePlaceholder>
        <ServiceClassInfoContent
          title={serviceClassDisplayName}
          data-e2e-id="service-title-and-provider"
        >
          {providerDisplayName || ''}
        </ServiceClassInfoContent>
      </ServiceClassInfoContentWrapper>
      <Separator margin="30px 0 30px" />
      <div>
        <Header margin="0 0 20px">Vendor Information</Header>
        <Text fontSize="14px">
          Last Update:{' '}
          <Moment unix format="MMM DD, YYYY">
            {creationTimestamp}
          </Moment>
        </Text>
        {documentationUrl && (
          <Text fontSize="14px">
            Documentation:{' '}
            <ExternalLink href={documentationUrl} target="_blank">
              Link
            </ExternalLink>
          </Text>
        )}
        {supportUrl && (
          <Text fontSize="14px">
            Support:{' '}
            <ExternalLink href={supportUrl} target="_blank">
              Link
            </ExternalLink>
          </Text>
        )}
        {modifiedTags &&
          modifiedTags.length > 0 && (
            <LabelsWrapper>
              {modifiedTags.sort(sortTags).map(tag => (
                <LabelWrapper key={`${tag.type}-${tag.name}`}>
                  <Tooltip
                    content={tagsDescription[tag.type]}
                    minWidth={tooltipWidth[tag.type]}
                  >
                    <Label cursorType="help">{tag.name}</Label>
                  </Tooltip>
                </LabelWrapper>
              ))}
            </LabelsWrapper>
          )}
      </div>
    </div>
  );
};

ServiceClassInfo.propTypes = {
  serviceClassDisplayName: PropTypes.string.isRequired,
  providerDisplayName: PropTypes.string.isRequired,
  creationTimestamp: PropTypes.number,
  documentationUrl: PropTypes.string,
  imageUrl: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  labels: PropTypes.object,
};

export default ServiceClassInfo;
