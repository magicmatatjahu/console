'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const styled_components_1 = require('styled-components');
exports.customScrollBar = ({
  scrollbarWidth = '6px',
  scrollbarHeight = '6px',
  thumbColor = '#d4d4d4',
  thumbBorderRadius = '0',
  trackColor = '#f1f1f1',
  trackBorderRadius = '0',
}) => styled_components_1.css`
  &::-webkit-scrollbar {
    width: ${scrollbarWidth};
    height: ${scrollbarHeight};
  }
  &::-webkit-scrollbar-thumb {
    background: ${thumbColor};
    border-radius: ${thumbBorderRadius};
  }
  &::-webkit-scrollbar-track {
    background: ${trackColor};
    border-radius: ${trackBorderRadius};
  }
`;
