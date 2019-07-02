'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const react_1 = tslib_1.__importDefault(require('react'));
const styled_components_1 = tslib_1.__importDefault(
  require('styled-components'),
);
const StyledLink = styled_components_1.default.a``;
exports.MarkdownLink = props => {
  const { target, rel, ...rest } = props;
  return react_1.default.createElement(
    StyledLink,
    Object.assign({ target: '_blank', rel: 'noopener noreferrer' }, rest),
  );
};
