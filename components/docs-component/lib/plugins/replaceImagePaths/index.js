'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const documentation_component_1 = require('@kyma-project/documentation-component');
const mutationPlugin_1 = require('./mutationPlugin');
const REPLACE_IMAGE_PATHS_MUTATION_PLUGIN = 'replace-image-paths-mutation';
exports.REPLACE_IMAGE_PATHS_MUTATION_PLUGIN = REPLACE_IMAGE_PATHS_MUTATION_PLUGIN;
const replaceImagePathsMutationPlugin = {
  name: REPLACE_IMAGE_PATHS_MUTATION_PLUGIN,
  type: documentation_component_1.PluginType.MUTATION,
  sourceTypes: ['markdown', 'md'],
  fun: mutationPlugin_1.replaceImagePaths,
};
exports.replaceImagePathsMutationPlugin = replaceImagePathsMutationPlugin;
