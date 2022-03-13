const Dotenv = require('dotenv-webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const config = {
  mode: 'development',
  devServer: {
    open: true,
    port: 8080,
  },
  plugins: [new Dotenv()],
};
module.exports = merge(baseConfig, config);
