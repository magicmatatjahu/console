import styled from 'styled-components';
import { Token } from '../../fundamentals-react';

export const Label = styled(Token)`
    && {
        cursor: ${props => props.cursorType ? props.cursorType : "auto"};
        transition: 0.3s background-color ease-in-out;

        &:hover {
            background-color: #e2effd;
        }

        &:after, &:before {
            content: "";
            margin-left: 0;
        }
    }
`;