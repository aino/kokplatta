var path = require('path');
var webpack = require('webpack');
var config = require('./config')

module.exports = {
  cache: true,
  target: 'web',
  debug: config.debug,
  watch: false,
  entry: {
      main: path.resolve( config.src + 'js/index.jsx' )
  },
  output: {
    //path: path.join(__dirname, config.public + 'js/'),
    path: path.resolve( config.public + 'js/' ),
    publicPath: '/js/',
    filename: 'all.bundle.js'
  },
  resolve: {
    modulesDirectories: ['bower_components', 'src/js']
  },
  module: {
    loaders: [
      { test: /react\/react\.js$/, loader: 'script-loader' },
      { test: /jquery\/jquery\.js$/, loader: 'script-loader' },
      { test: /\.jsx$/, loader: 'jsx-loader' }
    ],
    noParse: /\.min\.js/
  },
  plugins: [
    //new webpack.optimize.UglifyJsPlugin()
  ]
}
