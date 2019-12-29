const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.jsx',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index_bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader',
      },
    ],
  },
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }]),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
  ],
};
