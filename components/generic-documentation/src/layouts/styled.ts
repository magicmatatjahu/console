import styled from 'styled-components';
import { tabsStyling } from '../renderers/styled';

export const CatalogUIWrapper = styled.div`
  width: 100%;

  &&& {
    ${tabsStyling}

    .cms__tabs {
      border-bottom: none;
      border-left: none;
      border-right: none;
      border-radius: 0;
    }

    .cms__tabs-content {
      margin: 32px;
    }

    .cms__tab {
      padding: 16px 0;

      &:first-child {
        margin-left: 32px;
      }
    }
  }
`;

export const InstancesUIWrapper = styled.div`
  width: 100%;

  &&& {
    ${tabsStyling}

    .cms__tabs {
      border: 0;
    }

    .cms__tabs-header {
      border-top-right-radius: 4px;
      border-top-left-radius: 4px;
    }

    .cms__tabs-content {
      margin: 0;
    }

    .cms__tab {
      padding: 16px 0;

      &:first-child {
        margin-left: 16px;
      }
    }

    .custom-open-api-styling {
      border-top-right-radius: 0;
      border-top-left-radius: 0;
    }

    .custom-async-api-styling > div > div:first-child {
      border-top-right-radius: 0;
      border-top-left-radius: 0;
    }
  }
`;
