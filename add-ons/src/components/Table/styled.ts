import styled from "styled-components";
import { Token, Panel } from 'fundamental-react';

export const PanelWrapper = styled.div`
  margin: 32px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15);

  &&& {
    .fd-button--light {
      margin-left: 6px;
    }

    .fd-tree--header {
      background-color: rgba(243, 244, 245, 0.45);
    }

    .fd-tree__row--header {
      font-size: 11px;
      background-color: rgba(243, 244, 245, 0.45);
    }

    .fd-tree__row--header .fd-tree__col {
      padding-top: 12px;
      padding-bottom: 12px;
    }

    .fd-panel__body {
      padding: 0;
    }

    .fd-tree__group--sublevel-1 .fd-tree__col--control {
      padding-left: 30px;
    }

    .fd-tree > .fd-tree__item {
      border-bottom: 1px solid #eeeeef;
    }

    .fd-tree > .fd-tree__item:last-child {
      border-bottom: 0;
    }

    .fd-tree__col {
      padding-top: 8px;
      padding-bottom: 8px;
    }

    .fd-tree__col--control > div {
      font-weight: bold;
    }

    .fd-tree__row--header .fd-tree__col--control > div {
      font-weight: 400;
    } 

    .add-ons-url {
      padding: 3px 0;
    }
  }
`;

export const StyledToken = styled(Token)`
  &&& {
    background: #eef5fc;
    margin-right: 12px;
  } 
`;

export const Label = styled(Token)`
  &&& {
    background: #eef5fc;
    cursor: default;

    &:after {
      content: "";
      margin-left: 0;
    }
  } 
`;

export const TreeViewColActions = styled.div`
  float: right;

  > .sap-icon--delete {
    cursor: pointer;
    color: #bb0000;
    margin-left: 6px;
  }
`;
