'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const react_1 = tslib_1.__importDefault(require('react'));
const documentation_component_1 = require('@kyma-project/documentation-component');
const react_sticky_1 = require('react-sticky');
const render_engines_1 = require('./render-engines');
const plugins_1 = require('./plugins');
const helpers_1 = require('./helpers');
const renderers_1 = require('./renderers');
const styled_1 = require('./styled');
exports.DocsComponent = ({ sources, navigation = false }) => {
  if (!sources) {
    return null;
  }
  return react_1.default.createElement(
    documentation_component_1.HeadlessCMS.Provider,
    {
      sources: [
        {
          sources,
          pluginsOptions: [
            {
              name: documentation_component_1.MARKDOWN_HEADER_EXTRACTOR_PLUGIN,
              options: {
                headerPrefix: helpers_1.headingPrefix,
                customNodes: helpers_1.customNodes,
              },
            },
          ],
        },
      ],
      plugins: [
        documentation_component_1.frontmatterMutationPlugin,
        plugins_1.replaceImagePathsMutationPlugin,
        documentation_component_1.replaceAllLessThanCharsMutationPlugin,
        documentation_component_1.markdownTabsMutationPlugin,
        documentation_component_1.disableInternalLinksMutationPlugin,
        documentation_component_1.markdownHeadersPlugin,
      ],
      renderEngines: [
        {
          renderEngine: documentation_component_1.markdownRenderEngine,
          options: {
            customRenderers: {
              link: render_engines_1.MarkdownLink,
            },
            parsers: [documentation_component_1.markdownTabsParserPlugin],
            headingPrefix: helpers_1.headingPrefix,
            highlightTheme: render_engines_1.highlightTheme,
            copyButton: render_engines_1.CopyButton,
          },
        },
        {
          renderEngine: render_engines_1.asyncApiRenderEngine,
          options: {
            ...render_engines_1.asyncApiOptions,
          },
        },
      ],
    },
    react_1.default.createElement(
      styled_1.ContentWrapper,
      null,
      react_1.default.createElement(
        react_sticky_1.StickyContainer,
        null,
        react_1.default.createElement(
          'div',
          null,
          react_1.default.createElement(documentation_component_1.Content, {
            renderers: {
              single: [renderers_1.MarkdownSingleRenderer],
            },
          }),
        ),
        react_1.default.createElement(
          react_sticky_1.Sticky,
          null,
          ({ style }) =>
            react_1.default.createElement(
              'div',
              { style: { ...style, zIndex: 200, width: '310px' } },
              react_1.default.createElement(
                render_engines_1.HeadersNavigation,
                null,
              ),
            ),
        ),
      ),
    ),
  );
};
