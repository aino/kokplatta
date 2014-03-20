var path = require('path');
var webpack = require('webpack')
var config = require('./config')
var _ = require('underscore')

var app = {
  cache: true,
  target: 'web',
  debug: config.debug,
  watch: false,
  entry: {
      app: path.resolve( config.src + 'js/index.js' ),
      'commons.js': path.resolve( config.src + 'js/init.js' )
  },
  output: {
      path: path.resolve( config.public + 'js/' ),
      publicPath: '/js/',
      filename: 'app.bundle.js',
      //chunkFilename: 'lib.bundle.js',
      //sourceMapFilename: 'app.bundle.map',
      //jsonpFunction: 'Load'
  },
  //devtool: 'source-map',
  resolve: {
    modulesDirectories: ['bower_components', 'node_modules', 'src/js']
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader' }
    ],
    noParse: [
      /\.min\.js$/
    ]
  },
  plugins: [
    //new webpack.IgnorePlugin(new RegExp("^(" + config.libs.join('|') + ")$"))
    new webpack.optimize.CommonsChunkPlugin('commons.js')
  ]
}

module.exports = { app: app }