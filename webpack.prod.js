const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

module.exports = {
  mode: 'production',
  entry: './index.js',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'dali.2d.js',
    library: 'dali2d',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  externals: {
    dali2d: {
      commonjs: 'dali2d',
      commonjs2: 'dali2d',
      amd: 'dali2d',
      root: 'dali2d',
    },
  },
  module: {
    rules: [
      {
        test: /\.js?/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin(),
    ],
  },
  plugins: [
    new WebpackCleanupPlugin(['dist']),
  ],
};
