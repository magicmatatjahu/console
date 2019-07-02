'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const ASSETS_REGEXP = /(?=]\()]\(\s*(\.\/)?assets/g;
function replaceImagePaths({ source, options }) {
  if (!source.data || !source.data.url) {
    return source.rawContent;
  }
  const docsUrl = source.data.url.substring(
    0,
    source.data.url.lastIndexOf('/'),
  );
  const content = source.content ? source.content : source.rawContent;
  if (content.search(ASSETS_REGEXP) !== -1) {
    return content.replace(ASSETS_REGEXP, `](${docsUrl}/assets`);
  }
  return content;
}
exports.replaceImagePaths = replaceImagePaths;
