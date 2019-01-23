const path = require('path');
// const rewireStyledComponents = require("react-app-rewire-styled-components");
// const rewireStyledComponentsTypescriptPlugin = require('react-app-rewire-styled-components-typescript');

// const rewireStyledComponentsTypescriptPluginOptions = {
//   getDisplayName(filename, bindingName) {
//     return (bindingName || filename).toUpperCase();
//   }
// };

module.exports = function override(config, env) {
  // config = rewireStyledComponents(config, env);
  // config = rewireStyledComponentsTypescriptPlugin(config, env, rewireStyledComponentsTypescriptPluginOptions);
  config.resolve.modules = [path.resolve('./node_modules'), 'node_modules']

  return config;
};
