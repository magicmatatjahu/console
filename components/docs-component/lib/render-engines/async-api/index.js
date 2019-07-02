'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const react_1 = tslib_1.__importDefault(require('react'));
const asyncapi_react_1 = tslib_1.__importDefault(
  require('@kyma-project/asyncapi-react'),
);
const theme_1 = require('./theme');
const AsyncApiRenderEngine = ({ source, options = {} }) => {
  return react_1.default.createElement(
    asyncapi_react_1.default,
    Object.assign(
      { schema: source.content ? source.content : source.rawContent },
      options,
    ),
  );
};
exports.asyncApiRenderEngine = {
  component: AsyncApiRenderEngine,
  sourceTypes: ['asyncapi', 'async-api', 'events'],
};
const asyncApiConfig = {
  disableDefaultTheme: true,
};
exports.asyncApiOptions = {
  config: asyncApiConfig,
  theme: theme_1.asyncApiTheme,
};
