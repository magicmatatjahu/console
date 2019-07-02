'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const react_1 = tslib_1.__importStar(require('react'));
const documentation_component_1 = require('@kyma-project/documentation-component');
const styled_1 = require('./styled');
const CLASS_NAME_PREFIX = 'cms';
const createElementClass = element =>
  element ? `${CLASS_NAME_PREFIX}__${element}` : '';
const createModifierClass = (modifier, element) =>
  modifier
    ? `${CLASS_NAME_PREFIX}${element ? `__${element}` : ''}--${modifier}`
    : '';
const HeaderItem = ({ header, className, activeAnchors }) => {
  const [collapse, setCollapse] = react_1.useState(false);
  const showNode = activeAnchors && activeAnchors[header.level] === header.id;
  return react_1.default.createElement(
    'li',
    {
      className: `${createElementClass(
        `${className}-list-item`,
      )} ${createModifierClass(
        `level-${header.level}`,
        `${className}-list-item`,
      )}`,
    },
    header.children
      ? react_1.default.createElement(styled_1.CollapseArrow, {
          size: 's',
          glyph: 'feeder-arrow',
          open: showNode || collapse,
          onClick: () => {
            setCollapse(c => !c);
          },
        })
      : null,
    react_1.default.createElement('a', { href: `#${header.id}` }, header.title),
    header.children &&
      react_1.default.createElement(exports.RenderedHeader, {
        headers: header.children,
        className: className ? className : '',
        activeAnchors: activeAnchors,
        showNode: showNode || collapse,
      }),
  );
};
exports.RenderedHeader = ({ headers, activeAnchors, showNode = false }) => {
  const context = documentation_component_1.useHeadersContext();
  if (!context) {
    return null;
  }
  const { headers: h, getActiveAnchors, className } = context;
  if (!headers) {
    headers = h;
  }
  const aa = getActiveAnchors();
  if (aa) {
    activeAnchors = aa;
  }
  const anchorsList = headers.map(header =>
    react_1.default.createElement(HeaderItem, {
      header: header,
      className: className,
      key: `${className}-list-item-${header.id}`,
      activeAnchors: activeAnchors,
    }),
  );
  return react_1.default.createElement(
    'ul',
    {
      className: showNode
        ? createElementClass(`${className}-list-item--show`)
        : '',
    },
    anchorsList,
  );
};
