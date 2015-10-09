/* eslint es6: false */
var webpack = require('webpack');

var loaders = [
  { test: /\.js$/, exclude: /webpack/, loader: 'babel?stage=0' },
  { test: /\.css$/, loader: 'style!css' },
]

var devConfig = {
  entry: './dev/index.js',
  output: {
    filename: 'dev.js',
    libraryTarget: 'umd',
  },
  module: {
    loaders,
  }
};

var buildConfig = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    libraryTarget: 'umd',
  },
  module: {
    loaders,
  },
  externals: 'PhyloCanvas',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
};

var isBuild = process.env.NODE_ENV && process.env.NODE_ENV === 'production';

module.exports = isBuild ? buildConfig : devConfig;
