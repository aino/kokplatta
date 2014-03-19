var path = require("path");
var webpack = require("webpack");
var config = require('./config')

module.exports = {
  cache: true,
  target: 'web',
  debug: config.debug,
  watch: false,
  entry: {
      main: path.resolve( config.src + 'js/index.js' )
  },
  output: {
      path: config.public + 'js/',
      filename: 'all.bundle.js'
  },
  resolve: {
    modulesDirectories: ['bower_components', 'node_modules', 'src/js']
  },
  module: {
    loaders: [
      // { test: /\.css/, loader: 'style-loader!css-loader' },
      // { test: /\.gif/, loader: 'url-loader?limit=10000&minetype=image/gif' },
      // { test: /\.jpg/, loader: 'url-loader?limit=10000&minetype=image/jpg' },
      // { test: /\.png/, loader: 'url-loader?limit=10000&minetype=image/png' },
      { test: /\.js$/, loader: 'jsx-loader' }
    ],
    noParse: /\.min\.js/
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}