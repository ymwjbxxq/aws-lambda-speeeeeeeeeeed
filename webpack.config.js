const path = require('path');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  entry: './src/handler.ts',
  mode: "production",
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  externals: [{
    'aws-sdk': 'commonjs aws-sdk'
  }],
  plugins: [
    new LodashModuleReplacementPlugin,
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  output: {
    filename: 'myfunc.js',
    path: path.resolve(__dirname, '../dir_where_you_have_your_serverless.yml/'),
    libraryTarget: 'commonjs2'
  }
};