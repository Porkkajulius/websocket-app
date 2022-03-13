const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: { spa: 'client/src/index.tsx' },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist/client'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
      },
      { test: /\.(jpe?g|png|gif|svg)$/i, use: 'file-loader' },
      { test: /\.md$/i, use: 'raw-loader' },
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
      { enforce: 'pre', test: /\.js$/, use: 'source-map-loader' },
    ],
  },
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        configFile: 'client/tsconfig.client.json',
        logLevel: 'info',
      }),
    ],
    extensions: ['.ts', '.tsx', '.js', 'json']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './client/public/index.html',
      filename: './index.html',
    }),
  ],
};
