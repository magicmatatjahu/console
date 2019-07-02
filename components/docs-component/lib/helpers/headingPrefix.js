'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function headingPrefix(source) {
  if (source.data && source.data.frontmatter) {
    if (source.data.frontmatter.type) {
      if (source.data.frontmatter.title) {
        return `${source.data.frontmatter.type}-${source.data.frontmatter.title}`;
      }
      return `${source.data.frontmatter.type}`;
    }
    if (source.data.frontmatter.title) {
      return `${source.data.frontmatter.title}`;
    }
  }
  return '';
}
exports.headingPrefix = headingPrefix;
