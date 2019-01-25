import styled from 'styled-components';
import { Modal } from '../../fundamentals-react';

export const FdModal = styled(Modal)`
  && {
    .fd-modal {
      max-width: unset;
    }

    .fd-modal__content {
      min-width: 320px;
      width: ${props => props.width || 'unset'}
      border-left: ${props =>
        props.type === 'negative' ? '6px solid #ee0000' : ''}
    }

    .fd-modal__footer {
      border-top: none;
    }
  }
`;
