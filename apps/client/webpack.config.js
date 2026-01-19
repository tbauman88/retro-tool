const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');
const webpack = require('webpack');
require('dotenv').config();

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {
  // Inject NX_ prefixed env vars
  const envVars = {};
  Object.keys(process.env)
    .filter(key => key.startsWith('NX_'))
    .forEach(key => {
      envVars[`process.env.${key}`] = JSON.stringify(process.env[key]);
    });

  config.plugins.push(new webpack.DefinePlugin(envVars));

  return config;
});
