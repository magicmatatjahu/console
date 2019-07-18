import styled from 'styled-components';
import { tabsStyling } from '../renderers/styled';

export const ContentUIWrapper = styled.div`
  width: 100%;

  &&& {
    .grid-container {
      padding: 15px;
    }
  }
`;

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
      &:first-child {
        margin-left: 32px;
      }
    }

    .grid-container {
      padding: 0;
      margin: 0;
    }
  }
`;

export const InstancesUIWrapper = styled.div`
  width: 100%;

  &&&&&&&& {
    ${tabsStyling}

    .cms__tabs {
      border: none;
    }

    .cms__tabs-header {
      border-top-right-radius: 4px;
      border-top-left-radius: 4px;
    }

    .cms__tabs-content {
      margin: 0;
      background: #fff;
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    .cms__tab {
      &:first-child {
        margin-left: 16px;
      }
    }

    .custom-open-api-styling {
      border-top-right-radius: 0;
      border-top-left-radius: 0;
    }

    .custom-async-api-styling > div > div {
      border: none;

      &:first-child {
        border-top-right-radius: 0;
        border-top-left-radius: 0;
      }
    }

    .custom-odata-styling {
      button {
        margin: 16px;
      }
    }

    .grid-container {
      padding: 0;
      margin: 0;
    }

    .grid-unit-content > div {
      border: none;
    }

    .headers-navigation-wrapper {
      margin-top: 16px;
      margin-right: 16px;
    }
  }
`;