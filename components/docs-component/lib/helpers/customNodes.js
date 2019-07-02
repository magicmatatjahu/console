'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function firstElementOfHeaders(source) {
  if (source.data && source.data.frontmatter && source.data.frontmatter.title) {
    return source.data.frontmatter.title;
  }
  return '';
}
exports.customNodes = [firstElementOfHeaders];
