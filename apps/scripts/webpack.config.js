const { composePlugins, withNx } = require('@nx/webpack');

// Nx plugins for webpack to build Node applications.
module.exports = composePlugins(withNx(), (config) => {
  // Update the webpack config as needed here.
  return config;
});
