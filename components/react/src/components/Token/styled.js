import styled from 'styled-components';
import { Token as T } from '../../fundamentals-react';

export const Token = styled(T)`
    && {
        cursor: "pointer";
        transition: 0.3s background-color ease-in-out;

        &:hover {
            background-color: #e2effd;
        }
    }
`;
