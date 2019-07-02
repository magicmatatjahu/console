'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const react_1 = tslib_1.__importDefault(require('react'));
const odata_react_1 = tslib_1.__importDefault(
  require('@kyma-project/odata-react'),
);
const ODataRenderEngine = ({ source, options = {} }) => {
  return react_1.default.createElement(
    odata_react_1.default,
    Object.assign(
      { schema: source.content ? source.content : source.rawContent },
      options,
    ),
  );
};
exports.odataRenderEngine = {
  component: ODataRenderEngine,
  sourceTypes: ['odata'],
};
