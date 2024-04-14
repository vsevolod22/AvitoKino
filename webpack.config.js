const path = require('path');
const { buildWebpack } = require('./config/build/buildWebpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const createConfig = (env) => {
  const paths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
  };

  const config = buildWebpack({
    port: env.port || 7070,
    mode: env.mode || 'development',
    paths,
    resolve: {
      fallback: {
        'path': require.resolve('path-browserify'),
      },
    },
  });

  config.plugins.push(new NodePolyfillPlugin());
  config.plugins.push(new Dotenv());

  return config;
};

module.exports = createConfig;
