'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const react_1 = tslib_1.__importDefault(require('react'));
const documentation_component_1 = require('@kyma-project/documentation-component');
const RenderedHeader_1 = require('./RenderedHeader');
const helpers_1 = require('../../helpers');
const styled_1 = require('./styled');
exports.HeadersNavigation = () => {
  return react_1.default.createElement(
    styled_1.HeadersNavigationsWrapper,
    null,
    react_1.default.createElement(
      'div',
      null,
      react_1.default.createElement(
        documentation_component_1.HeadersNavigation,
        { postProcessing: helpers_1.postProcessingHeaders },
        react_1.default.createElement(
          styled_1.StyledHeadersNavigation,
          { className: 'cms__toc-wrapper' },
          react_1.default.createElement(RenderedHeader_1.RenderedHeader, null),
        ),
      ),
    ),
  );
};
